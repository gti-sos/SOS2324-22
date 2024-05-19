<script>
    import { onMount } from 'svelte';

    let data = [];
    let jokes = [];

    onMount(async () => {
        await getJokes();
    });

    async function getJokes() {
        const url = 'https://jokeapi-v2.p.rapidapi.com/joke/Any?amount=5';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'eeb89884acmsh4bb090375dec307p114093jsnc0e96844eedf',  // Tu clave de API
                'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            data = await response.json();
            if (data.jokes) {
                jokes = data.jokes.map(joke => ({
                    type: joke.type,
                    joke: joke.joke,
                    setup: joke.setup,
                    delivery: joke.delivery
                }));
            } else {
                jokes = [data];
            }
            console.log(jokes);
        } catch (e) {
            console.error("Error fetching data:", e);
            jokes = [];
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

    .joke {
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #fafafa;
    }
</style>

<main>
    <h2>Lista de chistes</h2>
    {#if jokes.length === 0}
        <p>Cargando chistes...</p>
    {:else}
        {#each jokes as joke}
            <div class="joke">
                {#if joke.type === 'single'}
                    <p>{joke.joke}</p>
                {:else}
                    <p>{joke.setup}</p>
                    <p>{joke.delivery}</p>
                {/if}
            </div>
        {/each}
    {/if}
</main>