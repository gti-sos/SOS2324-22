<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/modules/treemap.js"></script>
    <script src="https://code.highcharts.com/modules/pie.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { dev } from "$app/environment";

    let ms = [];
  
    let API = "/proxy";

    if (dev) {
        API = "http://localhost:10000" + API;
    }

    onMount(async () => {
        await getMs();
    });

    async function getMs() {
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            ms = await res.json();
            console.log(ms);

            // Convertir el net worth de USD a EUR para cada millonario
            for (let i = 0; i < ms.length; i++) {
                const netWorthUSD = ms[i].net_worth;
                const netWorthEUR = await convertCurrency(netWorthUSD);
                ms[i].net_worth_eur = netWorthEUR;
            }

            console.log(ms);
            renderChart();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function convertCurrency(amountUSD) {
        const options = {
            method: 'GET',
            url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert',
            params: {
                from: 'USD',
                to: 'EUR',
                amount: amountUSD.toString() // Convertir a string
            },
            headers: {
                'X-RapidAPI-Key': '744984621cmsha5593e77613e5d0p103591jsn5d3532ea0b8f',
                'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
            }
        };

        const queryString = new URLSearchParams(options.params).toString();
        const apiUrl = `${options.url}?${queryString}`;

        try {
            const response = await fetch(apiUrl, {
                method: options.method,
                headers: options.headers
            });

            if (!response.ok) {
                throw new Error('Failed to convert currency');
            }

            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error('Error converting currency:', error);
            throw error;
        }
    }

    function renderChart() {
        const chartData = ms.map(millionaire => {
            return {
                name: millionaire.name,
                y: millionaire.net_worth,
                z: millionaire.net_worth_eur
            };
        });

        Highcharts.chart('chart-container', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Net Worth de Millonarios (USD y EUR)'
            },
            series: [{
                name: 'Net Worth',
                data: chartData
            }],
            tooltip: {
                pointFormat: '{point.name}: <br/> USD: {point.y} <br/> EUR: {point.z}'
            }
        });

        // Mostrar la lista de conversión USD a EUR
        const conversionList = document.getElementById('conversion-list');
        conversionList.innerHTML = `
            <h2>Conversión USD a EUR</h2>
            <ul>
                ${ms.map(millionaire => `<li>${millionaire.name}: ${millionaire.net_worth} USD = ${millionaire.net_worth_eur} EUR</li>`).join('')}
            </ul>
        `;
    }
</script>

<main>
    <h1>Gráfico de Net Worth de Millonarios</h1>
    <div id="chart-container" style="width: 600px; height: 400px; float: left;"></div>
    <div id="conversion-list" style="float: left; margin-left: 20px;"></div>
</main>
