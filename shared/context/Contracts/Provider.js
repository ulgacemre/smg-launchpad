import React, { useCallback, useMemo, useEffect, useState } from 'react'
import abis from '../../abis'
import useWeb3 from '../../hooks/useWeb3'
import { Contract, BigNumber, utils } from 'ethers'
import * as ethUtil from 'ethereumjs-util';
import axios from 'axios';

import Context from './Context'
import addresses from '../../addresses'

const Provider = ({ children }) => {
  
  
  const [smaugs, setSmaugs] = useState(
    new Contract(addresses.Smaugs, abis.Smaugs)
  )  

  const [deux, setDeux] = useState(
    new Contract(addresses.Deux, abis.Smaugs)
  )  

  const [metap, setMetap] = useState(
    new Contract(addresses.Metap, abis.Smaugs)
  )  

    
  const [lp, setLp] = useState(
    new Contract(addresses.LP, abis.Smaugs)
  )  

  const [busd, setBusd] = useState(
    new Contract(addresses.Busd, abis.Smaugs)
  )  
  const [stake, setStake] = useState(
    new Contract(addresses.Stake, abis.Stake)
  )
  const [smgSale, setSMGSale] = useState(
    new Contract(addresses.SMGSale, abis.SMGSale)
  )




  const [idoTier, setIDOTier] = useState(
    new Contract(addresses.IDOTier, abis.IDOTier)
  )



  const [stakeContract12, setStakeContract1] = useState(new Contract("0xC090f7D3368a36b20b2B2553386f4E5E184cecb9", abis.NewStake))  
  const [stakeContract22, setStakeContract2] = useState(new Contract("0xbE140E29d5bD66a3755Aaac4B7507BA40cE6B7FE", abis.NewStake))  
  const [stakeContract32, setStakeContract3] = useState(new Contract("0x04bCc2bC583d7a139Be71C9f8b2e441Ce749B093", abis.LPMining))  


  // const [decimals, setDecimals] = useState(8)

  const [smgTokenPrice, setSMGTokenPrice] = useState(0)
  const [bnbTokenPrice, setBNBTokenPrice] = useState(0)
  const [tokenPriceUSD, setTokenPriceUSD] = useState(0)
  const [myTier, setMyTier] = useState(0)

  const [depositedAmount, setDepositedAmount] = useState(0)
  const [depositedAmount2, setDepositedAmount2] = useState(0)
  const [depositedAmount3, setDepositedAmount3] = useState(0)
  const [kyc, setKYC] = useState('Loading')

  const { wallet, walletAddress, chainId, connected } = useWeb3()  


  useEffect(() => {
    if (!!wallet && !stake.signer) {
      setStake(stake.connect(wallet))
    }
    if (!!wallet && !smaugs.signer) {
      setSmaugs(smaugs.connect(wallet))
    }

    if (!!wallet && !deux.signer) {
      setDeux(deux.connect(wallet))
    }

    if (!!wallet && !metap.signer) {
      setMetap(metap.connect(wallet))
    }
    if (!!wallet && !busd.signer) {
      setBusd(busd.connect(wallet))
    }
    if (!!wallet && !smgSale.signer) {
      setSMGSale(smgSale.connect(wallet))
    }

    if (!!wallet && !smgSale.signer) {
      setSMGSale(smgSale.connect(wallet))
    }

    if (!!wallet && !lp.signer) {
      setLp(lp.connect(wallet))
    }




     
      if (!!wallet && !stakeContract12.signer) {
          setStakeContract1(stakeContract12.connect(wallet))
      }

      if (!!wallet && !stakeContract22.signer) {
          setStakeContract2(stakeContract22.connect(wallet))

      }   if (!!wallet && !stakeContract32.signer) {
          setStakeContract3(stakeContract32.connect(wallet))
      } 
  
  


    if (!!wallet && !idoTier.signer) {
      setIDOTier(idoTier.connect(wallet))
    }

  }, [wallet])

  const getSMGTokenPrice = () => {
    try {
      axios('https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=0x6bfd576220e8444ca4cc5f89efbd7f02a4c94c16&vs_currencies=usd').then((response) => {
        if(response && response.data) {
          setSMGTokenPrice(response.data['0x6bfd576220e8444ca4cc5f89efbd7f02a4c94c16']?.usd);
        }          
      }).catch((e) => {
        console.log(e)
      })
    } catch(e) {
        console.log(e)
    }
  }



  const setTierr =  async() => {

    const d1 = await getDepositedAmount2(stakeContract12)
    const d2 = await getDepositedAmount2(stakeContract22)
    const d3 = await getDepositedAmount2(stakeContract32)


  
   
    if(d1){
       
       
        setDepositedAmount(utils.formatUnits(d1, 8))
    }
    if (d2) {
        setDepositedAmount2(utils.formatUnits(d2, 8))
        
    }
    if (d3) {
        setDepositedAmount3(utils.formatUnits(d3, 18))

    }

    if (d1) {
      setMyTier(parseInt((depositedAmount * 1.2) + (depositedAmount2 * 2.4) + (depositedAmount3* 25000000 * 4)))
    }
   
      
  

 

    
}  

useEffect(async() => {
  //loadKYC();
 
  setTierr()
 


}, [setTierr])


  useEffect(() => {
    //loadKYC();
    getSMGTokenPrice()
    setTierr()
    getBnbPrice()

  
  }, [])

  // useEffect(() => {
  //   if( smaugs.signer ) 
  //     smaugs.decimals().then((val) => setDecimals(val))      
  // }, [smaugs.signer])






const getTier =useCallback( async () => {
  if(chainId !== addresses.networkID)
      return;


      try {
      const tier = await idoTier.getTier(walletAddress)
      if (tier) {
        return tier;
      }

    } catch (e) {}

     
})

const getMaxAllocation =useCallback( async (idoContract) => {
 
  if(chainId !== addresses.networkID)
      return;

      try {

      const maxAlloc = parseFloat(utils.formatUnits(await idoContract.getMaxAllocation(walletAddress)))

      if (maxAlloc) {
        return maxAlloc;
      }

    } catch (e) {}

     
})


const getFunderInfo =useCallback( async (idoContract) => {

  if(chainId !== addresses.networkID)
      return;

      try {

      const funder = await idoContract.getFunderInfo(walletAddress)

   

      if(funder){
     

        return parseFloat(utils.formatUnits(funder.totalFunded))
      }

    } catch (e) {}
    
})

const fundRaised =useCallback( async (idoContract) => {
 
  if(chainId !== addresses.networkID)
      return;

      try {

      const raised = await idoContract.fundRaised()

      if(raised){
     

        return parseFloat(utils.formatUnits(raised))
      }

    } catch (e) {}
})

const whitelistAmount =useCallback( async (idoContract) => {
 
  if(chainId !== addresses.networkID)
      return;

      try {

      const amount = await idoContract.whitelistAmount(walletAddress)

      if(amount){
     

        return parseFloat(utils.formatUnits(amount))
      }

    } catch (e) {}
    
})




const getAllowanceIDO =useCallback( async (address) => {   
 
  if (!walletAddress ) return false
  try {

    const allow = await busd.allowance(walletAddress, address)

    if (allow) {
      return allow;
    }
   
    
          
  } catch (e) {}
})

const approveIDO =useCallback( async (amount,address) => {
 
  if (!walletAddress) return false
  try {
  
  return await busd.approve(address, amount)
} catch (e) {}
})




const getFundersCount = useCallback(async (idoContract) => {
 
  if (!walletAddress) return false
  try {

    const funder = await idoContract.getFundersCount()

    if (funder) {
      return funder;
    }
  
  
} catch (e) {}
})


const getfcfsFunders = useCallback(async (idoContract) => {
 
  if (!walletAddress) return false
  try {
    const fcfs = await idoContract.fcfsFunders(walletAddress)

    if (fcfs) {
      return fcfs;
    }
  
   
} catch (e) {}
})



const getCurrentRoundId =useCallback( async (idoContract) => {
 
  if(chainId !== addresses.networkID)
      return;

      try {

    

      const id = await idoContract.getCurrentRoundId()

  

    if(id){
   

      return parseFloat(id)
    }

  } catch (e) {}
   
})





const getBusdBalance = useCallback(async (userAddress) => {     
  if (!busd.signer) return     
  const address = userAddress || walletAddress
  if (!address) return null
  try {
    const decimals = await busd.decimals();
    let balance = await busd.balanceOf(address)    

    if (balance && decimals) {
      return parseFloat(utils.formatUnits(balance, decimals))
    }
   
   
  } catch (e) {}
  return null
}, [walletAddress, busd] )



const buy = useCallback(async (valueTo,smgSale) => {    
  if (!smgSale.signer) return    
  if(chainId !== addresses.networkID) return null
  try {
 
  
  return await smgSale.buy(utils.parseEther(valueTo));
} catch (e) {}
 
}, [walletAddress, chainId, smgSale])










//////// airdrop //////



const getAmount = useCallback(async (air,decimal) => {   


  try {

  const amount = await air.whitelistAmount(walletAddress)
  
  console.log("amount",amount)
  
  if(amount) {
  
    return parseFloat(utils.formatUnits(amount,decimal))
  }
} catch(e) {}


})



const getAmountAva = useCallback(async (ava,decimal) => {   


  try {

    console.log("amount",ava)
  const amount = await ava.whitelistAmount(walletAddress)
  
 
  
  if(amount) {
  
    return parseFloat(utils.formatUnits(amount,decimal))
  }
} catch(e) {

  
}


})

const getClaimStatus = useCallback(async (air) => {   

  try {
   const status = await air.wasClaimed(walletAddress)
   
  
   if(status) {
   
     return status
   }
  } catch(e) {

  
  }
 
 
 })

 const getClaimStatusAva = useCallback(async (ava) => {   

  try {
  const status = await ava.wasClaimed(walletAddress)
  
  console.log("sta",status)
 
  if(status) {
  
    return status
  }
} catch(e) {

  
}



})


 const claimAirdrop = async (air,camount) => {
  if (!walletAddress) return false
  
  console.log("camount",camount)
  return await air.withdrawTokens(camount)
}


const claimAirdropAva = async (ava,camount) => {
  if (!walletAddress) return false
  

  return await ava.withdrawTokens(camount)
}













 const getTokenPerBlock =useCallback( async (stakeContract) => {
    if(chainId !== addresses.networkID)
        return;

    const tokenPerBlock = await stakeContract.tokenPerBlock()
   

    if(tokenPerBlock) {
      return{
        tokenPerBlock: parseFloat(utils.formatUnits(tokenPerBlock, 8)),
           
        }
      }


})

const getTokenPerBlockMetap =useCallback( async (stakeContract) => {
  if(chainId !== addresses.networkID)
      return;

  const tokenPerBlock = await stakeContract.tokenPerBlock()
 

  if(tokenPerBlock) {
    return{
      tokenPerBlock: parseFloat(utils.formatUnits(tokenPerBlock, 18)),
         
      }
    }


})

const getTokenPerBlockMeta =useCallback( async (stakeContract) => {
  if(chainId !== addresses.networkID)
      return;

  const tokenPerBlock = await stakeContract.tokenPerBlock()
 

  if(tokenPerBlock) {
    return{
      tokenPerBlock: parseFloat(utils.formatUnits(tokenPerBlock, 18)),
         
      }
    }


})

const getBnbPrice=  async () => {


  try {
    let bnbPrice = await smgSale.getLatestPriceBnb()
   
   
    setBNBTokenPrice(bnbPrice)

    return bnbPrice;


    
  } catch(e) {}


}

const getPoolInfoLP = useCallback(async (stakeContract) => {
  if (!stakeContract.signer) return
  try {
      const usersPool = await stakeContract.poolInfo(0)
      const tokenPer = await stakeContract.tokenPerBlock()
      const depositedAmount = await stakeContract.getDepositedAmount(walletAddress)
   
   
    
      if(usersPool) {
        return{
            
              depositedAmount: parseFloat(utils.formatUnits(depositedAmount, 18)),
              lockupDuration: parseFloat(utils.formatUnits(usersPool.lockupDuration, 0)),
              tokenPerBlock: parseFloat(utils.formatUnits(tokenPer, 8))
          }
      }
  } catch (e) {}
})


const getPoolInfoAtlas = useCallback(async (stakeContract) => {
  if (!stakeContract.signer) return
  try {
      const usersPool = await stakeContract.poolInfo(0)
      const tokenPer = await stakeContract.tokenPerBlock()
      const depositedAmount = await stakeContract.getDepositedAmount(walletAddress)
   
   
    
      if(usersPool) {
        return{
            
              depositedAmount: parseFloat(utils.formatUnits(depositedAmount, 8)),
              lockupDuration: parseFloat(utils.formatUnits(usersPool.lockupDuration, 0)),
              tokenPerBlock: parseFloat(utils.formatUnits(tokenPer, 8))
          }
      }
  } catch (e) {}
})






const getDepositedAmount2 =( async (stakeContract) => {
  if(chainId !== addresses.networkID) return
    try {

 

 return await stakeContract.getDepositedAmount(walletAddress)
   

   
   
} catch (e) {}


})
const getPoolInfo =useCallback( async (stakeContract) => {
    if (!stakeContract.signer) return
    try {
        const usersPool = await stakeContract.poolInfo(0)
        if(usersPool) {
          return{
                rewardsAmount: parseFloat(utils.formatUnits(usersPool.rewardsAmount, 8)),
                depositedAmount: parseFloat(utils.formatUnits(usersPool.depositedAmount,8)),
                lockupDuration: parseFloat(utils.formatUnits(usersPool.lockupDuration, 0))
            }
        }
    } catch (e) {}
})

const getPoolInfoMetap =useCallback( async (stakeContract) => {
  if (!stakeContract.signer) return
  try {
      const usersPool = await stakeContract.poolInfo(0)
      if(usersPool) {
        return{
              rewardsAmount: parseFloat(utils.formatUnits(usersPool.rewardsAmount, 18)),
              depositedAmount: parseFloat(utils.formatUnits(usersPool.depositedAmount,18)),
              lockupDuration: parseFloat(utils.formatUnits(usersPool.lockupDuration, 0))
          }
      }
  } catch (e) {}
})

const getUserInfo = useCallback( async (stakeContract) => {
    if (!stakeContract.signer) return    
    if(chainId !== addresses.networkID) return

    try {
        const info = await stakeContract.userInfo(0, walletAddress)
        const pending = await stakeContract.pendingRewards(0, walletAddress)

        
        return{
            amount: parseFloat(utils.formatUnits(info.amount, 8)),
            rewardDebt: parseFloat(utils.formatUnits(info.rewardDebt,8)),
            pendingRewards: parseFloat(utils.formatUnits(pending,8),2),
            lastClaim: parseInt(utils.formatUnits(info.lastClaim, 0)) * 1000
        }
    } catch(e) {
        console.log(e)
    }
})

const getUserInfoMetap = useCallback( async (stakeContract) => {
  if (!stakeContract.signer) return    
  if(chainId !== addresses.networkID) return

  try {
      const info = await stakeContract.userInfo(0, walletAddress)
      const pending = await stakeContract.pendingRewards(0, walletAddress)

      
      return{
          amount: parseFloat(utils.formatUnits(info.amount, 18)),
          rewardDebt: parseFloat(utils.formatUnits(info.rewardDebt,18)),
          pendingRewards: parseFloat(utils.formatUnits(pending,18),2),
          lastClaim: parseInt(utils.formatUnits(info.lastClaim, 0)) * 1000
      }
  } catch(e) {
      console.log(e)
  }
})



const getUserInfoLP = useCallback( async (stakeContract) => {
  if (!stakeContract.signer) return    
  if(chainId !== addresses.networkID) return

  try {
      const info = await stakeContract.userInfo(0, walletAddress)
      const pending = await stakeContract.pendingToken(0, walletAddress)

      
      return{
        amount: parseFloat(utils.formatUnits(info.amount, 18)),
        rewardDebt: parseFloat(utils.formatUnits(info.rewardDebt, 8)),
        pending: parseFloat(utils.formatUnits(pending, 8)),
        lastClaim: parseInt(utils.formatUnits(info.lastClaim, 0)) * 1000
      }
  } catch(e) {
      console.log(e)
  }
})


const getUserInfoMetaverse = useCallback( async (stakeContract) => {
 
  if(chainId !== addresses.networkID) return

  try {
      const info = await stakeContract.userInfo(0, walletAddress)
      const pending = await stakeContract.pendingToken(0, walletAddress)

      
      return{
        amount: parseFloat(utils.formatUnits(info.amount, 8)),
        rewardDebt: parseFloat(utils.formatUnits(info.rewardDebt, 18)),
        pending: parseFloat(utils.formatUnits(pending, 18)),
        lastClaim: parseInt(utils.formatUnits(info.lastClaim, 0)) * 1000
      }
  } catch(e) {
      console.log(e)
  }
})






const claim = useCallback(async (stakeContract,pid) => {
   
    return await stakeContract.claim(pid)
})

  const getBalance = useCallback(async (userAddress) => {      
    const address = userAddress || walletAddress
    if (!address || !smaugs.signer) return null
    try {
      const decimals = await smaugs.decimals();
      let balance = await smaugs.balanceOf(address)    
     
      return parseFloat(utils.formatUnits(balance, decimals))
    } catch (e) {}
    return null
  }, [walletAddress, smaugs] )

  const getBalanceDeux = useCallback(async (userAddress) => {      
    const address = userAddress || walletAddress
    if (!address || !deux.signer) return null
    try {
      const decimals = await deux.decimals();
      let balance = await deux.balanceOf(address)    
     
      return parseFloat(utils.formatUnits(balance, decimals))
    } catch (e) {}
    return null
  }, [walletAddress, deux] )

  const getBalanceMetap = useCallback(async (userAddress) => {      
    const address = userAddress || walletAddress
    if (!address || !metap.signer) return null
    try {
      const decimals = await metap.decimals();
      let balance = await metap.balanceOf(address)    
     
      return parseFloat(utils.formatUnits(balance, decimals))
    } catch (e) {}
    return null
  }, [walletAddress, metap] )


  const getBalanceSMG = useCallback(async (userAddress) => {      
    const address = userAddress || walletAddress
    if (!address || !deux.signer) return null
    try {
      const decimals = await smaugs.decimals();
      let balance = await smaugs.balanceOf("0x23e5a17FDf71d43bb125E89eb59F950ad7bB5655")    
     
      return parseFloat(utils.formatUnits(balance, decimals))
    } catch (e) {}
    return null
  }, [walletAddress, deux] )


  const getBalanceAtlas = useCallback(async (userAddress) => {      
    const address = userAddress || walletAddress
    if (!address || !deux.signer) return null
    try {
      const decimals = await smaugs.decimals();
      let balance = await smaugs.balanceOf("0xb28FBDf2dE63E929056c8a323b4B70348ED1C006")    
     
      return parseFloat(utils.formatUnits(balance, decimals))
    } catch (e) {}
    return null
  }, [walletAddress, deux] )


  
 
    const getBalanceLP = useCallback(async ( contract) => {      
 
     
      try {
        let balance = await contract.balanceOf(walletAddress)     

        if (balance) {
          return parseFloat(utils.formatUnits(balance,18))
        }
       
       
      } catch (e) {}
      return null
    }, [walletAddress] )
  
  const getTotalStaked = useCallback(async () => {
    if (!stake.signer) return null
    try {
      const usersPool = await stake.poolInfo(0)
      const decimals = await smaugs.decimals();
      if(usersPool) {
        return utils.formatUnits(usersPool.totalDeposits, decimals)
      }
    } catch (e) {}

    return null;
  }, [stake])

  const getTotalStaked2 = useCallback(async (stakeContract) => {
    if (!stakeContract.signer) return null
    try {
      const usersPool = await stakeContract.poolInfo(0)
      const decimals = await smaugs.decimals();
      if(usersPool) {
        return utils.formatUnits(usersPool.depositedAmount, decimals)
      }
    } catch (e) {}

    return null;
  }, [stake])

  const getTotalStakedMetap = useCallback(async (stakeContract) => {
    if (!stakeContract.signer) return null
    try {
      const usersPool = await stakeContract.poolInfo(0)
      const decimals = await metap.decimals();
      if(usersPool) {
        return utils.formatUnits(usersPool.depositedAmount, decimals)
      }
    } catch (e) {}

    return null;
  }, [stake])

  const getAllowance = useCallback(async () => {   
    if (!walletAddress || !smaugs.signer) return null
    try {
      return (await smaugs.allowance(walletAddress, addresses.Stake))
    } catch (e) {}
    return null;
  }, [walletAddress, smaugs])


  const approveNewStake = useCallback(async (address,amount) => {
    if (!walletAddress || !smaugs.signer) return false
    
    return await smaugs.approve(address, amount)
  })

  const approveDeuxStake = useCallback(async (address,amount) => {
    if (!walletAddress || !deux.signer) return false
    
    return await deux.approve(address, amount)
  })

  const approveMetapStake = useCallback(async (address,amount) => {
    if (!walletAddress || !metap.signer) return false
    
    return await metap.approve(address, amount)
  })

  const approveStake = useCallback(async (amount) => {
    if (!walletAddress || !smaugs.signer) return false
    
    return await smaugs.approve(addresses.Stake, amount)
  })
  


  const withdraw = async (amount) => {
    if (!walletAddress || !stake.signer) return false

    const decimals = await smaugs.decimals();
    const bigAmount = utils.parseUnits(amount.toString(), decimals)
    return await stake.withdraw(0, bigAmount)
  }
  
  const compound = async () => {
    if (!walletAddress || !stake.signer) return false
    
    return await stake.compound(0)
  }
  
  const getUserInfo3 = useCallback(async () => {
    if (!walletAddress || !stake.signer) return null    
    if(chainId !== addresses.networkID) return null  
    try {
      const userInfo = await stake.userInfo(0, walletAddress)
      const decimals = await smaugs.decimals();


      if(userInfo)
        return {
          amount: parseFloat(utils.formatUnits(userInfo.amount, 8)),
          rewardDebt: parseFloat(utils.formatUnits(userInfo.rewardDebt, 8)),
          tokensUnlockTime: parseFloat(utils.formatUnits(userInfo.tokensUnlockTime, 8)),
        }
    } catch(e) {}
      
    return null
  }, [walletAddress, chainId, stake])


  const getUserInfo2 = useCallback(async () => {
    if (!walletAddress || !stake.signer) return null    
    if(chainId !== addresses.networkID) return null  
    try {
      const userInfo = await stake.userInfo(0, walletAddress)
      const decimals = await smaugs.decimals();

      
      if(userInfo)
        return {
          amount: utils.formatUnits(userInfo.amount, decimals),
          rewardDebt: parseFloat(utils.formatUnits(userInfo.rewardDebt, decimals)),
          tokensUnlockTime: parseFloat(utils.formatUnits(userInfo.tokensUnlockTime, decimals)),
        }
    } catch(e) {}
      
    return null
  }, [walletAddress, chainId, stake])
  
  const getRewardPerYear = useCallback(async () => {
    if (!stake.signer) return null      
      
    try {
      const rewardPerSecond = await stake.rewardPerSecond()
      const decimals = await smaugs.decimals();
      const totalSMGRedistributed = await stake.totalSMGRedistributed();
      
      if(rewardPerSecond) {
        return parseFloat(utils.formatUnits((rewardPerSecond.mul(31536000)).add(totalSMGRedistributed), decimals))
      }
    } catch(e) {}
    return null;
  }, [stake])
  
  const getPending = useCallback(async () => {
    if (!walletAddress || !stake.signer) return null      

    try {
      const pending = await stake.pending(0, walletAddress)
      const decimals = await smaugs.decimals();
      if(pending) {
        return parseFloat(utils.formatUnits(pending, decimals))
      }
    } catch(e) {}
    return null;
  }, [walletAddress, stake])

  ////////////////////////////////////////////////////////////////
  //// SMG SALE
  ////////////////////////////////////////////////////////////////
  const SALE_DECIMAL = 18;
  const saleInfo = useCallback(async () => {    
    if (!connected || !smgSale.signer) return null  
    if(chainId !== addresses.networkID) return null

    try {
      let result = await smgSale.sale()
       
      let bnbPrice = await smgSale.getLatestPriceBnb()


      if( result === null ) return null
     
      let bnb  = parseFloat(utils.formatUnits((result.totalAVAXRaised).toString(), SALE_DECIMAL));

   

      return {
        ...result, 
        tokenPriceInBNB: parseFloat(utils.formatUnits(result.tokenPriceInAVAX.toString(), SALE_DECIMAL)),
        amountOfTokensToSell: parseFloat(utils.formatUnits(result.amountOfTokensToSell.toString(), SALE_DECIMAL)),
        totalTokensSold: parseFloat(utils.formatUnits(result.totalTokensSold.toString(), SALE_DECIMAL)),
        totalAVAXRaised: bnb,
        tokensUnlockTime: new Date(result.tokensUnlockTime*1000),
        bnbPrice: bnbPrice

      }
    } catch(e) {}

    return null
  }, [connected, chainId, smgSale])
  
  const generateSignature = (digest, privateKey) => {
    // prefix with "\x19Ethereum Signed Message:\n32"
    // Reference: https://github.com/OpenZeppelin/openzeppelin-contracts/issues/890
    const prefixedHash = ethUtil.hashPersonalMessage(ethUtil.toBuffer(digest));
    // sign message
    const {v, r, s} = ethUtil.ecsign(prefixedHash, Buffer.from(privateKey, 'hex'))

    // generate signature by concatenating r(32), s(32), v(1) in this order
    // Reference: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/76fe1548aee183dfcc395364f0745fe153a56141/contracts/ECRecovery.sol#L39-L43
    const vb = Buffer.from([v]);
    const signature = Buffer.concat([r, s, vb]);

    return signature;
  }

  const signRegistration = (userAddress, roundId, contractAddress, privateKey) => {
    // compute keccak256(abi.encodePacked(user, roundId, address(this)))
    const digest = utils.keccak256(
      utils.solidityPack(
        ['address', 'uint256', 'address'],
        [userAddress, roundId, contractAddress]
      )
    );
    return generateSignature(digest, privateKey);
  }

  const signParticipation = (userAddress, amount, roundId, amountOfXavaToBurn, contractAddress, privateKey) => {
    // compute keccak256(abi.encodePacked(user, amount, roundId))
    const digest = utils.keccak256(
      utils.solidityPack(
        ['address', 'uint256', 'uint256', 'uint256', 'address'],
        [userAddress, amount, amountOfXavaToBurn, roundId, contractAddress]
      )
    );

    return generateSignature(digest, privateKey);
  }

  const register = useCallback(async (roundId) => {    
    if (!walletAddress || !smgSale.signer) return null  
    if(chainId !== addresses.networkID) return null

    try {
      const depositValue = await smgSale.registrationDepositAVAX()

      
      return await smgSale.registerForSale(roundId,{ value: depositValue });
    } catch(e) {
console.log(e);

    }

    return null
  }, [walletAddress, chainId, smgSale])


  const participate = useCallback(async (roundId,valueTo,allocation) => {    
    if (!walletAddress || !smgSale.signer) return null  
    if(chainId !== addresses.networkID) return null

      const bnb = await saleInfo()


      let bnbPrice = await smgSale.getLatestPriceBnb()

      if (bnbPrice) {    
    
      const bnbAmount = (0.3/bnbPrice.toNumber() * valueTo).toString();

      const PARTICIPATION_AMOUNT = (utils.parseEther("150".toString())); // Amount of tokens
      const AMOUNT_OF_SMG_TO_BURN = 0;
      const PARTICIPATION_VALUE = utils.parseEther(bnbAmount.toString()); //BNB

      console.log("bnb amount", PARTICIPATION_VALUE)

    
      return await smgSale.participate(PARTICIPATION_VALUE,PARTICIPATION_AMOUNT,AMOUNT_OF_SMG_TO_BURN,roundId,{ value:(PARTICIPATION_VALUE) });
    }
    return null
  }, [walletAddress, chainId, smgSale])
  
  const getAllocation = () => {
    return axios(
        "http://launchpad-api.smaugs.com:3000/api/Sales/allocation?walletAddress=0x6AD8734867685272742e284b206C7E119e79fB24", 
    )
}



  const getCurrentRound = useCallback(async () => {
    if (!connected || !smgSale.signer) return null  
    if(chainId !== addresses.networkID) return null

    try {
      return await smgSale.getCurrentRound();
    } catch(e) {}

    return null
  }, [connected, chainId, smgSale])


  const getVestingInfo = useCallback(async () => {
    if (!connected || !smgSale.signer) return null  
    if(chainId !== addresses.networkID) return null

    try {
      return await smgSale.getVestingInfo();
    } catch(e) {}

    return null
  }, [connected, chainId, smgSale])


  



  const getRegistration = useCallback(async () => {
    if (!connected || !smgSale.signer) return null  
    if(chainId !== addresses.networkID) return null

    try {
      return await smgSale.registration();
    } catch(e) {}

    return null
  }, [connected, chainId, smgSale])
  
  const roundIdToRound = useCallback(async (roundId) => {
    if (!connected || !smgSale.signer) return null    
    if(chainId !== addresses.networkID) return null

    try {
      return await smgSale.roundIdToRound(roundId);
    } catch(e) {}

    return null
  }, [connected, chainId, smgSale])

  

  const getNumberOfParticipants = useCallback(async (roundId) => {
    if (!connected || !smgSale.signer) return null    
    if(chainId !== addresses.networkID) return null

    try {
      return await smgSale.numberOfParticipants();
    } catch(e) {}

    return null
  }, [connected, chainId, smgSale])

  const getNumberOfRegisteredUsers = useCallback(async (roundId) => {
    if (!connected || !smgSale.signer) return null    
    if(chainId !== addresses.networkID) return null

    try {
      return await smgSale.getNumberOfRegisteredUsers();
    } catch(e) {}

    return null
  }, [connected, chainId, smgSale])



  
  
  const addressToRoundRegisteredFor = useCallback(async () => {
    if (!connected || !smgSale.signer) return null    
    if(chainId !== addresses.networkID) return null

    try {
      const result = await smgSale.addressToRoundRegisteredFor(walletAddress)
      return result.toNumber();
    } catch(e) {}

    return null
  }, [connected, walletAddress, chainId, smgSale])

  const getParticipation = useCallback(async () => {
    if (!connected || !smgSale.signer) return null    
    if(chainId !== addresses.networkID) return null

    try {
      return await smgSale.getParticipation(walletAddress);
    } catch(e) {}

    return null
  }, [connected, walletAddress, chainId, smgSale])
  

  const withdrawTokens = useCallback(async (portionId) => {
    if (!connected || !smgSale.signer) return null    
    if(chainId !== addresses.networkID) return null

    try {
      return await smgSale.withdrawTokens(portionId);
    } catch(e) {}

    return null
  }, [connected, walletAddress, chainId, smgSale])

  
  const userToParticipation = useCallback(async () => {
    if (!connected || !smgSale.signer) return null    
    if(chainId !== addresses.networkID) return null

    try {
      return await smgSale.userToParticipation(walletAddress);
    } catch(e) {}

    return null
  }, [connected, walletAddress, chainId, smgSale])



const withdraw2 = useCallback(async (amount,stakeContract,withReward = true) => {
    if (!stakeContract.signer) return false

    const bigAmount = utils.parseUnits(amount.toString(), 8)
    return await stakeContract.withdraw(0, bigAmount, withReward)
})

const withdrawMetap = useCallback(async (amount,stakeContract,withReward = true) => {
  if (!stakeContract.signer) return false

  const bigAmount = utils.parseUnits(amount.toString(), 18)
  return await stakeContract.withdraw(0, bigAmount, withReward)
})

const withdrawLP = useCallback(async (amount,stakeContract,withReward = true) => {
  if (!stakeContract.signer) return false

  const bigAmount = utils.parseUnits(amount.toString(), 18)
  return await stakeContract.withdraw(0, bigAmount, withReward)
})

const emergencyWithdraw = useCallback(async (stakeContract,amount) => {
    if (!stakeContract.signer) return false

    const bigAmount = utils.parseUnits(amount.toString(), 8)
    return await stakeContract.emergencyWithdraw(0, bigAmount)
})

const emergencyWithdrawMetap = useCallback(async (stakeContract,amount) => {
  if (!stakeContract.signer) return false

  const bigAmount = utils.parseUnits(amount.toString(), 18)
  return await stakeContract.emergencyWithdraw(0, bigAmount)
})

const emergencyWithdrawLP = useCallback(async (stakeContract,amount) => {
  if (!stakeContract.signer) return false

  const bigAmount = utils.parseUnits(amount.toString(), 18)
  return await stakeContract.emergencyWithdraw(0, bigAmount)
})



    
const deposit = useCallback(async (amount) => {
  if (!walletAddress || !stake.signer) return false

  const decimals = await smaugs.decimals();
  const bigAmount = utils.parseUnits(amount.toString(), decimals)
  return await stake.deposit(0, bigAmount)
})


const deposit2 = useCallback(async (stakeContract,amount) => {
    const bigAmount = utils.parseUnits(amount.toString(), 8)
    return await stakeContract.deposit(0, bigAmount)
})

const depositMetap = useCallback(async (stakeContract,amount) => {
  const bigAmount = utils.parseUnits(amount.toString(), 18)
  return await stakeContract.deposit(0, bigAmount)
})

const depositLp = useCallback(async (stakeContract2,amount) => {
  const bigAmount = utils.parseUnits(amount.toString(), 18)
  return await stakeContract2.deposit(0, bigAmount,true)
})

const depositMeta = useCallback(async (stakeContract2,amount) => {
  const bigAmount = utils.parseUnits(amount.toString(), 8)
  return await stakeContract2.deposit(0, bigAmount,true)
})

  return (
    <Context.Provider
      value={{
        kyc,
        smgTokenPrice,
        myTier,
        depositedAmount,
        depositedAmount2,
        depositedAmount3,
        bnbTokenPrice,
        tokenPriceUSD,
        depositMetap,
        claimAirdrop,
        getBalanceMetap,
        claimAirdropAva,
        depositLp,
        depositMeta,
        getCurrentRoundId,
        getClaimStatus,
        getClaimStatusAva,
        whitelistAmount,
        getTier,
        fundRaised,
        getfcfsFunders,
        getAmount,
        getAmountAva,
        buy,
        getFundersCount,
        getBusdBalance,
        getMaxAllocation,
        getBalanceLP,
        getBalanceSMG,
        getBalanceAtlas,
        getTokenPerBlockMetap,
        getDepositedAmount2,
        getFunderInfo,
        getBalance,
        emergencyWithdraw,
        emergencyWithdrawLP,
        emergencyWithdrawMetap,
        getTotalStaked,
        getAllowance,
        getAllowanceIDO,
        getPoolInfo,
        getPoolInfoAtlas,
        getPoolInfoMetap,
        getUserInfoMetap,
        getPoolInfoLP,
        getUserInfoMetaverse,
        approveStake,
        getBnbPrice,
        claim,
        approveIDO,
        approveNewStake,
        approveMetapStake,
        approveDeuxStake,
        deposit2,
        getUserInfoLP,
        deposit,
        withdraw2,
        withdrawMetap,
        withdraw,
        withdrawLP,
        compound,
        getUserInfo,
        getUserInfo2,
        getTotalStaked2,
        getTotalStakedMetap,
        getTokenPerBlock,
        getTokenPerBlockMeta,
        getRewardPerYear,
        getPending,
        saleInfo,
        register,
        participate,
        getBalanceDeux,
        getCurrentRound,
        getVestingInfo,
        getRegistration,
        getAllocation,
        roundIdToRound,
        withdrawTokens,
        getNumberOfParticipants,
        getNumberOfRegisteredUsers,
        addressToRoundRegisteredFor,
        getParticipation,
        userToParticipation
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
