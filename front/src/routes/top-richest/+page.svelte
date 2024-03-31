<script>
    import {onMount} from "svelte";
    import { dev } from "$app/environment";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import  MessageContainer  from '../MessageContainer.svelte';

    let API = "http://localhost:10000/api/v2/top-richest"
    let people = []
    let errorMsg = "";
    let Msg = ""; 

    const newPerson = { 
        name: 'Elon Musk', 
        net_worth: 240, 
        bday_year: 1971, 
        age: 51, 
        nationality: 'South Africa'  
    }

    onMount(() => {
        getMillonarios();
    })

    export async function getMillonarios() {
        try {
            let response = await fetch(API,{
                method: "GET"
            });
            let data = await response.json();
            people = data;
            
            if (response.status === 200) {
                Msg = "Millonarios creados con éxito";
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
            console.log(`Borrando millonario ${n}`);
        
        if (response.status === 200){
            Msg = "Millonario borrado con éxito"
            people = people.filter(p => p.name !== n);
            setTimeout(() => {
                    Msg= "";
                }, 3000);
        } else {
            errorMsg = "Ese millonario no existe";
            setTimeout(() => {
                errorMsg= "";
                }, 3000);
        }
        } catch(e) {
            errorMsg = e;
        }
    }

    async function deleteAllMillonarios() {
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
    
            
    async function createMillonarios() {
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
                getMillonarios();
                Msg = "Persona creada con éxito";
                setTimeout(() => {
                    Msg= "";
                }, 3000);
            } else {
                errorMsg = "La persona ya existe";
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
                Nombre
            </th>
            <th>
                Patrimonio neto
            </th>
            <th>
                Año de nacimiento
            </th>
          
    </thead>
    <tbody>
        <tr>
            <td>
                <input bind:value={newPerson.name}>
            </td>
            <td>
                <input bind:value={newPerson.net_worth}>
            </td>
            <td>
                <input bind:value={newPerson.bday_year}>
            </td>
        </tr>            
    </tbody>
    <thead>
        <tr>
            <th>
                Edad
            </th>
            <th>
                Nacionalidad
            </th>
           
        </tr>
    </thead>
    <tbody>
        <td>
            <input bind:value={newPerson.age}>
        </td>
        <td>
            <input bind:value={newPerson.nationality}>
        </td>
       
        <td>
            <Button color="primary" on:click="{createMillonarios}">Crear</Button>
        </td>
    </tbody>
</table>


<ul>
    {#each people as person}
        <div class="person-container" ><li><a href="/top-richest/{person.name}/{person.nationality}">{person.name}</a>- {person.net_worth}</li> <Button class="delete-button" color="danger" on:click="{deleteMillonarios(person.name)}">Borrar</Button></div>
    {/each}
</ul>

<Button color="danger" on:click="{deleteAllMillonarios}">Borrar todo</Button>

<MessageContainer {Msg} {errorMsg}/>
  
