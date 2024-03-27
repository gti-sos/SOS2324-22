<script>
    import {page} from '$app/stores';
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import { onMount } from 'svelte';

    let person = $page.params;
    const API = `http://localhost:10000/api/v1/famous-people/${person.name}/${person.country}`;
    let errorMsg = "";
    let Msg = "";
    let personData;

    async function getPerson() {
        const response = await fetch(API,{
            method: "GET"
        })
        const data = await response.json();
            console.log(data);
        try {
            
            name = data.name;
            short_description = data.short_description;
            gender = data.gender;
            country = data.country;
            occupation = data.occupation;
            birth_year = data.birth_year;
            death_year = data.death_year;
            age_of_death = data.age_of_death

            if(response.status == 404){
            errorMsg = `No existe la persona`;
            setTimeout(() => {
                Msg = "";
            }, 3000);
            }else{
                errorMsg = "Ha habido un error en la petición";
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
        personData = await getPerson();
        console.log(personData)
    })
    
    async function updatePerson(){
        
        try{
            let response = await fetch(API,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedPerson)
            });
        if (response.status == 200){
            Msg = "Persona actualizada con éxito"
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
    

</script>
Details of {person.name}



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
                <input bind:value={person.name}>
            </td>
            <td>
                <input bind:value={person.short_description}>
            </td>
            <td>
                <input bind:value={person.gender}>
            </td>
            <td>
                <input bind:value={person.country}>
            </td>
            <td>
                <input bind:value={person.occupation}>
            </td>
            <td>
                <input bind:value={person.birth_year}>
            </td>
            <td>
                <input bind:value={person.death_year}>
            </td>
            <td>
                <input bind:value={person.age_of_death}>
            </td>
            <td>
                <Button color="primary" on:click="{updatePerson}">Actualizar</Button>
            </td>
        </tr>            
    </tbody>
</table>

{#if Msg != ""}
<hr>
{Msg}
{/if}


{#if errorMsg != ""}
<hr>
ERROR: {errorMsg}
{/if}