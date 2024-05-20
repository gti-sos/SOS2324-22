<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { dev } from "$app/environment";

    let millonarios = [];
    let bitcoinPrices = [];

    let API = "/proxyTR";

    if (dev) {
        API = "http://localhost:10000" + API;
    }

    const bitcoinAPI = "https://crypto-market-prices.p.rapidapi.com/tokens/BTC?base=USDT";
    const rapidAPIKey = '744984621cmsha5593e77613e5d0p103591jsn5d3532ea0b8f';

    async function fetchData(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': rapidAPIKey,
                'X-RapidAPI-Host': 'crypto-market-prices.p.rapidapi.com'
            }
        });
        const data = await response.json();
        return data;
    }

    async function getMillonarios() {
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            millonarios = await res.json();
            console.log(millonarios);
            
            const bitcoinData = await fetchData(bitcoinAPI);
            bitcoinPrices = bitcoinData.data;
            renderChart();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function renderChart() {
        const btcv = parseFloat(bitcoinPrices.tokens[0].price);
        const chartData = millonarios.map(millonario => {
            const netWorthBTC = (millonario.net_worth * 1000000000) / btcv;
            return {
                x: millonario.name,
                y: netWorthBTC
            };
        });

        var options = {
            chart: {
                type: 'area',
                height: 400,
                width: 600,
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            series: [{
                name: 'Net Worth (BTC)',
                data: chartData
            }],
            xaxis: {
                type: 'category'
            },
            yaxis: {
                title: {
                    text: 'Net Worth (BTC)'
                }
            }
        };

        var chart = new ApexCharts(document.querySelector("#chart-container"), options);
        chart.render();
    }

    function getBitcoinPrice() {
        // Selecciona el primer precio de Bitcoin de la lista
        if (bitcoinPrices.length > 0) {
            return parseFloat(bitcoinPrices[0].price);
        }
        return 0;
    }

    onMount(async () => {
        await getMillonarios();
    });
</script>

<main>
    <h1>Gráfico de Net Worth de Millonarios en Bitcoin</h1>
    <div id="chart-container" style="width: 600px; height: 400px;"></div>
</main>
