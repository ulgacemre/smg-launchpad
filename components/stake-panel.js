import React, {useState, useEffect} from "react"
import Link from "next/link";
import Pool from "./pool";
import { poolList } from "../shared/poollist"
import { date2normal } from "../utils"
import useContracts from '../shared/hooks/useContracts'
import abis from '../shared/abis'
import useWeb3 from '../shared/hooks/useWeb3'
import { Contract,ethers,BigNumber } from 'ethers'
const StakePanel = () => {

    
    const { saleInfo, getCurrentRound, withdrawTokens,getRegistration,getFundersCount,fundRaised,tokenPriceUSD,getVestingInfo,getParticipation,getNumberOfRegisteredUsers, roundIdToRound,kyc, smgTokenPrice,bnbTokenPrice, addressToRoundRegisteredFor } = useContracts()

    const [poolInfo, setPoolInfo] = useState(null)
    const [searchValue, setSearchValue] = useState('')
    const [upcomingPools, setUpcomingPools] = useState([])
    const [activePools, setActivePools] = useState([])
    const [closedPools, setClosedPools] = useState([])
    const [numOfRegister, setNumOfRegister] = useState(0)
    
    const [raised, setRaised] = useState(0)
    const [funders, setFunders] = useState(0)
    const { connected, wallet, walletAddress, chainId, switchNetwork, handleConnect, waitForTransaction } = useWeb3()
    const [idoContract, setIDOContract] = useState(0)  

    


    useEffect(async () => {
   
        const numOfRegister = await getNumberOfRegisteredUsers()
  
        if (numOfRegister) {
            setNumOfRegister(numOfRegister.toNumber())
        }
       
       
        
    }, [])


    const data = async (address) => {



 
        if (!!wallet && !idoContract.signer) {
            setIDOContract(new Contract(address,abis.NewIDO).connect(wallet))
        }       
      

            const raised = await fundRaised(idoContract)
            const funders = await getFundersCount(idoContract)
    
            if (funders) {
                setFunders(funders.toNumber())

                
            }
            
            if (raised) {
                setRaised(raised)
            }
            
         
        
    
      

     
        

    }




    useEffect(() => {
        saleInfo().then((result) => {
            if(result && result.isCreated) {
                setPoolInfo(result)

            }
        })
    }, [saleInfo])


    useEffect(() => {
        const filteredPools = poolList.filter((pool) => {
            if(searchValue.length <= 2) return true;

            return (
                pool.tokenInfo.name.includes(searchValue) ||
                pool.tokenInfo.symbol.includes(searchValue) ||
                pool.tokenInfo.address.includes(searchValue)
            )
        })

        const currentTime = new Date().getTime();
        let newPoolList = [];




        newPoolList = filteredPools.filter((pool) => {
            const startDate = pool.timeLine.registrationTimeStarts * 1000
            const finishDate = pool.timeLine.saleEndTime * 1000

            return (currentTime > startDate && currentTime <=finishDate )
        })
        setActivePools(newPoolList)

        newPoolList = filteredPools.filter((pool) => {
            const endDate = pool.timeLine.registrationTimeStarts * 1000

            return (currentTime < endDate)
        })

 

        

        setUpcomingPools(newPoolList)
        
        newPoolList = filteredPools.filter((pool) => {
            const endDate = pool.timeLine.saleEndTime * 1000
            return (currentTime > endDate)
        })
        
        setClosedPools(newPoolList)
    }, [searchValue])

    return (
        <div className="section section-stake-panel">
            <div className="container">
                <input 
                    className="form-control" 
                    type="search" 
                    placeholder="Search by project name, token symbol or token contract address..." 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e?.target.value)}
                />


            <h3 className="mt-5 mb-3">Active Sales</h3>
                <div className="table-wrapper">
                    <table className="pool-detail-table">
                        <tr>
                            <th>Project Name</th>
                            <th>IDO Token Price</th>
                            <th>No. Participants</th>
                            <th>Total Raised</th>
                         
                            <th>Sale Ended At</th>
                        </tr>
                        {activePools.map(poo => (
                        <Link href={`/pool/details/${poo.id}`}>
                            <tr key={`poollist-${poo.id}`}>                                                        
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <img src={poo.img} />
                                        </div>
                                        <div className="ml-3">
                                            <div>{poo.tokenInfo.name}</div>
                                            <div className="text-gray">{poo.tokenInfo.symbol}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${poo.tokenPrice}</td>
                             
                                <td>{funders || 0}</td>
                                <td style={{"display":"none"}}>{ raised + data(poo.contract)} BUSD</td>
                                <td>{raised } BUSD</td>
                              
                              

                        
                               
                                <td>{poo.timeLine.tba == "TBA" ? "TBA" : date2normal(poo.timeLine.saleEndTime * 1000)}</td>
                            </tr>
                        </Link>
                        ))}
                    </table>
                </div>



                <h3 className="mt-5 mb-3">Upcoming Sales</h3>
                <div className="table-wrapper">
                    <table className="pool-detail-table">
                        <tr>
                            <th>Project Name</th>
                            <th>IDO Token Price</th>
                            <th>No. Participants</th>
                            <th>Total Raised</th>
                           
                            <th>Sale Ended At</th>
                        </tr>
                        {upcomingPools.map(poo => (
                        <Link href={`/pool/details/${poo.id}`}>
                        <tr key={`poollist-${poo.id}`}>                                                        
                            <td>
                                <div className="d-flex align-items-center">
                                    <div>
                                        <img src={poo.img} />
                                    </div>
                                    <div className="ml-3">
                                        <div>{poo.tokenInfo.name}</div>
                                        <div className="text-gray">{poo.tokenInfo.symbol}</div>
                                    </div>
                                </div>
                            </td>
                            <td> ${poo.tokenPrice}</td>
                         
                            <td>{0}</td>
                            <td>{poo.maxRaised  }</td>
                          
                            <td>{poo.timeLine.tba == "TBA" ? "TBA" : date2normal(poo.timeLine.saleEndTime * 1000)}</td>
                        </tr>
                    </Link>
                        ))}
                    </table>
                </div>

                <h3 className="mt-5 mb-3">Completed Sales</h3>
                <div className="table-wrapper">
                    <table className="pool-detail-table">
                        <tr>
                            <th>Project Name</th>
                            <th>IDO Token Price</th>
                            <th>No. Participants</th>
                            <th>Total Raised</th>
                          
                            <th>Sale Ended At</th>
                        </tr>
                        {closedPools.map(poo => (
                       <Link href={`/pool/details/${poo.id}`}>
                       <tr key={`poollist-${poo.id}`}>                                                        
                           <td>
                               <div className="d-flex align-items-center">
                                   <div>
                                       <img src={poo.img} />
                                   </div>
                                   <div className="ml-3">
                                       <div>{poo.tokenInfo.name}</div>
                                       <div className="text-gray">{poo.tokenInfo.symbol}</div>
                                   </div>
                               </div>
                           </td>
                           <td>${poo.tokenPrice}</td>
                        
                           <td>{ poo.participants == 0? numOfRegister : poo.participants}</td>
                           <td>{poo.maxRaised  }</td>
                          
                           <td>{poo.timeLine.tba == "TBA" ? "TBA" : date2normal(poo.timeLine.saleEndTime * 1000)}</td>
                       </tr>
                   </Link>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
  };
  
  export default StakePanel;
  