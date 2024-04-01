<script>
    import {page} from '$app/stores';
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import { onMount } from 'svelte';
    import { dev } from "$app/environment";
    import MessageContainer from '../../../MessageContainer.svelte';

    let company = $page.params;
    let API = "/api/v2/forbes-billonaires/"+company.name+"/"+company.country;
        if (dev){
            API="http://localhost:10000"+API;
        }
    let errorMsg = "";
    let Msg = "";
    let companyData;

   

    async function getForbes_billonaires() {
        const response = await fetch(API,{
            method: "GET"
        })
        const data = await response.json();
        
        try {

            let rank = data.rank 
            let name = data.name;
            let country = data.country;
            let sale = data.sale;
            let profit = data.profit;
            let asset = data.asset;
            let market_value = data.market_value;
            let year = data.year;
            

            if(response.status == 404){
            errorMsg = `No existe la compañia`;
            setTimeout(() => {
                Msg = "";
            }, 3000);
        }
     } catch(e) {
            errorMsg = e;
    }
        
    return data;
    
}

onMount(async() => {
        companyData = await getForbes_billonaires();
    })
    
    async function updateCompany(){
            const updatedCompany = {
                    rank: companyData?.rank,
                    name: companyData?.name,
                    country: companyData?.country,
                    sale: companyData?.sale,
                    profit: companyData?.profit,
                    asset: companyData?.asset,
                    market_value: companyData?.market_value,
                    year: companyData?.year,
            };

            try{
                let response = await fetch(API,{
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedCompany)
                });
            if (response.status == 200){
                Msg = "Compañia actualizada con éxito"
                getForbes_billonaires();
                setTimeout(() => {
                        Msg= "";
                    }, 3000);
            } else {
                errorMsg = "Esa compañia no existe";
                setTimeout(() => {
                    errorMsg= "";
                    }, 3000);
            }
            } catch(e) {
                errorMsg = e;
            }
        }
    
    

</script>
<h2>Details of {company.name}</h2>
<hr>


{#if companyData}
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
                <input bind:value={companyData.rank}>
            </td>
            <td>
                <input bind:value={companyData.name}>
            </td>
            <td>
                <input bind:value={companyData.country}>
            </td>
            <td>
                <input bind:value={companyData.sale}>
            </td>
            <td>
                <input bind:value={companyData.profit}>
            </td>
            <td>
                <input bind:value={companyData.asset}>
            </td>
            <td>
                <input bind:value={companyData.market_value}>
            </td>
            <td>
                <input bind:value={companyData.year}>
            </td>
            <td>
                <Button color="primary" on:click="{updateCompany}">Actualizar</Button>
            </td>
        </tr>            
    </tbody>
</table>
{/if}

<MessageContainer {Msg} {errorMsg}/>