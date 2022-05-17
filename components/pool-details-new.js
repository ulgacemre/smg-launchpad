import React, {useState, useCallback, useEffect} from 'react';
import { Row, Col, ProgressBar,Spinner,Button } from 'react-bootstrap'
import ModalRegister from "../components/modal-register"
import ModalBuyToken from "../components/modal-buy-token"
import Stepper from './stepper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrowser } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';
import addresses from '../shared/addresses';
import { Contract,ethers,BigNumber } from 'ethers'
import useWeb3 from '../shared/hooks/useWeb3'
import useContracts from '../shared/hooks/useContracts'
import { utils } from "ethers"
import abis from '../shared/abis'
import Solana from './sol-address';
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
        title: 'Staking Round',
        date:  new Date(),
    },

    { 
        title: 'Whitelist Round',
        date:  new Date(),
    },
    { 
        title: 'FCFS Round',
        date:  new Date(),
    },
    { 
        title: 'Sale End',
        date:  new Date(),
    }
]



const PoolDetailsNew = ({poolId}) => {
    const { saleInfo, getCurrentRound,getCurrentRoundId,getFundersCount,getTier,getfcfsFunders,getMaxAllocation,fundRaised,getAllowanceIDO,approveIDO,whitelistAmount, getFunderInfo,withdrawTokens,getRegistration,tokenPriceUSD,getBnbPrice,getVestingInfo,getParticipation,getNumberOfRegisteredUsers, roundIdToRound,kyc, smgTokenPrice,bnbTokenPrice, addressToRoundRegisteredFor } = useContracts()
  
    const { connected, wallet, walletAddress, chainId, switchNetwork, handleConnect, waitForTransaction } = useWeb3()
    const [steps, setSteps] = useState(initialSteps)

    const contract_address = (poolList.find(item => item.id === poolId));

   
       
        const [idoContract, setIDOContract] = useState(new Contract(contract_address.contract,abis.NewIDO))  
   

 
    const [numOfRegister, setNumOfRegister] = useState(0)
    const [maxParticipantsPublic, setMaxParticipantsPublic] = useState(0)
    const [maxParticipantsStake, setMaxParticipantsStake] = useState(0)
    const [remainingTime, setRemainingTime] = useState('')
    const [round, setRound] = useState(-1)
    const [roundName, setRoundName] = useState(0)
    const [currentRound, setCRound] = useState(0)
    const [pool, setPool] = useState(null)
    const [allocations, setAllocations] = useState(null)
    const [participation, setParticipation] = useState(null)
    const [bnb, setBnb] = useState(0)
    const [maxAlloc, setMaxAlloc] = useState(0)
    const [white, setWhite] = useState(0)
    const [isPending, setPending] = useState(false)
    const [poolInfo, setPoolInfo] = useState(null)
    const [raised, setRaised] = useState(0)
    const [whitelist, setWhitelist] = useState(0)
    const [progress, setProgress] = useState(0)
    const [currentTab, setCurrentTab] = useState('saleInfo')
    const [modalRegisterVisible, setModalRegisterVisible] = useState(false)
    const [modalBuyTokenVisible, setModalBuyTokenVisible] = useState(false)
    const [tier, setTier] = useState(false)
    const [allowedAmount, setAllowedAmount] = useState(BigNumber.from(0))
    const [funderInfo, setFunderInfo] = useState(false)
    const [fcfs, setFCFS] = useState(false)
    const [fundersCount, setFundersCount] = useState(0)
    const [TBA, setTba] = useState(0)

    const [modalVisible2, setModalAllocationVisible2] = useState(false)

    const [, updateState] = React.useState();
    const router = useRouter()

    const MIN_APPROVE = BigNumber.from("2500000000000000000000")

  


    useEffect(() => {
        const pool_info = poolList.find(item => item.id === poolId)
        setPool( pool_info )
        if(pool_info.timeLine?.tba == "TBA" ) {
        setTba(1)
        }
        else{
            if(pool_info ) {
                let newSteps = [...steps]
                newSteps[0].date = new Date(pool_info.timeLine?.smaugsRound * 1000)
                newSteps[1].date = new Date(pool_info.timeLine?.whitelistRound * 1000)
                newSteps[2].date = new Date(pool_info.timeLine?.fscfsRound * 1000)
                newSteps[3].date = new Date(pool_info.timeLine?.saleEndTime * 1000)
                setSteps(newSteps)
            }
        }
 
    }, [])

    useEffect(() => {

        if (!!wallet && !idoContract.signer) {
            setIDOContract(idoContract.connect(wallet))
        }
       
    }, [wallet])

    useEffect(async() => {


        const tier = await getTier()
        const currentR = await getCurrentRoundId(idoContract)
        const max = await getMaxAllocation(idoContract)
        const funder = await getFunderInfo(idoContract)
        const whitelist = await whitelistAmount(idoContract)
        const raised = await fundRaised(idoContract)
        const allowed = await getAllowanceIDO(contract_address.contract)
        const fcfs = await getfcfsFunders(idoContract)
        const funderscount = await getFundersCount(idoContract)

        
       
        
     
     
    
       
        if (funderscount) {
           
            setFundersCount(funderscount.toNumber())
           
        }
            if (tier) {
           
                setTier(tier.toNumber())
               
            }
       
        if(raised){
            if (poolId == 13) {
                setRaised(raised * 3)
            setProgress(((raised * 3) / (pool?.total * pool?.tokenPrice) * 100).toFixed(2) )
            }
            else{
                setRaised(raised)
                setProgress((raised / (pool?.total * pool?.tokenPrice) * 100).toFixed(2) )
            }
    
        }

        if (funder) {
           
            setFunderInfo(funder)
        }

       
   

        if(allowed){
            setAllowedAmount(utils.formatUnits(allowed,18))
        }


        if(fcfs){

           

            if (fcfs.totalFunded == 0) {
                setFCFS(false)
            }
            else{
                setModalBuyTokenVisible(false)
                setFCFS(true)
            }
           
        }
        
        if (currentR) {
           
            setCRound(currentR)
        }
    
        if(max){
            if (currentR == 6) {
                setMaxAlloc(pool?.fcfs)        
            }
            else{
                setMaxAlloc(max)        
            }
                
        }

        if(whitelist){
          
            setWhitelist(whitelist)
      
        
    }
  

        
    }, [getTier,getCurrentRoundId,getFunderInfo,fundRaised,getAllowanceIDO,getMaxAllocation,whitelistAmount])





    useEffect( async() => {
        

        getBnbPrice().then((result)=>{
            if(result) {
                setBnb(result)

             

            }

        })

       
      }, [getBnbPrice])

 
   


    const handleBuyTokens = () => {        
        setModalBuyTokenVisible(true)
    }


    const checkAllowedAmount = async() => {

       const allowed = await getAllowanceIDO(contract_address.address)

        setAllowedAmount(utils.formatUnits(allowed,18))
    }


    const handleApprove = (valueTo) => {
        if(!allowedAmount != 0)
            return
        setPending(true)


        approveIDO(MIN_APPROVE,contract_address.contract).then(async (result) => {
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
            NotificationManager.error(err.data ? err.data.message : err.message, 'Failed to approve');
        })
    }

    useEffect(
        () => {
          

         
             if (currentRound >0 && currentRound <=4) {                
                setRound(0)
            }

            if (currentRound ==5) {      
                setRound(1)
                
            }
           if (currentRound ==6) {
                   
                setRound(2)
                
            }

           
          
            
           if (steps[3]?.date < new Date && currentRound == 0 && TBA == 0) {
            setRemainingTime('Sale Ended')
            setRound(3)          
           }
           else if (TBA == 1) {
            setRemainingTime('Not Started')
            setRound(0)          
           }



          else
            setRemainingTime(secondsToDHM(steps[round +1]?.date - (new Date) ));
         
           
           
         
          
           
               
    }, [round, steps,currentRound])


 

    return (
        <>
         <Solana show={modalVisible2} onClose={() => setModalAllocationVisible2(false)} />
        <div className="section section-top-panel">

            <div className="container">

                {modalRegisterVisible &&
                    <ModalRegister onClose={() => setModalRegisterVisible(false)} pool={pool} />
                }
                {modalBuyTokenVisible &&
                    <ModalBuyToken onClose={() => setModalBuyTokenVisible(false)} pool={pool} funderInfo={funderInfo}  maxAlloc={maxAlloc} currentRound ={currentRound} tier={tier} />
                }
                <Row className="gy-3">
                    <Col lg={6}>
                        <h2>{pool?.name}</h2>
                        <div className="mt-3">
                            {pool?.description}
                        </div>

                        <div className="mt-3">
                           <strong style={{"fontSize":"18px"}}>Your Allocation Round:</strong> <strong style={{"color":"red","fontSize":"18px"}}>{tier> 0 && tier <= 4 && round > 0 ? "Staking" : ""} {tier == 0 && round > 0? "Whitelist or FCFS" : ""}  </strong>
                        </div>


                        
                        <div className="mt-3">
                        {(currentRound >= 0 ) &&
                            <Row className="gy-3">
                                <Col lg={4}>

                                    


                                {(connected && allowedAmount != 0  && currentRound != 0 && tier<=4  && fcfs == false)  ? (

                                <Button variant="primary w-100" onClick={ handleBuyTokens} disabled={isPending}>
                                {isPending ? (
                                <Spinner animation="border" size="sm" />
                                ):(
                                 <span>Buy Now</span>
                                )}
                                </Button>

                                ) : ""}

                            


                                {!connected && 
                                 <Button variant="primary w-100" onClick={handleConnect}>Connect</Button>
                                 }
                                 {connected && chainId !== addresses.networkID && 
                                <Button variant="primary w-100" onClick={() => switchNetwork(addresses.networkID)}>Switch To BSC MainNet</Button>
                                  }
                                 {connected && chainId === addresses.networkID && allowedAmount == 0 && tier<=4 && currentRound > 0 && fcfs == false &&
                                 <Button variant="primary w-100" onClick={()=>handleApprove(maxAlloc)} disabled={isPending}>
                                 {isPending ? (
                                <Spinner animation="border" size="sm" />
                                 ):(
                                  <span>Approve</span>
                                   )}
                                </Button>
                               }
                              

                            

                                           
                                </Col>

                                <Col lg={4}>

                                    {(connected && poolId == 8)  ? (
                                        <Button variant="primary w-100" onClick={() => setModalAllocationVisible2(true)} disabled={isPending}>

                                        <div style={{"color":"white"}} onClick={() => setModalAllocationVisible2(true)}>Solana Address</div>

                                            </Button>

                                            ): ""}
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
                                  
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <div className="text-gray">Round</div>
                                    <h4>{currentRound == 0 && round != 3 ? "Not Started"  : "" }</h4>
                                    <h4>{currentRound > 0 && currentRound <=4 ? "Staking Round" : "" }</h4>
                                    <h4>{currentRound == 5 ? "Whitelist Round" : "" }</h4>
                                    <h4>{currentRound == 6 ? "FCFS Round" : "" }</h4>
                                    <h4>{round == 3 ? "Sale Ended" : "" }</h4>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray">Time left</div>
                                    <h4 className="text-danger">{remainingTime}</h4>
                                </div>
                            </div>

                            <div className="mb-3">
                                <ProgressBar now={progress}/>
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="text-gray">
                                        {progress} %
                                    </div>
                                    <div className="text-gray">
                                        {shortAmount(0)}/{shortAmount(0)}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <div className="text-gray">Token Distribution</div>
                                    <h4>{shortAmount(pool?.total)}</h4>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray">Total Raised</div>
                                    <h4>${raised}</h4>
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

               

            {currentRound > 0 && TBA == 0 && currentRound<=4 &&   <Stepper step={0} data={steps} className="pool-stepper" />  }
            { currentRound==5 && TBA == 0 &&   <Stepper step={1} data={steps} className="pool-stepper" />  }
            { currentRound==6 && TBA == 0 &&   <Stepper step={2} data={steps} className="pool-stepper" />  }
            { currentRound==0 && TBA == 0 && raised == 0 &&  <Stepper step={-1} data={steps} className="pool-stepper" />  }
            { currentRound==0 && TBA == 0 && raised != 0 &&  <Stepper step={3} data={steps} className="pool-stepper" />  }
         
                                  
        
 
                   
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
                                    <div className="text-gray">Social Media</div>
                                   
                                 

                                    <div className="d-flex flex-column flex-sm-row justify-content-between" >
                                      <a href={pool?.saleInfo.Website} target="_blank" style={{"paddingRight":"15px"}}>  <i class="bi bi-globe"></i></a>
                                      <a href={pool?.saleInfo.Twitter} target="_blank" style={{"paddingRight":"15px"}}><i class="bi bi-twitter"></i></a>
                                      <a href={pool?.saleInfo.Telegram} target="_blank" style={{"paddingRight":"15px"}}><i class="bi bi-telegram"></i></a>
                                      </div>
                                </div>
                                <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                    <div className="text-gray">Number of Funders</div>
                                    <div>{fundersCount}</div>
                                </div>
                                <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                    <div className="text-gray">Vesting</div>
                                    <div>{pool?.vesting}</div>
                                </div>
                                <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                    <div className="text-gray">TGE</div>
                                    <div>{pool?.tge}</div>
                                </div>
                                <div className="pool-tab-row d-flex flex-column flex-sm-row justify-content-between">
                                    <div className="text-gray">Sale Type</div>
                                    <div>{pool?.access}</div>
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
                             

                            

                                
                           
                             {funderInfo===0 ?   <div><div> <img className="my-3" src={imgAlert} /></div><div> Unfortunately, you don't have any allocations for this sale.</div> </div>
                                :
                                <div>
                                <p>Round Max Allocation: {maxAlloc} BUSD</p>
                                <p>Funded Allocation: {funderInfo ==  0 ? 0 : funderInfo} BUSD</p>
                             
                                <p>Token Allocation: {funderInfo ==  0 ? 0 : funderInfo / pool?.tokenPrice} {pool?.tokenInfo.symbol}</p>
                                <p>Vesting: { pool?.vesting}</p>

                             
                              
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

export default PoolDetailsNew;