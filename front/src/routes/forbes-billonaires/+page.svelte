<script>
    import {onMount} from "svelte";
    import { dev } from "$app/environment";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';
    import MessageContainer from "../MessageContainer.svelte";

    let API = "/api/v2/forbes-billonaires"
    if (dev){
        API="http://localhost:10000"+API;
    }
    let companies = []
    let errorMsg = "";
    let Msg = ""; 
    let filterFrom = 2000; // Año de inicio por defecto
    let filterTo = 2017; // Año de fin por defecto
    let limit = 10; // Número de resultados por página
    let offset = 0; // Desplazamiento de resultados

    const newCompany = { 
        rank: 20,
        name: 'Honda',
        country: 'Japon',
        sale: 15.381,
        profit: 41.9837,
        asset: 347.238,
        market_value: 229.805,
        year: 2018    
    }

    onMount(() => {
        getForbes_billonaires();
    })

    async function getForbes_billonaires() {
        try {
            let response = await fetch(`${API}?from=${filterFrom}&to=${filterTo}&limit=${limit}&offset=${offset}`, {
                method: "GET"
            });
            let data = await response.json();
            companies = data;
            
            if (response.status === 200) {
            } else if (companies.length === 0) {
                Msg = "La lista está vacía";
                setTimeout(() => {
                    Msg ="";
                }, 3000);
            } else if (response.status === 400) {
                errorMsg = "Formato incorrecto";
                setTimeout(() => {
                    Msg ="";
                }, 3000);
            } else {
                errorMsg = "Error cargando compañías";
                setTimeout(() => {
                    errorMsg ="";
                }, 3000);
            }
        } catch(e) {
            errorMsg = e;
        }
    }

    async function DeleteCompany(n) {
        try {
            let response = await fetch(API+"/"+n,{
                method: "DELETE"
            });
            console.log(`Deleting company with name ${n}`);
        
            if (response.status == 200){
                Msg = "Compañía borrada con éxito"
                companies = companies.filter(c => c.name !== n) ;
                setTimeout(() => {
                    Msg= "";
                }, 3000);
            } else {
                errorMsg = "Esa Compañía no existe";
                setTimeout(() => {
                    errorMsg= "";
                }, 3000);
            }
        } catch(e) {
            errorMsg = e;
        }
    }

    async function DeleteCompanies() {
        try {
            let response = await fetch(API,{
                method: "DELETE"
            });
            
        
            if (response.status == 200){
                Msg = "Compañías borradas con éxito"
                companies = [];
                setTimeout(() => {
                    Msg= "";
                }, 3000);
            } else {
                errorMsg = "Ya están todas las Compañías borradas";
                setTimeout(() => {
                    errorMsg= "";
                }, 3000);
            }
        } catch(e) {
            errorMsg = e;
        }
    }

    async function CreateCompany() {
        try {
            let response = await fetch(API,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCompany)
            });
            let status = await response.status;
            console.log(`Creation response status ${status}`)

            if (status === 201) {
                Msg = "Compañía creada con éxito"
                getForbes_billonaires();
                setTimeout(() => {
                    Msg= "";
                }, 3000);
            } else {
                errorMsg = "La compañía ya existe";
                setTimeout(() => {
                    errorMsg= "";
                }, 3000);
            }

        } catch(e) {
            errorMsg = e;
        }
    }

    function nextPage() {
        offset += limit;
        getForbes_billonaires();
    }

    function prevPage() {
        offset -= limit;
        if (offset < 0) {
            offset = 0;
        }
        getForbes_billonaires();
    }

</script>

<!-- Input para filtro de fechas -->
<label>
    Desde:
    <input type="number" bind:value={filterFrom}>
</label>
<label>
    Hasta:
    <input type="number" bind:value={filterTo}>
</label>
<Button color="primary" on:click="{getForbes_billonaires}">Buscar</Button>

<table>
    <thead>
        <tr>
            <th>
                Ranking
            </th>
            <th>
                Nombre
            </th>
            <th>
                País
            </th>
            <th>
                Ventas
            </th>
            <th>
                Beneficio
            </th>
            <th>
                Activos
            </th>
            <th>
                Valor de mercado
            </th>
            <th>
                Año
            </th>
        </tr>
    </thead>
    <tbody>
        {#each companies as company}
        <tr>
            <td>{company.rank}</td>
            <td>{company.name}</td>
            <td>{company.country}</td>
            <td>{company.sale}</td>
            <td>{company.profit}</td>
            <td>{company.asset}</td>
            <td>{company.market_value}</td>
            <td>{company.year}</td>
            <td>
                <Button color="danger" on:click="{() => DeleteCompany(company.name)}">Borrar</Button>
            </td>
        </tr>
        {/each}
    </tbody>
</table>

<!-- Paginación -->
<Row>
    <Col>
        <Button color="secondary" disabled={offset === 0} on:click="{prevPage}">Página Anterior</Button>
    </Col>
    <Col>
        <Button color="secondary" on:click="{nextPage}">Página Siguiente</Button>
    </Col>
</Row>

<Button color="danger" on:click="{DeleteCompanies}">Borrar todo</Button>

<MessageContainer {Msg} {errorMsg}/>
