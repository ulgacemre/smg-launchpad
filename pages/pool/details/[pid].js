import Head from 'next/head'
import { useRouter } from 'next/router'

import NavBar from '../../../components/nav-bar'
import Footer from '../../../components/footer'
import PoolDetails from "../../../components/pool-details";
import PoolDetailsNew from "../../../components/pool-details-new";
import {NotificationContainer} from 'react-notifications';

export default function PoolDetailsPage() {
    const router = useRouter()
    const { pid } = router.query

    return (
        <div className="v-application">
            <Head>
                <title>Smaugs</title>
                <link rel="icon" href="/assets/img/favicon96x96.png" type="image/png"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <NavBar/>

        { pid == 4 || pid == 5 || pid == 6 || pid == 7 || pid == 8 || pid == 9 || pid == 10 || pid == 11 || pid == 12 || pid == 13 || pid == 14 || pid == 15 || pid == 16?
        <PoolDetailsNew poolId={pid}/>
        :
        <PoolDetails poolId={pid}/>
        }

           

            <NotificationContainer/>
            <Footer/>
        </div>
    )
}
