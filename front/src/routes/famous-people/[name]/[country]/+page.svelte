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
        
        try {
            
            name = data.name;
            let short_description = data.short_description;
            let gender = data.gender;
            let country = data.country;
            let occupation = data.occupation;
            let birth_year = data.birth_year;
            let death_year = data.death_year;
            let age_of_death = data.age_of_death

            if(response.status == 404){
            errorMsg = `No existe la persona`;
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
        console.log(personData.short_description)
    })
    
    async function updatePerson(){
        const updatedPerson = {
                name: personData?.name,
                short_description: personData?.short_description,
                gender: personData?.gender,
                country: personData?.country,
                occupation: personData?.occupation,
                birth_year: personData?.birth_year,
                death_year: personData?.death_year,
                age_of_death: personData?.age_of_death,
        };

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
            getPerson();
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


{#if personData}
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
                <input bind:value={personData.name}>
            </td>
            <td>
                <input bind:value={personData.short_description}>
            </td>
            <td>
                <input bind:value={personData.gender}>
            </td>
            <td>
                <input bind:value={personData.country}>
            </td>
            <td>
                <input bind:value={personData.occupation}>
            </td>
            <td>
                <input bind:value={personData.birth_year}>
            </td>
            <td>
                <input bind:value={personData.death_year}>
            </td>
            <td>
                <input bind:value={personData.age_of_death}>
            </td>
            <td>
                <Button color="primary" on:click="{updatePerson}">Actualizar</Button>
            </td>
        </tr>            
    </tbody>
</table>
{:else}
<p>Loading data...</p>
{/if}

{#if Msg != ""}
<hr>
{Msg}
{/if}


{#if errorMsg != ""}
<hr>
ERROR: {errorMsg}
{/if}