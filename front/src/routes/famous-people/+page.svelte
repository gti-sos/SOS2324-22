<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import  MessageContainer  from '../MessageContainer.svelte';

    let API = "/api/v2/famous-people"

    if (dev){
        API = "http://localhost:10000"+API;
    }
    let people = []
    let errorMsg = "";
    let Msg = ""; 
    let currentPage = 1;
	let offset = 0;
	const limit = 10;
    let search = {
        name: '',
        short_description: '',
        gender: '',
        country: '',
        occupation: '',
        birth_year: null,
        death_year: null,
        age_of_death: null
    };
    


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
            let response = await fetch(`${API}/?offset=${offset}&limit=${limit}`,{
                method: "GET"
            });
            let data = await response.json();
            people = data;
            
            if (response.status === 200) {
                /*Msg = "Personas creadas con éxito";
                setTimeout(() => {
                    Msg ="";
                },3000);*/
            } else if (people.length ===0){
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

    async function DeletePeople(n) {
        try {
            let response = await fetch(API+"/"+n,{
                method: "DELETE"
            });
            console.log(`Deleting person with name ${n}`);
        
        if (response.status === 200){
            Msg = "Persona borrada con éxito"
            people = people.filter(p => p.name !== n);
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
            Msg = "Personas borradas con éxito"
            people= [];
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

            if (status === 201) {
                getPeople();
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

    
	async function searchPeople() {
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
            people = data;
            errorMsg = "";
        } else {
            errorMsg = "Error al realizar la búsqueda";
        }
    } catch (error) {
        errorMsg = "Error del servidor al realizar la búsqueda";
    }
}



    async function nextPage() {
		if(people.length === limit){
			offset += limit;
			currentPage += 1;
			await getPeople();
		}
	}
	
	async function previousPage(){
		offset = Math.max(0, offset - limit);
		currentPage = Math.max(1, currentPage-1);
		await getPeople();
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

    <input bind:value={search.name} placeholder="Nombre">
    <input bind:value={search.short_description} placeholder="Breve descripcion">
    <input bind:value={search.gender} placeholder="Género">
    <input bind:value={search.country} placeholder="País">
    <input bind:value={search.occupation} placeholder="Profesión">
    <input bind:value={search.birth_year} placeholder="Año de nacimiento">
    <input bind:value={search.death_year} placeholder="Año de fallecimiento">
    <input bind:value={search.age_of_death} placeholder="Edad de muerte">
</div>


<Button color="primary" on:click="{searchPeople}">Buscar</Button>

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
    </thead>
    <tbody>
        <tr>
            <td>
                <input bind:value={newPerson.name}>
            </td>
            <td>
                <input bind:value={newPerson.short_description} style:width={newPerson.short_description.length * 8 + 'px'}>
            </td>
            <td>
                <input bind:value={newPerson.gender}>
            </td>
            <td>
                <input bind:value={newPerson.country}>
            </td>
        </tr>            
    </tbody>
    <thead>
        <tr>
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
    </tbody>
</table>


<ul>
    {#each people as person}
        <div class="person-container" ><li><a href="/famous-people/{person.name}/{person.country}">{person.name}</a>- {person.gender}</li> <Button class="delete-button" color="danger" on:click="{DeletePeople(person.name)}">Borrar</Button></div>
    {/each}
</ul>

<Button color="danger" on:click="{DeleteAllPeople}">Borrar todo</Button>


<div>
	<Button color="primary" on:click="{previousPage}">Página anterior</Button>
	<span>Página actual: {currentPage}</span>
	<Button color="primary" on:click="{nextPage}">Página siguiente</Button>
</div>


<MessageContainer {Msg} {errorMsg}/>