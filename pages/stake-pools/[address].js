
import React, {useState, useEffect} from 'react';
import StakeCard from "../../components/new-stake-card";
import { formatMoney } from "../../helpers";
import { stakes } from "../../shared/data"
import Head from 'next/head'


import NavBar from '../../components/nav-bar'
import Footer from '../../components/footer'
import {NotificationContainer} from 'react-notifications';
export default function StakePage(address) {
   
   


    return (
        <div className="v-application">
            <Head>
                <title>Smaugs</title>
                <link rel="icon" href="/assets/img/favicon96x96.png" type="image/png"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <NavBar/>

{
    address == "0xC090f7D3368a36b20b2B2553386f4E5E184cecb9" || address == "0xbE140E29d5bD66a3755Aaac4B7507BA40cE6B7FE" ?
    <StakeCard data={address} /> :
    
    <StakeCard data={"0x4632125F84545c5C1144775755C6936eFBBe95b7"} />

    


}
   
       

            <NotificationContainer/>
            <Footer/>
        </div>
    )
}

  