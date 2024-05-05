<script>
    /*import { onMount } from 'svelte';
    import  Car  from "../../cars.svelte";

    let data = [];


    onMount(async () => {
        await getTornadoesFatalities();
    });

    async function getTornadoesFatalities() {
        
        const url = 'https://tornado-data-2021.p.rapidapi.com/weather/tornadoes/1950-2021/highest-injuries';
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e99485811amshe99535bc8127ca8p160f5djsn7283ed2a2237',
            'X-RapidAPI-Host': 'tornado-data-2021.p.rapidapi.com'
        }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            data = result.map(t => ({
                year: t.year
            }))
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }




</script>

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }

    main {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>


<main>
    
</main>