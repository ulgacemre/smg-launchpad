import React, { useCallback, useEffect, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import Context from './Context'
import Web3 from "web3";
import axios from 'axios';
import { abi as IUniswapV2Pair } from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import { BigNumber } from "bignumber.js";
import { ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";
import Router from "next/router";
import { chain } from 'lodash'
const Provider = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState(undefined)
  // const [connected, setConnected] = useState(JSON.parse(localStorage.getItem('wallet_connect')))
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState(undefined)
  const [wallet, setWallet] = useState(undefined)
  const [walletBalance, setWalletBalance] = useState(undefined)
  const [apylp, setAPY] = useState(undefined)
  const [chainId, setChainId] = useState(56)
  const [rpc, setRpc] = useState("https://bsc-dataseed.binance.org/")
  
  const [currentProvider, setCurrentProvider] = useState(undefined)

  useEffect(() => {
    if(window.localStorage)
      setConnected(JSON.parse(localStorage.getItem('wallet_connect')))
  }, [])


  useEffect(async() => {
    const apy = await calculateAPY()
 
    if (apy) {
     setAPY(apy)
     console.log("apylp",apy)
    }
   }, [])


   // Replace the addresses to point to your Farming Contract
// and LP Token Contract on the desired network
const FARMING_CONTRACT_ADDRESS = "0x04bCc2bC583d7a139Be71C9f8b2e441Ce749B093";
const LP_TOKEN_ADDRESS = "0x21b64d891805b0c6437e8209146e60ad87ebb499";


const getSMGTokenPrice =async () => {
  try {
    const response = await axios('https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=0x6bfd576220e8444ca4cc5f89efbd7f02a4c94c16&vs_currencies=bnb')

    if (response) {
      return response.data['0x6bfd576220e8444ca4cc5f89efbd7f02a4c94c16']?.bnb;
    }

     
   
     
   
  } catch(e) {
      console.log(e)
  }
}

const getLpTokenReserves = async () => {
  try {
    const web3 = new Web3(window.ethereum);
    const LpTokenContract = new web3.eth.Contract(
      IUniswapV2Pair,
      LP_TOKEN_ADDRESS
    );
    const totalReserves = await LpTokenContract.methods.getReserves().call();
   
    return [totalReserves[0], totalReserves[1]];
  } catch (e) {
    console.log(e);
    return [0, 0];
  }
};

const getLpTokenTotalSupply = async () => {
  try {
    const web3 = new Web3(window.ethereum);
    const LpTokenContract = new web3.eth.Contract(
      IUniswapV2Pair,
      LP_TOKEN_ADDRESS
    );
    const totalSupply = await LpTokenContract.methods.totalSupply().call();
    return totalSupply;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

const calculateLpTokenPrice = async () => {
  let rewardTokenPrice = 0;
  // For Price IN ETH
  // Reward Token is Dodgecoin in our case
  rewardTokenPrice = await getSMGTokenPrice();

  // For Price in BNB
  // If you want to do calculations in BNB uncomment the line below and comment line number 78
  // rewardTokenPrice = await getDodgecoinPriceInBNB()

  // 1 * rewardTokenPrice because 1 is the price of ETH or BNB in respective mainnet
  // This is square root of (p0 * p1) with reference to the image above
  const tokenPriceCumulative = new BigNumber(400 * rewardTokenPrice).sqrt();

  // For ETH / DOGE pair totalReserve[0] = ETH in the contract and totalReserve[1] = DOGE in the contract
  // For BNB / DOGE pair totalReserve[0] = BNB in the contract and totalReserve[1] = DOGE in the contract
  const totalReserve = await getLpTokenReserves();

  // This is square root of (r0 * r1) with reference to the image above
  const tokenReserveCumulative = new BigNumber(totalReserve[0])
    .times(totalReserve[1])
    .sqrt();

   
  // Total Supply of LP Tokens in the Market
  const totalSupply = await getLpTokenTotalSupply();

  // Calculate LP Token Price in accordance to the image above
  const lpTokenPrice = tokenReserveCumulative
    .times(tokenPriceCumulative)
    .times(2)
    .div(totalSupply);

    

  // If lpTokenPrice is a valid number return lpTokenPrice or return 0
  return lpTokenPrice.isNaN() || !lpTokenPrice.isFinite()
    ? 0
    : lpTokenPrice.toNumber();
};


const calculateAPY = async () => {
  try {
    const web3 = new Web3(window.ethereum);
    //BLOCKS_PER_DAY varies acccording to network all values are approx and they keep changing
    //BLOCKS_PER_DAY = 21600 for Kovan Testnet
    //BLOCKS_PER_DAY = 28800 for BSC Testnet
    //BLOCKS_PER_DAY = 6400 for Ethereum Mainnet
    //I am using the value for Ethereum mainnet
    const BLOCKS_PER_YEAR = 28800 * 365;

    let rewardTokenPrice = 0;
    // For Price IN ETH
    // Reward Token is Dodgecoin in our case
    rewardTokenPrice = await getSMGTokenPrice();

    // For Price in BNB
    // If you want to do calculations in BNB uncomment the line below and comment line number 124
    // rewardTokenPrice = await getDodgecoinPriceInBNB()

    // REWARD_PER_BLOCK = Number of tokens your farming contract gives out per block
    const REWARD_PER_BLOCK = 4000000000000;
    const totalRewardPricePerYear = new BigNumber(rewardTokenPrice)
      .times(REWARD_PER_BLOCK)
      .times(BLOCKS_PER_YEAR);

    // Get Total LP Tokens Deposited in Farming Contract
    const LpTokenContract = new web3.eth.Contract(
      IUniswapV2Pair,
      LP_TOKEN_ADDRESS
    );

    const totalLpDepositedInFarmingContract = await LpTokenContract.methods
      .balanceOf(FARMING_CONTRACT_ADDRESS)
      .call();

    // Calculate LP Token Price
    const lpTokenPrice = await calculateLpTokenPrice();

  
   
    // Calculate Total Price Of LP Tokens in Contract
    const totalPriceOfLpTokensInFarmingContract = new BigNumber(
      lpTokenPrice
    ).times(totalLpDepositedInFarmingContract);


    console.log("totalReserve",totalPriceOfLpTokensInFarmingContract.toNumber())
    // Calculate APY
    const apy = totalRewardPricePerYear
      .div(totalPriceOfLpTokensInFarmingContract)
      .times(100);

     

    // Return apy if apy is a valid number or return 0
    return apy.isNaN() || !apy.isFinite() ? 0 : apy.toNumber();
  } catch (e) {
    console.log(e);
    return 0;
  }
};




const handleConnectAvalanche = async () => {

  setRpc("https://api.avax.network/ext/bc/C/rpc")
  const provider = await web3Modal?.connect();
  if (provider) {
    const newWeb3 = new ethers.providers.Web3Provider(provider)
    const accounts = await newWeb3.listAccounts()
    const balance = await newWeb3.getBalance(accounts[0])

   
  
    
    setWalletBalance(ethers.utils.formatEther(balance))
    setWalletAddress(accounts[0])
    setWallet(newWeb3.getSigner())
    setConnected(true)
    if(newWeb3.provider.chainId === 43114)
      setChainId("0xa86a")
    else
      setChainId(newWeb3.provider.chainId)
      
    setCurrentProvider(provider)

    if(window.localStorage)
      window.localStorage.setItem("wallet_connect", true);

    provider.on('accountsChanged', (newAccounts) => {
      if (Array.isArray(newAccounts) && newAccounts.length) {
        setWalletAddress(newAccounts[0])
      }
    }) 
    
    provider.on('chainChanged', (chainId, oldChainId) => {
      if (Array.isArray(newAccounts) && newAccounts.length) {
      setChainId(chainId)
    }
     
    })

    provider.on("disconnect", (error) => {
      handleDisconnect()
      console.log(error);
    });
  } else {
    await handleDisconnect()
  }
}



  const handleConnect = async () => {

    
    setRpc("https://bsc-dataseed.binance.org/")
    const provider = await web3Modal?.connect();

   
    if (provider) {
      const newWeb3 = new ethers.providers.Web3Provider(provider)
      const accounts = await newWeb3.listAccounts()
      const balance = await newWeb3.getBalance(accounts[0])
      
      setWalletBalance(ethers.utils.formatEther(balance))
      setWalletAddress(accounts[0])
      setWallet(newWeb3.getSigner())
      setConnected(true)
      if(newWeb3.provider.chainId === 56)
        setChainId("0x38")
      else
        setChainId(newWeb3.provider.chainId)
        
      setCurrentProvider(provider)

      if(window.localStorage)
        window.localStorage.setItem("wallet_connect", true);

      provider.on('accountsChanged', (newAccounts) => {
        if (Array.isArray(newAccounts) && newAccounts.length) {
          setWalletAddress(newAccounts[0])
        }
      }) 
      
      provider.on('chainChanged', (chainId, oldChainId) => {
        if (Array.isArray(newAccounts) && newAccounts.length) {
        setChainId(chainId)
      }
       
      })

      provider.on("disconnect", (error) => {
        handleDisconnect()
        console.log(error);
      });
    } else {
      await handleDisconnect()
    }
  }

  const switchNetwork = async (newChainId) => {  
    if(currentProvider) {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: newChainId }],
        });


        if (newChainId == 43114 ) {
          Router.reload();
        
        }
        else{
          Router.reload();
        }
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          /*
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{ chainId: '0xf00', rpcUrl: 'https://...' }],
            });
          } catch (addError) {
            // handle "add" error
          }
          */
        }
        // handle other "switch" errors
      }
    }
  }

  const handleDisconnect =async () => {
    setConnected(false)
    setWalletAddress(undefined)
    setWallet(undefined)
    if(web3Modal) {
      await web3Modal.clearCachedProvider();
    }
    if(window.localStorage)
      window.localStorage.setItem("wallet_connect", false);
  }

  const checkTransaction = async (hash) => {
    if(currentProvider) {       
      
      const newWeb3 = new ethers.providers.Web3Provider(currentProvider, "any")
      return await newWeb3.perform('getTransactionReceipt', {transactionHash: hash})
    }
    return null
  }

  const waitForTransaction = (hash, timeOut = 1000) => {
    return new Promise((resolve, reject) => {
      if(hash === null || hash === undefined) { 
        reject()
        return
      }
      const interval = setInterval(async () => {
          const result = await checkTransaction(hash)
          if(result) {   
              if(result.status === '0x1' || result.status === 1) {
                resolve();
              } else {
                reject();
              }
              
              clearInterval(interval)
          }
      }, timeOut)
    })
  }

  useEffect(() => {
    async function initWeb3Modal() {
        try {
            if (!web3Modal) {

              if (Router.pathname == "/airdrops/avalanche") {

                console.log("pro",Router.pathname)
                const providerOptions = {
                    metamask: {
                        id: "injected",
                        name: "MetaMask",
                        type: "injected",
                        check: "isMetaMask",
                    },
                    walletconnect: {
                        package: WalletConnectProvider, // required
                        options: {
                            rpc: {
                              43114: "https://api.avax.network/ext/bc/C/rpc",
                            },
                          
                           
                            qrcodeModalOptions: {
                                mobileLinks: ["metamask", "trust"],
                            },
                        },
                    },
                };

                const web3Modal = new Web3Modal({
                    
                    cacheProvider: true,
                    providerOptions,
                    theme: 'dark',
                })

                setWeb3Modal(web3Modal)
                
              }

              else{
               
                const providerOptions = {
                    metamask: {
                        id: "injected",
                        name: "MetaMask",
                        type: "injected",
                        check: "isMetaMask",
                    },
                    walletconnect: {
                        package: WalletConnectProvider, // required
                        options: {
                            rpc: {
                              56: "https://bsc-dataseed.binance.org/",
                            },
                          
                           
                            qrcodeModalOptions: {
                                mobileLinks: ["metamask", "trust"],
                            },
                        },
                    },
                };

                const web3Modal = new Web3Modal({
                    
                    cacheProvider: true,
                    providerOptions,
                    theme: 'dark',
                })

                setWeb3Modal(web3Modal)
              }

             
            }
        } catch (e) {
            console.log(e)
        }
    }
    initWeb3Modal()
    if (connected){

      if (Router.pathname == "/airdrops/avalanche") {
        console.log("web3Modal",web3Modal)

        handleConnectAvalanche()

      }else{

        console.log("web3Modal",web3Modal)
        handleConnect()
      }
   
    }
       

}, [setWeb3Modal, web3Modal])


  return (
    <Context.Provider
      value={{
        handleConnect,
        handleDisconnect,
        switchNetwork,
        handleConnectAvalanche,
        connected,
        walletAddress,
        walletBalance,
        wallet,
        chainId,
        apylp,
        checkTransaction,
        waitForTransaction
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
