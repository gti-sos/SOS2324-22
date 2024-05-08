<script>
    import { onMount } from 'svelte';
    import { dev } from "$app/environment";

    let data = [];
    let people = [];
    let deathOrBirthByYear = {};
    let tornadoCountByYear = {};
    let API = "/proxy"

    if (dev){
        API = "http://localhost:10000"+API;
    }

    onMount(async () => {
        await getPeople();
    });

    async function getPeople(){
        const res = await fetch(API,{
            method: "GET",
        });
        try {
            people = await res.json();
            console.log(people)
        
        } catch (e) {
            console.log(e + "Fetching data");
        }
    }


</script>
