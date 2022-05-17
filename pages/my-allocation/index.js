import Head from 'next/head'
import { Button, Row, Col } from "react-bootstrap";
import { useRouter } from 'next/router'
import { airdrops } from "/shared/data"
import NavBar from '../../components/nav-bar'
import Footer from '../../components/footer'
import MyAllocation from "../../components/my-allocation";
import {NotificationContainer, NotificationManager} from 'react-notifications';
export default function FarmPage() {

    return (
        <div className="v-application">
            <Head>
                <title>Smaugs</title>
                <link rel="icon" href="/assets/img/favicon96x96.png" type="image/png"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <NavBar/>

            <div className="section-top mb-5" style={{"backgroundColor":"#010520","paddingBottom":"100px"}}>
        <div className="container pt-4 section" >
        <div className="mb-5 mt-5">
                    <h2 className="text-center mb-5">IDO Allocation Calculator </h2>
                   
                   
                    </div>
                    <NotificationContainer/>


    

                  <MyAllocation />
  
 
     
    


</div>
</div>

            <Footer/>
        </div>
    )
}
