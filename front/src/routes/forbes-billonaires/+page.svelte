<script>
    import {onMount} from "svelte";
    import { dev } from "$app/environment";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import MessageContainer from "../MessageContainer.svelte";

    let API = "/api/v2/forbes-billonaires"
    let API2 = "/forbes-billonaires"
    if (dev){
        API="http://localhost:10000"+API;
    }
    let companies = []
    let errorMsg = "";
    let Msg = ""; 
    let currentPage = 1;
	let offset = 0;
	const limit = 10;
    let search = { 
            rank: null,
            name: '',
            country: '',
            sale: null,
            profit: null,
            asset: null,
            market_value: null,
            year: null    
    }

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

    onMount(() => {
        getForbes_billonaires();
    })

    export async function getForbes_billonaires() {
        try {
            let response = await fetch(`${API}/?offset=${offset}&limit=${limit}`,{
                method: "GET"
            });
            let data = await response.json();
            companies = data;

        
            if (response.status === 200) {
            } else if (companies.length ===0){
                Msg = "La lista esta vacía";
                setTimeout(() => {
                    Msg ="";
                },3000);
            }else if(response.status===400){
                errorMsg = "Formato incorrecto";
                setTimeout(() => {
                    Msg ="";
                },3000);
            }else {
                errorMsg = "Error cargando compañias";
                setTimeout(() => {
                    errorMsg ="";
                },3000);
            }
    } catch(e) {
        errorMsg = e;
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
                Msg = "compañia creada con éxito"
                getForbes_billonaires();
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

    async function searchCompany() {
    const params = new URLSearchParams();
    for (const key in search) {
        if (search[key]) {
            
            params.append(key, search[key]);
        }
    }
    

    try {
        const response = await fetch(`${API}/?${params}`, {
            method: "GET"
        });
        const data = await response.json();

        if (response.status === 200) {
            companies = data;
            errorMsg = "";
            if(companies.length===0){
                errorMsg = "No exite el dato"
            }
            
        } else {
            errorMsg = "Error al realizar la búsqueda";
        }
    } catch (error) {
        errorMsg = "Error del servidor al realizar la búsqueda";
    }
}

    async function nextPage() {
            if(companies.length === limit){
                offset += limit;
                currentPage += 1;
                await getForbes_billonaires();
            }
        }
	
	async function previousPage(){
		offset = Math.max(0, offset - limit);
		currentPage = Math.max(1, currentPage-1);
		await getForbes_billonaires();
	}
    

        
</script>

<div>
    <h2>Buscar por campos</h2>

    <input bind:value={search.rank} type="number" placeholder="Ranking">
    <input bind:value={search.name} placeholder="Nombre Compañia">
    <input bind:value={search.country} placeholder="País">
    <input bind:value={search.sale} placeholder="Ventas">
    <input bind:value={search.profit} placeholder="Beneficio">
    <input bind:value={search.asset} placeholder="Activos">
    <input bind:value={search.market_value} placeholder="Valor de Mercado">
    <input bind:value={search.year} placeholder="Año">
</div>


<Button color="primary" on:click="{searchCompany}">Buscar</Button>

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
                <input type="number" bind:value={newCompany.rank}>
            </td>
            <td>
                <input bind:value={newCompany.name}>
            </td>
            <td>
                <input bind:value={newCompany.country}>
            </td>
            <td>
                <input type="number" bind:value={newCompany.sale}>
            </td>
            <td>
                <input type="number" bind:value={newCompany.profit}>
            </td>
            <td>
                <input type="number" bind:value={newCompany.asset}>
            </td>
            <td>
                <input type="number" bind:value={newCompany.market_value}>
            </td>
            <td>
                <input type="number" bind:value={newCompany.year}>
            </td>
            <td>
                <Button color="primary" on:click="{CreateCompany}">Crear</Button>
            </td>
        </tr>            
    </tbody>
</table>

<ul>
    {#each companies as company}
        <li><a href="/forbes-billonaires/{company.name}/{company.country}">{company.name}</a>- {company.profit}</li> <Button color="danger" on:click="{DeleteCompany(company.name)}">Borrar</Button>
    {/each}
</ul>

<Button color="danger" on:click="{DeleteCompanies}">Borrar todo</Button>
<Button
            style="background-color: #0366d6; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;"
            on:click={() => {
                window.location.href = API2 + '/graphs';
            }}
            >Graficos
        </Button>

<div>
	<Button color="primary" on:click="{previousPage}">Página anterior</Button>
	<span>Página actual: {currentPage}</span>
	<Button color="primary" on:click="{nextPage}">Página siguiente</Button>
</div>

<style>
    div {
        border-radius: 30px;
        margin-left: 150px;
        margin-right: 150px;
        margin-bottom: 15px;
        padding-bottom: 25px;
        padding-top: 25px;
        text-align: center;
        border-color: grey;
        border-width: 1px;
        border-style: solid;
        background-color: blanchedalmond;
    }

    ul {
        align-items: center;
        margin-left: 100px;
        margin-right: 100px;
        list-style-position: center;

    }


</style>


<MessageContainer {Msg} {errorMsg}/>