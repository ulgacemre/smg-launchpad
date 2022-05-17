import React, {useState, useEffect} from 'react';
import Modal from './modal';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { formatMoney } from '../helpers';
import {Button, Collapse} from 'react-bootstrap'
import { Contract, BigNumber, utils } from 'ethers'
import useWeb3 from '../shared/hooks/useWeb3'
import useContracts from '../shared/hooks/useContracts'
import abis from '../shared/abis'
const TIERS = [

    {
        image: '/images/Platinum.png',
        title: 'Capital Pool',
        points: 200000,
        multiplier: "Smaugs Capital"
    },


    {
        image: '/images/Platinum.png',
        title: 'Smaugs Pool',
        points: 100000,
        multiplier: 20
    },
    {
        image: '/images/Gold.png',
        title: 'Ancalagon Pool',
        points: 50000,
        multiplier: 10
    },
    {
        image: '/images/Silver.png',
        title: 'Scatha Pool',
        points: 20000,
        multiplier: 4
    },
    {
        image: '/images/Bronze.png',
        title: 'Drake Pool',
        points: 5000,
        multiplier: 1
    } ,

    {
        image: '/images/Platinum.png',
        title: 'FCFS Pool',
        points: 1000,
        multiplier: 0
    },

 
]



const MyAllocation = () => {

 

    const {getDepositedAmount2,   myTier,depositedAmount,depositedAmount2,depositedAmount3,} = useContracts()

   
    const { connected, wallet, walletAddress, chainId, switchNetwork, handleConnect, waitForTransaction } = useWeb3()


    const [stakeContract, setStakeContract] = useState(new Contract("0xC090f7D3368a36b20b2B2553386f4E5E184cecb9", abis.NewStake))  
    const [stakeContract2, setStakeContract2] = useState(new Contract("0xbE140E29d5bD66a3755Aaac4B7507BA40cE6B7FE", abis.NewStake))  
    const [stakeContract3, setStakeContract3] = useState(new Contract("0x04bCc2bC583d7a139Be71C9f8b2e441Ce749B093", abis.LPMining))  


   
    const [point, set20days] = useState(0)
    const [point2, set45days] = useState(0)
    const [point3, setLP] = useState(0)
    const [staked, setStaked] = useState("")
    const [staked2, setStaked2] = useState("")
    const [staked3, setStaked3] = useState("")
    const [open, setOpen] = useState(false)
    
    const handle20days = async (staked ) => {

      

        setStaked(staked)
    
        set20days(staked * 1.25)
      
     
    
    }
    
    const handle45days = async (staked) => {
    
       
        setStaked2(staked)
        set45days(staked * 2.4)
      
       
     
    
    }

    const handleLP = async (staked) => {
    
      
       
        
        setStaked3(staked)

        setLP(staked * 25000000 * 4)
       
        
       
    
    }

    const reset = async () => {
    
      
        setStaked("")
        setStaked2("")
        setStaked3("")
        set45days(0 * 2.4)
        set20days(0 * 2.4)
        setLP(0 * 2.4)
      
       
       
     
       
    
    }





 

    return (
      <div>
           
           
           <div className='modal-tier-frame text-center mt-2 mb-4'> 
            <Button className="btn text-center mt-2 mb-2" onClick={() => open == false ? setOpen(true):setOpen(false)} >
               Manuel Calculator
           </Button>
           </div>

           <Collapse in={open}>
               <div className='modal-tier-frame text-center mt-2 mb-2'> 
           <input type="text"  value={staked} className="form-control v-input"   placeholder="Write your 20 days staked amount" onChange={(e) => {  handle20days(e.target.value) }} style={{'fontSize': '1rem','border':'solid 1px white'}}/>
            <input type="text"  value={staked2} className="form-control v-input"   placeholder="Write your 45 days staked amount" onChange={(e) => {  handle45days(e.target.value) }} style={{'fontSize': '1rem','border':'solid 1px white','marginTop':"10px"}}/>
            <input type="text"  value={staked3} className="form-control v-input"   placeholder="Write your Farming LP staked amount" onChange={(e) => {  handleLP(e.target.value) }} style={{'fontSize': '1rem','border':'solid 1px white','marginTop':"10px"}}/>
            <div className='modal-tier-frame text-center mt-2 mb-2'>
            <button  className="btn v-btn--rounded btn-outline-primary v-btn-outline--hover mx-4 mt-3" onClick={() => reset()}>Reset</button>
            
                </div>
                <div className='modal-tier-frame text-center mt-4 mb-4'>
                <h4  style={{"color":"red","fontSize":"18px"}}>Allocation Point: {point + point2 + point3}</h4>
               
                </div>
                </div>
           </Collapse>

   
      
            <table className="w-100 text-center mb-3">
                <tr className="text-primary fw-bolder">
                    <th>Pools</th>
                    <th>Amount</th>
                    <th>Multiplier</th>
                    <th>Allocation Point</th>
                </tr>
                <tr>
                    <td>Staked SMG(20 DAYS)</td>
                    <td>{depositedAmount}</td>
                    <td>1.25</td>
                    <td>{parseInt(depositedAmount * 1.25)}</td>
                </tr>
                <tr>
                    <td>Staked SMG(45 DAYS)</td>
                    <td>{depositedAmount2}</td>
                    <td>2.4</td>
                    <td>{parseInt(depositedAmount2 * 2.4)}</td>
                </tr>
                <tr>
                    <td>Staked SMG - BNB(Farming)</td>
                    <td>{(depositedAmount3)}</td>
                    <td>4</td>
                    <td>{parseInt(depositedAmount3 * 25000000 * 4)}</td>
                </tr>
                <tr className=" fw-bolder" style={{"color":"red","fontSize":"18px"}}>
                    <td>Your Point</td>
                    <td></td>
                    <td></td>
                    <td>{parseInt(depositedAmount * 1.25) + parseInt(depositedAmount2 * 2.4) + parseInt(depositedAmount3 * 25000000 * 4) }</td>
                </tr>
            </table>
            
            <div class="row">
                {TIERS.map((tier, idx) => (
               <div class="col-3 col-sm-3">

                    <div className={`modal-tier-frame text-center ${parseInt(depositedAmount * 1.25) + parseInt(depositedAmount2 * 2.4) + parseInt(depositedAmount3 * 25000000 * 4) >= tier.points && ((idx === 0 ) || (parseInt(depositedAmount * 1.25) + parseInt(depositedAmount2 * 2.4) + parseInt(depositedAmount3 * 25000000 * 4) < TIERS[idx - 1].points)) ? 'text-primary' : ''}`}>
                      
                        <h5 className="mt-2">{tier.title}</h5>
                        <div className="mt-1">{tier.points} Points</div>
                        <div className="mt-1">
                            {tier.multiplier != "Smaugs Capital" ? 
                              <span className="text-multiplier">{tier.multiplier}x pool multiplier </span> 

                              :   <span className="text-multiplier">{tier.multiplier} </span> 
                        
                        
                        }
                          
                        </div>
                    </div>
                </div>
                ))}
               </div>
               </div>
    );
}


export default MyAllocation;
















