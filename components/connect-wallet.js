import React, { useState, useEffect, useRef } from 'react';
import useWeb3 from '../shared/hooks/useWeb3'
import useContracts from '../shared/hooks/useContracts'
import { shortWalletAddr } from "../utils"
import addresses from '../shared/addresses';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { utils } from "ethers"
import axios from 'axios';
const ConnectWallet = ({ className = '' }) => {

    const { register,saleInfo, getCurrentRound,userToParticipation,participate,getAllocation,addressToRoundRegisteredFor,getUserInfo,bnbTokenPrice } = useContracts()
   
    const { connected, waitForTransaction,walletAddress, handleConnect, handleDisconnect, chainId } = useWeb3()
    const { getBalance, kyc } = useContracts()

    const [showPanel, setShowPanel] = useState(false)
    const [balance, setBalance] = useState(0)
    const [allocation, setAllocation] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [valueTo, setValueTo] = useState(0)
    const [valueFrom, setValueFrom] = useState(0)
    const [registeredRound, setRegisteredRound] = useState(0);

    const listRef = useRef(null);

    const handleClickOutside = (event) => {
        if (listRef.current && event.target instanceof Node && !listRef.current.contains(event.target)) {
            setShowPanel(false);
        }
    }

    const handleClick = () => {
        if (!connected) {
            handleConnect();
        } else {
            setShowPanel(!showPanel)
        }
    }

    const onHandleDisconnect = () => {
        setShowPanel(false);
        handleDisconnect();
    }

    const loadBalance = async () => {
        if (chainId !== addresses.networkID)
            return;
        const value = await getBalance()
        if (value)
            setBalance(value)
    }
    useEffect(() => {
        loadBalance();
        
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    useEffect(() => {
        loadBalance();
    }, [chainId, getBalance])

    return (
        <div className="dropdown-wrapper" ref={listRef}>
            <div className={`btn btn-block ${className}`} onClick={handleClick}>
                {connected &&
                    <div>{shortWalletAddr(walletAddress)} </div>

                }
                {!connected &&
                    <span>Connect Wallet</span>
                }

            </div>

            <div className={`dropdown-list ${showPanel ? 'open' : ''}`}>

               
                <div className="dropdown-list-item">
                    <span className="connect-wallet-balance mr-1">{utils.commify(balance.toFixed(2))}</span>
                    <span className="connect-wallet-smg">SMG</span>
                </div>
            
                <div className="dropdown-list-item" onClick={onHandleDisconnect}>Disconnect</div>
            </div>
        </div>
    );
}

export default ConnectWallet;