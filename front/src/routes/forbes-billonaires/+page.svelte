<script>
        import {onMount} from "svelte";
        import { dev } from "$app/environment";
        import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    
        let API = "http://localhost:10000/api/v1/forbes-billonaires"
        let companies = []
        let errorMsg = "";
        let Msg = ""; 
    
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
                let response = await fetch(API,{
                    method: "GET"
                });
                let data = await response.json();
                companies = data;
                console.log(data);
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
                getForbes_billonaires();
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
                getForbes_billonaires();
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
    
                if (status == 201) {
                    Msg = "Company creada con éxito"
                    getForbes_billonaires();
                    setTimeout(() => {
                        Msg= "";
                    }, 3000);
                } else {
                    errorMsg = "La Company ya existe";
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
                    Rank
                </th>
                <th>
                    Name
                </th>
                <th>
                    Country
                </th>
                <th>
                    Sale
                </th>
                <th>
                    Profit
                </th>
                <th>
                    Asset
                </th>
                <th>
                    Market value
                </th>
                <th>
                    Year
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
    
    <ul>
        {#each companies as company}
            <li><a href="/forbes-billonaires/{company.name}/{company.country}">{company.name}</a>- {company.profit}</li> <Button color="primary" on:click="{DeleteCompany(company.name)}">Borrar</Button>
        {/each}
    </ul>
    
    <Button color="danger" on:click="{DeleteCompanies}">Borrar todo</Button>
    
    {#if Msg != ""}
    <hr>
    {Msg}
    {/if}
    
    
    {#if errorMsg != ""}
    <hr>
    ERROR: {errorMsg}
    {/if}