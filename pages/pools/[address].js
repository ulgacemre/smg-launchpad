
import React, {useState, useEffect} from 'react';
import StakeCard from "../../components/project-stake";
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
    address == "0x9f9c798763e8bacc8ef5e8446178211f865ed7cb" ?
    <StakeCard data={"0x9f9c798763e8bacc8ef5e8446178211f865ed7cb"} /> :
    
    <StakeCard data={"0x9f9c798763e8bacc8ef5e8446178211f865ed7cb"} /> 

    


}
            <NotificationContainer/>
            <Footer/>
        </div>
    )
}

  