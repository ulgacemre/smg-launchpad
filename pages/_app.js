import "bootstrap/dist/css/bootstrap.min.css"
import 'react-notifications/lib/notifications.css'
import '../assets/css/style.css'
import '../assets/css/responsive.css'
import React, {useState, useEffect} from "react"
import Loading from '../components/loading'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faArrowDown, faExternalLinkAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Web3Provider } from "../shared/context/Web3";
import { ContractsProvider } from "../shared/context/Contracts";
import Router from "next/router";

library.add(fab, faEnvelope, faArrowDown, faExternalLinkAlt)

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const start = () => {
      setLoading(true);
      console.log("pageProps",pageProps)
    };
    const end = () => {
      setLoading(false);
      console.log("pageProps",pageProps)
    };

    console.log("pageProps",pageProps)
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>

  
      {loading ? (
        <Loading />
      ) : (
      <Web3Provider>
        <ContractsProvider>
          <Component {...pageProps} />
        </ContractsProvider>
      </Web3Provider>
      )}
    </>
  )
}

export default MyApp
