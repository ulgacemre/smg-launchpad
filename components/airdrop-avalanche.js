
import { Button, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { airdrops } from "../shared/data"
import Card from "../components/card"
import useWeb3 from '../shared/hooks/useWeb3'
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from 'react-bootstrap/Spinner'
import ConnectWallet from "./connect-wallet"
import { BigNumber, utils,Contract } from "ethers"
import useContracts from '../shared/hooks/useContracts'
import abis from '../shared/abis'
import addresses from '../shared/addresses';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default function AirDropAva({data}) {
    const { connected, walletAddress, handleConnect, handleDisconnect,handleConnectAvalanche,switchNetwork,wallet, chainId,waitForTransaction } = useWeb3()
        const { getTotalStaked2, compound,getPoolInfo,claim,claimAirdrop,getAmount,getAmountAva,getUserInfo,getClaimStatusAva,claimAirdropAva, getClaimStatus,getTokenPerBlock,getRewardPerYear,approveNewStake, getPending, smgTokenPrice } = useContracts()
        const [camount, setPoolAmount] = useState(0)
        const [status, setStatus] = useState(0)
        const [contract, setContract] = useState(new Contract(data.address, abis.Airdrop))  
        const [contractAva, setContractAva] = useState(new Contract(data.address, abis.AirdropAva))  
        
   
        useEffect(() => {

           
            if (!!wallet && !contractAva.signer) {
                setContractAva(contractAva.connect(wallet))
            }
     
            
     
        }, [wallet])
    


    const handleConnectButton = () => {
        
        if(!connected) 
        handleConnectAvalanche();
    }


    const onClickAction = async (address,decimal) => {
        if(!connected)
        handleConnectAvalanche();
        else{
                var a = await getAmountAva(contractAva,decimal);
                var status = await getClaimStatusAva(contractAva);
                
                if (a) {
                    setPoolAmount(a)
                   
                }

              
                if (status) {
                    
                    setStatus(status)
                }        
       
    }

       
    }


    const handleClaim = async (decimal,address) => {

        console.log("decimal",decimal);

         
        const bigAmount = utils.parseUnits(camount.toString(), decimal)
            claimAirdropAva(contractAva,bigAmount).then(async (result) => {
                waitForTransaction(result.hash, 1000)
                .then(() => { 
                        NotificationManager.success("Success to claim");
                        onClickAction(address,decimal)
                        
                })
                .catch(() => { 
                        NotificationManager.error("Failed to claim");
                       
                })
            }).catch((err) => {
              
                NotificationManager.error(err.data ? err.data.message : err.message, 'Failed to claim');
                
            })
       
        }

    return (


     <Card key={`airdrop-${data.address}`} className="p-3">
         <div className="d-flex align-items-center mb-3">
             <img src={data.icon} width="50px" />
             <div className="ms-2">
                 <h5 className="mb-0 ml-2">{data.title}</h5>
                 <div className="text-small text-desc ml-2">
                     {`${data.symbol}`}
                 </div>
             </div>
         </div>
         <div className="panel mb-4 mt-4">
             <div className="mb-3">
                 {data.description} <br></br> <a href={data.url} style={{"color":"#027ff4"}}>Check your allocation</a>
             </div>

             <div className="panel">
                 <h5 className="mb-1">Total {data.symbol} Claimable</h5>
                 <h5>
                     {camount} <span className="text-small text-desc">${data.symbol}</span>
                 </h5>
             </div>
         </div>
         
         <Button variant="primary" onClick={() => onClickAction(data.address,data.decimal)}>
            
             {connected ? 'Check Claimable' : 'Connect Wallet'}

        
         </Button>

         {!connected ? (
                         <Button  className="d-inline-block ml-2 align-items-center justify-content-between" variant="primary" onClick={handleConnectButton}>
                             Connect Wallet
                             </Button>
                     ) : chainId !== addresses.networkAvaID ? 
                     ( 
                         <div className="btn btn-block v-btn--rounded mt-4 btn-primary" onClick={() => switchNetwork(addresses.networkAvaID)}>Switch To Avalanche MainNet</div>

                     ) : ( camount > 0 && status == false ? (
                        
                             <Button  className="d-inline-block ml-2 align-items-center justify-content-between" variant="primary" onClick={() => handleClaim(data.decimal,data.address)}>
                            Claim Now
                             </Button>
                              
                           
                        
                     ) : status == true ? (
                        
                         <Button  className="d-inline-block ml-2 align-items-center justify-content-between" variant="primary" disabled>
                        Claimed
                         </Button>
                          
                       
                    
                 ) : (
                         <Button  className="d-inline-block ml-2 align-items-center justify-content-between" variant="primary" disabled>
                         Not Eligible
                         </Button>
                     ))}



     </Card>


    );
  }
