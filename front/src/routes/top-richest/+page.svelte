<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import MessageContainer from '../MessageContainer.svelte';

    let API = "/api/v2/top-richest";
    if (dev) {
        API = "http://localhost:10000" + API;
    }

    let people = [];
    let errorMsg = "";
    let Msg = "";
    

    let searchParams = {
        name: "",
        net_worth: "",
        bday_year: "",
        age: "",
        nationality: "",
    };
    let searchResults = [];
    let searchErrorMsg = "";

    const newPerson = { 
        name: 'Elon Musk', 
        net_worth: 240, 
        bday_year: 1971, 
        age: 51, 
        nationality: 'South Africa'  
    };

    onMount(() => {
        getMillonarios();
    });

    async function getMillonarios() {
        try {
            let response = await fetch(`${API}?limit=${limit}&offset=${offset}`, {
                method: "GET"
            });

            let data = await response.json();
            people = data;

            if (response.status === 200) {
                // No se requiere ningún mensaje de éxito aquí
            } else if (people.length === 0) {
                errorMsg = "La lista está vacía";
            } else if (response.status === 400) {
                errorMsg = "Formato incorrecto";
            } else {
                errorMsg = "Error cargando millonarios";
            }
            setTimeout(() => {
                errorMsg = "";
            }, 3000);
        } catch (e) {
            errorMsg = e;
        }
    }

    async function deleteMillonarios(n) {
        try {
            let response = await fetch(API + "/" + n, {
                method: "DELETE"
            });

            if (response.status === 200) {
                Msg = "Millonario borrado con éxito";
                people = people.filter(p => p.name !== n);
            } else {
                errorMsg = "Ese millonario no existe";
            }
            setTimeout(() => {
                Msg = "";
                errorMsg = "";
            }, 3000);
        } catch (e) {
            errorMsg = e;
        }
    }

    async function deleteAllMillonarios() {
        try {
            let response = await fetch(API, {
                method: "DELETE"
            });

            if (response.status === 200) {
                Msg = "Millonarios borrados con éxito";
                people = [];
            } else {
                errorMsg = "Ya están todos los millonarios borrados";
            }
            setTimeout(() => {
                Msg = "";
                errorMsg = "";
            }, 3000);
        } catch (e) {
            errorMsg = e;
        }
    }

    async function createMillonarios() {
        try {
            let response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPerson)
            });
            let status = response.status;

            if (status === 201) {
                getMillonarios();
                Msg = "Millonario creado con éxito";
            } else if (status === 409) {
                getMillonarios();
                errorMsg = "El millonario ya existe";
            } else {
                errorMsg = "Error creando el millonario";
            }
            setTimeout(() => {
                Msg = "";
                errorMsg = "";
            }, 3000);
        } catch (e) {
            errorMsg = e;
        }
    }

    async function searchMillonarios() {
        try {
            let queryString = Object.keys(searchParams)
                .filter(key => searchParams[key] !== "")
                .map(key => `${key}=${searchParams[key]}`)
                .join("&");

            let response = await fetch(`${API}?${queryString}`, {
                method: "GET"
            });

            if (response.ok) {
                let data = await response.json();
                searchResults = data;
                if (searchResults.length > 0) {
                    Msg = "Búsqueda exitosa";
                } else {
                    errorMsg = "No se ha encontrado ningún millonario.";
                }
            } else {
                errorMsg = `Error en la búsqueda: ${response.statusText}`;
            }
            setTimeout(() => {
                errorMsg = "";
                Msg = "";
            }, 3000);
        } catch (e) {
            errorMsg2 = `Error en la búsqueda: ${e.message}`;
            setTimeout(() => {
                errorMsg = "";
            }, 3000);
        }
    }

    // Paginación
    let limit = 10;
    let offset = 0;

    function nextPage() {
        offset += limit;
        getMillonarios();
    }

    function previousPage() {
        if (offset >= limit) {
            offset -= limit;
            getMillonarios();
        }
    }


</script>

