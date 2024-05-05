<script>
    import { onMount } from 'svelte';
    import  Car  from "../../cars.svelte";
    let data = [];
    let cars = [];


    onMount(async () => {
        await getCars();
    });

    

    async function getCars() {
        const url = 'https://car-data.p.rapidapi.com/cars';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e99485811amshe99535bc8127ca8p160f5djsn7283ed2a2237',
                'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url,options);
            data = await response.json();
            console.log(data);
            cars = data.map(car => ({
                year: car.year,
                make: car.make,
                model: car.model,
                type: car.type
            }));
            console.log(cars);
        } catch(e) {
            console.error("Error fetching data:", e);
            cars = [];
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
    <h2>Lista de coches</h2>
    {#each cars as car}
        <Car {car}/>
    {/each}
</main>