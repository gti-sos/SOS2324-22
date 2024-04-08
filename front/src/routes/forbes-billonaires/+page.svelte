<script>
    import {onMount} from "svelte";
    import { dev } from "$app/environment";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import MessageContainer from "../MessageContainer.svelte";

    let API = "/api/v2/forbes-billonaires"
    if (dev){
        API="http://localhost:10000"+API;
    }
    let companies = []
    let errorMsg = "";
    let Msg = ""; 
    let param = [];
    let busqueda=[];
    let from="";
    let to="";
    let numForm=1;
    let API2="";
    let numero=10;
    let n2=0;
    let limit=false;
    let opcionSeleccionada=Array.from({ length: numForm }, () => 'name');

    const newCompany = { 
                rank: 20,
                name: 'Honda',
                country: 'Japon',
                sale: 15.381,
                profit: 41.9837,
                asset: 347.238,
                market_value: 229.805,
                year: 2018    
        }

    

    function handleSeleccion(event, nn) {
        opcionSeleccionada[nn] = event.target.value;
    }

    onMount(() => {
        getForbes_billonaires();
    })

    

    export async function getForbes_billonaires(pages=1) {
        try {
            let offset=numero*(pages-1);
            API2=API
            let response = "";

            if (limit===true){
                if(API2===API){
                    API2=API+"?limit="+numero+"&offset="+offset;
                }else{
                    API2=API2+"&limit="+numero+"&offset="+offset;
                }
            }
            if(param.length===0){
                response=await fetch(API2,{
                                method:"GET"
                            });
            } else {
                let i = 0;
                while(i<param.length){
                    if(API2===API){
                        if(param[i]==="from-to"){
                            API2=API+"?from="+from+"&to="+to;
                        }else{
                            API2=API+"?"+param[i]+"="+busqueda[i];
                        }

                    }else{
                        if(param[i]==="from-to"){
                            API2=API2+"&from="+from+"&to="+to;
                        }else{
                            API2=API2+"&"+param[i]+"="+busqueda[i];
                        }
                        

                    }
                    i=i+1;
                }
                response=await fetch(API2,{
                                method:"GET"
                            });
                
            }
            

            let data = await response.json();
            companies = data;
            
            if (response.status === 200) {
                if(API2!==API){
                    Msg="Filtrado realizado correctamente";
                    setTimeout(() => {
                    Msg ="";
                },3000);
                }

            } else if (companies.length ===0){
                Msg = "La lista esta vacía";
                setTimeout(() => {
                    Msg ="";
                },3000);
            } else if( response.status === 400){
                errorMsg = "Formato incorrecto";
                setTimeout(() => {
                    errorMsg ="";
                },3000);
            }else {
                errorMsg = "Error cargando personas";
                setTimeout(() => {
                    errorMsg ="";
                },3000);
            }
        } catch(e) {
            errorMsg = e;
        }
            
    }


    async function actualizaC(){

    param=[];
    busqueda=[];
    for(let i=0;i<numForm;i++){
        let selectElement = document.getElementById('opciones '+i);

        let valorSeleccionado = selectElement.value;
        
        param.push(valorSeleccionado);

        if(param[i]==="from-to"){
            let selectElementFrom = document.getElementById('from '+i);
            
            let valorSeleccionadoFrom = selectElementFrom.value;
            from=valorSeleccionadoFrom;

            let selectElementTo = document.getElementById('to '+i);
            
            let valorSeleccionadoTo = selectElementTo.value;
            to=valorSeleccionadoTo;
            busqueda.push("");

        }else{
            let selectElement2 = document.getElementById('entrada '+i);    
            let valorSeleccionado2 = selectElement2.value;
            busqueda.push(valorSeleccionado2) ;

        }
    }
}


    async function filtrado(){
        await actualizaC();
        await getForbes_billonaires();
    }


    async function actualizaLO(){
        limit=false;
        await getForbes_billonaires(1);
        let numElems=companies.length;
        if(numElems>0){
            n2=Math.ceil(numElems/numero) ;
        }
        limit=true;
        await getForbes_billonaires(1);

    }

    async function aumentarf(){
        numForm=numForm+1;
    }

    async function disminuirF(){
        if (numForm > 0) {
            numForm -= 1;
        }
    }

    async function DeleteCompany(n) {
        try {
            let response = await fetch(API+"/"+n,{
                method: "DELETE"
            });
            console.log(`Deleting company with name ${n}`);
        
        if (response.status == 200){
            Msg = "Compañia borrada con éxito"
            companies = companies.filter(c => c.name !== n) ;
            setTimeout(() => {
                    Msg= "";
                }, 3000);
        } else {
            errorMsg = "Esa Compañia no existe";
            setTimeout(() => {
                errorMsg= "";
                }, 3000);
        }
        } catch(e) {
            errorMsg = e;
        }
    }

    async function DeleteCompanies() {
        try {
            let response = await fetch(API,{
                method: "DELETE"
            });
            
        
        if (response.status == 200){
            Msg = "Compañias borrada con éxito"
            companies = [];
            setTimeout(() => {
                    Msg= "";
                }, 3000);
        } else {
            errorMsg = "Ya están todas las Compañias borradas";
            setTimeout(() => {
                errorMsg= "";
                }, 3000);
        }
        } catch(e) {
            errorMsg = e;
            
        }
        }
    
            
    async function CreateCompany() {
        try {
            let response = await fetch(API,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCompany)
            });
            let status = await response.status;
            console.log(`Creation response status ${status}`)

            if (status === 201) {
                getForbes_billonaires();
                Msg = "compañia creada con éxito"
                setTimeout(() => {
                    Msg= "";
                }, 3000);
            } else {
                errorMsg = "La compañia ya existe";
                setTimeout(() => {
                errorMsg= "";
                }, 3000);
            }

        } catch(e) {
            errorMsg = e;
        }
    }
    

        
