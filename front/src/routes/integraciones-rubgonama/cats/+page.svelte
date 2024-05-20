<script>
	import { onMount } from 'svelte';

	let catImages = [];

	onMount(async () => {
	    await getCatImages();
	});

	async function getCatImages() {
	    const apiKey = 'live_u68oAa7glmxOgRHi5RR9bErzfu6zE0rFZlrrXIs90mRvhTaefgiB1zAw5vXmt2zm';
	    const url = `https://api.thecatapi.com/v1/images/search?limit=5`;
	    const options = {
	        method: 'GET',
	            headers: {
	                'x-api-key': apiKey
	            }
	        };
	        try {
	            const response = await fetch(url, options);
	            catImages = await response.json();
	            console.log(catImages);
	        } catch (e) {
	        console.error("Error fetching data:", e);
	        catImages = [];
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

    .cat-image {
        margin-bottom: 20px;
    }
</style>

<main>
    <h2>Imágenes de gatos</h2>
    {#if catImages.length === 0}
        <p>Cargando imágenes de gatos...</p>
    {:else}
        {#each catImages as catImage}
            <img class="cat-image" src={catImage.url} alt="Gato" />
        {/each}
    {/if}
</main>