<Row>
    <!-- Columna de la lista de millonarios -->
	<Col sm="3">
		<div class="api-section d-flex flex-column justify-content-end">
			<h2>Lista de Millonarios</h2>
			<ul>
				{#each people as m}
					<li class="py-1 millionaireItem">
						<div class="d-flex justify-content-between align-items-center">
							<div>
								<a href="/top-richest/{m.name}/{m.nationality}">{m.name} {m.nationality}</a>
							</div>
							<div class="edits">
								<Button
									color="danger"
									outline
									size="sm"
									on:click={() => deleteMillonarios(m.name)}>Borrar</Button
								>
							</div>
						</div>
					</li>
				{/each}
			</ul>
            <div class="pagination" style="margin-bottom: 20px;">
                <!-- Botones de paginación -->
                <Button style="margin-right: 10px;" color="danger" outline on:click={deleteAllMillonarios} class="btn-sm">Borrar todos los millonarios</Button>
                <Button style="margin-right: 10px;" on:click={previousPage} disabled={offset === 0} class="btn-sm">Anterior</Button>
                <Button on:click={nextPage} disabled={people.length < limit} class="btn-sm">Siguiente</Button>
            </div>
            <!-- Botón para ir a la página de gráficos -->
            <button
            style="background-color: #0366d6; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;"
            on:click={() => {
                window.location.href = 'http://sos2324-22.appspot.com/top-richest/graphs';
            }}
            >Graficos</button>
            <MessageContainer {Msg} {errorMsg}/>
		</div>
	</Col>

    <!-- Columna de búsqueda -->
    <Col sm="3">
		<div class="create-section">
			<h2>Buscar Millonarios</h2>
            <form on:submit|preventDefault={searchMillonarios}>
                <table>
                    <tbody>
                        <tr>
                            <td class="py-1">Nombre:</td>
                            <td class="py-1"><input placeholder="Nombre del millonario" bind:value={searchParams.name} /></td>
                        </tr>
                        <tr>
                            <td class="py-1">Patrimonio neto:</td>
                            <td class="py-1"><input type="number" placeholder="1" bind:value={searchParams.net_worth} /></td>
                        </tr>
                        <tr>
                            <td class="py-1">Año de nacimiento:</td>
                            <td class="py-1"><input placeholder="2024" bind:value={searchParams.bday_year} /></td>
                        </tr>
                        <tr>
                            <td class="py-1">Edad:</td>
                            <td class="py-1"><input placeholder="0" bind:value={searchParams.age} /></td>
                        </tr>
                        <tr>
                            <td class="py-1">Nacionalidad:</td>
                            <td class="py-1"><input placeholder="Nacionalidad" bind:value={searchParams.nationality} /></td>
                        </tr>
                    </tbody>
                </table>
                <div class="centered-button">
                    <Button color="primary" style="" outline>Buscar</Button>
                </div>
                
                
                
            </form>
        </div>
	</Col>

    <!-- Columna de resultados de búsqueda -->
    {#if searchResults.length > 0}
    <Col sm="3">
        <div class="create-section">
            <h3>Resultados de la búsqueda:</h3>
            <ul>
                {#each searchResults as result}
                    <li class="py-1 millionaireItem">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <a href="/top-richest/{result.name}/{result.nationality}">{result.name} {result.nationality}</a>
                            </div>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </Col>
    {/if}

    <!-- Columna para añadir nuevo millonario -->
    <Col sm="3">
        <div class="create-section">
            <h2>Añadir nuevo Millonario</h2>
            <table>
                <tbody>
                    <tr>
                        <td class="py-1">Nombre:</td>
                        <td class="py-1"><input placeholder="Nombre del millonario" bind:value={newPerson.name} /></td>
                    </tr>
                    <tr>
                        <td class="py-1">Patrimonio Neto:</td>
                        <td class="py-1"><input type="number" placeholder="0" bind:value={newPerson.net_worth} /></td>
                    </tr>
                    <tr>
                        <td class="py-1">Año de nacimiento:</td>
                        <td class="py-1"><input placeholder="2024" bind:value={newPerson.bday_year} /></td>
                    </tr>
                    <tr>
                        <td class="py-1">Edad:</td>
                        <td class="py-1"><input placeholder="0" bind:value={newPerson.age} /></td>
                    </tr>
                    <tr>
                        <td class="py-1">Nacionalidad:</td>
                        <td class="py-1"><input placeholder="Nacionalidad" bind:value={newPerson.nationality} /></td>
                    </tr>
                </tbody>
            </table>
            <div class="centered-button">
                <Button color="primary" outline on:click={createMillonarios}>Crear</Button>
            </div>
        </div>
    </Col>
</Row>


<style>

/* Estilos para títulos */
h2 {
    font-size: 1.8em;
    margin-bottom: 0.8em;
    color: #333;
}



.create-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
}

.api-section {
    margin-top: 2em;
    margin-left: 2em;
}


/* Estilos para áreas de edición */
.edits {
    display: flex;
    margin-left: 2em;
}

/* Estilos para botones centrados */
.centered-button {
    display: flex;
    justify-content: center;
    margin-top: 1em;
}

</style>


