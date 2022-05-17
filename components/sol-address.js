import React, {useState, useEffect} from 'react';
import Modal from './modal';
import axios from 'axios';
import { formatMoney } from '../helpers';
import useWeb3 from '../shared/hooks/useWeb3'
import {NotificationContainer, NotificationManager} from 'react-notifications';
const TIERS = [
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
    }    
]



const ModalSolana = ({show = true, onClose = () => {}, ...props}) => {

 

    const { connected, wallet, walletAddress, chainId, switchNetwork, handleConnect, waitForTransaction } = useWeb3()

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

                return false;
               
              
               
            }
           
           
        
           
         
         


        }
        else{
            const addr = { bscaddress: walletAddress, solanaaddress: solana };
            const response = await axios.post('https://xcji-njzb-qhcr.n7.xano.io/api:7sSxsvxy/linksol', addr);

           
            if (response.status == 200) {
                NotificationManager.success("Success to save");
               
               return false;
               
               
            }
           
           

           
        }

    }
    else{
        NotificationManager.warning("Connect your wallet");
        

    }

     
    
    }


    return (
        <Modal show={show} className="modal-tier" onClose={onClose} {...props}>

        <NotificationContainer/>

            <h4 className="text-center mb-3">Solana Wallet Address</h4>

            <p className="mb-3">Current Solana Wallet Address: {add}</p>
           
            <input type="text" value={solana} className="form-control v-input" required  onChange={(e) => {  setSolana(e.target.value) }}  placeholder="Enter your Solana Wallet Address" style={{'fontSize': '1rem','border':'solid 1px white'}}/>
            <div className='modal-tier-frame text-center mt-2 mb-2'>
            <button  type="submit" className="btn v-btn--rounded btn-outline-primary v-btn-outline--hover mx-4 mt-3" onClick={() => save()}>Save</button>
            <button  className="btn v-btn--rounded btn-outline-primary v-btn-outline--hover mx-4 mt-3" onClick={() => reset2()}>Clear</button>
         

                </div>
            
         
            
         
        </Modal>
    );
}

export default ModalSolana;