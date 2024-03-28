<script>
    import {onMount} from "svelte";
    import { dev } from "$app/environment";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';

    let API = "http://localhost:10000/api/v1/famous-people"
    let people = []
    let errorMsg = "";
    let Msg = ""; 

    const newPerson = { 
        name: 'Mariano Rajoy',
        short_description: ' president of Spain',
        gender: 'Male',
        country: 'Spain',
        occupation: 'Politician',
        birth_year: 1950,
        death_year: 2039,
        age_of_death: 89    
    }

    onMount(() => {
        getPeople();
    })

    export async function getPeople() {
        try {
            let response = await fetch(API,{
                method: "GET"
            });
            let data = await response.json();
            people = data;
            
            if (response.status == 201) {
                Msg = "Personas creadas con éxito";
                setTimeout(() => {
                    Msg ="";
                },3000);
            } else {
                errorMsg = "Error cargando personas";
                setTimeout(() => {
                    errorMsg ="";
                },3000);
            }
        } catch(e) {
            errorMsg = e;
        }
            
    }

    async function DeletePeople(n) {
        try {
            let response = await fetch(API+"/"+n,{
                method: "DELETE"
            });
            console.log(`Deleting person with name ${n}`);
        
        if (response.status == 200){
            Msg = "Persona borrada con éxito"
            getPeople();
            setTimeout(() => {
                    Msg= "";
                }, 3000);
        } else {
            errorMsg = "Esa persona no existe";
            setTimeout(() => {
                errorMsg= "";
                }, 3000);
        }
        } catch(e) {
            errorMsg = e;
        }
    }

    async function DeleteAllPeople() {
        try {
            let response = await fetch(API,{
                method: "DELETE"
            });
            
        
        if (response.status == 200){
            Msg = "Personas borrada con éxito"
            getPeople();
            setTimeout(() => {
                    Msg= "";
                }, 3000);
        } else {
            errorMsg = "Ya están todas las personas borradas";
            setTimeout(() => {
                errorMsg= "";
                }, 3000);
        }
        } catch(e) {
            errorMsg = e;
            
        }
        }
    
            
    async function CreatePeople() {
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

            if (status == 201) {
                Msg = "Persona creada con éxito"
                getPeople();
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

<table>
    <thead>
        <tr>
            <th>
                Nombre
            </th>
            <th>
                Breve descripción
            </th>
            <th>
                Género
            </th>
            <th>
                País
            </th>
            <th>
                Profesión
            </th>
            <th>
                Año de nacimiento
            </th>
            <th>
                Año de fallecimiento
            </th>
            <th>
                Edad de muerte
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <input bind:value={newPerson.name}>
            </td>
            <td>
                <input bind:value={newPerson.short_description}>
            </td>
            <td>
                <input bind:value={newPerson.gender}>
            </td>
            <td>
                <input bind:value={newPerson.country}>
            </td>
            <td>
                <input bind:value={newPerson.occupation}>
            </td>
            <td>
                <input bind:value={newPerson.birth_year}>
            </td>
            <td>
                <input bind:value={newPerson.death_year}>
            </td>
            <td>
                <input bind:value={newPerson.age_of_death}>
            </td>
            <td>
                <Button color="primary" on:click="{CreatePeople}">Crear</Button>
            </td>
        </tr>            
    </tbody>
</table>

<ul>
    {#each people as person}
        <li><a href="/famous-people/{person.name}/{person.country}">{person.name}</a>- {person.gender}</li> <Button color="primary" on:click="{DeletePeople(person.name)}">Borrar</Button>
    {/each}
</ul>

<Button color="danger" on:click="{DeleteAllPeople}">Borrar todo</Button>

{#if Msg != ""}
<hr>
{Msg}
{/if}


{#if errorMsg != ""}
<hr>
ERROR: {errorMsg}
{/if}