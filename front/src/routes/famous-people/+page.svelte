<script>
    import {onMount} from "svelte";
    let API = "http://localhost:10000/api/v1/famous-people"
    let people = []
    let errorMsg = "";
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

    async function getPeople() {
        try {
            let response = await fetch(API,{
                method: "GET"
            });
            let data = await response.json();
            people = data;
            console.log(data);
        } catch(e) {
            errorMsg = e;
        }
            
    }

    async function DeletePeople(n) {
        try {
            let response = await fetch(API+"/"+n,{
                method: "DELETE",
            });
            console.log(`Deleting person with name ${n}`);
        
        if (response.status == 200){
            getPeople();
        } else {
            errorMsg = "code:"+ response.status;
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
                getPeople();
            } else {
                errorMsg = "code "+status;
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
                Name
            </th>
            <th>
                Gender
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <input bind:value={newPerson.name}>
            </td>
            <td>
                <input bind:value={newPerson.gender}>
            </td>
        </tr>            
    </tbody>
</table>

<ul>
    {#each people as person}
        <li>{person.name} - {person.gender}</li> <button on:click="{DeletePeople(person.name)}">Delete</button>
    {/each}
</ul>
<button on:click="{CreatePeople}">Create</button>

{#if errorMsg != ""}
<hr>
ERROR: {errorMsg}
{/if}