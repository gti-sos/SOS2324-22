import{s as yt,r as Et,c as kt,o as Dt}from"../chunks/scheduler.TjET1Dad.js";import{S as Nt,i as Pt,t as J,s as v,e as r,k as Rt,l as Tt,b as Y,f as y,c as p,a as E,m as It,d as o,n as Ut,g as T,h as l,o as d,p as wt,q as w,j as ot,r as Ct,v as At,w as Ht}from"../chunks/index.CogmN7-S.js";import{p as Mt}from"../chunks/stores.kjepElkH.js";import{B as Ot}from"../chunks/Button.BYWkm6PB.js";import"../chunks/Theme.svelte_svelte_type_style_lang.BfHm16wz.js";function St(a){let f;return{c(){f=J("Actualizar")},l(n){f=Y(n,"Actualizar")},m(n,m){T(n,f,m)},d(n){n&&o(f)}}}function bt(a){let f,n,m;return{c(){f=r("hr"),n=v(),m=J(a[2])},l(e){f=p(e,"HR",{}),n=y(e),m=Y(e,a[2])},m(e,u){T(e,f,u),T(e,n,u),T(e,m,u)},p(e,u){u&4&&ot(m,e[2])},d(e){e&&(o(f),o(n),o(m))}}}function vt(a){let f,n,m;return{c(){f=r("hr"),n=J(`
ERROR: `),m=J(a[1])},l(e){f=p(e,"HR",{}),n=Y(e,`
ERROR: `),m=Y(e,a[1])},m(e,u){T(e,f,u),T(e,n,u),T(e,m,u)},p(e,u){u&2&&ot(m,e[1])},d(e){e&&(o(f),o(n),o(m))}}}function gt(a){let f,n=a[0].name+"",m,e,u,k,D="<tr><th>Rank</th> <th>Name</th> <th>Country</th> <th>Sale</th> <th>Profit</th> <th>Asset</th> <th>Market value</th> <th>Year</th></tr>",q,C,i,A,P,F,H,R,G,M,b,N,U,O,tt,K,S,et,Q,g,nt,V,j,at,W,B,lt,X,I,x,z,L,Z,st,ut;I=new Ot({props:{color:"primary",$$slots:{default:[St]},$$scope:{ctx:a}}}),I.$on("click",a[3]);let h=a[2]!=""&&bt(a),c=a[1]!=""&&vt(a);return{c(){f=J("Details of "),m=J(n),e=v(),u=r("table"),k=r("thead"),k.innerHTML=D,q=v(),C=r("tbody"),i=r("tr"),A=r("td"),P=r("input"),F=v(),H=r("td"),R=r("input"),G=v(),M=r("td"),b=r("input"),N=v(),U=r("td"),O=r("input"),tt=v(),K=r("td"),S=r("input"),et=v(),Q=r("td"),g=r("input"),nt=v(),V=r("td"),j=r("input"),at=v(),W=r("td"),B=r("input"),lt=v(),X=r("td"),Rt(I.$$.fragment),x=v(),h&&h.c(),z=v(),c&&c.c(),L=Tt()},l(t){f=Y(t,"Details of "),m=Y(t,n),e=y(t),u=p(t,"TABLE",{});var s=E(u);k=p(s,"THEAD",{"data-svelte-h":!0}),It(k)!=="svelte-4qbcan"&&(k.innerHTML=D),q=y(s),C=p(s,"TBODY",{});var $=E(C);i=p($,"TR",{});var _=E(i);A=p(_,"TD",{});var it=E(A);P=p(it,"INPUT",{}),it.forEach(o),F=y(_),H=p(_,"TD",{});var rt=E(H);R=p(rt,"INPUT",{}),rt.forEach(o),G=y(_),M=p(_,"TD",{});var pt=E(M);b=p(pt,"INPUT",{}),pt.forEach(o),N=y(_),U=p(_,"TD",{});var ft=E(U);O=p(ft,"INPUT",{}),ft.forEach(o),tt=y(_),K=p(_,"TD",{});var mt=E(K);S=p(mt,"INPUT",{}),mt.forEach(o),et=y(_),Q=p(_,"TD",{});var _t=E(Q);g=p(_t,"INPUT",{}),_t.forEach(o),nt=y(_),V=p(_,"TD",{});var ht=E(V);j=p(ht,"INPUT",{}),ht.forEach(o),at=y(_),W=p(_,"TD",{});var ct=E(W);B=p(ct,"INPUT",{}),ct.forEach(o),lt=y(_),X=p(_,"TD",{});var dt=E(X);Ut(I.$$.fragment,dt),dt.forEach(o),_.forEach(o),$.forEach(o),s.forEach(o),x=y(t),h&&h.l(t),z=y(t),c&&c.l(t),L=Tt()},m(t,s){T(t,f,s),T(t,m,s),T(t,e,s),T(t,u,s),l(u,k),l(u,q),l(u,C),l(C,i),l(i,A),l(A,P),d(P,a[0].rank),l(i,F),l(i,H),l(H,R),d(R,a[0].name),l(i,G),l(i,M),l(M,b),d(b,a[0].country),l(i,N),l(i,U),l(U,O),d(O,a[0].sale),l(i,tt),l(i,K),l(K,S),d(S,a[0].profit),l(i,et),l(i,Q),l(Q,g),d(g,a[0].asset),l(i,nt),l(i,V),l(V,j),d(j,a[0].market_value),l(i,at),l(i,W),l(W,B),d(B,a[0].year),l(i,lt),l(i,X),wt(I,X,null),T(t,x,s),h&&h.m(t,s),T(t,z,s),c&&c.m(t,s),T(t,L,s),Z=!0,st||(ut=[w(P,"input",a[4]),w(R,"input",a[5]),w(b,"input",a[6]),w(O,"input",a[7]),w(S,"input",a[8]),w(g,"input",a[9]),w(j,"input",a[10]),w(B,"input",a[11])],st=!0)},p(t,[s]){(!Z||s&1)&&n!==(n=t[0].name+"")&&ot(m,n),s&1&&P.value!==t[0].rank&&d(P,t[0].rank),s&1&&R.value!==t[0].name&&d(R,t[0].name),s&1&&b.value!==t[0].country&&d(b,t[0].country),s&1&&O.value!==t[0].sale&&d(O,t[0].sale),s&1&&S.value!==t[0].profit&&d(S,t[0].profit),s&1&&g.value!==t[0].asset&&d(g,t[0].asset),s&1&&j.value!==t[0].market_value&&d(j,t[0].market_value),s&1&&B.value!==t[0].year&&d(B,t[0].year);const $={};s&32768&&($.$$scope={dirty:s,ctx:t}),I.$set($),t[2]!=""?h?h.p(t,s):(h=bt(t),h.c(),h.m(z.parentNode,z)):h&&(h.d(1),h=null),t[1]!=""?c?c.p(t,s):(c=vt(t),c.c(),c.m(L.parentNode,L)):c&&(c.d(1),c=null)},i(t){Z||(Ct(I.$$.fragment,t),Z=!0)},o(t){At(I.$$.fragment,t),Z=!1},d(t){t&&(o(f),o(m),o(e),o(u),o(x),o(z),o(L)),Ht(I),h&&h.d(t),c&&c.d(t),st=!1,Et(ut)}}}function jt(a,f,n){let m;kt(a,Mt,b=>n(12,m=b));let e=m.params;const u=`http://localhost:10000/forbes-billonaires/${e.name}/${e.country}`;let k="",D="";Dt(()=>{q()});async function q(){const b=await fetch(u,{method:"GET"});try{const N=await res.json();result=JSON.stringify(N,null,2),updated_name=N.name,updated_country=N.country}catch{console.log("Error parsing result")}b.status==404?(n(2,D="No existe la persona"),setTimeout(()=>{n(2,D="")},3e3)):b.status==400&&(n(2,D="Ha habido un error en la petición"),setTimeout(()=>{n(2,D="")},3e3))}async function C(){const N=await(await fetch(`http://localhost:10000/forbes-billonaires/${e.name}`)).json();try{(await fetch(u,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(N)})).status==200?(n(2,D="Compañia actualizada con éxito"),q(),setTimeout(()=>{n(2,D="")},3e3)):(n(1,k="Esa companñia no existe"),setTimeout(()=>{n(1,k="")},3e3))}catch(U){n(1,k=U)}}function i(){e.rank=this.value,n(0,e)}function A(){e.name=this.value,n(0,e)}function P(){e.country=this.value,n(0,e)}function F(){e.sale=this.value,n(0,e)}function H(){e.profit=this.value,n(0,e)}function R(){e.asset=this.value,n(0,e)}function G(){e.market_value=this.value,n(0,e)}function M(){e.year=this.value,n(0,e)}return[e,k,D,C,i,A,P,F,H,R,G,M]}class Yt extends Nt{constructor(f){super(),Pt(this,f,jt,gt,yt,{})}}export{Yt as component};