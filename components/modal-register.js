import React, {useState, useEffect} from 'react';
import { Form, Spinner } from 'react-bootstrap'
import { BigNumber, utils } from "ethers"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import useWeb3 from '../shared/hooks/useWeb3'
import useContracts from '../shared/hooks/useContracts'
import addresses from '../shared/addresses';
import Modal from './modal';
import {useRouter} from "next/router";
const _ = require('lodash');

const stageTitles = {
    "ready": "Ready to Register",
    "start": "Ready to Register",    
    "registering": "Ready to Register",
    "completed": "Registration Completed"
}

const ModalRegister = ({onClose = () => {}, ...props}) => {


    const { register,saleInfo, getCurrentRound,userToParticipation,participate,getAllocation,addressToRoundRegisteredFor,getUserInfo,bnbTokenPrice } = useContracts()
    const { walletAddress, waitForTransaction } = useWeb3()   

    const [stage, setStage] = useState("ready");
    const [modalTitle, setModalTitle] = useState(stageTitles["ready"])
    const [isAgree, setAgree] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [registeredRound, setRegisteredRound] = useState(0);
    const [allocation, setAllocation] = useState(null)
    const [valueTo, setValueTo] = useState(0)
    const [valueFrom, setValueFrom] = useState(0)
    const router = useRouter()
    useEffect(() => {
        setModalTitle(stageTitles[stage])
    }, [stage])
    
    useEffect(async () => {
        const info = await getUserInfo()
        if(info)
            setUserInfo(info)
    }, [getUserInfo])
    
    useEffect(async () => {
        setRegisteredRound(await addressToRoundRegisteredFor())
    }, [addressToRoundRegisteredFor])

    const gotoRegister = () => {
        if(!isAgree) return;

        setStage("start")
    }

    const registerToServer = (roundId, amount) => {
        return axios.post(
            "http://launchpad-api.smaugs.com:3000/api/Sales?access_token=UgtEdXYhEDVL8KgL84yyzsJmdxuw2mTLB9F6tGXKCCUh4Av6uBZnmiAqjoYZQBlS", 
            {
                roundId: roundId,
                saleId: props.pool.id,
                projectName: props.pool.name,
                amount: amount,
                walletAddress: walletAddress
            }
        )
    }

    useEffect(async () => {
        const info = await getUserInfo()
        const registeredRound = await addressToRoundRegisteredFor()

      console.log("status",registeredRound)

       
        if (registeredRound) {
            setRegisteredRound(registeredRound)
        }
  
      
   
        if(info){
            setUserInfo(info)
            

           
        if(info?.amount > 0) {

                    if (info?.amount > 1 && info?.amount <= 999) {
                        if (info?.amount > 1 && info?.amount <= 200) {
                            setAllocation(info?.amount * 0.13 + info?.amount / 100 )
                            setValueTo(info?.amount * 0.13 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.13 + info?.amount)
                        }   
                        if (info?.amount > 200 && info?.amount <= 300) {
                            setAllocation(info?.amount * 0.13 + info?.amount / 100)
                            setValueTo(info?.amount * 0.13 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.13 + info?.amount)
    
                        } 
                        if (info?.amount > 300 && info?.amount <= 400) {
                            setAllocation(info?.amount * 0.13 + info?.amount / 100)
                            setValueTo(info?.amount * 0.13 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.13 + info?.amount)
    
                        }   
                        if (info?.amount > 400 && info?.amount <= 600) {
                            setAllocation(info?.amount * 0.13 + info?.amount / 100)
                            setValueTo(info?.amount * 0.13 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.13 + info?.amount)
                        }   
                        if (info?.amount > 600 && info?.amount <= 800) {
                            setAllocation(info?.amount * 0.13 + info?.amount / 100 )
                            setValueTo(info?.amount * 0.13 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.13 + info?.amount)
                        }   
                        if (info?.amount > 800 && info?.amount <= 999) {
                            setAllocation(info?.amount * 0.13  + info?.amount / 100)
                            setValueTo(info?.amount * 0.13 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.13 + info?.amount)
                        }   
                    }
    
    

                    if (info?.amount > 999 && info?.amount <= 10000) {
                        if (info?.amount > 999 && info?.amount <= 2000) {
                            setAllocation(info?.amount * 0.129 + info?.amount / 100)
                            setValueTo(info?.amount * 0.129 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.129 + info?.amount)
                        }   
                        if (info?.amount > 2000 && info?.amount <= 3000) {
                            setAllocation(info?.amount * 0.128 + info?.amount / 100 )
                            setValueTo(info?.amount * 0.128 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.128 + info?.amount)
    
                        }   
                        if (info?.amount > 3000 && info?.amount <= 4000) {
                            setAllocation(info?.amount * 0.127 + info?.amount / 100)
                            setValueTo(info?.amount * 0.127 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.127 + info?.amount)
                        }   
                        if (info?.amount > 4000 && info?.amount <= 5000) {
                            setAllocation(info?.amount * 0.125 + info?.amount  / 100)
                            setValueTo(info?.amount * 0.125 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.125 + info?.amount)
                        }   
                        if (info?.amount > 5000 && info?.amount <= 6000) {
                            setAllocation(info?.amount * 0.124 + info?.amount / 100)
                            setValueTo(info?.amount * 0.124 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.124 + info?.amount)
                        }   
                        if (info?.amount > 6000 && info?.amount <= 7000) {
                            setAllocation(info?.amount * 0.123 +  info?.amount / 100)
                            setValueTo(info?.amount * 0.123  + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.123 + info?.amount)
                        }   
    
                        if (info?.amount > 7000 && info?.amount <= 8000) {
                            setAllocation(info?.amount * 0.122 + info?.amount / 100 )
                            setValueTo(info?.amount * 0.122 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.122 + info?.amount)
                        }   
    
    
                        if (info?.amount > 8000 && info?.amount <= 9000) {
                            setAllocation(info?.amount * 0.121 + info?.amount / 100)
                            setValueTo(info?.amount * 0.121 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.121 + info?.amount)
                        }  
    
                        if (info?.amount > 9000 && info?.amount <= 10000) {
                            setAllocation(info?.amount * 0.12 + info?.amount / 100)
                            setValueTo(info?.amount * 0.12 + info?.amount / 100)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.12 + info?.amount)
                        }  
                    }
    
                    if (info?.amount > 10000 && info?.amount <= 20000) {
                        if (info?.amount > 10000 && info?.amount <= 11000) {
                            setAllocation(info?.amount * 0.119 + info?.amount / 500 )
                            setValueTo(info?.amount * 0.119 + info?.amount / 500)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.119 + info?.amount)
                        }   
                        if (info?.amount > 11000 && info?.amount <= 12000) {
                            setAllocation(info?.amount *0.118 +  info?.amount / 1000 )
                            setValueTo(info?.amount * 0.118 + info?.amount / 1000)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.118 + info?.amount)
    
                        }   
                        if (info?.amount > 12000 && info?.amount <= 13000) {
                            setAllocation(info?.amount * 0.117 + info?.amount / 1000)
                            setValueTo(info?.amount * 0.117 + info?.amount / 1000)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.117 + info?.amount)
                        }   
                        if (info?.amount > 13000 && info?.amount <= 14000) {
                            setAllocation(info?.amount * 0.116 + info?.amount / 1000 )
                            setValueTo(info?.amount * 0.116 + info?.amount / 1000)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.116 + info?.amount)
                        }   
                        if (info?.amount > 14000 && info?.amount <= 15000) {
                            setAllocation(info?.amount * 0.115 + info?.amount / 1000 )
                            setValueTo(info?.amount * 0.115 + info?.amount / 1000)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.115 + info?.amount)
                        }   
                        if (info?.amount > 15000 && info?.amount <= 16000) {
                            setAllocation(info?.amount * 0.114 + info?.amount / 1000)
                            setValueTo(info?.amount * 0.114 + info?.amount / 1000)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.114 + info?.amount)
                        }   
    
                        if (info?.amount > 16000 && info?.amount <= 17000) {
                            setAllocation(info?.amount * 0.113  + info?.amount / 1000)
                            setValueTo(info?.amount * 0.113 + info?.amount / 1000)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.113 + info?.amount)
                        }   
    
    
                        if (info?.amount > 17000 && info?.amount <= 18000) {
                            setAllocation(info?.amount * 0.111 + info?.amount / 1000 )
                            setValueTo(info?.amount * 0.111 + info?.amount / 1000)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.111+ info?.amount)
                        }  
    
                        if (info?.amount > 18000 && info?.amount <= 19000) {
                            setAllocation(info?.amount * 0.11 + info?.amount / 1000)
                            setValueTo(info?.amount * 0.11 + info?.amount / 1000)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.11 + info?.amount)
                        }  
                        if (info?.amount > 19000 && info?.amount <= 20000) {
                            setAllocation(info?.amount * 0.109 + info?.amount / 1000)
                            setValueTo(info?.amount * 0.109+ info?.amount / 1000)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.109 + info?.amount)
                        }  
                    }
    
                    if (info?.amount > 20000 && info?.amount <= 40000) {
                        if (info?.amount > 20000 && info?.amount <= 21000) {
                            setAllocation(info?.amount * 0.106 )
                            setValueTo(info?.amount * 0.106)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.106)
                        }   
                        if (info?.amount > 21000 && info?.amount <= 32000) {
                            setAllocation(info?.amount * 0.104)
                            setValueTo(info?.amount * 0.104)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.104)
    
                        }   
                        if (info?.amount > 32000 && info?.amount <= 33000) {
                            setAllocation(info?.amount * 0.102 )
                            setValueTo(info?.amount * 0.102)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.102)
                        }   
                        if (info?.amount > 33000 && info?.amount <= 34000) {
                            setAllocation(info?.amount * 0.101)
                            setValueTo(info?.amount * 0.101)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.101)
                        }   
                        if (info?.amount > 34000 && info?.amount <= 35000) {
                            setAllocation(info?.amount * 0.10)
                            setValueTo(info?.amount * 0.10)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.10)
                        }   
                        if (info?.amount > 35000 && info?.amount <= 36000) {
                            setAllocation(info?.amount * 0.099 )
                            setValueTo(info?.amount * 0.099)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.099)
                        }   
    
                        if (info?.amount > 36000 && info?.amount <= 37000) {
                            setAllocation(info?.amount * 0.097 )
                            setValueTo(info?.amount * 0.097)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.097)
                        }   
    
    
                        if (info?.amount > 37000 && info?.amount <= 38000) {
                            setAllocation(info?.amount * 0.096)
                            setValueTo(info?.amount * 0.096)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.096)
                        }  
    
                        if (info?.amount > 38000 && info?.amount <= 39000) {
                            setAllocation(info?.amount * 0.095 )
                            setValueTo(info?.amount * 0.095)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.095)
                        }  
                        if (info?.amount > 39000 && info?.amount <= 40000) {
                            setAllocation(info?.amount * 0.092 )
                            setValueTo(info?.amount * 0.092)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.092)
                        }  
                    }
    
                    if (info?.amount > 40000 && info?.amount <= 60000) {
                        if (info?.amount > 40000 && info?.amount <= 41000) {
                            setAllocation(info?.amount * 0.088)
                            setValueTo(info?.amount * 0.088)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.088)
                        }   
                        if (info?.amount > 41000 && info?.amount <= 45000) {
                            setAllocation(info?.amount * 0.086 )
                            setValueTo(info?.amount * 0.086)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.086)
    
                        }   
                        if (info?.amount > 45000 && info?.amount <= 50000) {
                            setAllocation(info?.amount * 0.084 )
                            setValueTo(info?.amount * 0.084)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.084)
                        }   
                        if (info?.amount > 50000 && info?.amount <= 60000) {
                            setAllocation(info?.amount * 0.081 )
                            setValueTo(info?.amount * 0.081)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.081)
                        }   
                       
                    }
    
                    if (info?.amount > 60000 && info?.amount <= 80000) {
                        if (info?.amount > 60000 && info?.amount <= 61000) {
                            setAllocation(info?.amount * 0.07 )
                            setValueTo(info?.amount * 0.07)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.07)
                        }   
                        if (info?.amount > 61000 && info?.amount <= 65000) {
                            setAllocation(info?.amount * 0.067)
                            setValueTo(info?.amount *0.067)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.067)
    
                        }   
                        if (info?.amount > 65000 && info?.amount <= 70000) {
                            setAllocation(info?.amount * 0.06 )
                            setValueTo(info?.amount * 0.06)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.06)
                        }   
                        if (info?.amount > 70000 && info?.amount <= 80000) {
                            setAllocation(info?.amount * 0.058 )
                            setValueTo(info?.amount * 0.058)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.058)
                        }   
                       
                    }
    
                    if (info?.amount > 80000 && info?.amount <= 100000) {
                        if (info?.amount > 80000 && info?.amount <= 81000) {
                            setAllocation(info?.amount * 0.056 )
                            setValueTo(info?.amount * 0.056)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.056)
                        }   
                        if (info?.amount > 81000 && info?.amount <= 85000) {
                            setAllocation(info?.amount * 0.052)
                            setValueTo(info?.amount * 0.052)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.052)
    
                        }   
                        if (info?.amount > 85000 && info?.amount <= 90000) {
                            setAllocation(info?.amount * 0.0482)
                            setValueTo(info?.amount * 0.0482)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.0482)
                        }   
                        if (info?.amount > 90000 && info?.amount <= 100000) {
                            setAllocation(info?.amount * 0.0475 )
                            setValueTo(info?.amount * 0.0475)
                            setValueFrom(bnbTokenPrice * info?.amount * 0.0475)
                        }   
                       
                    }
    
                    
                    if (info?.amount > 100000) {
                            setAllocation(4800)
                            setValueTo(4800)
                            setValueFrom(4800)
                    }   
                       
                    



                    if (info?.amount > 160000) {
                      
                            setAllocation(5000)
                            setValueTo(5000)
                            setValueFrom(5000)
                          
                       
                    }

                
    
    
    
    
                  
                }
        }
          
          else if(registeredRound == 1){
                
                    setAllocation(140)
                    setValueTo(140)
                    setValueFrom(140)
                
            }

            else{
         
                NotificationManager.error("Failed to buy");
            } 

    
           
    
       
 
            
    }, [getUserInfo])

    
    const gotoPublic = () => {
        setStage("registering")
        register(1).then((result) => {
            if(result?.hash) {
                waitForTransaction(result.hash, 2000)
                .then(() => { 
                    registerToServer(1, 0).then((resultFromServer) => {
                        NotificationManager.success("Success to register");
                        router.reload()
                        setStage("completed")
                        
                    }).catch((e) => {
                        NotificationManager.error("Failed to register server");
                        setStage("completed")
                    })
                })
                .catch((error) => { 
                    console.error();
                    console.log("test",e)
                    NotificationManager.error("Failed to register");
                    setStage("start")
                })
            } else {
                console.error();
                NotificationManager.error("Failed to register");
                setStage("start")
            }
        })
    }
    
    const gotoStaking = () => {
        if(userInfo?.amount) {
            setStage("registering")
            register(2).then((result) => {
                if(result?.hash) {
                    waitForTransaction(result.hash, 2000)
                    .then(() => { 
                        registerToServer(2, userInfo.amount).then((resultFromServer) => {
                            NotificationManager.success("Success to register");
                            router.reload();
                            setStage("completed")
                            
                        })
                    })
                    .catch((e) => { 
                        NotificationManager.error("Failed to register");
                        console.log("test",e)
                        setStage("start")
                    })
                } else {
                    NotificationManager.error("Failed to register");
                    setStage("start")
                }
            })
        }
    }

    return (
        <Modal title={modalTitle} show={true} onClose={onClose} {...props} className="v-application">
            {(stage === "ready" || stage === "start" || stage === "registering" ) &&
            <div>
                <div className="v-sheet v-sheet--outlined theme--dark rounded-xl p-3 mt-3"
                    style={{'backgroundColor': 'transparent', 'cursor': 'default'}}>

                    <h5 className="text-center">Important Information</h5>
                    <div className="mt-3">
                        <strong style={{"color":"red", "fontSize":"15px"}}>0.01 BNB</strong> fee is required to reserve your guarenteed allocation.<br/>
                        This fee will be refunded to you after you purchase your allocation during the sale.<br/>
                        If you do not purchase your allocation during the sale window, this fee will not be refunded.
                    </div>
                </div>
                {stage === "ready" &&
                    <div className="text-center mt-3">
                        <Form.Check
                            checked={isAgree} 
                            type="checkbox" 
                            className="mb-3" 
                            label="I have read and understand the above information"
                            onChange={(e) => setAgree(e.target.checked) } 
                        />
                        <div className={`btn v-btn--rounded btn-primary ${isAgree ? '' : 'btn-disabled'}`} onClick={gotoRegister}>Process with Registration</div>
                    </div>
                }
                {stage === "start" && 
                    <div className="text-center mt-3">
                        <div className="pool-register-subpanel p-3 mb-3">
                            <div className={`btn btn-block v-btn--rounded btn-primary ${registeredRound > 0 ? 'disabled' : ''}`} onClick={gotoPublic}>Public</div>
                            <div className="text-desc mt-3">
                                {registeredRound === 0 &&

                                <div>

                                <span style={{"color":"red", "fontSize":"20px"}}>Max Approximate Allocation: <strong>{150} CSF</strong> <br></br></span>
                                <span>Did not register yet.</span>

                                </div>
                                
                                }
                                {registeredRound === 1 && 
                                    <span>You have already registered in Public</span>
                                }
                                {registeredRound === 2 &&
                                    <span>You have already registered in Stake</span>
                                }
                            </div>
                        </div>

                        <div className="pool-register-subpanel p-3">
                            <div className={`btn btn-block v-btn--rounded btn-primary ${userInfo?.amount > 0 ? '' : 'disabled'}`} onClick={gotoStaking}>Staking</div>
                            <div className="text-desc mt-3">
                                {registeredRound === 0 && 
                                    userInfo?.amount > 0 ? (
                                        <div>
                                        <span style={{"color":"red", "fontSize":"20px"}}>Max Approximate Allocation: <strong>{allocation} CSF</strong> <br></br> </span>
                                        <span>The amount you currently stake ({userInfo?.amount.toFixed(2)}) will be locked until the sale ends!</span>
                                        </div>
                                    ) : (
                                        <div>
                                        <span style={{"color":"red", "fontSize":"20px"}}>Max Approximate Allocation: <strong>{allocation} CSF</strong> <br></br></span>
                                        <span>You haven't staked any amount!</span>
                                        </div>
                                    )
                                }
                                {registeredRound === 1 && 
                                    <span>You have already registered in Public</span>
                                }
                                {registeredRound === 2 &&
                                    <span>You have already registered in Stake</span>
                                }
                            </div>
                        </div>
                    </div>
                }
                {stage === "registering" && 
                    <div className="text-center mt-3">
                        <Spinner animation="border" size="sm" />
                        <div className="mt-3">
                            Registering for the round...Please, wait.
                        </div>
                    </div>
                }
            </div>
            }
            {stage === "completed" &&
            <div>
                <div className="text-center">
                    Congratulations! You have successfully registered. <br/>
                    Check <b>Your Allocations</b> tab for more information!
                </div>
            </div>
            }
            {stage === "failed" &&
            <div>
                <div className="text-center">
                    Failed to register. <br/>
                </div>
            </div>
            }
        </Modal>
    );
}

export default ModalRegister;