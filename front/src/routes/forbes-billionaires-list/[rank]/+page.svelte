<script>
	import {page} from '$app/stores';
	import { Button, Col, Row,Input } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';
	import  MessageContainer  from "../../MessageContainer.svelte";


	let person = $page.params;
	const API_BASE = 'https://sos2324-22.appspot.com' || 'http://localhost:10000'
	const API = `${API_BASE}/api/v2/forbes-billionaires-list/${person.rank}`;
	let errorMsg = "";
	let Msg = "";
	let billionaireData;

	async function getBillionaire() {
	const response = await fetch(API,{
	method: "GET"
	})
	const data = await response.json();

	try {

	let rank = data.rank;
	let name = data.name;
	let net_worth = data.net_worth;
	let age = data.age;
	let country = data.country;
	let source = data.source;
	let industry = data.industry;


	if(response.status == 404){
	errorMsg = `No existe el billonario`;
	setTimeout(() => {
	Msg = "";
	}, 3000);
	}
	} catch(e) {
	errorMsg = e;
	}

	return data;

	}

	onMount(async () => {
		billionaireData = await getBillionaire();
		console.log(billionaireData.name)
	})

	async function updateBillionaire(){
	const updatedBillionaire = {
	rank: billionaireData?.rank,
	name: billionaireData?.name,
	net_worth: billionaireData?.net_worth,
	age: billionaireData?.age,
	country: billionaireData?.country,
	source: billionaireData?.source,
	industry: billionaireData?.industry,
	};

	try{
	let response = await fetch(API,{
	method: "PUT",
	headers: {
	"Content-Type": "application/json"
	},
	body: JSON.stringify(updatedBillionaire)
	});
	if (response.ok){
	Msg = "Billonario actualizado con éxito"
	getBillionaire();
	setTimeout(() => {
	Msg= "";
	}, 3000);
	} else {
	errorMsg = "Ese billonario no existe";
	setTimeout(() => {
	errorMsg= "";
	}, 3000);
	}
	} catch(e) {
	errorMsg = e;
	}
	}


</script>

<style>
    input {
        width: 200px; 
        border: 1px solid #ccc; 
        padding: 5px; 
        font-size: 16px; 
    }
</style>



<h2>Details of {person.name}</h2>
<hr>

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
				<input bind:value={billionaireData.rank}>
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
