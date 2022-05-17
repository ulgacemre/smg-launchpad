import React, {useState, useEffect} from "react"
import Link from 'next/link'
const imgLogo = require('../assets/img/logo.png')
import Allocation from './my-allocation';
import { useRouter } from 'next/router';
import { Button, Row, Col } from "react-bootstrap";
const TopPanel = () => {
    const [modalVisible, setModalAllocationVisible] = useState(false)

    const handleStake = () => {
        setStake(true)
        setModalStake2Visible(true)
    }
    const router = useRouter();
    return (
        <div className="section section-top-panel">

               

               
            <div className="text-center" >
                <div className="h2 text-center w-100">
                    
                    <div className="top-title-description text-white text-h3 mt-3 mb-5">
                        Welcome to the 
                        <br/>
                        Future of Early Investment
                    </div>
                    <div className="d-flex flex-column flex-sm-row justify-content-center ">
                        <a href="#" className="btn v-btn--rounded btn-primary mx-4 mt-3">
                            View all pools
                        </a>

                      
                        <Button  className="btn v-btn--rounded btn-outline-primary v-btn-outline--hover mx-4 mt-3" >Calculator</Button>

                     
                       
                            
                
                        <Link href="/stake">
                            <div className="btn v-btn--rounded btn-outline-primary v-btn-outline--hover mx-4 mt-3">Old Stake</div>
                        </Link>
                    
                     
                            <div className="btn v-btn--rounded btn-outline-primary v-btn-outline--hover mx-4 mt-3" onClick={() => router.push('/stake-pools/0xC090f7D3368a36b20b2B2553386f4E5E184cecb9')}>Stake 20days</div>
                    
    
                      
                            <div className="btn v-btn--rounded btn-outline-primary v-btn-outline--hover mx-4 mt-3" onClick={() => router.push('/stake-pools/0xbE140E29d5bD66a3755Aaac4B7507BA40cE6B7FE')}>Stake 45days</div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default TopPanel;
  