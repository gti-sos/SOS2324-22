<script>
    import {page} from '$app/stores';
    import { Button, Col, Row,Input } from '@sveltestrap/sveltestrap';
    import { dev } from "$app/environment";
    import { onMount } from 'svelte';
    import  MessageContainer  from "../../../MessageContainer.svelte";

    let API = "/api/v2/top-richest/${person.name}/${person.nationality}"
    if (dev){
        API = "http://localhost:10000"+API;
    }

    let person = $page.params;
    let errorMsg = "";
    let Msg = "";
    let millonarioData;

    async function getMillonario() {
        const response = await fetch(API,{
            method: "GET"
        })
        const data = await response.json();
        
        try {
            
            name = data.name;
            let net_worth = data.net_worth;
            let bday_year = data.bday_year;
            let age = data.age;
            let nationality = data.nationality;
    

            if(response.status == 404){
            errorMsg = `No existe el millonario`;
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
        millonarioData = await getMillonario();
        console.log(millonarioData.name)
    })
    
    async function updateMillonario(){
        const updatedPerson = {
                name: millonarioData?.name,
                net_worth: millonarioData?.net_worth,
                bday_year: millonarioData?.bday_year,
                age: millonarioData?.age,
                nationality: millonarioData?.nationality,
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
            Msg = "Millonario actualizado con éxito"
            getMillonario();
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

{#if millonarioData}
<table>
    <thead>
        <tr>
            <th>
                Nombre
            </th>
            <th>
                Patrimonio Neto 
            </th>
            <th>
                Año de nacimiento
            </th>
            <th>
                Edad
            </th>
    </thead>
    <tbody>
        <tr>
            <td>
                <input bind:value={millonarioData.name}>
            </td>
            <td>
                <input bind:value={millonarioData.net_worth}>
            </td>
            <td>
                <input bind:value={millonarioData.bday_year}>
            </td>
            <td>
                <input bind:value={millonarioData.age}>
                
            </td>
        </tr>            
    </tbody>
    <thead>
        <tr>
            <th>
                Nacionalidad
            </th>

        </tr>
    </thead>
    <tbody>
        <td>
            <input bind:value={millonarioData.nationality}>
        </td>
       
        <td>
            <Button color="primary" on:click="{updateMillonario}">Actualizar</Button>
        </td>
    </tbody>
</table>
{/if}


<MessageContainer {Msg} {errorMsg}/>
