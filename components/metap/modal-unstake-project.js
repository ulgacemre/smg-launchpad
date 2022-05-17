import React, {useState, useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import { BigNumber, utils,Contract } from "ethers"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import useWeb3 from '../../shared/hooks/useWeb3'
import useContracts from '../../shared/hooks/useContracts'
import addresses from '../../shared/addresses';
import InputMax from './../input-max';
import Modal from './../modal';
import abis from '../../shared/abis'
import { useRouter } from 'next/router'
import { dayRemaining } from '../../helpers';
import { timeRemaining } from '../../helpers';



const ModalUnStake = ({isStake = true, className = '', show = false, onClose = () => {}, ...props}) => {
    const { getBalance, smgTokenPrice ,deposit2,withdrawMetap,emergencyWithdrawMetap,getPoolInfoMetap, getUserInfoMetap} = useContracts()
    const { chainId,wallet,walletAddress, waitForTransaction } = useWeb3()    

    const router = useRouter()
    const { address } = router.query 

    const [balance, setBalance] = useState(0)
    const [userInfo, setUserInfo] = useState(0)
    const [poolInfo, setPoolInfo] = useState()
  

    const [stakeContract, setStakeContract] = useState(new Contract("0x854aEF6aC4374D8AE22E224F47612aa448C683d9", abis.NewStake))  

    const [stakeAmount, setStakeAmount] = useState(0)
    const [isPending, setPending] = useState(false)
    const [isPending2, setPending2] = useState(false)
    const [errMsg, setErrMsg] = useState('')

  

    const handleEmergencyUnStake = () => {
        if( isPending )
            return
        const fStakeAmount = parseFloat(stakeAmount)
        if( fStakeAmount > 0 && fStakeAmount <= (isStake ? balance : userInfo?.amount) ) 
        {
            setPending2(true)
          
            emergencyWithdrawMetap(stakeContract,fStakeAmount).then((result) => {
                    waitForTransaction(result.hash, 1000)
                    .then(() => { 
                        NotificationManager.success("Success to withdraw");
                        setPending2(false)
                    
                        const info =  getUserInfoMetap().then((result)=>{
                          
                        if(result)
                            setUserInfo(result)
                        })
                        onClose()
                    })
                    .catch(() => { 
                        NotificationManager.error("Failed to withdraw");
                        setPending2(false)
                    })
                }).catch((err) => {
                    setPending2(false)
                    if(err.data) {
                        NotificationManager.error(err.data.message, 'Failed to withdraw');
                        setErrMsg(err.data.message)
                    } else {
                        NotificationManager.error(err.message, 'Failed to withdraw');
                        setErrMsg(err.message)
                    }
                   
                })
          
        } else {
            setErrMsg("Please input valid amount for staking/unstaking")
           
        }
    }

    const handleUnStake = () => {
        if( isPending )
            return
        const fStakeAmount = parseFloat(stakeAmount)
        if( fStakeAmount > 0 && fStakeAmount <= (isStake ? balance : userInfo?.amount) ) 
        {
            setPending(true)
          
            withdrawMetap(fStakeAmount,stakeContract).then((result) => {
                    waitForTransaction(result.hash, 1000)
                    .then(() => { 
                        NotificationManager.success("Success to withdraw");
                        setPending(false)
                    
                        getUserInfoMetap().then((result)=>{
                          
                        if(result)
                            setUserInfo(result)
                        })

                        getPoolInfoMetap(stakeContract).then((result)=>{
                            if(result)
                                setPoolInfo(result)
                            })
                        onClose()
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
                    emptyErrMessage();
                })
          
        } else {
            setErrMsg("Please input valid amount for staking/unstaking")
            emptyErrMessage();
        }
    }




    const emptyErrMessage =(function () {
        setErrMsg('')
    }, 3000);        


        
    useEffect(() => {
       
        setPending(false)
        setPending2(false)
        setErrMsg('')
        setStakeAmount(0)
    }, [show])


    useEffect(() => {

      
     
        if (!!wallet && !stakeContract.signer) {
            setStakeContract(stakeContract.connect(wallet))
        }
    }, [wallet])
    
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
    }, [chainId, getBalance])

    useEffect(async () => {        
        if(chainId !== addresses.networkID) 
            return
        const info = await getUserInfoMetap(stakeContract)
        if(info)
            setUserInfo(info)
    }, [chainId, getUserInfoMetap])

    useEffect(async () => {        
        if(chainId !== addresses.networkID) 
            return
        const info = await getPoolInfoMetap(stakeContract)
        if(info)
            setPoolInfo(info)
    }, [chainId, getPoolInfoMetap])


    return (
        <Modal title={isStake ? "Stake METAP tokens" : "Unstake METAP tokens"} className={className} show={show} onClose={onClose} {...props}>
            <div className="text-center text-desc mb-2" style={{"color":"red", "fontSize":"18px"}}>You have { timeRemaining((userInfo?.lastClaim || new Date().getTime()) + ((poolInfo?.lockupDuration || 0) * 1000))} remaining lock period</div>
            <div className="py-2  mt-3">
               Stake Balance : {utils.commify(isStake ? balance : userInfo?.amount)} METAP
            </div>
            <InputMax value={stakeAmount} currency="METAP" placeholder="Input Amount" className="py-2" max={isStake ? balance : userInfo?.amount} onChange={(val) => setStakeAmount(val)}/>
          {isStake ? (
            <div className="d-flex justify-content-between mb-3 fee" >
            <div className="py-2">
            Final Stake Amount: <br></br>
          
                </div>
                <div className="py-2">
               
                {stakeAmount} METAP
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
               
                
                
                {


timeRemaining((userInfo?.lastClaim || new Date().getTime()) + ((poolInfo?.lockupDuration || 0) * 1000)) == "0 days"  ?

<div className="btn btn-block v-btn--rounded btn-primary mt-0" onClick={handleUnStake}>
{isPending ? (
    <Spinner animation="border" size="sm" />
) : (
    <span>Unstake</span>
)}
</div> :  <div className="btn btn-block v-btn--rounded btn-primary mt-0 disabled" >
                    {isPending ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        <span>Unstake</span>
                    )}
                </div>
                }
               
              
            </div>  
            <div className="btn btn-block v-btn--rounded btn-primary mt-3" onClick={handleEmergencyUnStake}>
                    {isPending2 ? (
                        <Spinner animation="border" size="sm" />
                    ) : (address == "0xC090f7D3368a36b20b2B2553386f4E5E184cecb9" ?
                        <span>Emergency Unstake (15% fee)</span>:
                        <span>Emergency Unstake (25% fee)</span>
 
                     
                       
                    )}
                </div>          
            <div className="text-danger my-2">{errMsg}</div>
        </Modal>
    );
}

export default ModalUnStake;