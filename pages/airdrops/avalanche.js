import Head from 'next/head'
import { Button, Row, Col } from "react-bootstrap";
import { useRouter } from 'next/router'
import { airdropsAva } from "/shared/data"
import NavBar from '../../components/nav-bar'
import Footer from '../../components/footer'
import Airdrop from "../../components/airdrop-avalanche";
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
                 
                    <h2 className="text-center mb-5">Avalanche Airdrops  </h2>

                    
                   
                   
                    </div>
                    <NotificationContainer/>

          
                    <Row className="gy-3 mt-2">
     
    
     {airdropsAva.map((data) => (
        <Col sm={4} key={`stake-card-${data.id}`} style={{"border-bottom": "1px solid #027ff4", "borderRadius": "25px","paddingTop": "40px","paddingBottom": "40px",    "margin-top": "0px","paddingLeft": "25px","paddingRight": "25px"}}>

      <Airdrop data={data}/>
      </Col>
     
     ))}
      </Row>
     
    
        
 

             
               



</div>
</div>

            <Footer/>
        </div>
    )
}
