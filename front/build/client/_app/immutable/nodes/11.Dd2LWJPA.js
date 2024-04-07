import{s as ut,c as pt,o as ft,r as _t}from"../chunks/scheduler.wWR6jiGY.js";import{S as ct,i as ht,e as f,t as Q,h as P,j as ot,b as _,f as E,c as V,d as h,l as A,m as rt,a as C,g as o,o as lt,q as O,u as G,r as dt,v as it,k as at,x as q,n as w,p as D,y as mt}from"../chunks/index.BrUfcjbG.js";import{p as yt}from"../chunks/stores.BtRtmNkt.js";import{B as bt}from"../chunks/MessageContainer.svelte_svelte_type_style_lang.BTm8g4uz.js";import"../chunks/Theme.svelte_svelte_type_style_lang.C8eeSRjy.js";import{M as gt}from"../chunks/MessageContainer.BhMVhnr4.js";function st(l){let s,n,M="<tr><th>Nombre</th> <th>Patrimonio Neto</th> <th>Año de nacimiento</th> <th>Edad</th></tr>",v,T,p,d,u,t,b,a,e,r,y,L,k,m,g,N,J="<tr><th>Nacionalidad</th></tr>",$,I,S,B,F,z,H,R,K,W;return H=new bt({props:{color:"primary",$$slots:{default:[vt]},$$scope:{ctx:l}}}),H.$on("click",l[4]),{c(){s=f("table"),n=f("thead"),n.innerHTML=M,v=P(),T=f("tbody"),p=f("tr"),d=f("td"),u=f("input"),t=P(),b=f("td"),a=f("input"),e=P(),r=f("td"),y=f("input"),L=P(),k=f("td"),m=f("input"),g=P(),N=f("thead"),N.innerHTML=J,$=P(),I=f("tbody"),S=f("td"),B=f("input"),F=P(),z=f("td"),ot(H.$$.fragment),this.h()},l(i){s=_(i,"TABLE",{});var c=E(s);n=_(c,"THEAD",{"data-svelte-h":!0}),at(n)!=="svelte-myslpu"&&(n.innerHTML=M),v=A(c),T=_(c,"TBODY",{});var j=E(T);p=_(j,"TR",{});var U=E(p);d=_(U,"TD",{});var X=E(d);u=_(X,"INPUT",{class:!0}),X.forEach(h),t=A(U),b=_(U,"TD",{});var Z=E(b);a=_(Z,"INPUT",{class:!0}),Z.forEach(h),e=A(U),r=_(U,"TD",{});var x=E(r);y=_(x,"INPUT",{class:!0}),x.forEach(h),L=A(U),k=_(U,"TD",{});var tt=E(k);m=_(tt,"INPUT",{class:!0}),tt.forEach(h),U.forEach(h),j.forEach(h),g=A(c),N=_(c,"THEAD",{"data-svelte-h":!0}),at(N)!=="svelte-1hz74qx"&&(N.innerHTML=J),$=A(c),I=_(c,"TBODY",{});var Y=E(I);S=_(Y,"TD",{});var et=E(S);B=_(et,"INPUT",{class:!0}),et.forEach(h),F=A(Y),z=_(Y,"TD",{});var nt=E(z);rt(H.$$.fragment,nt),nt.forEach(h),Y.forEach(h),c.forEach(h),this.h()},h(){q(u,"class","svelte-1b14d9v"),q(a,"class","svelte-1b14d9v"),q(y,"class","svelte-1b14d9v"),q(m,"class","svelte-1b14d9v"),q(B,"class","svelte-1b14d9v")},m(i,c){C(i,s,c),o(s,n),o(s,v),o(s,T),o(T,p),o(p,d),o(d,u),w(u,l[2].name),o(p,t),o(p,b),o(b,a),w(a,l[2].net_worth),o(p,e),o(p,r),o(r,y),w(y,l[2].bday_year),o(p,L),o(p,k),o(k,m),w(m,l[2].age),o(s,g),o(s,N),o(s,$),o(s,I),o(I,S),o(S,B),w(B,l[2].nationality),o(I,F),o(I,z),lt(H,z,null),R=!0,K||(W=[D(u,"input",l[5]),D(a,"input",l[6]),D(y,"input",l[7]),D(m,"input",l[8]),D(B,"input",l[9])],K=!0)},p(i,c){c&4&&u.value!==i[2].name&&w(u,i[2].name),c&4&&a.value!==i[2].net_worth&&w(a,i[2].net_worth),c&4&&y.value!==i[2].bday_year&&w(y,i[2].bday_year),c&4&&m.value!==i[2].age&&w(m,i[2].age),c&4&&B.value!==i[2].nationality&&w(B,i[2].nationality);const j={};c&16384&&(j.$$scope={dirty:c,ctx:i}),H.$set(j)},i(i){R||(O(H.$$.fragment,i),R=!0)},o(i){G(H.$$.fragment,i),R=!1},d(i){i&&h(s),it(H),K=!1,_t(W)}}}function vt(l){let s;return{c(){s=Q("Actualizar")},l(n){s=V(n,"Actualizar")},m(n,M){C(n,s,M)},d(n){n&&h(s)}}}function Tt(l){let s,n,M=l[3].name+"",v,T,p,d,u,t,b,a=l[2]&&st(l);return t=new gt({props:{Msg:l[1],errorMsg:l[0]}}),{c(){s=f("h2"),n=Q("Details of "),v=Q(M),T=P(),p=f("hr"),d=P(),a&&a.c(),u=P(),ot(t.$$.fragment)},l(e){s=_(e,"H2",{});var r=E(s);n=V(r,"Details of "),v=V(r,M),r.forEach(h),T=A(e),p=_(e,"HR",{}),d=A(e),a&&a.l(e),u=A(e),rt(t.$$.fragment,e)},m(e,r){C(e,s,r),o(s,n),o(s,v),C(e,T,r),C(e,p,r),C(e,d,r),a&&a.m(e,r),C(e,u,r),lt(t,e,r),b=!0},p(e,[r]){e[2]?a?(a.p(e,r),r&4&&O(a,1)):(a=st(e),a.c(),O(a,1),a.m(u.parentNode,u)):a&&(mt(),G(a,1,1,()=>{a=null}),dt());const y={};r&2&&(y.Msg=e[1]),r&1&&(y.errorMsg=e[0]),t.$set(y)},i(e){b||(O(a),O(t.$$.fragment,e),b=!0)},o(e){G(a),G(t.$$.fragment,e),b=!1},d(e){e&&(h(s),h(T),h(p),h(d),h(u)),a&&a.d(e),it(t,e)}}}function Et(l,s,n){let M;pt(l,yt,m=>n(10,M=m));let v=M.params;const p=`https://sos2324-22.appspot.com/api/v2/top-richest/${v.name}/${v.nationality}`;let d="",u="",t;async function b(){const m=await fetch(p,{method:"GET"}),g=await m.json();try{name=g.name;let N=g.net_worth,J=g.bday_year,$=g.age,I=g.nationality;m.status==404&&(n(0,d="No existe el millonario"),setTimeout(()=>{n(1,u="")},3e3))}catch(N){n(0,d=N)}return g}ft(async()=>{n(2,t=await b()),console.log(t.name)});async function a(){const m={name:t==null?void 0:t.name,net_worth:t==null?void 0:t.net_worth,bday_year:t==null?void 0:t.bday_year,age:t==null?void 0:t.age,nationality:t==null?void 0:t.nationality};try{(await fetch(p,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)})).status==200?(n(1,u="Millonario actualizado con éxito"),b(),setTimeout(()=>{n(1,u="")},3e3)):(n(0,d="Ese millonario no existe"),setTimeout(()=>{n(0,d="")},3e3))}catch(g){n(0,d=g)}}function e(){t.name=this.value,n(2,t)}function r(){t.net_worth=this.value,n(2,t)}function y(){t.bday_year=this.value,n(2,t)}function L(){t.age=this.value,n(2,t)}function k(){t.nationality=this.value,n(2,t)}return[d,u,t,v,a,e,r,y,L,k]}class It extends ct{constructor(s){super(),ht(this,s,Et,Tt,ut,{})}}export{It as component};
