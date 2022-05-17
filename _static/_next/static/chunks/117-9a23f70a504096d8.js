"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[117],{29505:function(e,t,n){var a=n(85893),s=n(67294);t.Z=function(e){var t=e.max,n=e.value,r=e.currency,i=e.placeholder,c=e.className,o=void 0===c?"":c,l=e.onChange,d=(0,s.useRef)(null);return(0,a.jsxs)("div",{className:"d-flex justify-content-between align-items-center caption ".concat(o),children:[(0,a.jsx)("input",{type:"text",value:n,className:"form-control v-input",ref:d,placeholder:i,onChange:function(e){l&&l(e.target.value)},style:{fontSize:"1rem"}}),(0,a.jsxs)("div",{style:{flex:"0 0 auto"},children:[(0,a.jsx)("span",{style:{border:"#1e1e1e solid 1px",fontSize:"0.75rem",cursor:"pointer"},className:"v-span-rounded",onClick:function(){d.current.value=t,l&&l(t)},children:"Max"}),(0,a.jsx)("span",{className:"primary--text ml-2",children:r})]})]})}},3506:function(e,t,n){var a=n(35666),s=n.n(a),r=n(85893),i=n(67294),c=n(36968),o=n(64146),l=n(35553),d=n(94379),u=n(15626),m=n(12752),f=n(70914),p=n(29505),h=n(28757),v=n(11063),x=n(63725),b=n(11163);function w(e,t,n,a,s,r,i){try{var c=e[r](i),o=c.value}catch(l){return void n(l)}c.done?t(o):Promise.resolve(o).then(a,s)}function g(e){return function(){var t=this,n=arguments;return new Promise((function(a,s){var r=e.apply(t,n);function i(e){w(r,a,s,i,c,"next",e)}function c(e){w(r,a,s,i,c,"throw",e)}i(void 0)}))}}function k(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function j(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var S=n(96486);t.Z=function(e){var t=e.isStake,n=void 0===t||t,a=e.className,w=void 0===a?"":a,y=e.show,N=void 0!==y&&y,C=e.onClose,F=void 0===C?function(){}:C,D=j(e,["isStake","className","show","onClose"]),A=(0,m.Z)(),E=A.getBalance,T=A.smgTokenPrice,B=A.getPoolInfo,Z=(A.withdraw2,A.emergencyWithdraw,A.getUserInfo),I=A.deposit2,O=(0,u.Z)(),P=O.chainId,M=O.wallet,G=(O.walletAddress,O.waitForTransaction),z=(0,i.useState)(0),U=z[0],R=z[1],V=(0,i.useState)(0),$=V[0],_=V[1],L=(0,i.useState)(),H=L[0],W=L[1],Y=(0,b.useRouter)().query.address,q=(0,i.useState)(new o.CH(Y||D.address||"0xC090f7D3368a36b20b2B2553386f4E5E184cecb9",v.Z.NewStake)),K=q[0],X=q[1],J=(0,i.useState)(0),Q=J[0],ee=J[1],te=(0,i.useState)(!1),ne=te[0],ae=te[1],se=(0,i.useState)(!1),re=(se[0],se[1],(0,i.useState)("")),ie=re[0],ce=re[1];(0,i.useEffect)((function(){M&&!K.signer&&X(K.connect(M))}),[M]),(0,i.useEffect)(g(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(P===f.Z.networkID){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,Z(K);case 4:(t=e.sent)&&_(t);case 6:case"end":return e.stop()}}),e)}))),[P,Z]),(0,i.useEffect)(g(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(P===f.Z.networkID){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,B(K);case 4:(t=e.sent)&&W(t);case 6:case"end":return e.stop()}}),e)}))),[P,B]),(0,i.useEffect)((function(){P!==f.Z.networkID&&F()}),[P]),(0,i.useEffect)(g(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(P===f.Z.networkID){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,E();case 4:(t=e.sent)&&R(t);case 6:case"end":return e.stop()}}),e)}))),[P,E]);var oe=S.debounce((function(){ce("")}),3e3);return(0,i.useEffect)((function(){ae(!1),ce(""),ee(0)}),[N]),(0,r.jsxs)(h.Z,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){k(e,t,n[t])}))}return e}({title:n?"Stake SMG tokens":"Unstake SMG tokens",className:w,show:N,onClose:F},D,{children:[(0,r.jsxs)("div",{className:"text-center text-desc mb-2",style:{color:"red",fontSize:"18px"},children:["You have ",(0,x.Fm)(((null===$||void 0===$?void 0:$.lastClaim)||(new Date).getTime())+1e3*((null===H||void 0===H?void 0:H.lockupDuration)||0))," remaining lock period"]}),(0,r.jsxs)("div",{className:"py-2 mt-3",children:["Balance : ",l.Fn(n?U:null===$||void 0===$?void 0:$.amount)," SMG"]}),(0,r.jsx)(p.Z,{value:Q,currency:"SMG",placeholder:"Input Amount",className:"py-2",max:n?U:null===$||void 0===$?void 0:$.amount,onChange:function(e){return ee(e)}}),n?(0,r.jsxs)("div",{className:"d-flex justify-content-between mb-3 fee",children:[(0,r.jsxs)("div",{className:"py-2",children:["Final Stake Amount: ",(0,r.jsx)("br",{})]}),(0,r.jsxs)("div",{className:"py-2",children:[Q," SMG"]})]}):(0,r.jsx)("div",{children:" "}),(0,r.jsxs)("div",{className:"d-flex justify-content-between mb-3",children:[(0,r.jsx)("div",{className:"py-1",children:"USD"}),(0,r.jsxs)("div",{className:"py-1",children:["$",(Q*T).toFixed(2)]})," "]}),(0,r.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-outline-primary mr-3",onClick:F,children:"Cancel"}),(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-primary mt-0",onClick:function(){if(!ne){ae(!0);var e=parseFloat(Q);e>0&&e<=(n?U:null===$||void 0===$?void 0:$.amount)?I(K,e).then((function(e){G(e.hash,1e3).then((function(){d.fn.success("Success to deposit"),ae(!1),Z(K).then((function(e){e&&_(e)})),B(K).then((function(e){e&&W(e)})),F()})).catch((function(){d.fn.error("Failed to deposit"),ae(!1)}))})).catch((function(e){ae(!1),e.data?(d.fn.error(e.data.message,"Failed to deposit"),ce(e.data.message)):(d.fn.error(e.message,"Failed to deposit"),ce(e.message)),oe()})):(ce("Please input valid amount for staking/unstaking"),oe())}},children:ne?(0,r.jsx)(c.Z,{animation:"border",size:"sm"}):(0,r.jsx)("span",{children:"Stake"})})]}),(0,r.jsx)("div",{className:"text-danger my-2",children:ie})]}))}},51644:function(e,t,n){n.d(t,{Z:function(){return E}});var a=n(35666),s=n.n(a),r=n(85893),i=n(67294),c=n(67814),o=n(36968),l=(n(90209),n(28757)),d=n(11163),u=n(64146),m=n(2593),f=n(35553),p=n(94379),h=n(15626),v=n(12752),x=n(70914),b=n(11063),w=n(3506),g=n(29505),k=n(63725);function j(e,t,n,a,s,r,i){try{var c=e[r](i),o=c.value}catch(l){return void n(l)}c.done?t(o):Promise.resolve(o).then(a,s)}function S(e){return function(){var t=this,n=arguments;return new Promise((function(a,s){var r=e.apply(t,n);function i(e){j(r,a,s,i,c,"next",e)}function c(e){j(r,a,s,i,c,"throw",e)}i(void 0)}))}}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var C=function(e){var t=e.isStake,n=void 0===t||t,a=e.className,c=void 0===a?"":a,m=e.show,w=void 0!==m&&m,j=e.onClose,C=void 0===j?function(){}:j,F=N(e,["isStake","className","show","onClose"]),D=(0,v.Z)(),A=D.getBalance,E=D.smgTokenPrice,T=(D.deposit2,D.withdraw2),B=D.emergencyWithdraw,Z=D.getPoolInfo,I=D.getUserInfo,O=(0,h.Z)(),P=O.chainId,M=O.wallet,G=(O.walletAddress,O.waitForTransaction),z=(0,d.useRouter)().query.address,U=(0,i.useState)(0),R=U[0],V=U[1],$=(0,i.useState)(0),_=$[0],L=$[1],H=(0,i.useState)(),W=H[0],Y=H[1],q=(0,i.useState)(new u.CH(z||F.addrees||"0xC090f7D3368a36b20b2B2553386f4E5E184cecb9",b.Z.NewStake)),K=q[0],X=q[1],J=(0,i.useState)(0),Q=J[0],ee=J[1],te=(0,i.useState)(!1),ne=te[0],ae=te[1],se=(0,i.useState)(!1),re=se[0],ie=se[1],ce=(0,i.useState)(""),oe=ce[0],le=ce[1],de=3e3;return(0,i.useEffect)((function(){ae(!1),ie(!1),le(""),ee(0)}),[w]),(0,i.useEffect)((function(){M&&!K.signer&&X(K.connect(M))}),[M]),(0,i.useEffect)((function(){P!==x.Z.networkID&&C()}),[P]),(0,i.useEffect)(S(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(P===x.Z.networkID){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,A();case 4:(t=e.sent)&&V(t);case 6:case"end":return e.stop()}}),e)}))),[P,A]),(0,i.useEffect)(S(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(P===x.Z.networkID){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,I(K);case 4:(t=e.sent)&&L(t);case 6:case"end":return e.stop()}}),e)}))),[P,I]),(0,i.useEffect)(S(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(P===x.Z.networkID){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,Z(K);case 4:(t=e.sent)&&Y(t);case 6:case"end":return e.stop()}}),e)}))),[P,Z]),(0,r.jsxs)(l.Z,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){y(e,t,n[t])}))}return e}({title:n?"Stake SMG tokens":"Unstake SMG tokens",className:c,show:w,onClose:C},F,{children:[(0,r.jsxs)("div",{className:"text-center text-desc mb-2",style:{color:"red",fontSize:"18px"},children:["You have ",(0,k.Fm)(((null===_||void 0===_?void 0:_.lastClaim)||(new Date).getTime())+1e3*((null===W||void 0===W?void 0:W.lockupDuration)||0))," remaining lock period"]}),(0,r.jsxs)("div",{className:"py-2 mt-3",children:["Stake Balance : ",f.Fn(n?R:null===_||void 0===_?void 0:_.amount)," SMG"]}),(0,r.jsx)(g.Z,{value:Q,currency:"SMG",placeholder:"Input Amount",className:"py-2",max:n?R:null===_||void 0===_?void 0:_.amount,onChange:function(e){return ee(e)}}),n?(0,r.jsxs)("div",{className:"d-flex justify-content-between mb-3 fee",children:[(0,r.jsxs)("div",{className:"py-2",children:["Final Stake Amount: ",(0,r.jsx)("br",{})]}),(0,r.jsxs)("div",{className:"py-2",children:[Q," SMG"]})]}):(0,r.jsx)("div",{children:" "}),(0,r.jsxs)("div",{className:"d-flex justify-content-between mb-3",children:[(0,r.jsx)("div",{className:"py-1",children:"USD"}),(0,r.jsxs)("div",{className:"py-1",children:["$",(Q*E).toFixed(2)]})," "]}),(0,r.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-outline-primary mr-3",onClick:C,children:"Cancel"}),"0 days"==(0,k.Fm)(((null===_||void 0===_?void 0:_.lastClaim)||(new Date).getTime())+1e3*((null===W||void 0===W?void 0:W.lockupDuration)||0))?(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-primary mt-0",onClick:function(){if(!ne){var e=parseFloat(Q);e>0&&e<=(n?R:null===_||void 0===_?void 0:_.amount)?(ae(!0),T(e,K).then((function(e){G(e.hash,1e3).then((function(){p.fn.success("Success to withdraw"),ae(!1),I().then((function(e){e&&L(e)})),Z(K).then((function(e){e&&Y(e)})),C()})).catch((function(){p.fn.error("Failed to withdraw"),ae(!1)}))})).catch((function(e){ae(!1),e.data?p.fn.error(e.data.message,"Failed to withdraw"):p.fn.error(e.message,"Failed to withdraw"),de()}))):(le("Please input valid amount for staking/unstaking"),de())}},children:ne?(0,r.jsx)(o.Z,{animation:"border",size:"sm"}):(0,r.jsx)("span",{children:"Unstake"})}):(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-primary mt-0 disabled",children:ne?(0,r.jsx)(o.Z,{animation:"border",size:"sm"}):(0,r.jsx)("span",{children:"Unstake"})})]}),(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-primary mt-3",onClick:function(){if(!ne){var e=parseFloat(Q);e>0&&e<=(n?R:null===_||void 0===_?void 0:_.amount)?(ie(!0),B(K,e).then((function(e){G(e.hash,1e3).then((function(){p.fn.success("Success to withdraw"),ie(!1);I().then((function(e){e&&L(e)}));C()})).catch((function(){p.fn.error("Failed to withdraw"),ie(!1)}))})).catch((function(e){ie(!1),e.data?(p.fn.error(e.data.message,"Failed to withdraw"),le(e.data.message)):(p.fn.error(e.message,"Failed to withdraw"),le(e.message))}))):le("Please input valid amount for staking/unstaking")}},children:re?(0,r.jsx)(o.Z,{animation:"border",size:"sm"}):"0x4632125F84545c5C1144775755C6936eFBBe95b7"==z?(0,r.jsx)("span",{children:"Emergency Unstake (40% fee)"}):"0xC090f7D3368a36b20b2B2553386f4E5E184cecb9"==z?(0,r.jsx)("span",{children:"Emergency Unstake (15% fee)"}):(0,r.jsx)("span",{children:"Emergency Unstake (25% fee)"})}),(0,r.jsx)("div",{className:"text-danger my-2",children:oe})]}))};function F(e,t,n,a,s,r,i){try{var c=e[r](i),o=c.value}catch(l){return void n(l)}c.done?t(o):Promise.resolve(o).then(a,s)}function D(e){return function(){var t=this,n=arguments;return new Promise((function(a,s){var r=e.apply(t,n);function i(e){F(r,a,s,i,c,"next",e)}function c(e){F(r,a,s,i,c,"throw",e)}i(void 0)}))}}var A=n(96486),E=function(e){var t=e.data,n=(0,d.useRouter)().query.address,a=(0,h.Z)(),g=a.connected,k=a.wallet,j=a.walletAddress,S=a.chainId,y=a.switchNetwork,N=a.handleConnect,F=a.waitForTransaction,E=(0,v.Z)(),T=E.getTotalStaked2,B=(E.compound,E.getPoolInfo),Z=E.claim,I=E.getUserInfo,O=E.deposit2,P=E.getTokenPerBlock,M=E.emergencyWithdraw,G=(E.getRewardPerYear,E.approveNewStake),z=E.getPending,U=E.smgTokenPrice,R=(0,i.useState)(new u.CH("0x6bfd576220e8444ca4cc5f89efbd7f02a4c94c16",b.Z.Smaugs)),V=R[0],$=R[1],_=(0,i.useState)(new u.CH(n||t||"0xC090f7D3368a36b20b2B2553386f4E5E184cecb9",b.Z.NewStake)),L=_[0],H=_[1],W=(0,i.useState)(new u.CH("0xbE140E29d5bD66a3755Aaac4B7507BA40cE6B7FE",b.Z.NewStake)),Y=W[0],q=W[1],K=(0,i.useState)(!1),X=K[0],J=K[1],Q=(0,i.useState)(0),ee=Q[0],te=Q[1],ne=(0,i.useState)(0),ae=ne[0],se=ne[1],re=(0,i.useState)(0),ie=re[0],ce=re[1],oe=(0,i.useState)(m.O$.from(0)),le=oe[0],de=oe[1],ue=(0,i.useState)(0),me=ue[0],fe=ue[1],pe=(0,i.useState)(0),he=(pe[0],pe[1]),ve=(0,i.useState)(),xe=ve[0],be=ve[1],we=(0,i.useState)(!1),ge=we[0],ke=we[1],je=(0,i.useState)(""),Se=je[0],ye=je[1],Ne=(0,i.useState)(0),Ce=(Ne[0],Ne[1],(0,i.useState)(!1)),Fe=Ce[0],De=Ce[1],Ae=(0,i.useState)(!1),Ee=Ae[0],Te=Ae[1],Be=(0,i.useState)(!0),Ze=Be[0],Ie=Be[1],Oe=m.O$.from("1844674407370955200000000000"),Pe=D(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(j&&V.signer){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,V.allowance(j,n);case 5:(t=e.sent)&&de(t),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(2);case 11:case"end":return e.stop()}}),e,null,[[2,9]])}))),Me=(0,i.useCallback)(D(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(S===x.Z.networkID){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,Pe();case 4:(t=e.sent)&&de(t);case 6:case"end":return e.stop()}}),e)})))),Ge=D(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(S===x.Z.networkID){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,B(L);case 4:(t=e.sent)&&be(t);case 6:case"end":return e.stop()}}),e)}))),ze=D(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(S===x.Z.networkID){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,z();case 4:(t=e.sent)&&he(t);case 6:case"end":return e.stop()}}),e)}))),Ue=(A.debounce((function(){ye("")}),3e3),D(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(le.isZero()){e.next=2;break}return e.abrupt("return");case 2:ke(!0),G(n,Oe).then(D(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:F(t.hash,1e3).then((function(){p.fn.success("Success to approve"),Me(),ke(!1)})).catch((function(){p.fn.error("Failed to approve"),ke(!1)}));case 1:case"end":return e.stop()}}),e)})))).catch((function(e){p.fn.error(e.data?e.data.message:e.message,"Failed to approve"),ke(!1)}));case 4:case"end":return e.stop()}}),e)})))),Re=function(){Ie(!0),De(!0)},Ve=D(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("1"),!ge){e.next=3;break}return e.abrupt("return");case 3:console.log("2"),ke(!0),Z(L,0).then(D(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:F(t.hash,1e3).then((function(){p.fn.success("Success to harvest"),console.log("3"),ke(!1)})).catch((function(){p.fn.error("Failed to withdraw"),ke(!1)}));case 1:case"end":return e.stop()}}),e)})))).catch((function(e){ke(!1),e.data?p.fn.error(e.data.message,"Failed to withdraw"):p.fn.error(e.message,"Failed to withdraw")}));case 6:case"end":return e.stop()}}),e)}))),$e=D(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ke(!0),t=me.amount,M(L,me.amount).then((function(e){F(e.hash,14e3).then((function(){p.fn.success("Success to withdraw"),ke(!1),O(Y,t-16*t/100).then((function(e){F(e.hash,4e3).then((function(){p.fn.success("Success to transfer"),ke(!1),I(L).then((function(e){e&&fe(e)}))})).catch((function(){p.fn.error("Failed to deposit"),ke(!1)}))}));I().then((function(e){e&&fe(e)}))})).catch((function(){ke(!1),p.fn.error("Failed to withdraw")}))})).catch((function(e){ke(!1),e.data?(p.fn.error(e.data.message,"Failed to withdraw"),ye(e.data.message)):(p.fn.error(e.message,"Failed to withdraw"),ye(e.message))}));case 3:case"end":return e.stop()}}),e)}))),_e=D(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(S===x.Z.networkID){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,I(L);case 4:t=e.sent,fe(t);case 6:case"end":return e.stop()}}),e)}))),Le=D(s().mark((function e(){var t,n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P(L);case 2:return t=e.sent,e.next=5,T(L);case 5:n=e.sent,null!==t&&null!==n&&(te(parseFloat(n).toFixed(2)),0===parseFloat(n.depositedAmount)?ce(0):(ce((parseFloat(t.tokenPerBlock)/3*31557600*100/parseFloat(n)).toFixed(2)),se(U*n)));case 7:case"end":return e.stop()}}),e)})));return(0,i.useEffect)((function(){ze();var e=setInterval(ze,1e4);return function(){clearInterval(e)}}),[S,z]),(0,i.useEffect)((function(){Ge();var e=setInterval(Ge,1e3);return function(){clearInterval(e)}}),[S]),(0,i.useEffect)((function(){_e();var e=setInterval(_e,1e4);return function(){clearInterval(e)}}),[S]),(0,i.useEffect)((function(){Le();var e=setInterval(Le,1e4);return function(){clearInterval(e)}}),[S]),(0,i.useEffect)((function(){k&&!V.signer&&$(V.connect(k)),k&&!L.signer&&H(L.connect(k)),k&&!Y.signer&&q(Y.connect(k))}),[k]),(0,i.useEffect)(D(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Me();case 1:case"end":return e.stop()}}),e)}))),[S,Pe]),(0,r.jsxs)("div",{className:"section-top",children:[(0,r.jsxs)(l.Z,{className:"text-center",title:"",show:X,onClose:function(){return J(!1)},children:[(0,r.jsx)("h4",{className:"mb-3",children:"Your Lock Period will be reset again!"}),ge?(0,r.jsx)(o.Z,{animation:"border",variant:"primary"}):(0,r.jsxs)("div",{className:"row",children:[(0,r.jsx)("div",{className:"col-6",children:(0,r.jsx)("div",{className:"btn v-btn--rounded btn-outline-primary",onClick:Ve,children:"Confirm"})}),(0,r.jsx)("div",{className:"col-6",children:(0,r.jsx)("div",{className:"btn v-btn--rounded btn-outline-primary",onClick:function(){return J(!1)},children:"Cancel"})})]})]}),(0,r.jsx)(w.Z,{isStake:Ze,farming:!1,show:Fe,address:n,userInfo:me,poolInfo:xe,dialogClassName:"modal-stake",onClose:function(){_e(),De(!1)}}),(0,r.jsx)(C,{isStake:Ze,farming:!1,show:Ee,address:n,userInfo:me,poolInfo:xe,dialogClassName:"modal-stake",onClose:function(){_e(),Te(!1)}}),(0,r.jsx)("div",{className:"section section-farm-panel text-white",children:(0,r.jsx)("div",{className:"container py-8 px-6 py-16",children:(0,r.jsxs)("div",{className:"",children:[(0,r.jsxs)("div",{className:"mb-5 mt-3",children:[(0,r.jsx)("h2",{className:"text-center mb-2",children:"Smaugs Launcher "}),"0xC090f7D3368a36b20b2B2553386f4E5E184cecb9"==n?(0,r.jsx)("h2",{className:"text-center mt-3",children:"20 days lockup pool "}):"","0xbE140E29d5bD66a3755Aaac4B7507BA40cE6B7FE"==n?(0,r.jsx)("h2",{className:"text-center mt-3",children:"45 days lockup pool "}):"","0x4632125F84545c5C1144775755C6936eFBBe95b7"==n?(0,r.jsx)("h2",{className:"text-center mt-3",children:"365 days lockup pool "}):""]}),(0,r.jsx)("div",{className:"offset-md-4 offset-lg-4 col-md-6 col-lg-4 col-12 text-center mt-8",children:(0,r.jsxs)("div",{className:"v-sheet v-sheet--outlined theme--dark rounded-xl p-3",style:{backgroundColor:"transparent",cursor:"default"},children:[(0,r.jsx)("h4",{className:"text-center",children:"SMG"}),(0,r.jsxs)("div",{className:"p-2",children:[(0,r.jsxs)("div",{className:"d-flex justify-space-between",children:[(0,r.jsx)("div",{children:"APY"}),(0,r.jsxs)("div",{children:[ie," %"]})]}),(0,r.jsxs)("div",{className:"d-flex justify-space-between",children:[(0,r.jsx)("div",{children:"Total Staked"}),(0,r.jsxs)("div",{children:[f.Fn(ee)," SMG"]})]}),(0,r.jsxs)("div",{className:"d-flex justify-space-between",children:[(0,r.jsx)("div",{children:"Total value"}),(0,r.jsxs)("div",{children:["$",f.Fn(ae.toFixed(2))]})]}),(0,r.jsxs)("div",{className:"d-flex justify-space-between mt-4",children:[(0,r.jsx)("div",{children:"Earnings"}),(0,r.jsxs)("div",{children:[null===me||void 0===me?void 0:me.pendingRewards," SMG"]})]})]}),(0,r.jsx)("div",{className:"p-2",children:(0,r.jsxs)("div",{className:"p-3 v-sheet v-sheet--outlined no-hover theme--dark rounded-xl",style:{backgroundColor:"transparent"},children:[(0,r.jsx)("div",{className:"text-left mb-3",children:"My SMG Staked"}),g?S===x.Z.networkID?le.isZero()?(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-primary",onClick:Ue,children:ge?(0,r.jsx)(o.Z,{animation:"border",size:"sm"}):(0,r.jsx)("span",{children:"Approve Contract"})}):(null===me||void 0===me?void 0:me.amount)>0?(0,r.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,r.jsx)("div",{className:"",children:me.amount.toFixed(2)}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"btn v-btn--round v-btn--circle btn-outline-primary",onClick:Re,children:"+"}),(0,r.jsx)("div",{className:"btn v-btn--round v-btn--circle btn-outline-primary ml-3",onClick:function(){Ie(!1),Te(!0)},children:"-"})]})]}):(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-primary",onClick:Re,children:"Stake SMG"}):(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-primary",onClick:function(){return y(x.Z.networkID)},children:"Switch To BSC MainNet"}):(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-primary",onClick:function(){g||N()},children:"Connect Wallet"}),(0,r.jsx)("div",{className:"text-danger my-2",children:Se})]})}),g&&S===x.Z.networkID&&!le.isZero()&&(null===me||void 0===me?void 0:me.amount)>0&&(0,r.jsx)("div",{className:"p-2",children:(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-primary",onClick:function(){return J(!0)},children:ge?(0,r.jsx)(o.Z,{animation:"border",size:"sm"}):(0,r.jsx)("span",{children:"Harvest"})})}),g&&S===x.Z.networkID&&!le.isZero()&&(null===me||void 0===me?void 0:me.amount)>0&&"0xC00f7D3368a36b20b2B2553386f4E5E184cecb9"==n&&(0,r.jsx)("div",{className:"p-2",children:(0,r.jsx)("div",{className:"btn btn-block v-btn--rounded btn-primary",onClick:function(){return $e()},children:ge?(0,r.jsx)(o.Z,{animation:"border",size:"sm"}):(0,r.jsxs)("span",{children:[" Transfer to 45 days lockup pool",(0,r.jsx)("br",{}),"No reward"]})})}),(0,r.jsx)("div",{className:"p-2",children:(0,r.jsx)("div",{className:"theme--dark v-divider my-2"})}),(0,r.jsx)("div",{className:"p-2",children:(0,r.jsxs)("div",{className:"d-flex justify-space-between align-center pt-2",style:{color:"#fff"},children:[(0,r.jsx)("div",{children:(0,r.jsxs)("a",{href:"http://bit.ly/32nkj0P",target:"_blank",children:["Buy SMG ",(0,r.jsx)(c.G,{icon:"external-link-alt",className:"ml-1 mb-1",style:{width:"16px"}})]})}),(0,r.jsx)("div",{children:(0,r.jsxs)("a",{href:"https://bscscan.com/address/"+n,target:"_blank",children:["View Contract ",(0,r.jsx)(c.G,{icon:"external-link-alt",className:"ml-1 mb-1",style:{width:"16px"}})]})})]})})]})})]})})})]})}},71220:function(e,t,n){n.d(t,{SG:function(){return a},AF:function(){return s}});var a=[{address:"0xD7f1fD6461d2CA1D28F0f719c9A13268Bb002b4F",icon:"/SmaugsLogo.png",title:"Smaugs Airdrop",description:"All users participating in the Wizardia pre-sale can claim the SMG airdrop.",symbol:"SMG",decimal:8,url:"https://launchpad.smaugs.com/pool/details/8/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x248c5d23F9585010247407bAD7c9B3482Fb5884c",icon:"https://cdn.freelogovectors.net/wp-content/uploads/2021/10/binance-usd-busd-logo-freelogovectors.net_.png",title:"Players Refund",description:"All users participating in the Players Art pre-sale can claim the BUSD refund.",symbol:"BUSD",decimal:18,url:"https://launchpad.smaugs.com/pool/details/2/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0xF2cEE7beAf4cCCd495a47D252e62adb7f265Bf10",icon:"https://ortcoin.org/wp-content/uploads/2021/05/com-logo.png",title:"Okratech Vesting 1",description:"All users participating in the Okratech public sale can claim the ORT vesting 1.",symbol:"ORT",decimal:8,url:"https://launchpad.smaugs.com/pool/details/12/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x2E09DC8e9282D250d3fABD7f8acFFcc3297718A6",icon:"https://pbs.twimg.com/profile_images/1471180763466928133/Gm_8ewah_400x400.jpg",title:"TwoMonkey Vesting 1",description:"All users participating in the TwoMonkey private sale can claim the TMON vesting 1.",symbol:"TMON",decimal:18,url:"https://launchpad.smaugs.com/pool/details/5/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0xA01B4c41F3D032EF5A4AA2F068974660Bb6280E9",icon:"/images/supernova.png",title:"Supernova Vesting 1",description:"All users participating in the SuperNova public sale can claim the LFC vesting 1.",symbol:"LFC",decimal:9,url:"https://launchpad.smaugs.com/pool/details/14/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x2De1569ed0740eFEa5D95E9486Fd0a07bA9f60a8",icon:"/SmaugsLogo.png",title:"Players Refund Last",description:"All users participating in the Players Art pre-sale can claim the SMG refund.",symbol:"SMG",decimal:8,url:"https://launchpad.smaugs.com/pool/details/2/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x2A895c689453FCD502556D6ddC54710C331a3c21",icon:"/images/supernova.png",title:"Supernova Vesting 2",description:"All users participating in the SuperNova public sale can claim the LFC vesting 2.",symbol:"LFC",decimal:9,url:"https://launchpad.smaugs.com/pool/details/14/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1}],s=[{address:"0xC6CAEC54FCe36837e79429535b06C25e13c6d47C",icon:"/images/metagamz.png",title:"Metag Vesting 1",description:"All users participating in the Metagamz pre-sale can claim the METAG vesting 1.",symbol:"METAG",decimal:18,url:"https://launchpad.smaugs.com/pool/details/7/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x140d8D15E8EF3222A5057355849Dc475503f9eDB",icon:"/images/AkitavaxOriginal.png",title:"Akitavax Vesting 3",description:"All users participating in the Akitavax public sale can claim the Akitavax vesting 3.",symbol:"AKITAX",decimal:18,url:"https://launchpad.smaugs.com/pool/details/6/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x53d3bfd79a22c29579220248Da910Ca870B10A97",icon:"/images/metagamz.png",title:"Metag Vesting 2",description:"All users participating in the Metagamz pre-sale can claim the METAG vesting 2.",symbol:"METAG",decimal:18,url:"https://launchpad.smaugs.com/pool/details/7/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0xFa44D206429DAE93C3ad576fdfb6451aB41D6e46",icon:"/images/AkitavaxOriginal.png",title:"Akitavax Vesting 4",description:"All users participating in the Akitavax public sale can claim the Akitavax vesting 4.",symbol:"AKITAX",decimal:18,url:"https://launchpad.smaugs.com/pool/details/6/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0x6B21cEAED50A6CA13EFA34770Faa7dD159bf46FC",icon:"/images/metagamz.png",title:"Metag Vesting 3",description:"All users participating in the Metagamz pre-sale can claim the METAG vesting 3.",symbol:"METAG",decimal:18,url:"https://launchpad.smaugs.com/pool/details/7/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1},{address:"0xd7Ae64b8C433b37812Cb76BA84339FDe4AACc745",icon:"/images/cps.png",title:"CPS Rewards April",description:"CyberPunkScreen NFT holders can claim the revenue from the crabada game.",symbol:"TUS",decimal:18,url:"https://launchpad.smaugs.com/pool/details/7/",startTime:new Date("12/20/2021 7:58"),endTime:new Date("12/22/2021 7:40"),totalSale:25e4,totalFund:37500,network:"BSC",minFund:1}];new Date("12/29/2021 14:00"),new Date("12/31/2021 14:00"),new Date("01/02/2022 15:30"),new Date("01/05/2022 21:30"),new Date("12/31/2021 14:00"),new Date("01/01/2022 14:00"),new Date("01/05/2022 14:00"),new Date("12/31/2021 14:00"),new Date("01/01/2022 14:00"),new Date("01/05/2022 14:00")},36968:function(e,t,n){var a=n(94184),s=n.n(a),r=n(67294),i=n(76792),c=n(85893);const o=r.forwardRef((({bsPrefix:e,variant:t,animation:n,size:a,as:r="div",className:o,...l},d)=>{const u=`${e=(0,i.vE)(e,"spinner")}-${n}`;return(0,c.jsx)(r,{ref:d,...l,className:s()(o,u,a&&`${u}-${a}`,t&&`text-${t}`)})}));o.displayName="Spinner",t.Z=o}}]);