<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import MessageContainer from '../MessageContainer.svelte';

    let API = "/api/v2/top-richest";
    if (dev) {
        API = "http://localhost:10000" + API;
    }

    let millionaires = [];
    let errorMsg = "";
    let Msg = "";

    let searchParams = {
        name: "",
        net_worth: null,
        bday_year: null,
        age: null,
        nationality: "",
    };
    let searchResults = [];

    const newMillionaire = { 
        name: 'Elon Musk', 
        net_worth: 240, 
        bday_year: 1971, 
        age: 51, 
        nationality: 'South Africa'  
    };

    // Inicialización de la página
    onMount(() => {
        getMillonarios();
    });

    // Obtener lista de millonarios
    async function getMillonarios() {
        try {
            let response = await fetch(`${API}?limit=${limit}&offset=${offset}`, {
                method: "GET"
            });

            let data = await response.json();
            millionaires = data;

            if (response.status !== 200 || millionaires.length === 0) {
                errorMsg = response.status === 400 ? "Formato incorrecto" : "Error cargando millonarios";
            }
            setTimeout(() => {
                errorMsg = "";
            }, 3000);
        } catch (e) {
            errorMsg = e;
        }
    }

    // Eliminar un millonario
    async function deleteMillonarios(n) {
        try {
            let response = await fetch(API + "/" + n, {
                method: "DELETE"
            });

            if (response.status === 200) {
                Msg = "Millonario borrado con éxito";
                millionaires = millionaires.filter(p => p.name !== n);
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

    // Eliminar todos los millonarios
    async function deleteAllMillonarios() {
        try {
            let response = await fetch(API, {
                method: "DELETE"
            });

            if (response.status === 200) {
                Msg = "Millonarios borrados con éxito";
                millionaires = [];
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

    // Cargar datos iniciales
    async function loadInitialData() {
        try {
            let response = await fetch(API+ '/loadInitialData', {
                method: "GET"
            });

            if (response.status === 201) {
                Msg = "Millonarios cargados con éxito";
                getMillonarios();
            } else {
                errorMsg = "Error cargando datos iniciales";
            }
            setTimeout(() => {
                Msg = "";
                errorMsg = "";
            }, 3000);
        } catch (e) {
            errorMsg = e;
        }
    }

    // Crear nuevo millonario
    async function createMillonarios() {
        try {
            let response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMillionaire)
            });
            let status = response.status;

            if (status === 201) {
                getMillonarios();
                Msg = "Millonario creado con éxito";
                setTimeout(() => {
                errorMsg = "";
            }, 3000);
            } else if (status === 409) {
                getMillonarios();
                errorMsg = "El millonario ya existe";
                setTimeout(() => {
                errorMsg = "";
            }, 3000);
            } else {
                errorMsg = "Error creando el millonario";
                setTimeout(() => {
                errorMsg = "";
            }, 3000);
            }
            setTimeout(() => {
                Msg = "";
                errorMsg = "";
            }, 3000);
        } catch (e) {
            errorMsg = e;
        }
    }

    // Buscar millonarios según los parámetros especificados
    async function searchMillonarios() {
        try {
            let queryString = Object.keys(searchParams)
                .filter(key => searchParams[key] !== "" &&  searchParams[key] !== null )
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
            errorMsg = `Error en la búsqueda: ${e.message}`;
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

<!-- Estructura de la página -->
<Row>
    <!-- Columna de la lista de millonarios -->
    <Col sm="3">
        <div class="create-section">
            <h2>Lista de Millonarios</h2>
            <ul>
                {#each millionaires as m}
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
                                    on:click={() => deleteMillonarios(m.name)}>Borrar</Button>
                            </div>
                        </div>
                    </li>
                {/each}
            </ul>
            <div class="pagination">
                <!-- Botones de paginación -->

                <Button style="margin-left: 30px;"  on:click={previousPage} disabled={offset === 0} class="btn-sm">Anterior</Button>
                <Button style="margin-left: 10px;"on:click={nextPage} disabled={millionaires.length < limit} class="btn-sm">Siguiente</Button>
            </div>
            
        </div>
    </Col>

    <!-- Columna de búsqueda -->
    <Col sm="3">
        <div class="create-section">
            <h2>Buscar Millonarios</h2>
            <form on:submit|preventDefault={searchMillonarios}>
                <div class="form-group">
                    Nombre:
                    <input class="form-control" type="text" placeholder="Nombre del millonario" bind:value={searchParams.name} />
                </div>
                <div class="form-group">
                    Patrimonio neto:
                    <input class="form-control" type="number" placeholder="1" bind:value={searchParams.net_worth} />
                </div>
                <div class="form-group">
                    Año de nacimiento:
                    <input class="form-control" type="number" placeholder="2024" bind:value={searchParams.bday_year} />
                </div>
                <div class="form-group">
                    Edad:
                    <input class="form-control" type="number" placeholder="0" bind:value={searchParams.age} />
                </div>
                <div class="form-group">
                    Nacionalidad:
                    <input class="form-control" type="text" placeholder="Nacionalidad" bind:value={searchParams.nationality} />
                </div>
                <Button color="primary" outline style="margin-top: 10px;">Buscar</Button>
            </form>
            
        </div>
        <MessageContainer {Msg} {errorMsg}/>
    </Col>
    
    <!-- Resultados de búsqueda -->
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
            <form on:submit|preventDefault={createMillonarios}>
                <!-- Campos para añadir nuevo millonario -->
                <div class="form-group">
                    Nombre:
                    <input class="form-control" type="text" placeholder="Nombre del millonario" bind:value={newMillionaire.name} />
                </div>
                <div class="form-group">
                    Patrimonio Neto:
                    <input class="form-control" type="number" placeholder="0" bind:value={newMillionaire.net_worth} />
                </div>
                <div class="form-group">
                    Año de nacimiento:
                    <input class="form-control" type="number" placeholder="2024" bind:value={newMillionaire.bday_year} />
                </div>
                <div class="form-group">
                    Edad:
                    <input class="form-control" type="number" placeholder="0" bind:value={newMillionaire.age} />
                </div>
                <div class="form-group">
                    Nacionalidad:
                    <input class="form-control" type="text" placeholder="Nacionalidad" bind:value={newMillionaire.nationality} />
                </div>
                <Button color="primary" outline style="margin-top: 10px;">Crear</Button>
            </form>
        </div>
    </Col>



    <Col sm="3">
        <div class="create-section">
            <h2>Acciones Adicionales</h2>
            <div class="action-buttons">
                <Button color="danger" outline size="sm" on:click={deleteAllMillonarios} class="btn-sm mb-2">Borrar todos</Button>
                <Button color="primary" outline size="sm" on:click={loadInitialData} class="btn-sm mb-2">Cargar datos</Button>
                
            </div>
            <Button color="info" outline size="sm" href="/top-richest/graphs" class="btn-sm">Gráficos</Button>
            <Button color="info" outline size="sm" href="/top-richest/Graphs_Plotly" class="btn-sm">Gráficos Plotly</Button>
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

/* Estilos para formularios */
.form-group {
    margin-bottom: 15px;
}

.create-section {
    margin-bottom: 15px;
    margin-left: 50px;
    margin-right: 15px;
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 5px;
}

.form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

/* Estilos para áreas de edición */
.edits {
    display: flex;
    margin-left: 2em;
}

/* Estilos para paginación */
.pagination {
    margin-top: 20px;
}

/* Estilos para elementos de lista */
.millionaireItem {
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.millionaireItem a {
    text-decoration: none;
    color: #333;
}

.millionaireItem a:hover {
    color: #007bff;
}
</style>
