import Head from 'next/head'

import NavBar from '../components/nav-bar'
import TopPanel from '../components/top-panel'
import StakePanel from '../components/stake-panel'
import Footer from '../components/footer'

export default function HomePage() {

    return (
        <div className="v-application">
            <Head>



                <title>Smaugs</title>
                <link rel="icon" href="/assets/img/favicon96x96.png" type="image/png"/>
                <link rel="icon" href="/favicon.ico"/>

                <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}
            (document,"script","https://chimpstatic.com/mcjs-connected/js/users/44584074245291f1fadcbb30e/1ceda11f0b3b332854e06f8c6.js");
            `,
          }}

          id="mcjs"
        />
               

<script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YPG849CR33"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YPG849CR33', { page_path: window.location.pathname });
            `,
          }}
        />
            </Head>

            <NavBar/>
            <TopPanel/>

            <StakePanel/>

            <Footer/>
        </div>
    )
}
