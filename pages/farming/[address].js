
import React, {useState, useEffect} from 'react';
import StakeCard from "../../components/new-stake-card";
import { formatMoney } from "../../helpers";
import { stakes } from "../../shared/data"
import Head from 'next/head'


import NavBar from '../../components/nav-bar'
import Footer from '../../components/footer'
import {NotificationContainer} from 'react-notifications';
import LPMining from '../../components/lp-mining';
export default function StakePage(address) {
   
   


    return (
        <div className="v-application">
            <Head>
                <title>Smaugs</title>
                <link rel="icon" href="/assets/img/favicon96x96.png" type="image/png"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <NavBar/>


    <LPMining data={"0x04bCc2bC583d7a139Be71C9f8b2e441Ce749B093"} /> 
    

   
       

            <NotificationContainer/>
            <Footer/>
        </div>
    )
}

  