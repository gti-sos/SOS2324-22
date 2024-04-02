import{s as vt,c as Tt,o as gt,r as yt}from"../chunks/scheduler.Dc1jLLu_.js";import{S as Et,i as bt,e as i,t as tt,h as k,j as ht,b as p,f as E,c as et,d as h,l as P,m as _t,a as O,g as o,o as dt,q as Q,u as X,r as kt,v as mt,k as ft,x as S,n as T,p as j,y as Pt}from"../chunks/index.USbQfvAI.js";import{p as wt}from"../chunks/stores.DEvWsDtx.js";import{M as Mt,B as Bt}from"../chunks/MessageContainer.zl6tcV2J.js";import"../chunks/Theme.svelte_svelte_type_style_lang.NJlEhCd8.js";function ct(a){let r,s,M="<tr><th>Puesto</th> <th>Nombre</th> <th>Patrimonio neto (billones)</th> <th>Edad</th></tr>",B,w,_,d,f,t,g,n,e,l,m,D,L,I,G,y,v="<tr><th>País</th> <th>Empresa</th> <th>Industria</th></tr>",q,b,R,N,V,Y,A,Z,J,U,$,F,H,W,x,st;return H=new Bt({props:{color:"primary",$$slots:{default:[It]},$$scope:{ctx:a}}}),H.$on("click",a[4]),{c(){r=i("table"),s=i("thead"),s.innerHTML=M,B=k(),w=i("tbody"),_=i("tr"),d=i("td"),f=i("input"),t=k(),g=i("td"),n=i("input"),e=k(),l=i("td"),m=i("input"),D=k(),L=i("td"),I=i("input"),G=k(),y=i("thead"),y.innerHTML=v,q=k(),b=i("tbody"),R=i("td"),N=i("input"),V=k(),Y=i("td"),A=i("input"),Z=k(),J=i("td"),U=i("input"),$=k(),F=i("td"),ht(H.$$.fragment),this.h()},l(u){r=p(u,"TABLE",{});var c=E(r);s=p(c,"THEAD",{"data-svelte-h":!0}),ft(s)!=="svelte-1vz6oz4"&&(s.innerHTML=M),B=P(c),w=p(c,"TBODY",{});var K=E(w);_=p(K,"TR",{});var z=E(_);d=p(z,"TD",{});var nt=E(d);f=p(nt,"INPUT",{class:!0}),nt.forEach(h),t=P(z),g=p(z,"TD",{});var ot=E(g);n=p(ot,"INPUT",{class:!0}),ot.forEach(h),e=P(z),l=p(z,"TD",{});var rt=E(l);m=p(rt,"INPUT",{class:!0}),rt.forEach(h),D=P(z),L=p(z,"TD",{});var at=E(L);I=p(at,"INPUT",{class:!0}),at.forEach(h),z.forEach(h),K.forEach(h),G=P(c),y=p(c,"THEAD",{"data-svelte-h":!0}),ft(y)!=="svelte-iryo44"&&(y.innerHTML=v),q=P(c),b=p(c,"TBODY",{});var C=E(b);R=p(C,"TD",{});var ut=E(R);N=p(ut,"INPUT",{class:!0}),ut.forEach(h),V=P(C),Y=p(C,"TD",{});var lt=E(Y);A=p(lt,"INPUT",{class:!0}),lt.forEach(h),Z=P(C),J=p(C,"TD",{});var it=E(J);U=p(it,"INPUT",{class:!0}),it.forEach(h),$=P(C),F=p(C,"TD",{});var pt=E(F);_t(H.$$.fragment,pt),pt.forEach(h),C.forEach(h),c.forEach(h),this.h()},h(){S(f,"class","svelte-1b14d9v"),S(n,"class","svelte-1b14d9v"),S(m,"class","svelte-1b14d9v"),S(I,"class","svelte-1b14d9v"),S(N,"class","svelte-1b14d9v"),S(A,"class","svelte-1b14d9v"),S(U,"class","svelte-1b14d9v")},m(u,c){O(u,r,c),o(r,s),o(r,B),o(r,w),o(w,_),o(_,d),o(d,f),T(f,a[2].rank),o(_,t),o(_,g),o(g,n),T(n,a[2].name),o(_,e),o(_,l),o(l,m),T(m,a[2].net_worth),o(_,D),o(_,L),o(L,I),T(I,a[2].age),o(r,G),o(r,y),o(r,q),o(r,b),o(b,R),o(R,N),T(N,a[2].country),o(b,V),o(b,Y),o(Y,A),T(A,a[2].source),o(b,Z),o(b,J),o(J,U),T(U,a[2].industry),o(b,$),o(b,F),dt(H,F,null),W=!0,x||(st=[j(f,"input",a[5]),j(n,"input",a[6]),j(m,"input",a[7]),j(I,"input",a[8]),j(N,"input",a[9]),j(A,"input",a[10]),j(U,"input",a[11])],x=!0)},p(u,c){c&4&&f.value!==u[2].rank&&T(f,u[2].rank),c&4&&n.value!==u[2].name&&T(n,u[2].name),c&4&&m.value!==u[2].net_worth&&T(m,u[2].net_worth),c&4&&I.value!==u[2].age&&T(I,u[2].age),c&4&&N.value!==u[2].country&&T(N,u[2].country),c&4&&A.value!==u[2].source&&T(A,u[2].source),c&4&&U.value!==u[2].industry&&T(U,u[2].industry);const K={};c&65536&&(K.$$scope={dirty:c,ctx:u}),H.$set(K)},i(u){W||(Q(H.$$.fragment,u),W=!0)},o(u){X(H.$$.fragment,u),W=!1},d(u){u&&h(r),mt(H),x=!1,yt(st)}}}function It(a){let r;return{c(){r=tt("Actualizar")},l(s){r=et(s,"Actualizar")},m(s,M){O(s,r,M)},d(s){s&&h(r)}}}function Nt(a){let r,s,M=a[3].name+"",B,w,_,d,f,t,g,n=a[2]&&ct(a);return t=new Mt({props:{Msg:a[1],errorMsg:a[0]}}),{c(){r=i("h2"),s=tt("Details of "),B=tt(M),w=k(),_=i("hr"),d=k(),n&&n.c(),f=k(),ht(t.$$.fragment)},l(e){r=p(e,"H2",{});var l=E(r);s=et(l,"Details of "),B=et(l,M),l.forEach(h),w=P(e),_=p(e,"HR",{}),d=P(e),n&&n.l(e),f=P(e),_t(t.$$.fragment,e)},m(e,l){O(e,r,l),o(r,s),o(r,B),O(e,w,l),O(e,_,l),O(e,d,l),n&&n.m(e,l),O(e,f,l),dt(t,e,l),g=!0},p(e,[l]){e[2]?n?(n.p(e,l),l&4&&Q(n,1)):(n=ct(e),n.c(),Q(n,1),n.m(f.parentNode,f)):n&&(Pt(),X(n,1,1,()=>{n=null}),kt());const m={};l&2&&(m.Msg=e[1]),l&1&&(m.errorMsg=e[0]),t.$set(m)},i(e){g||(Q(n),Q(t.$$.fragment,e),g=!0)},o(e){X(n),X(t.$$.fragment,e),g=!1},d(e){e&&(h(r),h(w),h(_),h(d),h(f)),n&&n.d(e),mt(t,e)}}}function At(a,r,s){let M;Tt(a,wt,y=>s(12,M=y));let B=M.params;const _=`https://sos2324-22.appspot.com/api/v2/forbes-billionaires-list/${B.rank}`;let d="",f="",t;async function g(){const y=await fetch(_,{method:"GET"}),v=await y.json();try{let q=v.rank,b=v.name,R=v.net_worth,N=v.age,V=v.country,Y=v.source,A=v.industry;y.status==404&&(s(0,d="No existe el billonario"),setTimeout(()=>{s(1,f="")},3e3))}catch(q){s(0,d=q)}return v}gt(async()=>{s(2,t=await g()),console.log(t.name)});async function n(){const y={rank:t==null?void 0:t.rank,name:t==null?void 0:t.name,net_worth:t==null?void 0:t.net_worth,age:t==null?void 0:t.age,country:t==null?void 0:t.country,source:t==null?void 0:t.source,industry:t==null?void 0:t.industry};try{(await fetch(_,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(y)})).ok?(s(1,f="Billonario actualizado con éxito"),g(),setTimeout(()=>{s(1,f="")},3e3)):(s(0,d="Ese billonario no existe"),setTimeout(()=>{s(0,d="")},3e3))}catch(v){s(0,d=v)}}function e(){t.rank=this.value,s(2,t)}function l(){t.name=this.value,s(2,t)}function m(){t.net_worth=this.value,s(2,t)}function D(){t.age=this.value,s(2,t)}function L(){t.country=this.value,s(2,t)}function I(){t.source=this.value,s(2,t)}function G(){t.industry=this.value,s(2,t)}return[d,f,t,B,n,e,l,m,D,L,I,G]}class St extends Et{constructor(r){super(),bt(this,r,At,Nt,vt,{})}}export{St as component};