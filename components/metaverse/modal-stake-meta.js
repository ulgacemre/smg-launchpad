import React, {useCallback,useState, useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import { BigNumber, utils,Contract } from "ethers"
import {NotificationManager} from 'react-notifications';
import useWeb3 from '../../shared/hooks/useWeb3'
import useContracts from '../../shared/hooks/useContracts'
import addresses from '../../shared/addresses';
import InputMax from '../input-max';
import Modal from '../modal';
import abis from '../../shared/abis'
import { timeRemaining } from '../../helpers';
import { dayRemaining } from '../../helpers';
import { useRouter } from 'next/router';
const _ = require('lodash');


const ModalStakeMeta = ({isStake = true, className = '', show = false, onClose = () => {}, ...props}) => {
    const { getBalance, smgTokenPrice,getPoolInfoAtlas,getBalanceSMG,depositMeta,withdraw2,emergencyWithdraw,getBalanceLP,getUserInfo,getUserInfoLP,deposit2,depositLp} = useContracts()
    const { chainId,wallet,walletAddress, waitForTransaction } = useWeb3()    

    const [balance, setBalance] = useState(0)
    const [deposited, setDeposited] = useState(0)
    const [userInfo, setUserInfo] = useState(0)
    const [poolInfo, setPoolInfo] = useState()
    
    const router = useRouter()
    const { address } = router.query 

    const [contract, setContract] = useState(new Contract("0x6bfd576220e8444CA4Cc5f89Efbd7f02a4C94C16", abis.Smaugs))  
    const [stakeContract, setStakeContract] = useState(new Contract("0xb28FBDf2dE63E929056c8a323b4B70348ED1C006", abis.LPMining))  

    const [stakeAmount, setStakeAmount] = useState(0)
    const [isPending, setPending] = useState(false)
    const [isPending2, setPending2] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
     
        if (!!wallet && !contract.signer) {
            setContract(contract.connect(wallet))
        }
        if (!!wallet && !stakeContract.signer) {
            setStakeContract(stakeContract.connect(wallet))
        } 
        
    }, [wallet])


    useEffect(async () => {        
        if(chainId !== addresses.networkID) 
            return
        const info = await getUserInfo(stakeContract)
        if(info)
            setUserInfo(info)
    }, [chainId, getUserInfo])

    useEffect(async () => {        
        if(chainId !== addresses.networkID) 
            return
        const info = await getPoolInfoAtlas(stakeContract)
        if(info)
            setPoolInfo(info)
    }, [chainId, getPoolInfoAtlas])
    
    useEffect(() => {
        if(chainId !== addresses.networkID) {
            onClose();
        }
    }, [chainId])


    useEffect(async () => {        
        if(chainId !== addresses.networkID) 
            return
        const value = await getBalance()

       
        if(value)
            setBalance(value)
    }, [chainId, getBalanceLP])


    const getBal = async() => {
        const value = await getBalance(contract)

        const balance = await getBalanceSMG(stakeContract)


    
    if(value)
        setBalance(value)


    if(balance)
    setDeposited(balance)    

    }


    useEffect(() => {
        getBal()
        const timer = setInterval(getBal, 1000)
        return () => {      
            clearInterval(timer)
        }
    }, [stakeContract,getBal])


    const handleStake = () => {

        const fAmount = parseFloat(stakeAmount)
    
       
        if( isPending )
            return
            
            setPending(true)
        const fStakeAmount = parseFloat(stakeAmount)
        if( fStakeAmount <= balance)
       
        {
          
          
            depositMeta(stakeContract,fStakeAmount).then((result) => {
                    waitForTransaction(result.hash, 1000)
                    .then(() => { 
                        NotificationManager.success("Success to deposit");
                        setPending(false)
                    

                        getUserInfo(stakeContract).then((result)=>{
                        if(result)
                            setUserInfo(result)
                        })

                        getPoolInfoAtlas(stakeContract).then((result)=>{
                            if(result)
                                setPoolInfo(result)
                            })
                       
                        onClose()
                    })
                    .catch(() => { 
                        NotificationManager.error("Failed to deposit");
                        setPending(false)
                    })
                }).catch((err) => {
                    setPending(false)
                    
                    if(err.data) {
                        NotificationManager.error(err.data.message, 'Failed to deposit');
                        setErrMsg(err.data.message)
                    } else {
                        NotificationManager.error(err.message, 'Failed to deposit');
                        setErrMsg(err.message)
                    }
                    emptyErrMessage();
                })
           
        } else {
            setErrMsg("Please input valid amount for staking/unstaking")
            emptyErrMessage();
        }
    }

    const emptyErrMessage = _.debounce(function () {
        setErrMsg('')
    }, 3000);        

  





    
    useEffect(() => {

       
        setPending(false)
      
        setErrMsg('')
        setStakeAmount(0)
    }, [show])


  

  



    return (
        <Modal title={props?.farming ? "Stake SMG" :(isStake?  "Stake SMG tokens": "Unstake SMG tokens") } className={className} show={show} onClose={onClose} {...props}>
            <div className="text-center text-desc mb-2" style={{"color":"red", "fontSize":"18px"}}>You have { timeRemaining((props.userInfo?.lastClaim || new Date().getTime()) + ((poolInfo?.lockupDuration || 0) * 1000))} remaining lock period</div>
            <div className="py-2  mt-3">
            Balance {(balance)}
            </div>
            <InputMax value={stakeAmount} currency="SMG" placeholder="Input Amount" className="py-2" max={isStake ? balance : userInfo?.amount} onChange={(val) => setStakeAmount(val)}/>
          {isStake ? (
            <div className="d-flex justify-content-between mb-3 fee" >
            <div className="py-2">
           Amount: <br></br>
          
                </div>
                <div className="py-2">
               
                {stakeAmount} SMG
                </div>

               
             
                
                 </div>

                 

          ):(
            <div> </div>

          )}

                
             

                <div className="d-flex justify-content-between mb-3">
            <div className="py-1">
            USD
                </div>
                <div className="py-1">
                 ${(stakeAmount * smgTokenPrice).toFixed(2)}
                </div> </div>
            
            <div className="d-flex justify-content-between">
                <div className="btn btn-block v-btn--rounded btn-outline-primary mr-3" onClick={onClose}>
                    Cancel
                </div>
               
                

<div className="btn btn-block v-btn--rounded btn-primary mt-0" onClick={handleStake}>
{isPending ? (
    <Spinner animation="border" size="sm" />
) : (
    <span>Stake</span>
)}
</div> 
               
               
              
            </div>  
               
            <div className="text-danger my-2">{errMsg}</div>
        </Modal>
    );
}

export default ModalStakeMeta;