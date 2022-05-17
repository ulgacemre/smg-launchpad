import Head from 'next/head'

import NavBar from '/components/nav-bar'
import TopPanel from '/components/top-panel'
import MySales from '/components/my-sales'
import Footer from '/components/footer'

export default function HomePage() {

    return (
        <div className="v-application">
            <Head>
                <title>Smaugs</title>
                <link rel="icon" href="/assets/img/favicon96x96.png" type="image/png"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <NavBar/>
            <TopPanel/>

            <MySales/>

            <Footer/>
        </div>
    )
}