</script>

<table>
    <thead>
        <tr>
            <th>
                Ranking
            </th>
            <th>
                Nombre
            </th>
            <th>
                Pais
            </th>
            <th>
                Ventas
            </th>
            <th>
                Beneficio
            </th>
            <th>
                Activos
            </th>
            <th>
                Valor de mercado
            </th>
            <th>
                Año
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <input bind:value={newCompany.rank}>
            </td>
            <td>
                <input bind:value={newCompany.name}>
            </td>
            <td>
                <input bind:value={newCompany.country}>
            </td>
            <td>
                <input bind:value={newCompany.sale}>
            </td>
            <td>
                <input bind:value={newCompany.profit}>
            </td>
            <td>
                <input bind:value={newCompany.asset}>
            </td>
            <td>
                <input bind:value={newCompany.market_value}>
            </td>
            <td>
                <input bind:value={newCompany.year}>
            </td>
            <td>
                <Button color="primary" on:click="{CreateCompany}">Crear</Button>
            </td>
        </tr>            
    </tbody>
</table>

<span>
    <button on:click={aumentarf}> Añadir filtro </button>
    <h5>Filtrar</h5>
    <button  on:click={disminuirF}> Borrar filtro </button>
</span>

 {#each Array.from({ length: numForm }, (_, i) => i) as nn}
    {#if opcionSeleccionada[nn] === 'from-to'}
        <form id='FormularioBusqueda {nn}'>
            <label for="opciones">Búsqueda por:</label>
            <select class="inpututil" id='opciones {nn}' name="opciones" on:change={e => handleSeleccion(e, nn)}>
                <option class="inpututil" value="rank" selected>Ranking</option>
                <option class="inpututil" value="name">Nombre</option>
                <option class="inpututil" value="country">Pais</option>
                <option class="inpututil" value="sale">Ventas</option>
                <option class="inpututil" value="profit">Beneficio</option>
                <option class="inpututil" value="asset">Acciones</option>
                <option class="inpututil" value="market_value">Valor de Mercado</option>
                <option class="inpututil" value="year">Año</option>
                <option class="inpututil" value="from-to" >Rango de años</option>
            </select>
            <br>
            <br>
            <label for='from'>Desde:</label>
            <input type="text" id='from {nn}' name="from">
            <label for='to'>Hasta:</label>
            <input type="text" id='to {nn}' name="to">
            <br>
            <br>
        </form>
    {:else}
        <form id='FormularioBusqueda {nn}'>
            <label for="opciones">Búsqueda por:</label>
            <select class="inpututil" id='opciones {nn}' name="opciones" on:change={e => handleSeleccion(e, nn)}>
                <option class="inpututil" value="rank" selected>Ranking</option>
                <option class="inpututil" value="name">Nombre</option>
                <option class="inpututil" value="country">Pais</option>
                <option class="inpututil" value="sale">Ventas</option>
                <option class="inpututil" value="profit">Beneficio</option>
                <option class="inpututil" value="asset">Acciones</option>
                <option class="inpututil" value="market_value">Valor de Mercado</option>
                <option class="inpututil" value="year">Año</option>
                <option class="inpututil" value="from-to" >Rango de años</option>
            </select>
            <br>
            <br>
            <label for='entrada'>Introduzca el valor de la búsqueda</label>
            <input type="text" id='entrada {nn}' name="texto">       
            <br>
            <br>
        </form>
    {/if}
{/each}
<button type="button" id="Filtrar"  on:click={filtrado}> Filtrar </button>

<br>
<br>
<form>
    <label for="paginar">Introduzca el numero de elementos que deseas </label>
    <input type="number" id="paginar" name="number" bind:value={numero}> 
    <button type="button" id="Paginar" on:click={actualizaLO}> Paginar </button>
</form>

<br>
<br>


<ul>
    {#each companies as company}
        <li><a href="/forbes-billonaires/{company.name}/{company.country}">{company.name}</a>- {company.profit}</li> <Button color="danger" on:click="{DeleteCompany(company.name)}">Borrar</Button>
    {/each}
</ul>

<Button color="danger" on:click="{DeleteCompanies}">Borrar todo</Button>

<MessageContainer {Msg} {errorMsg}/>