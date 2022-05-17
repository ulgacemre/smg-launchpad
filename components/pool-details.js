import React, {useState, useCallback, useEffect} from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap'
import ModalRegister from "../components/modal-register"
import ModalBuyToken from "../components/modal-buy-token"
import Stepper from './stepper';
import axios from 'axios';
import { ethers,BigNumber } from 'ethers'
import useWeb3 from '../shared/hooks/useWeb3'
import useContracts from '../shared/hooks/useContracts'
import { utils } from "ethers"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { date2normal, time2str } from '../utils'
import { poolList } from '../shared/poollist';
import { secondsToDHM, shortAmount, shortWalletAddr } from '../utils'
import AboutSmaugs from './about-smaugs';
import {useRouter} from "next/router";
import imgAlert from "../assets/img/alert.png"
import imgDone from "../assets/img/alert.png"

const initialSteps = [
    { 
        title: 'Register Open',
        date:  new Date(),
    },
    { 
        title: 'Registration Closes',
        date:  new Date(),
    },
    { 
        title: 'Public Round',
        date:  new Date(),
    },
    { 
        title: 'Staking Round',
        date:  new Date(),
    },
    { 
        title: 'Sale Ends',
        date:  new Date(),
    }
]



const PoolDetails = ({poolId}) => {
    const { saleInfo, getCurrentRound, withdrawTokens,getRegistration,tokenPriceUSD,getBnbPrice,getVestingInfo,getParticipation,getNumberOfRegisteredUsers, roundIdToRound,kyc, smgTokenPrice,bnbTokenPrice, addressToRoundRegisteredFor } = useContracts()
    const { walletAddress,connected, waitForTransaction } = useWeb3()   
    const [steps, setSteps] = useState(initialSteps)
    const [numOfRegister, setNumOfRegister] = useState(0)
    const [maxParticipantsPublic, setMaxParticipantsPublic] = useState(0)
    const [maxParticipantsStake, setMaxParticipantsStake] = useState(0)
    const [remainingTime, setRemainingTime] = useState('')
    const [round, setRound] = useState(-1)
    const [currentRound, setCurrentRound] = useState(null)
    const [pool, setPool] = useState(null)
    const [allocations, setAllocations] = useState(null)
    const [participation, setParticipation] = useState(null)
    const [bnb, setBnb] = useState(0)
    const [poolInfo, setPoolInfo] = useState(null)
    const [progress, setProgress] = useState(0)
    const [currentTab, setCurrentTab] = useState('saleInfo')
    const [modalRegisterVisible, setModalRegisterVisible] = useState(false)
    const [modalBuyTokenVisible, setModalBuyTokenVisible] = useState(false)
    const [registeredRound, setRegisteredRound] = useState(false)
    const [, updateState] = React.useState();
    const router = useRouter()



  

    useEffect(() => {
        const pool_info = poolList.find(item => item.id === poolId)
        setPool( pool_info )
        if(pool_info) {
            let newSteps = [...steps]
            newSteps[0].date = new Date(pool_info.timeLine?.registrationTimeStarts * 1000)
            newSteps[1].date = new Date(pool_info.timeLine?.registrationTimeEnds * 1000)
            newSteps[2].date = new Date(pool_info.timeLine?.publicRound * 1000)
            newSteps[3].date = new Date(pool_info.timeLine?.stakingRound * 1000)
            newSteps[4].date = new Date(pool_info.timeLine?.saleEndTime * 1000)
            setSteps(newSteps)
        }
    }, [])

    useEffect(() => {
        getParticipation().then((result2) => {

            if (result2) {
                setParticipation(result2)
            }
           
         
            if (result2) {
                getVestingInfo().then((result)=> {
                   
                    if (result) {
                       
                        var arr = [];

                    for (var i = 0; i < result[0].length; i++) {
                        arr.push({
                            portionId: i,
                            vested:result[1][i].toNumber(),
                            amount: parseFloat(utils.formatUnits(result2[1], 18)) * bnb / 0.3,
                            date: result[0][i].toNumber(),
                            status:result2[4][i]
                        });
                    }   
                    setAllocations(arr)


                    }

                   
                })
                
            }
           
          
               
        })
    }, [saleInfo])

    useEffect( () => {
        getBnbPrice().then((result)=>{
            if(result) {
                setBnb(result)

                

            }

        })
    }, [saleInfo])



    useEffect( () => {
        

        getBnbPrice().then((result)=>{
            if(result) {
                setBnb(result)

             

            }

        })
       
      }, [])


     
      useEffect(async() => {
       
        saleInfo().then((result) => {
            if(result && result.isCreated) {

                
                setPoolInfo(result)
              
              
             
                
            }
        })
    }, [saleInfo])


    

    useEffect(async () => {
        const registeredRound = await addressToRoundRegisteredFor()
        const currentR = await getCurrentRound()
        const numOfRegister = await getNumberOfRegisteredUsers()
        const sale = await saleInfo()
      
     
        if (registeredRound) {
           
            setRegisteredRound(registeredRound)
        }
        if (currentR) {
            setCurrentRound(currentR.toNumber())
        }
        if (numOfRegister) {
            setNumOfRegister(numOfRegister.toNumber())
        }
        if(sale){
            setProgress((sale?.totalAVAXRaised * bnb * 100 / 150000).toFixed(2))
        }

      
       
       
        
    }, [addressToRoundRegisteredFor,getCurrentRound])
   
    useEffect(async () => {
        getCurrentRound().then((result) => {
            
            if(result) {
                const currentRound = result.toNumber();

               
             
                if(currentRound > 0) 
                    setRound(currentRound + 1);
                else {
                    const currentTime = new Date()
                    if( steps[0].date.getTime() > currentTime.getTime() ) {
                        setRound(-1)
                    } else {
                        if( steps[1].date.getTime() > currentTime.getTime() )
                            setRound(0);
                        else if( steps[2].date.getTime() > currentTime.getTime() )
                            setRound(1);
                        else if( steps[4].date.getTime() < currentTime.getTime() )
                            setRound(4);
                           
                    }
                }
            }
        })
    }, [])

    useEffect(async () => {
        const roundPublic = await roundIdToRound(1);
        const roundStake = await roundIdToRound(2);

        if(roundPublic !== null && roundStake !== null) {
            setMaxParticipantsPublic(roundPublic.maxParticipation)
            setMaxParticipantsStake(roundStake.maxParticipation)
        }
    }, [roundIdToRound])

    const handleRegister = () => {
        setModalRegisterVisible(true)
    }

    const handleBuyTokens = () => {        
        setModalBuyTokenVisible(true)
    }


    const claim = (portionId) => {

        withdrawTokens(portionId).then((result) => {

            if(result?.hash) {
            waitForTransaction(result.hash, 1000)
            .then(() => { 
                NotificationManager.success("Success to claim");
                router.reload()
            })
        }

        })

    }

    useEffect(
        () => {

           
            if(round < 4) {
                setRemainingTime(secondsToDHM(steps[round + 1].date - (new Date) ));
               
 
            } else
                setRemainingTime('Sale ended')
    }, [round, steps])


 

    return (
        <>
        <div className="section section-top-panel">
            <div className="container">
                {modalRegisterVisible &&
                    <ModalRegister onClose={() => setModalRegisterVisible(false)} pool={pool} />
                }
                {modalBuyTokenVisible &&
                    <ModalBuyToken onClose={() => setModalBuyTokenVisible(false)} registeredRound={registeredRound} round={getCurrentRound} bnbPrice={bnb} participation={participation} />
                }
                <Row className="gy-3">
                    <Col lg={6}>
                        <h2>{pool?.name}</h2>
                        <div className="mt-3">
                            {pool?.description}
                        </div>
                        <div className="mt-3">
                        {(round >= 0 ) &&
                            <Row className="gy-3">
                                <Col lg={4}>
                                { (registeredRound == 2 && participation[0]== 0) &&
                                    
                                    <div className="btn btn-block v-btn--rounded btn-primary" onClick={ handleBuyTokens}>
                                    Buy Tokens
                                </div>

                                  
                                }

                                           
                                </Col>
                         
                            </Row>
                            }
                        

                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="v-sheet v-sheet--outlined theme--dark rounded-xl p-4">
                            <div className="d-flex justify-content-between mb-3">
                                <div className="d-flex">
                                    <img src={pool?.img} className="pool-logo mr-3"/>
                                    <div>
                                        <div className="text-gray">{pool?.tokenInfo.name}</div>
                                        <h4>{pool?.tokenInfo.symbol}</h4>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray">Price</div>
                                    <h4>${pool?.tokenPrice}</h4>
                                    <h5 className="text-gray">{(0.3 / bnb ).toFixed(4)  || 0} BNB</h5>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <div className="text-gray">Round</div>
                                    <h4>{round >= 0 ? steps[round].title : "Not started"}</h4>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray">Time left</div>
                                    <h4 className="text-danger">{remainingTime}</h4>
                                </div>
                            </div>

                            <div className="mb-3">
                                <ProgressBar now={poolInfo?.totalAVAXRaised * bnb * 100 / 150000}/>
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="text-gray">
                                        {(poolInfo?.totalAVAXRaised * bnb * 100 / 150000).toFixed(2)} %
                                    </div>
                                    <div className="text-gray">
                                        {shortAmount(poolInfo?.totalAVAXRaised * bnb / 0.3)}/{shortAmount(poolInfo?.amountOfTokensToSell)}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <div className="text-gray">Token Distribution</div>
                                    <h4>{shortAmount(poolInfo?.amountOfTokensToSell)}</h4>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray">Total Raised</div>
                                    <h4>${poolInfo?.totalTokensSold != undefined ? (poolInfo?.totalAVAXRaised * bnb).toFixed(2) : "0"}</h4>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>        
        <div className="section">
            <div className="container">
                <div className="pool-stepper-container py-5">
                    <Stepper step={round} data={steps} className="pool-stepper" />
                </div>
                <div className="my-5">
                    <div className="pool-tabs d-flex flex-column flex-md-row">
                        <div className={`pool-tabs-tab ${currentTab === 'saleInfo' ? 'selected' : ''}`} onClick={() => setCurrentTab('saleInfo')}>Sale Info</div>
                        <div className={`pool-tabs-tab ${currentTab === 'tokenInfo' ? 'selected' : ''}`} onClick={() => setCurrentTab('tokenInfo')}>Token Info</div>
                        <div className={`pool-tabs-tab ${currentTab === 'about' ? 'selected' : ''}`} onClick={() => setCurrentTab('about')}>About the project</div>
                        <div className={`pool-tabs-tab ${currentTab === 'allocations' ? 'selected' : ''}`} onClick={() => setCurrentTab('allocations')}>Your Allocations</div>
                    </div>
                    <div className="pool-tab-panel">
                        {currentTab === "saleInfo" &&
                            <div className="">
                                <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                    <div className="text-gray">Project website</div>
                                    <a href={pool?.saleInfo.website} target="_blank">{pool?.saleInfo.website}</a>
                                </div>
                                <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                    <div className="text-gray">Number of Registrations</div>
                                    <div>{numOfRegister}</div>
                                </div>
                                <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                    <div className="text-gray">Vesting</div>
                                    <div>{pool?.vesting}</div>
                                </div>
                                <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                    <div className="text-gray">TGE</div>
                                    <div>{pool?.tge}</div>
                                </div>
                            </div>
                        }
                        {currentTab === "tokenInfo" &&
                        <div className="">
                            <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                <div className="text-gray">Token Name</div>
                                <div>{pool?.tokenInfo.name}</div>
                            </div>
                            <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                <div className="text-gray">Token Symbol</div>
                                <div>{pool?.tokenInfo.symbol}</div>
                            </div>
                            <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                <div className="text-gray">Token Decimals</div>
                                <div>{pool?.tokenInfo.decimals}</div>
                            </div>
                            <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                <div className="text-gray">Total Supply</div>
                                <div>{utils.commify(pool?.tokenInfo.supply)}</div>
                            </div>
                            <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                <div className="text-gray">Token Address</div>
                                <div>{shortWalletAddr(pool?.tokenInfo.address)}</div>
                            </div>
                        </div>
                        }
                        {currentTab === "about" &&
                            <AboutSmaugs info={pool} />
                        }
                        {currentTab === "allocations" &&
                        <>  {connected === true ?
                            <div className="text-center">
                             

                            

                                
                           
                             {parseFloat(utils.formatUnits(participation===null ||   participation[0]))===0   ?   <div><div> <img className="my-3" src={imgAlert} /></div><div> Unfortunately, you don't have any allocations for this sale.</div> </div>
                                :
                                <div className="table-wrapper">

                                    <div><div></div><div> Congrat, you have <strong>{parseFloat(utils.formatUnits(participation[1], 18)).toFixed(4) + " BNB"}</strong> allocations for this sale.</div> </div>
                              
                            </div>
                                
                                }
                               
                            </div> 
                            : <h5 style={{"textAlign":"Center"}}>Connect Your Wallet</h5>
                            }
                            
                        </>
                        }
                    </div>    
                </div>
            </div>
        </div>
        </>
    );
}

export default PoolDetails;