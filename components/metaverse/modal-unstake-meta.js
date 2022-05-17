import React, {useState, useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import { BigNumber, utils,Contract } from "ethers"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import useWeb3 from '../../shared/hooks/useWeb3'
import useContracts from '../../shared/hooks/useContracts'
import addresses from '../../shared/addresses';
import InputMax from '../input-max';
import Modal from '../modal';
import abis from '../../shared/abis'
import { useRouter } from 'next/router'
import { dayRemaining } from '../../helpers';
import { timeRemaining } from '../../helpers';

const ModalUnStakeLP = ({isStake = true, className = '', show = false, onClose = () => {}, ...props}) => {
    const { getBalance, smgTokenPrice ,deposit2,withdraw2,withdrawLP,withdrawMeta,withdraw,emergencyWithdraw,emergencyWithdrawMeta,getPoolInfo,getPoolInfoAtlas,getUserInfo, getBalanceLP,getUserInfoMetaverse} = useContracts()
    const { chainId,wallet,walletAddress, waitForTransaction } = useWeb3()    


    const [balance, setBalance] = useState(0)
    const [userInfo, setUserInfo] = useState(0)
    const [poolInfo, setPoolInfo] = useState()
    const router = useRouter()
    const { address } = router.query 

    const [stakeContract, setStakeContract] = useState(new Contract("0xb28FBDf2dE63E929056c8a323b4B70348ED1C006", abis.LPMining))  

    const [stakeAmount, setStakeAmount] = useState(0)
    const [isPending, setPending] = useState(false)
    const [isPending2, setPending2] = useState(false)
    const [errMsg, setErrMsg] = useState('')
  

    const handleEmergencyUnStake = () => {
        if( isPending )
            return
        const fStakeAmount = parseFloat(stakeAmount)
        if( fStakeAmount > 0 && fStakeAmount <= (props.userInfo?.amount) ) 
        {
            setPending2(true)
          
            emergencyWithdraw(stakeContract,fStakeAmount).then((result) => {
                    waitForTransaction(result.hash, 1000)
                    .then(() => { 
                        NotificationManager.success("Success to withdraw");
                        setPending2(false)
                    
                        const info =  getUserInfoMetaverse().then((result)=>{
                          
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

        const fAmount = parseFloat(stakeAmount)
        if(fAmount > userInfo?.amount) {
            NotificationManager.warning("Too large to withdraw")
            return
        } else if(fAmount === 0) {
            NotificationManager.warning("Please input withdraw amount")
            return
        }
     
        const fStakeAmount = parseFloat(stakeAmount)
        if( fStakeAmount > 0 && fStakeAmount <= props.userInfo?.amount) 
        {
            setPending(true)
          
            withdraw2(fStakeAmount,stakeContract).then((result) => {
                    waitForTransaction(result.hash, 1000)
                    .then(() => { 
                        NotificationManager.success("Success to withdraw");
                        setPending(false)
                    
                        getUserInfoMetaverse().then((result)=>{
                          
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
          
        } else {
            setErrMsg("Please input valid amount for staking/unstaking")
           
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
    }, [])


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
    }, [chainId])

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


    return (
        <Modal title="Unstake SMG Token" className={className} show={show} onClose={onClose} {...props}>

        <div className="text-center text-desc mb-2" style={{"color":"red", "fontSize":"18px"}}>You have { timeRemaining((props.userInfo?.lastClaim || new Date().getTime()) + ((poolInfo?.lockupDuration || 0) * 1000))} remaining lock period</div>
       

         
            <div className="py-2  mt-3">
               Stake Balance {props.userInfo?.amount> 0 ? props.userInfo?.amount: 0} SMG
            </div>
            <InputMax value={stakeAmount> 0 ? stakeAmount : 0} currency="SMG" placeholder="Input Amount" className="py-2" max={props.userInfo?.amount} onChange={(val) => setStakeAmount(val)}/>
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
               
                
                
   
  {
timeRemaining(props.unlockTime)== "0 days"  ?

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
                        <span>Emergency Unstake (40% fee)</span>
 
                     
                       
                    )}
                </div>          
            <div className="text-danger my-2">{errMsg}</div>
        </Modal>
    );
}

export default ModalUnStakeLP;