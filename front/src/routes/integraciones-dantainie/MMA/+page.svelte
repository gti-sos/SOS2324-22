<script>
    import {onMount} from "svelte";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';

    let mmas=[];
    let currentPage = 1;  
    let offset = 0;
	const limit = 10;


    onMount(() => {
        
        getMma();
       
    });

    async function getMma(){
        // const fetchUrl = `${url}?offset=${offset}&limit=${limit}`;
        const url = 'https://mma-stats.p.rapidapi.com/June_24_2023';
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64b1bc86admsh2173949f683de0ap147fb6jsn6582873dd616',
            'X-RapidAPI-Host': 'mma-stats.p.rapidapi.com'
        }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            let mma1 = result.map( x => ({
                matchup: x.matchup
            }));
            mmas = mma1.map(obj => obj.matchup);
            console.log(mmas);
            return mmas
        } catch (error) {
            console.error(error);
        }
    }

    async function nextPage() {
            if(mmas.length === limit){
                offset += limit;
                currentPage += 1;
                await getMma();
            }
        }
	
	async function previousPage(){
		offset = Math.max(0, offset - limit);
		currentPage = Math.max(1, currentPage-1);
		await getMma();
	}
</script>

<style>
    /* Estilos globales */
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f8f9fa; /* Color de fondo claro */
        color: #343a40; /* Texto oscuro */
        padding: 20px;
        margin: 0;
    }

    /* Estilo para el encabezado */
    h1 {
        text-align: center;
        color: #ff4500; /* Color rojo-naranja */
    }

    /* Estilo para las listas */
    ul {
        list-style-type: none; /* Sin viñetas */
        padding: 0;
    }

    li {
        background: #e9ecef; /* Fondo gris claro */
        padding: 10px;
        margin: 5px 0;
        border-radius: 5px; /* Bordes redondeados */
        transition: background 0.3s; /* Efecto de transición */
    }

    li:hover {
        background: #ced4da; /* Cambio de color al pasar el ratón */
    }

</style>

<h1>Cartelera UFC fight night</h1>

{#if mmas.length > 0} 
  <ul>
    {#each mmas as mma}
      <li>{mma[0]} vs {mma[1]} </li>
    {/each}
  </ul>
  
	<Button color="primary" on:click="{previousPage}">Página anterior</Button>
	<span>Página actual: {currentPage}</span>
	<Button color="primary" on:click="{nextPage}">Página siguiente</Button>

{:else}
  <p>Cargando Cartelera...</p> 
{/if}