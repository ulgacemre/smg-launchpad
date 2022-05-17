import React, {useState, useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import { BigNumber, utils } from "ethers"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import useWeb3 from '../shared/hooks/useWeb3'
import useContracts from '../shared/hooks/useContracts'
import addresses from '../shared/addresses';
import InputMax from './input-max';
import Modal from './modal';

const _ = require('lodash');


const ModalStake2 = ({isStake = true, className = '', show = false, onClose = () => {}, ...props}) => {
    const { getBalance, deposit, withdraw, getUserInfo2, smgTokenPrice } = useContracts()
    const { chainId, waitForTransaction } = useWeb3()    

    const [balance, setBalance] = useState(0)
    const [userInfo, setUserInfo] = useState(0)

    const [stakeAmount, setStakeAmount] = useState(0)
    const [isPending, setPending] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    
    useEffect(() => {
        setPending(false)
        setErrMsg('')
        setStakeAmount(0)
    }, [show])
    
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
        const info = await getUserInfo2()
        if(info)
            setUserInfo(info)
    }, [chainId, getUserInfo2])

    const handleStake = () => {
        if( isPending )
            return
        const fStakeAmount = parseFloat(stakeAmount)
        if( fStakeAmount > 0 && fStakeAmount <= (isStake ? balance : userInfo?.amount) ) 
        {
            setPending(true)
            if(isStake) {
                deposit(fStakeAmount).then((result) => {
                    waitForTransaction(result.hash, 1000)
                    .then(() => { 
                        NotificationManager.success("Success to deposit");
                        setPending(false)
                        const value = getBalance().then((result)=>{
                          
                            if(result)
                            setBalance(result)
                        })

                        const info =  getUserInfo2().then((result)=>{
                        if(result)
                            setUserInfo(result)
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
                        // setErrMsg(err.data.message)
                    } else {
                        NotificationManager.error(err.message, 'Failed to deposit');
                        // setErrMsg(err.message)
                    }
                    emptyErrMessage();
                })
            } else {
                withdraw(fStakeAmount).then((result) => {
                    waitForTransaction(result.hash, 1000)
                    .then(() => { 
                        NotificationManager.success("Success to withdraw");
                        setPending(false)
                    
                        const info =  getUserInfo2().then((result)=>{
                          
                        if(result)
                            setUserInfo(result)
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
            }
        } else {
            setErrMsg("Please input valid amount for staking/unstaking")
            emptyErrMessage();
        }
    }

    const emptyErrMessage = _.debounce(function () {
        setErrMsg('')
    }, 3000);        

    return (
        <Modal title={isStake ? "Stake SMG tokens" : "Unstake SMG tokens"} className={className} show={show} onClose={onClose} {...props}>
            <div className="py-2  mt-3">
                Balance : {utils.commify(isStake ? balance : userInfo?.amount)} SMG
            </div>
            <InputMax value={stakeAmount} currency="SMG" placeholder="Input Amount" className="py-2" max={isStake ? balance : userInfo?.amount} onChange={(val) => setStakeAmount(val)}/>
          {isStake ? (
            <div className="d-flex justify-content-between mb-3 fee" >
            <div className="py-2">
            Final Stake Amount: <br></br>
            Deposit fee:
                </div>
                <div className="py-2">
                {(stakeAmount - stakeAmount*3/100).toFixed(2)} SMG<br></br>
                {(stakeAmount*3/100).toFixed(2)} SMG
                </div> </div>

          ):(
            <div> </div>

          )}

                
             

                <div className="d-flex justify-content-between mb-3">
            <div className="py-2">
            Price
                </div>
                <div className="py-2">
                1 SMG = ${smgTokenPrice.toFixed(2)}
                </div> </div>
            
            <div className="d-flex justify-content-between">
                <div className="btn btn-block v-btn--rounded btn-outline-primary mr-3" onClick={onClose}>
                    Cancel
                </div>
                <div className="btn btn-block v-btn--rounded btn-primary mt-0" onClick={handleStake}>
                    {isPending ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        <span>Confirm</span>
                    )}
                </div>
            </div>            
            <div className="text-danger my-2">{errMsg}</div>
        </Modal>
    );
}

export default ModalStake2;