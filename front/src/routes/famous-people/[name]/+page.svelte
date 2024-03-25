<script>
    import {page} from '$app/stores';

    let person = $page.params
    console.log(person);

    let name = $page.params.name;

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
        </tr>            
    </tbody>
</table>

