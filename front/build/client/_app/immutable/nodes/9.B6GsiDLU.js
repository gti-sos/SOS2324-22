import{s as de,c as ve,o as Te,r as ke,n as fe}from"../chunks/scheduler.wWR6jiGY.js";import{S as be,i as ge,h as N,j as pe,l as P,m as _e,a as A,o as me,q as J,u as W,r as Ee,d as _,v as he,e as f,b as p,f as g,k as ce,g as l,n as k,p as w,t as D,c as $,y as Ne}from"../chunks/index.BrUfcjbG.js";import{p as Pe}from"../chunks/stores.BtRtmNkt.js";import{B as ye}from"../chunks/MessageContainer.svelte_svelte_type_style_lang.BTm8g4uz.js";import"../chunks/Theme.svelte_svelte_type_style_lang.C8eeSRjy.js";import{M as Me}from"../chunks/MessageContainer.BhMVhnr4.js";function Ce(a){let n,t="Esta persona no existe";return{c(){n=f("p"),n.textContent=t},l(i){n=p(i,"P",{"data-svelte-h":!0}),ce(n)!=="svelte-1e4eww8"&&(n.textContent=t)},m(i,c){A(i,n,c)},p:fe,d(i){i&&_(n)}}}function Ie(a){let n,t,i=a[3].name+"",c,T,r;return{c(){n=f("h2"),t=D("Details of "),c=D(i),T=N(),r=f("hr")},l(o){n=p(o,"H2",{});var e=g(n);t=$(e,"Details of "),c=$(e,i),e.forEach(_),T=P(o),r=p(o,"HR",{})},m(o,e){A(o,n,e),l(n,t),l(n,c),A(o,T,e),A(o,r,e)},p:fe,d(o){o&&(_(n),_(T),_(r))}}}function ie(a){let n,t,i="<tr><th>Ranking</th> <th>Nombre</th> <th>Pais</th> <th>Ventas</th> <th>Beneficio</th> <th>Activos</th> <th>Valor de mercado</th> <th>Año</th></tr>",c,T,r,o,e,s,m,b,q,B,y,O,H,M,V,E,h,z,L,I,Y,R,U,K,S,j,X,F,C,Q,Z,x;return C=new ye({props:{color:"primary",$$slots:{default:[Ue]},$$scope:{ctx:a}}}),C.$on("click",a[4]),{c(){n=f("table"),t=f("thead"),t.innerHTML=i,c=N(),T=f("tbody"),r=f("tr"),o=f("td"),e=f("input"),s=N(),m=f("td"),b=f("input"),q=N(),B=f("td"),y=f("input"),O=N(),H=f("td"),M=f("input"),V=N(),E=f("td"),h=f("input"),z=N(),L=f("td"),I=f("input"),Y=N(),R=f("td"),U=f("input"),K=N(),S=f("td"),j=f("input"),X=N(),F=f("td"),pe(C.$$.fragment)},l(u){n=p(u,"TABLE",{});var v=g(n);t=p(v,"THEAD",{"data-svelte-h":!0}),ce(t)!=="svelte-1lad2ry"&&(t.innerHTML=i),c=P(v),T=p(v,"TBODY",{});var G=g(T);r=p(G,"TR",{});var d=g(r);o=p(d,"TD",{});var ee=g(o);e=p(ee,"INPUT",{}),ee.forEach(_),s=P(d),m=p(d,"TD",{});var te=g(m);b=p(te,"INPUT",{}),te.forEach(_),q=P(d),B=p(d,"TD",{});var ne=g(B);y=p(ne,"INPUT",{}),ne.forEach(_),O=P(d),H=p(d,"TD",{});var re=g(H);M=p(re,"INPUT",{}),re.forEach(_),V=P(d),E=p(d,"TD",{});var se=g(E);h=p(se,"INPUT",{}),se.forEach(_),z=P(d),L=p(d,"TD",{});var ae=g(L);I=p(ae,"INPUT",{}),ae.forEach(_),Y=P(d),R=p(d,"TD",{});var oe=g(R);U=p(oe,"INPUT",{}),oe.forEach(_),K=P(d),S=p(d,"TD",{});var le=g(S);j=p(le,"INPUT",{}),le.forEach(_),X=P(d),F=p(d,"TD",{});var ue=g(F);_e(C.$$.fragment,ue),ue.forEach(_),d.forEach(_),G.forEach(_),v.forEach(_)},m(u,v){A(u,n,v),l(n,t),l(n,c),l(n,T),l(T,r),l(r,o),l(o,e),k(e,a[2].rank),l(r,s),l(r,m),l(m,b),k(b,a[2].name),l(r,q),l(r,B),l(B,y),k(y,a[2].country),l(r,O),l(r,H),l(H,M),k(M,a[2].sale),l(r,V),l(r,E),l(E,h),k(h,a[2].profit),l(r,z),l(r,L),l(L,I),k(I,a[2].asset),l(r,Y),l(r,R),l(R,U),k(U,a[2].market_value),l(r,K),l(r,S),l(S,j),k(j,a[2].year),l(r,X),l(r,F),me(C,F,null),Q=!0,Z||(x=[w(e,"input",a[5]),w(b,"input",a[6]),w(y,"input",a[7]),w(M,"input",a[8]),w(h,"input",a[9]),w(I,"input",a[10]),w(U,"input",a[11]),w(j,"input",a[12])],Z=!0)},p(u,v){v&4&&e.value!==u[2].rank&&k(e,u[2].rank),v&4&&b.value!==u[2].name&&k(b,u[2].name),v&4&&y.value!==u[2].country&&k(y,u[2].country),v&4&&M.value!==u[2].sale&&k(M,u[2].sale),v&4&&h.value!==u[2].profit&&k(h,u[2].profit),v&4&&I.value!==u[2].asset&&k(I,u[2].asset),v&4&&U.value!==u[2].market_value&&k(U,u[2].market_value),v&4&&j.value!==u[2].year&&k(j,u[2].year);const G={};v&65536&&(G.$$scope={dirty:v,ctx:u}),C.$set(G)},i(u){Q||(J(C.$$.fragment,u),Q=!0)},o(u){W(C.$$.fragment,u),Q=!1},d(u){u&&_(n),he(C),Z=!1,ke(x)}}}function Ue(a){let n;return{c(){n=D("Actualizar")},l(t){n=$(t,"Actualizar")},m(t,i){A(t,n,i)},d(t){t&&_(n)}}}function we(a){let n,t,i,c;function T(s,m){return s[2]?Ie:Ce}let r=T(a),o=r(a),e=a[2]&&ie(a);return i=new Me({props:{Msg:a[1],errorMsg:a[0]}}),{c(){o.c(),n=N(),e&&e.c(),t=N(),pe(i.$$.fragment)},l(s){o.l(s),n=P(s),e&&e.l(s),t=P(s),_e(i.$$.fragment,s)},m(s,m){o.m(s,m),A(s,n,m),e&&e.m(s,m),A(s,t,m),me(i,s,m),c=!0},p(s,[m]){r===(r=T(s))&&o?o.p(s,m):(o.d(1),o=r(s),o&&(o.c(),o.m(n.parentNode,n))),s[2]?e?(e.p(s,m),m&4&&J(e,1)):(e=ie(s),e.c(),J(e,1),e.m(t.parentNode,t)):e&&(Ne(),W(e,1,1,()=>{e=null}),Ee());const b={};m&2&&(b.Msg=s[1]),m&1&&(b.errorMsg=s[0]),i.$set(b)},i(s){c||(J(e),J(i.$$.fragment,s),c=!0)},o(s){W(e),W(i.$$.fragment,s),c=!1},d(s){s&&(_(n),_(t)),o.d(s),e&&e.d(s),he(i,s)}}}function Ae(a,n,t){let i;ve(a,Pe,E=>t(14,i=E));let c=i.params,T="/api/v2/forbes-billonaires/"+c.name+"/"+c.country,r="",o="",e;async function s(){const E=await fetch(T,{method:"GET"}),h=await E.json();try{let z=h.rank,L=h.name,I=h.country,Y=h.sale,R=h.profit,U=h.asset,K=h.market_value,S=h.year;E.status==404&&(t(0,r="No existe la compañia"),setTimeout(()=>{t(1,o="")},3e3))}catch(z){t(0,r=z)}return h}Te(async()=>{t(2,e=await s())});async function m(){const E={rank:e==null?void 0:e.rank,name:e==null?void 0:e.name,country:e==null?void 0:e.country,sale:e==null?void 0:e.sale,profit:e==null?void 0:e.profit,asset:e==null?void 0:e.asset,market_value:e==null?void 0:e.market_value,year:e==null?void 0:e.year};try{(await fetch(T,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(E)})).status==200?(t(1,o="Compañia actualizada con éxito"),s(),setTimeout(()=>{t(1,o="")},3e3)):(t(0,r="Esa compañia no existe"),setTimeout(()=>{t(0,r="")},3e3))}catch(h){t(0,r=h)}}function b(){e.rank=this.value,t(2,e)}function q(){e.name=this.value,t(2,e)}function B(){e.country=this.value,t(2,e)}function y(){e.sale=this.value,t(2,e)}function O(){e.profit=this.value,t(2,e)}function H(){e.asset=this.value,t(2,e)}function M(){e.market_value=this.value,t(2,e)}function V(){e.year=this.value,t(2,e)}return[r,o,e,c,m,b,q,B,y,O,H,M,V]}class Se extends be{constructor(n){super(),ge(this,n,Ae,we,de,{})}}export{Se as component};
