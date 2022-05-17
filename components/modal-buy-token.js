import React, {useState, useEffect} from 'react';
import { Form, Spinner } from 'react-bootstrap'
import { BigNumber, utils } from "ethers"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import { Row, Col, ProgressBar,Button } from 'react-bootstrap'
import useWeb3 from '../shared/hooks/useWeb3'
import useContracts from '../shared/hooks/useContracts'
import addresses from '../shared/addresses';
import Solana from './sol-address';

import InputMax from './input-max';
import abis from '../shared/abis'
import Modal from './modal';
import {useRouter} from "next/router";
import { time2str } from '../utils'
import { Contract,ethers } from 'ethers'
const _ = require('lodash');

const stageTitles = {
    "buy": "Buy Tokens",
    "completed": "Token allocation Completed",
    "error":"Failed to buy, Try again"
}

const ModalBuyToken = ({onClose = () => {}, ...props}) => {

    const { saleInfo, getCurrentRound,userToParticipation,participate,getBalance,myTier,depositedAmount,depositedAmount2,depositedAmount3,getCurrentRoundId,buy,getAllocation,addressToRoundRegisteredFor,getUserInfo,getBusdBalance } = useContracts()
    const { connected, wallet, walletAddress, chainId, switchNetwork, handleConnect, waitForTransaction } = useWeb3()


    const [idoContract, setIDOContract] = useState(new Contract(props.pool.contract,abis.NewIDO))  

    const [poolInfo, setPoolInfo] = useState(null)
    const [allocation, setAllocation] = useState(null)
    const [busd, setBusd] = useState(null)
    const [smg, setSMG] = useState(null)
    const [currentRound, setCurrentRound] = useState(null)
    const [stage, setStage] = useState("buy");
    const [isPending, setPending] = useState(false)
    const [modalTitle, setModalTitle] = useState(stageTitles["buy"])
    const [userInfo, setUserInfo] = useState(0)
    const [valueFrom, setValueFrom] = useState(0)
    const [valueTo, setValueTo] = useState(0)
    const [bnb, setBnb] = useState(0)
    const router = useRouter()
    const [registeredRound, setRegisteredRound] = useState(false)

    const [solana, setSolana] = useState("")
    const [add, setSolanaAdd] = useState("")






    const handleUpdate = async() => {
        const res = await axios.get("https://xcji-njzb-qhcr.n7.xano.io/api:7sSxsvxy/linksol?walletaddress="+walletAddress);

      

        if (res.data[0]) {
           
                setSolanaAdd(res.data[0].solanaaddress)
          
           
        }
        else{
            setSolanaAdd("")
        }

       
       
    }
   


    const reset2 = async () => {
 
      
        setSolana("")
      
       
    
    }





    const save = async () => {
      
        if (walletAddress) {
            
          

        if (add) {
            const res = await axios.get("https://xcji-njzb-qhcr.n7.xano.io/api:7sSxsvxy/linksol?walletaddress="+walletAddress);


           
            const addr = { bscaddress: walletAddress, solanaaddress: solana };
            const response = await axios.post('https://xcji-njzb-qhcr.n7.xano.io/api:7sSxsvxy/linksol/'+res.data[0].id, addr);
            
           
            
            if (response.status == 200) {
                NotificationManager.success("Updated");
               
                return
               
              
               
            }
           
           
        
           
         
         


        }
        else{
            const addr = { bscaddress: walletAddress, solanaaddress: solana };
            const response = await axios.post('https://xcji-njzb-qhcr.n7.xano.io/api:7sSxsvxy/linksol', addr);

            


            if (response.status == 200) {
                NotificationManager.success("Success to save");
               
               return
               
               
            }
           
           

           
        }

    }
    else{
        NotificationManager.warning("Connect your wallet");
        return

    }

     
    
    }

    useEffect(() => {

     

        setModalTitle(stageTitles[stage])

      

        
    }, [stage])


    useEffect(() => {

        if (!!wallet && !idoContract.signer) {
            setIDOContract(idoContract.connect(wallet))
        }
       

     
       

    }, [wallet])



  
    useEffect(() => {
       
       
        getCurrentRoundId(idoContract).then((result) => {

            if(result) {
                setCurrentRound(result.toNumber())
            }

        })

        
    }, [currentRound])


    useEffect(async () => {
        const busd = await getBusdBalance()
        const smgBalance = await getBalance()

        if (props?.maxAlloc) {
            setValueTo(props.maxAlloc)
        }

        if (smgBalance) {
            setSMG(smgBalance)
        }
       
 
        
      
        if (busd) {
            setBusd(busd)
        }
      
       
        
    }, [getBusdBalance])
  
    const buyToken = (valueTo) => {
        setPending(true)

       
        

        if (props.currentRound == 6 && parseInt(depositedAmount * 1.25) + parseInt(depositedAmount2 * 2.4) + parseInt(depositedAmount3 * 25000000 * 4) < 1000) {
            NotificationManager.error("You are required to have 1000 Points for the FCFS round.");
            setPending(false)
            return
        }

        
        if (parseInt(valueTo) > parseInt(props.maxAlloc)) {
            NotificationManager.error("You cannot buy more than the max limit.");
            setPending(false)
            return
            
        }


        if (parseInt(valueTo + props.funderInfo) < parseInt(props.maxAlloc) * 10 / 100) {
            NotificationManager.error("You must buy min 10% of the allocation");
            setPending(false)
            return
            
        }
   
    

        buy(valueTo.toString(),idoContract).then(async (result) => {
            waitForTransaction(result.hash, 1000)
            .then(() => { 
                    NotificationManager.success("Success to buy");
                    checkAllowedAmount()
                    setPending(false)
            })
            .catch(() => { 
                    NotificationManager.error("Failed to buy");
                    setPending(false)
            })
        }).catch((err) => {
            setPending(false)
            NotificationManager.error(err.data ? err.data.message : err.message, 'Failed to buy');
        })

 
       
    
    }


    const gotoPublic = (valueTo) => {
        setStage("Buying")
        

        if (parseInt(valueTo) > parseInt(allocation)) {
            NotificationManager.error("You cannot buy more than the max limit.");
            setStage("error")
            return
        }


        if (parseInt(valueTo) <= parseInt(allocation) * 10 / 100) {
            NotificationManager.error("You must buy min 10% of the allocation");
            setStage("error")
            return
        }

      

        if(props.registeredRound !== 1){
            NotificationManager.error("You have not registered for this round");
            setStage("error")   
            return
            
        } 

            participate(1,valueTo,allocation).then((result) => {
              
                        NotificationManager.success("You have successfully buy tokens");
                        router.reload();
                        setStage("completed")
                    
            }) .catch((e) => { 
                console.log("error",e)
                NotificationManager.error("Failed to harvest");
                setPending(false)
            })
       
    
    }

    const gotoStake= (valueTo) => {
        setStage("Buying")

  
     //console.log(utils.commify(userInfo?.amount))
     if (parseInt(valueTo) > parseInt(allocation)) {
        NotificationManager.error("You cannot buy more than the max limit.");
        setStage("error")
        return
    }

    if (parseInt(valueTo) <= parseInt(allocation) * 10 / 100) {
        NotificationManager.error("You must buy min 10% of the allocation");
        setStage("error")
        return
    }



    if(props.registeredRound !== 2){
        NotificationManager.error("You have not registered for this round");
        setStage("error")
        return
        
    } 
  
        participate(2,valueTo,allocation).then((result) => {

           
            
            if(result?.hash) {
                waitForTransaction(result.hash, 2000)
                .then(() => { 

                    NotificationManager.success("You have successfully buy tokens");
                    router.reload();
                    setStage("completed")
                    
                })
                .catch((error) => { 
                    console.error();
                    
                    NotificationManager.error("Failed to buy staking pool");
                    setStage("error")
                   
                })
            } else {
                console.error();
                NotificationManager.error("Failed to buy");
                setStage("error")
              
            }
        })
  
    }

    return (

        
        <Modal title={modalTitle} show={true} onClose={onClose} {...props} className="v-application">
            
            {stage === "buy" &&
            <div>
                <div className="v-sheet v-sheet--outlined theme--dark rounded-xl p-3 mt-3"
                    style={{'backgroundColor': 'transparent', 'cursor': 'default'}}>
                                        In some case token distribution will be later, make sure you read the tokenomics
                </div>
              

                <div className="mt-3">
                    <div>


                    <NotificationContainer/>

                        <div className="py-2">From</div>
                      
                        <InputMax value={valueTo} currency="BUSD" className="py-2" max={props?.maxAlloc} onChange={(val) => setValueTo(val)}/>
                        <div className="text-gray">Balance: {busd?.toFixed(2)} BUSD</div>
                    </div>
                    <div>
                        <div className="py-2">
                            To
                        </div>
                        <input type="text" value={valueTo / props.pool?.tokenPrice } className="form-control v-input" style={{'fontSize': '1rem'}}/>

                        <div className="text-gray">Max Allocation: {props.maxAlloc /props.pool?.tokenPrice } {props.pool?.tokenInfo.symbol}</div> 
                       
                    </div>                    
                </div>
                <div className="v-sheet v-sheet--outlined theme--dark rounded-xl p-3 mt-3"
                    style={{'backgroundColor': 'transparent', 'cursor': 'default'}}>
               
                    <div className="d-flex justify-content-between">
                    <strong style={{"fontSize":"18px"}}>Your Allocation Round:</strong> <strong style={{"color":"red","fontSize":"18px"}}>{props?.tier > 0 && props?.tier <= 4 ? "Staking" : ""} {props?.tier == 5 ? "Whitelist" : ""} {props?.tier == 6 ? "FCFS" : ""} </strong>
                       
                    </div>
                    <div className="d-flex justify-content-between">
                    <strong style={{"fontSize":"18px"}}>Active Round:</strong> <strong style={{"color":"red","fontSize":"18px"}}>{props?.currentRound <= 4 ? "Staking" : ""} {props?.currentRound == 5 ? "Whitelist" : ""} {props?.currentRound == 6 ? "FCFS" : ""} </strong>
                       
                    </div>
                 
                                    
                </div>


                {(  props.tier <= 4) ? (

<Button className={`btn btn-block v-btn--rounded btn-primary mt-3`} onClick={()=>buyToken(valueTo)} disabled={isPending}>
{isPending ? (
<Spinner animation="border" size="sm" />
):(
 <span>Buy Now</span>
)}
</Button>

) : (
    <Button variant="primary w-100"  disabled="true">
    {isPending ? (
    <Spinner animation="border" size="sm" />
    ):(
     <span>Buy Now</span>
    )}
    </Button>
)}

           
              
                <div className="mt-3 text-gray">
                You must buy min 10% of the allocation
                </div>
            </div>
            }

            {stage === "Buying" && 
                    <div className="text-center mt-3">
                        <Spinner animation="border" size="sm" />
                        <div className="mt-3">
                            Buying for the round...Please, wait.
                        </div>
                    </div>
                }

         
                    {stage === "start" && 
                    <div className="text-center mt-3">
                        <Spinner animation="border" size="sm" />
                        <div className="mt-3">
                            Try again...
                        </div>
                    </div>
                }
            {stage === "completed" &&
            <div>
                <div className="text-center">
                    Congratulations! You have successfully joined the sale round. <br/>
                    Check <b>Your Allocations</b> tab for more information!
                </div>
            </div>
            }
        </Modal>
    );
}

export default ModalBuyToken;