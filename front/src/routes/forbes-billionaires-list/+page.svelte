<script>
	import {onMount} from "svelte";
	import { dev } from "$app/environment";
	import { Button, Col, Row } from '@sveltestrap/sveltestrap';
	import  MessageContainer  from '../MessageContainer.svelte';

	const API_BASE = 'https://sos2324-22.appspot.com' || 'http://localhost:10000';
	const API = `${API_BASE}/api/v2/forbes-billionaires-list`;
	let people = []
	let errorMsg = "";
	let Msg = "";
	let currentPage = 1;
	let offset = 0;
	const limit = 10;

	const newPerson = {
		rank: 11,
		name: 'Bernardose Arnault family',
		net_worth: 211,
		age: 74,
		country: 'France',
		source: 'LVMH',
		industry: 'Fashion'
	}
	
	let search = {
        rank: null,
        name: '',
        net_worth: null,
        age: null,
        country: '',
        source: '',
        industry: ''
    };

	onMount(() => {
		getForBillionaires();
	})

	export async function getForBillionaires() {
		try {
			let response = await fetch(`${API}/?offset=${offset}&limit=${limit}`,{
				method: "GET"
			});
			let data = await response.json();
			people = data;

			if (response.status === 200) {
				/*Msg = "Billonarios creados con éxito";
				setTimeout(() => {
					Msg ="";
				},3000);*/
			} else if (people.length ===0){
				Msg = "La lista esta vacía";
				setTimeout(() => {
					Msg ="";
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
	
	async function searchBillionaires() {
		const params = new URLSearchParams();
		for (const key in search) {
			if (search[key] !== '' && search[key] !== null) {
				const value = key === 'rank' || key === 'age' || key === 'net_worth' ? Number(search[key]) : search[key];
				params.append(key, search[key]);
			}
		}
		
		
		try{
			const response = await fetch(`${API}?${params}`,{
				methos: "GET"
			});
			const data = await response.json();
			
			if (response.status === 200) {
				people = data;
				errorMsg = "";
			} else {
				errorMsg = "Error al realizar la búsqueda";
			}
		} catch (error) {
			errorMsg = "Error del servidor al realizar la búsqueda";
		}
	}

	async function deleteBillonario(rank) {
		try {
			let response = await fetch(`${API}/${rank}`,{
				method: "DELETE"
			});
			console.log(`Borrando billonario ${rank}`);

			if (response.status === 200){
				Msg = "Billonario borrado con éxito"
				people = people.filter(p => p.rank !== rank);
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

	async function deleteAllBillionaires() {
		try {
			let response = await fetch(API,{
				method: "DELETE"
			});

			if (response.status == 200){
				Msg = "Billonarios borrados con éxito"
				people= [];
				setTimeout(() => {
					Msg= "";
				}, 3000);
			} else {
				errorMsg = "Ya están todos los billonarios borrados";
				setTimeout(() => {
					errorMsg= "";
				}, 3000);
			}
		} catch(e) {
			errorMsg = e;

		}
	}


	async function createBillionaires() {
		try {
			newPerson.rank = parseInt(newPerson.rank);
			newPerson.net_worth = parseFloat(newPerson.net_worth);
			newPerson.age = parseInt(newPerson.age);
			let response = await fetch(API,{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newPerson)
			});
			let status = await response.status;
			console.log(`Creation response status ${status}`)

			if (status === 201) {
				getForBillionaires();
				Msg = "Billonario creado con éxito";
				setTimeout(() => {
					Msg= "";
				}, 3000);
			} else {
				errorMsg = "El billonario ya existe o hay campos erróneos";
				setTimeout(() => {
					errorMsg= "";
				}, 3000);
			}

		} catch(e) {
			errorMsg = e;
		}
	}
	
	async function nextPage() {
		if(people.length === limit){
			offset += limit;
			currentPage += 1;
			await getForBillionaires();
		}
	}
	
	async function previousPage(){
		offset = Math.max(0, offset - limit);
		currentPage = Math.max(1, currentPage-1);
		await getForBillionaires();
	}


</script>

<style>
    input {
        width: 200px; 
        border: 1px solid #ccc; 
        padding: 5px; 
        font-size: 16px; 
    }
    .person-container {
        display: flex;
        align-items: center;
        margin: 1rem 0;
    }

    .person-container li {
        margin-right: 1rem;
    }

    .delete-button {
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f44336;
    color: white;
    cursor: pointer;
    }
</style>


<div>
	<h2>Buscar por campos</h2>
</div>

<input bind:value={search.rank} placeholder="Rank">
<input bind:value={search.name} placeholder="Nombre">
<input bind:value={search.net_worth} placeholder="Patrimonio neto">
<input bind:value={search.age} placeholder="Edad">
<input bind:value={search.country} placeholder="País">
<input bind:value={search.source} placeholder="Empresa">
<input bind:value={search.industry} placeholder="Industria">

<Button color="primary" on:click="{searchBillionaires}">Buscar</Button>


<ul>
    {#each people as person}
        <div class="person-container" ><li><a href="/forbes-billionaires-list/{person.rank}">{person.name}</a>- {person.net_worth}</li> <Button class="delete-button" color="danger" on:click="{deleteBillonario(person.rank)}">Borrar</Button></div>
    {/each}
</ul>

<div>
	<Button color="primary" on:click="{previousPage}">Página anterior</Button>
	<span>Página actual: {currentPage}</span>
	<Button color="primary" on:click="{nextPage}">Página siguiente</Button>
</div>
	
<div>
	<h2>Crear un nuevo billonario</h2>
</div>


	
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
				<input bind:value={newPerson.rank}>
            </td>
			<td>
				<input bind:value={newPerson.name}>
            </td>
			<td>
				<input bind:value={newPerson.net_worth}>
            </td>
			<td>
				<input bind:value={newPerson.age}>
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
			<input bind:value={newPerson.country}>
        </td>
		<td>
			<input bind:value={newPerson.source}>
        </td>
		<td>
			<input bind:value={newPerson.industry}>
        </td>
       
        <td>
            <Button color="primary" on:click="{createBillionaires}">Crear</Button>
        </td>
    </tbody>
</table>



<Button color="danger" on:click="{deleteAllBillionaires}">Borrar todo</Button>

<MessageContainer {Msg} {errorMsg}/>
  
