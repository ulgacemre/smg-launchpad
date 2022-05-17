import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from 'react-bootstrap/Spinner'
import ConnectWallet from "./connect-wallet"
import { BigNumber, utils } from "ethers"
import { NotificationManager} from 'react-notifications';

import useWeb3 from '../shared/hooks/useWeb3'
import useContracts from '../shared/hooks/useContracts'
import addresses from '../shared/addresses';

import ModalStake from './modal-stake';
import ModalStake2 from './modal-stake2';



const _ = require('lodash');

const StakeCard = () => {
    const { connected, chainId, switchNetwork, handleConnect, waitForTransaction } = useWeb3()    
    const { getTotalStaked, getAllowance, approveStake, getUserInfo2, compound, getRewardPerYear, getPending, smgTokenPrice } = useContracts()

    const [totalStaked, setTotalStaked] = useState(0)
    const [totalStakedUSD, setTotalStakedUSD] = useState(0)    
    const [apy, setAPY] = useState(0)
    const [allowedAmount, setAllowedAmount] = useState(BigNumber.from(0))
    const [userInfo, setUserInfo] = useState(0)
    const [earning, setEarning] = useState(0)

    const [isPending, setPending] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [modalStake2Visible, setModalStake2Visible] = useState(false)
    const [isStake, setStake] = useState(true)

    const MIN_APPROVE = BigNumber.from("1844674407370955200000000000")
    
    const checkStakeInfo = async () => {
        if(chainId !== addresses.networkID)
            return;
        const stakedStr = await getTotalStaked()
        const rewardPerYear = await getRewardPerYear()
 
        if( stakedStr !== null && rewardPerYear !== null ) {
            const staked = parseFloat(stakedStr)
            setTotalStaked(staked.toFixed(2))
            if(staked === 0.0) {
                setAPY(0)
            } else {
                setAPY((rewardPerYear * 100 / staked).toFixed(2))
            }

            setTotalStakedUSD(smgTokenPrice * staked)
        }
    }

    const handleConnectButton = () => {
        if(!connected) 
            handleConnect();
    }

    useEffect(async () => {    
        
      
        checkStakeInfo()
        const interval = setInterval(checkStakeInfo, 10000)  
        return () => {
            clearInterval(interval)
        }
    }, [chainId])

    const checkAllowedAmount = async () => {
        if(chainId !== addresses.networkID)
            return;
        const allowance = await getAllowance()
        if(allowance)
            setAllowedAmount(allowance)
    }

    useEffect( () => {
        checkAllowedAmount()
    }, [chainId])
        
    const checkUserInfo = async () => {
        if(chainId !== addresses.networkID)
            return;
        const userInfo = await getUserInfo2()
        if(userInfo)
            setUserInfo(userInfo)
    }
    useEffect(() => {
        checkUserInfo()
        const interval = setInterval(checkUserInfo, 10000)  
        return () => {
            clearInterval(interval)
        }
    }, [chainId, checkUserInfo])
    
    const checkPending = async () => {
        if(chainId !== addresses.networkID)
            return;
        
        const pending = await getPending()
        if(pending)
            setEarning(pending)
    }
    useEffect(() => {
        checkPending()
        const interval = setInterval(checkPending, 10000)  
        return () => {
            clearInterval(interval)
        }
    }, [chainId, checkPending])

    const emptyErrMessage = _.debounce(function () {
        setErrMsg('')
    }, 3000);

    const handleApprove = async () => {
        if( isPending )
            return
        if(allowedAmount.isZero()) {
            setPending(true)
            approveStake(MIN_APPROVE).then(async (result) => {
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
                setPending(false)
                if(err.data) {
                    NotificationManager.error(err.data.message, 'Failed to approve');
                    // setErrMsg(err.data.message)
                } else {
                    NotificationManager.error(err.message, 'Failed to approve');
                    // setErrMsg(err.message)
                }
                emptyErrMessage()
            })
        }
    }

    const handleStake = () => {
        setStake(true)
        setModalStake2Visible(true)
    }
    
    const handleUnStake = () => {
        setStake(false)
        setModalStake2Visible(true)
    }    

    const handleCompound = async () => {   
        if( isPending )
            return

        setPending(true)
        compound().then(async (result) => {
            waitForTransaction(result.hash, 1000)
            .then(() => {
                NotificationManager.success("Success to reinvest");
                checkUserInfo()
                checkPending()
                setPending(false)
            })
            .catch(() => {
                NotificationManager.error("Failed to reinvest");
                setPending(false)
            })
        }).catch((err) => {
            setPending(false)                
            if(err.data) {                
                NotificationManager.error(err.data.message, 'Failed to reinvest');
                // setErrMsg(err.data.message)
            } else {                
                NotificationManager.error(err.message, 'Failed to reinvest');
                // setErrMsg(err.message)
            }
            emptyErrMessage()
        })
    }

    const handleCloseStakeModal = () => {
        checkUserInfo()
        setModalStake2Visible(false)
    }
    
    return (
        <div className="section-top">
            <ModalStake2 isStake={isStake} show={modalStake2Visible} dialogClassName="modal-stake" onClose={handleCloseStakeModal} />
            <div className="section section-farm-panel text-white">
                <div className="container py-8 px-6 py-16">
                    <div className="">

                    <div className="mb-5 mt-3">
                    <h2 className="text-center mb-2">Smaugs Launcher </h2>
                    <h2 className="text-center mt-3">Stake for IDO Projects </h2>
                    </div>

                        <div className="offset-md-4 offset-lg-4 col-md-6 col-lg-4 col-12 text-center mt-8">
                            <div className="v-sheet v-sheet--outlined theme--dark rounded-xl p-3"
                                    style={{'backgroundColor': 'transparent', 'cursor': 'default'}}>
                                <h4 className="text-center">SMG</h4>
                                <div className="p-2">
                                    <div className="d-flex justify-space-between">
                                        <div>APY</div>
                                        <div> 0%</div>
                                    </div>
                                    <div className="d-flex justify-space-between">
                                        <div>Total Staked</div>
                                        <div>{utils.commify(totalStaked)} SMG</div>
                                    </div>
                                    <div className="d-flex justify-space-between">
                                        <div>Total value</div>
                                        <div>${utils.commify(totalStakedUSD.toFixed(2))}</div>
                                    </div>
                                    <div className="d-flex justify-space-between">
                                        <div>Earnings</div>
                                        <div>{earning?.toFixed(2)} SMG</div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="p-3 v-sheet v-sheet--outlined no-hover theme--dark rounded-xl" style={{'backgroundColor': 'transparent'}}>
                                        <div className="text-left mb-3">My SMG Staked</div>
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
                                                <div className="">{userInfo?.amount}</div>
                                                <div>
                                                    <div className="btn v-btn--round v-btn--circle btn-outline-primary" onClick="#">
                                                        +
                                                    </div>
                                                    <div className="btn v-btn--round v-btn--circle btn-outline-primary ml-3" onClick={handleUnStake}>
                                                        -
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="btn btn-block v-btn--rounded btn-primary" onClick={handleStake}>
                                                Stake SMG
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
                                    <div className="btn btn-block v-btn--rounded btn-primary" onClick={handleCompound}>
                                        {isPending ? (
                                            <Spinner animation="border" size="sm" />
                                        ):(
                                            <span>ReInvest</span>
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
                                                Buy SMG <FontAwesomeIcon icon='external-link-alt' className="ml-1 mb-1" style={{width: '16px'}}/>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="https://bscscan.com/address/0xF24dFCE4Dd4DD42c7f253381BBBBd2Fc04591F57" target="_blank">
                                                View Contract <FontAwesomeIcon icon='external-link-alt' className="ml-1 mb-1" style={{width: '16px'}}/>
                                            </a>
                                        </div>

                                       
                                    </div>
                                   
                                </div>
                                <div className="p-2">
                                    <div className="justify-space-between align-center">
                                        Deposit Fee: 3%
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

export default StakeCard;