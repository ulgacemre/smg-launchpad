import Head from 'next/head'
import { useRouter } from 'next/router'

import NavBar from '../../components/nav-bar'
import Footer from '../../components/footer'
import StakeCard from "../../components/stake-card";

import {NotificationContainer} from 'react-notifications';

export default function StakePage() {

    return (
        <div className="v-application">
            <Head>
                <title>Smaugs</title>
                <link rel="icon" href="/assets/img/favicon96x96.png" type="image/png"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <NavBar/>

            <StakeCard/>

            <NotificationContainer/>
            <Footer/>
        </div>
    )
}
