<script>
    let search = "";
    let dogs = [];

    async function getDogs() {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/dogs?name=${search}&X-Api-Key=9pCL7nnCqGpBKAJik9LDdw==JspTRGBk2BWJTQI9`);
            let data = await response.json();
            dogs = data.map(dog => ({
                id: dog.name,
                name: dog.name,
                behaviour: dog.good_with_other_dogs,
                image: dog.image_link
            }))
            console.log(dogs);

        } catch (error) {
            console.error("Error fetching data:", error);
            dogs = [];
        }
    }
</script>

<style>
    main {
        max-width: 600px;
        margin: 0 auto;
        text-align: center;
        padding: 20px;
    }

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    input {
        padding: 10px;
        margin-right: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 16px;
    }

    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    button:hover {
        background-color: #0056b3;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .dog {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .dog img {
        max-width: 100%;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .dog h3 {
        margin-bottom: 5px;
    }

    .dog p {
        margin: 0;
    }
</style>


<main>
    <h1>Busca un perro</h1>
    <input bind:value={search}>
    <button on:click={getDogs}>Buscar</button>

    {#if dogs.length > 0}
        <ul>
            {#each dogs as dog}
                <li class="dog" key={dog.id}>
                    <h3>{dog.name}</h3>
                    <img src={dog.image} alt={dog.name} />
                    <p>Dog behaviour: {dog.behaviour}</p>
                </li>
            {/each}
        </ul>
    {:else}
        <p>Haz una búsqueda</p>
    {/if}
</main>
