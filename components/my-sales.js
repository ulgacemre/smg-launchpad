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

    
    const { saleInfo, getCurrentRound, withdrawTokens,getFunderInfo,getRegistration,getFundersCount,fundRaised,tokenPriceUSD,getVestingInfo,getParticipation,getNumberOfRegisteredUsers, roundIdToRound,kyc, smgTokenPrice,bnbTokenPrice, addressToRoundRegisteredFor } = useContracts()

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
    const [idoContract2, setIDOContract2] = useState(0)  
    const [pools, setPools] = useState(0)  



    


    useEffect(async () => {
   
        const numOfRegister = await getNumberOfRegisteredUsers()
  
        if (numOfRegister) {
            setNumOfRegister(numOfRegister.toNumber())
        }
       
       
        
    }, [addressToRoundRegisteredFor,getCurrentRound])


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

    const setData = async (address) => {



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
        let newPoolList2 = [];


        const i = 0;
        poolList.forEach(pool => {

             if (pool.id == 5) {

                 if (!!wallet && !idoContract.signer) {
                    setIDOContract(new Contract(pool.contract,abis.NewIDO).connect(wallet))
                }    

               
                getFunderInfo(idoContract).then((result) => { 

                  
                    if (result > 0) {
                        newPoolList2[i] = pool

                        console.log("pool",newPoolList2[0])
                    }
                    i++;
    
             })
                 
             }


             if (pool.id == 7) {

                if (!!wallet && !idoContract2.signer) {
                   setIDOContract2(new Contract(pool.contract,abis.NewIDO).connect(wallet))
               }    

              
               getFunderInfo(idoContract2).then((result) => { 

                 
                   if (result > 0) {
                       newPoolList2[i] = pool

                       console.log("pool",newPoolList2[0])
                   }
                   i++;
   
            })
                
            }
  
        });

      

        setPools(poolList)
       
        console.log("pool2",pools)
        setActivePools(poolList)
        

    
      

     
        

    }



    useEffect(() => {
        saleInfo().then((result) => {
            if(result && result.isCreated) {
                setPoolInfo(result)

            }
        })
    }, [saleInfo])




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


            <h3 className="mt-5 mb-3">My Sales</h3>
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
  