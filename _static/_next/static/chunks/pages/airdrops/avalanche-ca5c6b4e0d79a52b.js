(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[843],{21284:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/airdrops/avalanche",function(){return a(41706)}])},11245:function(e,t,a){"use strict";var n=a(85893);a(67294);t.Z=function(e){var t=e.children;return(0,n.jsx)("div",{className:"section",children:t})}},41706:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return F}});var n=a(85893),s=a(9008),i=a(34051),l=a(31555),c=(a(11163),a(71220)),r=a(85064),o=a(6151),d=a(35666),m=a.n(d),u=a(35005),p=a(11245),h=a(15626),g=a(67294),f=(a(67814),a(90209),a(64146)),x=a(35553),w=a(12752),v=a(11063),b=a(70914),A=a(94379);function D(e,t,a,n,s,i,l){try{var c=e[i](l),r=c.value}catch(o){return void a(o)}c.done?t(r):Promise.resolve(r).then(n,s)}function C(e){return function(){var t=this,a=arguments;return new Promise((function(n,s){var i=e.apply(t,a);function l(e){D(i,n,s,l,c,"next",e)}function c(e){D(i,n,s,l,c,"throw",e)}l(void 0)}))}}function k(e){var t=e.data,a=(0,h.Z)(),s=a.connected,i=(a.walletAddress,a.handleConnect,a.handleDisconnect,a.handleConnectAvalanche),l=a.switchNetwork,c=a.wallet,r=a.chainId,o=a.waitForTransaction,d=(0,w.Z)(),D=(d.getTotalStaked2,d.compound,d.getPoolInfo,d.claim,d.claimAirdrop,d.getAmount,d.getAmountAva),k=(d.getUserInfo,d.getClaimStatusAva),F=d.claimAirdropAva,S=(d.getClaimStatus,d.getTokenPerBlock,d.getRewardPerYear,d.approveNewStake,d.getPending,d.smgTokenPrice,(0,g.useState)(0)),T=S[0],j=S[1],y=(0,g.useState)(0),N=y[0],E=y[1],B=(0,g.useState)(new f.CH(t.address,v.Z.Airdrop)),M=(B[0],B[1],(0,g.useState)(new f.CH(t.address,v.Z.AirdropAva))),P=M[0],Z=M[1];(0,g.useEffect)((function(){c&&!P.signer&&Z(P.connect(c))}),[c]);var $=C(m().mark((function e(t,a){var n,l;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s){e.next=4;break}i(),e.next=12;break;case 4:return e.next=6,D(P,a);case 6:return n=e.sent,e.next=9,k(P);case 9:l=e.sent,n&&j(n),l&&E(l);case 12:case"end":return e.stop()}}),e)}))),_=C(m().mark((function e(t,a){var n;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("decimal",t),n=x.vz(T.toString(),t),F(P,n).then(C(m().mark((function e(n){return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o(n.hash,1e3).then((function(){A.fn.success("Success to claim"),$(a,t)})).catch((function(){A.fn.error("Failed to claim")}));case 1:case"end":return e.stop()}}),e)})))).catch((function(e){A.fn.error(e.data?e.data.message:e.message,"Failed to claim")}));case 3:case"end":return e.stop()}}),e)})));return(0,n.jsxs)(p.Z,{className:"p-3",children:[(0,n.jsxs)("div",{className:"d-flex align-items-center mb-3",children:[(0,n.jsx)("img",{src:t.icon,width:"50px"}),(0,n.jsxs)("div",{className:"ms-2",children:[(0,n.jsx)("h5",{className:"mb-0 ml-2",children:t.title}),(0,n.jsx)("div",{className:"text-small text-desc ml-2",children:"".concat(t.symbol)})]})]}),(0,n.jsxs)("div",{className:"panel mb-4 mt-4",children:[(0,n.jsxs)("div",{className:"mb-3",children:[t.description," ",(0,n.jsx)("br",{})," ",(0,n.jsx)("a",{href:t.url,style:{color:"#027ff4"},children:"Check your allocation"})]}),(0,n.jsxs)("div",{className:"panel",children:[(0,n.jsxs)("h5",{className:"mb-1",children:["Total ",t.symbol," Claimable"]}),(0,n.jsxs)("h5",{children:[T," ",(0,n.jsxs)("span",{className:"text-small text-desc",children:["$",t.symbol]})]})]})]}),(0,n.jsx)(u.Z,{variant:"primary",onClick:function(){return $(t.address,t.decimal)},children:s?"Check Claimable":"Connect Wallet"}),s?r!==b.Z.networkAvaID?(0,n.jsx)("div",{className:"btn btn-block v-btn--rounded mt-4 btn-primary",onClick:function(){return l(b.Z.networkAvaID)},children:"Switch To Avalanche MainNet"}):T>0&&0==N?(0,n.jsx)(u.Z,{className:"d-inline-block ml-2 align-items-center justify-content-between",variant:"primary",onClick:function(){return _(t.decimal,t.address)},children:"Claim Now"}):1==N?(0,n.jsx)(u.Z,{className:"d-inline-block ml-2 align-items-center justify-content-between",variant:"primary",disabled:!0,children:"Claimed"}):(0,n.jsx)(u.Z,{className:"d-inline-block ml-2 align-items-center justify-content-between",variant:"primary",disabled:!0,children:"Not Eligible"}):(0,n.jsx)(u.Z,{className:"d-inline-block ml-2 align-items-center justify-content-between",variant:"primary",onClick:function(){s||i()},children:"Connect Wallet"})]},"airdrop-".concat(t.address))}function F(){return(0,n.jsxs)("div",{className:"v-application",children:[(0,n.jsxs)(s.default,{children:[(0,n.jsx)("title",{children:"Smaugs"}),(0,n.jsx)("link",{rel:"icon",href:"/assets/img/favicon96x96.png",type:"image/png"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsx)(r.Z,{}),(0,n.jsx)("div",{className:"section-top mb-5",style:{backgroundColor:"#010520",paddingBottom:"100px"},children:(0,n.jsxs)("div",{className:"container pt-4 section",children:[(0,n.jsx)("div",{className:"mb-5 mt-5",children:(0,n.jsx)("h2",{className:"text-center mb-5",children:"Avalanche Airdrops  "})}),(0,n.jsx)(A.mh,{}),(0,n.jsx)(i.Z,{className:"gy-3 mt-2",children:c.AF.map((function(e){return(0,n.jsx)(l.Z,{sm:4,style:{"border-bottom":"1px solid #027ff4",borderRadius:"25px",paddingTop:"40px",paddingBottom:"40px","margin-top":"0px",paddingLeft:"25px",paddingRight:"25px"},children:(0,n.jsx)(k,{data:e})},"stake-card-".concat(e.id))}))})]})}),(0,n.jsx)(o.Z,{})]})}},71220:function(e,t,a){"use strict";a.d(t,{SG:function(){return n},AF:function(){return s}});var n=[{address:"0xD7f1fD6461d2CA1D28F0f719c9A13268Bb002b4F",icon:"/SmaugsLogo.png",title:"Smaugs Airdrop",description:"All users participating in the Wizardia pre-sale can claim the SMG airdrop.",symbol:"SMG",decimal:8,url:"https://launchpad.smaugs.com/pool/details/8/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x248c5d23F9585010247407bAD7c9B3482Fb5884c",icon:"https://cdn.freelogovectors.net/wp-content/uploads/2021/10/binance-usd-busd-logo-freelogovectors.net_.png",title:"Players Refund",description:"All users participating in the Players Art pre-sale can claim the BUSD refund.",symbol:"BUSD",decimal:18,url:"https://launchpad.smaugs.com/pool/details/2/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0xF2cEE7beAf4cCCd495a47D252e62adb7f265Bf10",icon:"https://ortcoin.org/wp-content/uploads/2021/05/com-logo.png",title:"Okratech Vesting 1",description:"All users participating in the Okratech public sale can claim the ORT vesting 1.",symbol:"ORT",decimal:8,url:"https://launchpad.smaugs.com/pool/details/12/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x2E09DC8e9282D250d3fABD7f8acFFcc3297718A6",icon:"https://pbs.twimg.com/profile_images/1471180763466928133/Gm_8ewah_400x400.jpg",title:"TwoMonkey Vesting 1",description:"All users participating in the TwoMonkey private sale can claim the TMON vesting 1.",symbol:"TMON",decimal:18,url:"https://launchpad.smaugs.com/pool/details/5/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0xA01B4c41F3D032EF5A4AA2F068974660Bb6280E9",icon:"/images/supernova.png",title:"Supernova Vesting 1",description:"All users participating in the SuperNova public sale can claim the LFC vesting 1.",symbol:"LFC",decimal:9,url:"https://launchpad.smaugs.com/pool/details/14/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x2De1569ed0740eFEa5D95E9486Fd0a07bA9f60a8",icon:"/SmaugsLogo.png",title:"Players Refund Last",description:"All users participating in the Players Art pre-sale can claim the SMG refund.",symbol:"SMG",decimal:8,url:"https://launchpad.smaugs.com/pool/details/2/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x2A895c689453FCD502556D6ddC54710C331a3c21",icon:"/images/supernova.png",title:"Supernova Vesting 2",description:"All users participating in the SuperNova public sale can claim the LFC vesting 2.",symbol:"LFC",decimal:9,url:"https://launchpad.smaugs.com/pool/details/14/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1}],s=[{address:"0xC6CAEC54FCe36837e79429535b06C25e13c6d47C",icon:"/images/metagamz.png",title:"Metag Vesting 1",description:"All users participating in the Metagamz pre-sale can claim the METAG vesting 1.",symbol:"METAG",decimal:18,url:"https://launchpad.smaugs.com/pool/details/7/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x140d8D15E8EF3222A5057355849Dc475503f9eDB",icon:"/images/AkitavaxOriginal.png",title:"Akitavax Vesting 3",description:"All users participating in the Akitavax public sale can claim the Akitavax vesting 3.",symbol:"AKITAX",decimal:18,url:"https://launchpad.smaugs.com/pool/details/6/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x53d3bfd79a22c29579220248Da910Ca870B10A97",icon:"/images/metagamz.png",title:"Metag Vesting 2",description:"All users participating in the Metagamz pre-sale can claim the METAG vesting 2.",symbol:"METAG",decimal:18,url:"https://launchpad.smaugs.com/pool/details/7/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0xFa44D206429DAE93C3ad576fdfb6451aB41D6e46",icon:"/images/AkitavaxOriginal.png",title:"Akitavax Vesting 4",description:"All users participating in the Akitavax public sale can claim the Akitavax vesting 4.",symbol:"AKITAX",decimal:18,url:"https://launchpad.smaugs.com/pool/details/6/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x6B21cEAED50A6CA13EFA34770Faa7dD159bf46FC",icon:"/images/metagamz.png",title:"Metag Vesting 3",description:"All users participating in the Metagamz pre-sale can claim the METAG vesting 3.",symbol:"METAG",decimal:18,url:"https://launchpad.smaugs.com/pool/details/7/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0xd7Ae64b8C433b37812Cb76BA84339FDe4AACc745",icon:"/images/cps.png",title:"CPS Rewards April",description:"CyberPunkScreen NFT holders can claim the revenue from the crabada game.",symbol:"TUS",decimal:18,url:"https://launchpad.smaugs.com/pool/details/7/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1}];new Date("12/29/2021 14:00"),new Date("12/31/2021 14:00"),new Date("01/02/2022 15:30"),new Date("01/05/2022 21:30"),new Date("12/31/2021 14:00"),new Date("01/01/2022 14:00"),new Date("01/05/2022 14:00"),new Date("12/31/2021 14:00"),new Date("01/01/2022 14:00"),new Date("01/05/2022 14:00")},31555:function(e,t,a){"use strict";var n=a(94184),s=a.n(n),i=a(67294),l=a(76792),c=a(85893);const r=["xxl","xl","lg","md","sm","xs"];const o=i.forwardRef(((e,t)=>{const[{className:a,...n},{as:i="div",bsPrefix:o,spans:d}]=function({as:e,bsPrefix:t,className:a,...n}){t=(0,l.vE)(t,"col");const i=[],c=[];return r.forEach((e=>{const a=n[e];let s,l,r;delete n[e],"object"===typeof a&&null!=a?({span:s,offset:l,order:r}=a):s=a;const o="xs"!==e?`-${e}`:"";s&&i.push(!0===s?`${t}${o}`:`${t}${o}-${s}`),null!=r&&c.push(`order${o}-${r}`),null!=l&&c.push(`offset${o}-${l}`)})),[{...n,className:s()(a,...i,...c)},{as:e,bsPrefix:t,spans:i}]}(e);return(0,c.jsx)(i,{...n,ref:t,className:s()(a,!d.length&&o)})}));o.displayName="Col",t.Z=o},34051:function(e,t,a){"use strict";var n=a(94184),s=a.n(n),i=a(67294),l=a(76792),c=a(85893);const r=["xxl","xl","lg","md","sm","xs"],o=i.forwardRef((({bsPrefix:e,className:t,as:a="div",...n},i)=>{const o=(0,l.vE)(e,"row"),d=`${o}-cols`,m=[];return r.forEach((e=>{const t=n[e];let a;delete n[e],null!=t&&"object"===typeof t?({cols:a}=t):a=t;const s="xs"!==e?`-${e}`:"";null!=a&&m.push(`${d}${s}-${a}`)})),(0,c.jsx)(a,{ref:i,...n,className:s()(t,o,...m)})}));o.displayName="Row",t.Z=o}},function(e){e.O(0,[479,770,774,888,179],(function(){return t=21284,e(e.s=t);var t}));var t=e.O();_N_E=t}]);