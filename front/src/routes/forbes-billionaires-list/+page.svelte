<script>
    import {onMount} from "svelte";
    import { dev } from "$app/environment";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import  MessageContainer  from '../MessageContainer.svelte';

    let API = "http://localhost:10000/api/v2/forbes-billionaires-list"
    let people = []
    let errorMsg = "";
    let Msg = ""; 

    const newPerson = { 
        rank: 11,
		name: 'Bernardose Arnault family',
		net_worth: 211,
		age: 74,
		country: 'France',
		source: 'LVMH',
		industry: 'Fashion'
    }

    onMount(() => {
        getForBillionaires();
    })

    export async function getForBillionaires() {
        try {
            let response = await fetch(API,{
                method: "GET"
            });
            let data = await response.json();
            people = data;
            
            if (response.status === 200) {
                Msg = "Billonarios creados con éxito";
                setTimeout(() => {
                    Msg ="";
                },3000);
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

    async function deleteMillonarios(n) {
        try {
            let response = await fetch(API+"/"+n,{
                method: "DELETE"
            });
            console.log(`Borrando billonario ${n}`);
        
        if (response.status === 200){
            Msg = "Billonario borrado con éxito"
            people = people.filter(p => p.name !== n);
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
            Msg = "Millonarios borrados con éxito"
            people= [];
            setTimeout(() => {
                    Msg= "";
                }, 3000);
        } else {
            errorMsg = "Ya están todas los millonarios borrados";
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
                Msg = "Billonario creada con éxito";
                setTimeout(() => {
                    Msg= "";
                }, 3000);
            } else {
                errorMsg = "El billonario ya existe";
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


<ul>
    {#each people as person}
        <div class="person-container" ><li><a href="/forbes-billionaires-list/{person.rank}">{person.name}</a>- {person.net_worth}</li> <Button class="delete-button" color="danger" on:click="{deleteMillonarios(person.name)}">Borrar</Button></div>
    {/each}
</ul>

<Button color="danger" on:click="{deleteAllBillionaires}">Borrar todo</Button>

<MessageContainer {Msg} {errorMsg}/>
  
