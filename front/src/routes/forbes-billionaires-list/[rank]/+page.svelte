<script>
	import {page} from '$app/stores';
	import { Button, Col, Row,Input } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';
	import  MessageContainer  from "../../MessageContainer.svelte";
	import { dev } from "$app/environment";


	let person = $page.params;
	
	let API = "/api/v2/forbes-billionaires-list/"+person.rank;
    if (dev){
        API= "http://localhost:10000";
    }
	let errorMsg = "";
	let Msg = "";
	let billionaireData = null;
	
	async function getBillionaire() {
		const response = await fetch(API,{
			method: "GET"
		});
    
		try {
			if (response.status === 404) {
				errorMsg = `El billonario con el puesto ${person.rank} no existe`;
				setTimeout(() => {
					errorMsg = "";
				}, 3000);
				return null;
			} else {
				const data = await response.json();
				return data;
			}
		} catch (error) {
			/*errorMsg = "Error al obtener los datos del billonario";
			setTimeout(() => {
				errorMsg = "";
			}, 3000);*/
			return null;
		}
	}

	
	async function updateBillionaire() {
		const updatedBillionaire = {
			rank: parseInt(billionaireData?.rank),
			name: billionaireData?.name,
			net_worth: parseFloat(billionaireData?.net_worth),
			age: parseInt(billionaireData?.age),
			country: billionaireData?.country,
			source: billionaireData?.source,
			industry: billionaireData?.industry
		};

		try {
        const response = await fetch(API, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBillionaire)
        });

        if (response.ok) {
            Msg = "Billonario actualizado con éxito";
            getBillionaire();
            setTimeout(() => {
                Msg = "";
            }, 3000);
        } else {
            errorMsg = "Error al actualizar el billonario";
            setTimeout(() => {
                errorMsg = "";
            }, 3000);
        }
    } catch (error) {
        errorMsg = error.message || "Error de red al intentar actualizar el billonario";
        setTimeout(() => {
            errorMsg = "";
        }, 3000);
    }
}

	onMount(async () => {
		billionaireData = await getBillionaire();
		if(billionaireData){
			console.log(billionaireData.name)
		}
	})


</script>

<style>
    input {
        width: 200px; 
        border: 1px solid #ccc; 
        padding: 5px; 
        font-size: 16px; 
    }
</style>



{#if billionaireData}
	<h2>Detalles de {billionaireData.name }</h2>
	<hr>
{:else}
	<p>Esta persona no existe.</p>
{/if}

	{#if billionaireData}
	<table>
    <thead>
        <tr>
			<th>
				Puesto
			</th>
			<th>
				Nombre
			</th>
			<th>
				Patrimonio neto (billones)
			</th>
			<th>
				Edad
			</th>
		</thead>
	<tbody>
		<tr>
			<td>
				<input bind:value={billionaireData.rank} disabled>
            </td>
			<td>
				<input bind:value={billionaireData.name}>
            </td>
			<td>
				<input bind:value={billionaireData.net_worth}>
            </td>
			<td>
				<input bind:value={billionaireData.age}>
            </td>
		</tr>
	</tbody>
	<thead>
		<tr>
			<th>
				País
			</th>
			<th>
				Empresa
			</th>
			<th>
				Industria
			</th>
		</thead>
	<tbody>
		<td>
			<input bind:value={billionaireData.country}>
        </td>
		<td>
			<input bind:value={billionaireData.source}>
        </td>
		<td>
			<input bind:value={billionaireData.industry}>
        </td>
       
        <td>
            <Button color="primary" on:click="{updateBillionaire}">Actualizar</Button>
        </td>
    </tbody>
</table>
{/if}


<MessageContainer {Msg} {errorMsg}/>
