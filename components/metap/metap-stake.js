import React, {useCallback,useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from 'react-bootstrap/Spinner'

import Modal from '../modal'
import { useRouter } from 'next/router'
import { BigNumber, utils, Contract } from "ethers"
import { NotificationManager} from 'react-notifications';
import useWeb3 from '../../shared/hooks/useWeb3'
import useContracts from '../../shared/hooks/useContracts'
import addresses from '../../shared/addresses';
import abis from '../../shared/abis'
import ModalStake from '../metap/modal-stake-project';
import ModalUnStake from '../metap/modal-unstake-project';

const _ = require('lodash');

const MetapStake = ({data}) => {

    const router = useRouter()
    const { address } = router.query 
    const { connected,wallet,walletAddress, chainId, switchNetwork, handleConnect, waitForTransaction } = useWeb3()    
    const { getTotalStakedMetap, compound,getPoolInfoMetap,claim,getUserInfoMetap, getTokenPerBlockMetap,getRewardPerYear,approveNewStake,approveMetapStake, getPending, smgTokenPrice } = useContracts()


    const [contract, setContract] = useState(new Contract("0x46E7e56D237D0CbfbBF375f9e0b2fc3F8BC1C88A", abis.Smaugs))  
    const [stakeContract, setStakeContract] = useState(new Contract("0x854aEF6aC4374D8AE22E224F47612aa448C683d9", abis.NewStake))  
    const [modalCollectVisible, setModalCollectVisible] = useState(false)

    const [totalStaked, setTotalStaked] = useState(0)
    const [totalStakedUSD, setTotalStakedUSD] = useState(0)    
    const [apy, setAPY] = useState(0)
    const [allowedAmount, setAllowedAmount] = useState(BigNumber.from(0))
    const [userInfo, setUserInfo] = useState(0)
    const [earning, setEarning] = useState(0)
    const [poolInfo, setPoolInfo] = useState()
    const [isPending, setPending] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [tokenPerBlock, setTokenPerBlock] = useState(0)
    const [modalStakeVisible, setModalStakeVisible] = useState(false)
    const [modalUnStakeVisible, setModalUnStakeVisible] = useState(false)
    const [isStake, setStake] = useState(true)

    const MIN_APPROVE = BigNumber.from("1844674407370955200000000000")

    const getAllowance = async () => {   
        if (!walletAddress || !contract.signer) return
        try {
            const ret = await contract.allowance(walletAddress, "0x854aEF6aC4374D8AE22E224F47612aa448C683d9")
            if(ret)
                setAllowedAmount(ret)
        } catch (e) {}
    }
    
    const checkAllowedAmount = useCallback(async () => {
        if(chainId !== addresses.networkID)
            return;
        const allowance = await getAllowance()
        if(allowance)
            setAllowedAmount(allowance)
    })



    const handleConnectButton = () => {
        
        if(!connected) 
            handleConnect();
    }


    const checkPoolInfo = async () => {
        if(chainId !== addresses.networkID)
            return;
       const pool = await  getPoolInfoMetap(stakeContract)
       if(pool)
       setPoolInfo(pool)
    
    }
 
    
    const checkPending = async () => {
        if(chainId !== addresses.networkID)
            return;
        
        const pending = await getPending()
        if(pending)
            setEarning(pending)
    }
 
    const emptyErrMessage = _.debounce(function () {
        setErrMsg('')
    }, 3000);

    const handleApprove = async () => {
        if(!allowedAmount.isZero())
        return
        setPending(true)
         
        approveMetapStake("0x854aEF6aC4374D8AE22E224F47612aa448C683d9",MIN_APPROVE).then(async (result) => {
                waitForTransaction(result.hash, 1000)
                .then(() => { 
                        NotificationManager.success("Success to approve");
                        checkAllowedAmount()
                        setPending(false)
                })
                .catch(() => { 
                        NotificationManager.error("Failed to approve");
                        setPending(false)
                })
            }).catch((err) => {
              
                NotificationManager.error(err.data ? err.data.message : err.message, 'Failed to approve');
                setPending(false)
            })
       
        }
    

    const handleStake = () => {
        setStake(true)
        setModalStakeVisible(true)
    }
    
    const handleUnStake = () => {
        setStake(false)
        
        setModalUnStakeVisible(true)
    }    

    const handleHarvest = async() => {   

        console.log("1")
        if( isPending )
            return

            console.log("2")
        setPending(true)
        claim(stakeContract,0).then(async(result) => {
            waitForTransaction(result.hash, 1000)
            .then(() => { 
            NotificationManager.success("Success to harvest");
            console.log("3")
          
            setPending(false)
           
        })
        .catch(() => { 
            NotificationManager.error("Failed to withdraw");
            setPending(false)
        })
         }).catch((err) => {
                    setPending(false)
                    if(err.data) {
                        NotificationManager.error(err.data.message, 'Failed to withdraw');
                        // setErrMsg(err.data.message)
                    } else {
                        NotificationManager.error(err.message, 'Failed to withdraw');
                        // setErrMsg(err.message)
                    }
                   
                })
    }

    const handleCloseStakeModal = () => {
        checkUserInfo()
        setModalStakeVisible(false)
    }
    const handleCloseUnStakeModal = () => {
        checkUserInfo()
        setModalUnStakeVisible(false)
    }


    const checkUserInfo = async () => {
        if(chainId !== addresses.networkID)
            return;
       const userinfo = await getUserInfoMetap(stakeContract)

       setUserInfo(userinfo)
       
    
    }
    const update = async () => {

    const tokenPer = await getTokenPerBlockMetap(stakeContract)
    const pool = await  getTotalStakedMetap(stakeContract)

    
       if(tokenPer !== null  && pool !== null){

      
        setTotalStaked(parseFloat(pool).toFixed(2))

          
       if(parseFloat(pool.depositedAmount) === 0.0) {
        setAPY(0)
    } else {


    
     setAPY((parseFloat(tokenPer.tokenPerBlock) /3 * 31557600 * 100 / parseFloat(pool)).toFixed(2))
    
     setTotalStakedUSD(0.2 * (pool))
    }

       }
      
      
   

    }
      
    useEffect(() => {
        checkPending()
        const interval = setInterval(checkPending, 10000)  
        return () => {
            clearInterval(interval)
        }
    }, [chainId, getPending])


    useEffect(() => {
        checkPoolInfo()
       
        const interval = setInterval(checkPoolInfo, 1000)  
        return () => {
            clearInterval(interval)
        }
    }, [chainId])

    useEffect(() => {
        checkUserInfo()
       
        const interval = setInterval(checkUserInfo, 10000)  
        return () => {
            clearInterval(interval)
        }
    }, [chainId])

    useEffect(() => {
        update()
       
        const interval = setInterval(update, 10000)  
        return () => {
            clearInterval(interval)
        }
    }, [chainId])

    useEffect(() => {

      
        
        if (!!wallet && !contract.signer) {
            setContract(contract.connect(wallet))
        }
        if (!!wallet && !stakeContract.signer) {
            setStakeContract(stakeContract.connect(wallet))
        } 
        
 
    }, [wallet])


    useEffect(async () => {
        checkAllowedAmount()
    }, [chainId, getAllowance])
          
    
    return (
        <div className="section-top">
                <Modal className="text-center" title="" show={modalCollectVisible} onClose={() => setModalCollectVisible(false)}>
                <h4 className="mb-3">Your Lock Period will be reset again!</h4>
                {isPending ? (
                    <Spinner animation="border" variant="primary"/>
                ) : (
                    <div className="row">
                    <div className="col-6">
                    <div className="btn v-btn--rounded btn-outline-primary" onClick={handleHarvest}>Confirm</div>
                   </div>
                   <div className="col-6">
                   <div className="btn v-btn--rounded btn-outline-primary" onClick={() => setModalCollectVisible(false)}>Cancel</div>
                        </div>
                </div>
                )}
                  </Modal>


            <ModalStake isStake={isStake} farming={false} show={modalStakeVisible} address = {"0x854aEF6aC4374D8AE22E224F47612aa448C683d9"} userInfo = {userInfo} poolInfo = {poolInfo} dialogClassName="modal-stake" onClose={handleCloseStakeModal} />
            <ModalUnStake isStake={isStake} farming={false} show={modalUnStakeVisible} address = {"0x854aEF6aC4374D8AE22E224F47612aa448C683d9"} userInfo = {userInfo} poolInfo = {poolInfo} dialogClassName="modal-stake" onClose={handleCloseUnStakeModal} />

            
            <div className="section section-farm-panel text-white">
                <div className="container py-8 px-6 py-16">
                    <div className="">

                    <div className="mb-5 mt-3">
                    <h2 className="text-center mb-2">Metap Pool </h2>
                   
                       <h2 className="text-center mt-3">30 days lockup pool </h2>

                    
                    </div>

                        <div className="offset-md-4 offset-lg-4 col-md-6 col-lg-4 col-12 text-center mt-8">
                            <div className="v-sheet v-sheet--outlined theme--dark rounded-xl p-3"
                                    style={{'backgroundColor': 'transparent', 'cursor': 'default'}}>
                                <h4 className="text-center">METAP</h4>
                                <div className="p-2">
                                    <div className="d-flex justify-space-between">
                                        <div>APY</div>
                                        <div>{apy} %</div>
                                    </div>
                                    <div className="d-flex justify-space-between">
                                        <div>Total Staked</div>
                                        <div>{utils.commify(totalStaked)} METAP</div>
                                    </div>
                                    <div className="d-flex justify-space-between">
                                        <div>Total value</div>
                                        <div>${utils.commify(totalStakedUSD.toFixed(2))}</div>
                                    </div>
                                    <div className="d-flex justify-space-between mt-4">
                                        <div>Earnings</div>
                                        <div>{userInfo?.pendingRewards} METAP</div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="p-3 v-sheet v-sheet--outlined no-hover theme--dark rounded-xl" style={{'backgroundColor': 'transparent'}}>
                                        <div className="text-left mb-3">My METAP Staked</div>
                                        {!connected ? (
                                            <div className={`btn btn-block v-btn--rounded btn-primary`} onClick={handleConnectButton}>
                                                Connect Wallet
                                            </div>
                                        ) : chainId === addresses.networkID ? 
                                            allowedAmount.isZero() ?  
                                        ( 
                                            <div className="btn btn-block v-btn--rounded btn-primary" onClick={handleApprove}>
                                                {isPending ? (
                                                    <Spinner animation="border" size="sm" />
                                                ):(
                                                    <span>Approve Contract</span>
                                                )}
                                            </div>
                                        ) : ( userInfo?.amount > 0 ? (
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="">{userInfo?.amount.toFixed(2)}</div>
                                                <div>
                                                    <div className="btn v-btn--round v-btn--circle btn-outline-primary" onClick={handleStake}>
                                                        +
                                                    </div>
                                                    <div className="btn v-btn--round v-btn--circle btn-outline-primary ml-3" onClick={handleUnStake}>
                                                        -
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="btn btn-block v-btn--rounded btn-primary" onClick={handleStake}>
                                                Stake METAP
                                            </div>
                                        ))
                                         : 
                                        (
                                            <div className="btn btn-block v-btn--rounded btn-primary" onClick={() => switchNetwork(addresses.networkID)}>Switch To BSC MainNet</div>
                                        )}
                                        <div className="text-danger my-2">{errMsg}</div>
                                    </div>
                                </div>
                                {(connected && chainId === addresses.networkID && !allowedAmount.isZero() && userInfo?.amount > 0) &&
                                <div className="p-2">
                                    <div className="btn btn-block v-btn--rounded btn-primary" onClick={() => setModalCollectVisible(true)}>
                                        {isPending ? (
                                            <Spinner animation="border" size="sm" />
                                        ):(
                                            <span>Harvest</span>
                                        )}
                                    </div>
                                </div>
                                }
                                <div className="p-2">
                                    <div className="theme--dark v-divider my-2"></div>
                                </div>
                                <div className="p-2">
                                    <div className="d-flex justify-space-between align-center pt-2" style={{'color': '#fff'}}>
                                        <div>
                                            <a href="http://bit.ly/32nkj0P" target="_blank">
                                                Buy METAP <FontAwesomeIcon icon='external-link-alt' className="ml-1 mb-1" style={{width: '16px'}}/>
                                            </a>
                                        </div>
                                        <div>
                                            <a href={"https://bscscan.com/address/"+"0x854aEF6aC4374D8AE22E224F47612aa448C683d9"} target="_blank">
                                                View Contract <FontAwesomeIcon icon='external-link-alt' className="ml-1 mb-1" style={{width: '16px'}}/>
                                            </a>
                                        </div>

                                       
                                    </div>
                                   
                                </div>
                           
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default MetapStake;