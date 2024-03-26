<script>
    import {page} from '$app/stores';

    let person = $page.params

    let name = $page.params.name;

    async function updatePerson(){
        try{
            
        } catch() {

        }
    }

</script>
Details of {name}



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
                <input bind:value={person.name}>
            </td>
            <td>
                <input bind:value={person.gender}>
            </td>
            <td>
                <Button color="primary" on:click="{updatePerson}">Actualizar</Button>
            </td>
        </tr>            
    </tbody>
</table>