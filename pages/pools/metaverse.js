
import React, {useState, useEffect} from 'react';
import StakeCard from "../../components/metaverse-stake";
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




    
    <StakeCard data={"0x23e5a17FDf71d43bb125E89eb59F950ad7bB5655"} /> 

    





    
    
       

            <NotificationContainer/>
            <Footer/>
        </div>
    )
}

  