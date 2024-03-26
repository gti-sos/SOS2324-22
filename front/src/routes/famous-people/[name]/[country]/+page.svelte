<script>
    import {page} from '$app/stores';
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import { onMount } from 'svelte';

    let person = $page.params;
    const API = `http://localhost:10000/famous-people/${person.name}/${person.country}`;
    let errorMsg = "";
    let Msg = "";

    onMount(() => {
        getPeople();
    })

    async function getPeople(){
        
    }
    
    async function updatePerson(){
        const updatedFields = {
                name: person.name,
                country: person.country,
            };
        try{
            let response = await fetch(API,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedFields)
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
                País
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <input bind:value={person.name}>
            </td>
            <td>
                <input bind:value={person.country}>
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