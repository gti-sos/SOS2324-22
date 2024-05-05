<script>
    import {onMount} from "svelte";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';

    let drivers=[];
    let currentPage = 1;  
    let offset = 0;
	const limit = 10;


    onMount(() => {
        
        getDrivers();
       
    });

    async function getDrivers() {
        const url = 'https://f1-live-motorsport-data.p.rapidapi.com/drivers/2020';
        const fetchUrl = `${url}?offset=${offset}&limit=${limit}`;
        

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '64b1bc86admsh2173949f683de0ap147fb6jsn6582873dd616',
                'X-RapidAPI-Host': 'f1-live-motorsport-data.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(fetchUrl, options);
            const result = await response.json();
            drivers = result.results; 
            console.log(drivers); 
            return drivers; 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function nextPage() {
            if(drivers.length === limit){
                offset += limit;
                currentPage += 1;
                await getDrivers();
            }
        }
	
	async function previousPage(){
		offset = Math.max(0, offset - limit);
		currentPage = Math.max(1, currentPage-1);
		await getDrivers();
	}
</script>

<h1>Conductores de F1 - Temporada 2020</h1>

{#if drivers.length > 0} 
  <ul>
    {#each drivers as driver}
      <li>{driver.driver_name} - {driver.team_name} ({driver.nationality})</li>
    {/each}
  </ul>
  
	<Button color="primary" on:click="{previousPage}">Página anterior</Button>
	<span>Página actual: {currentPage}</span>
	<Button color="primary" on:click="{nextPage}">Página siguiente</Button>

 {:else}
  <p>Cargando conductores...</p> 
{/if}

    
