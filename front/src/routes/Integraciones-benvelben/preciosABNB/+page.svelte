<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/modules/treemap.js"></script>
    <script src="https://code.highcharts.com/modules/area.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';

    onMount(() => {
    
    });

    let selectedYear = new Date().getFullYear();
    let selectedMonth = new Date().getMonth() + 1;
    let chartData = [];

    async function fetchData() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '744984621cmsha5593e77613e5d0p103591jsn5d3532ea0b8f',
                'X-RapidAPI-Host': 'airbnb-listings.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(`https://airbnb-listings.p.rapidapi.com/v2/listingPrices?id=619966061834034729&year=2024&month=${selectedMonth}`, options);
            const data = await response.json();
            chartData = processData(data);
            renderChart();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function processData(data) {
        return data.results.map(dayData => {
            return [Date.parse(dayData.date), dayData.price];
        });
    }

    function renderChart() {
        Highcharts.chart('chart-container', {
            chart: {
                type: 'area'
            },
            title: {
                text: `Precios de Airbnb por día en ${getMonthName(selectedMonth)} de 2024 en Atlantic Panorama Ocean front. Garden & salt pool`
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    formatter: function () {
                        return Highcharts.dateFormat('%e', this.value);
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Precio'
                }
            },
            series: [{
                name: 'Precio',
                data: chartData
            }],
            plotOptions: {
                area: {
                    marker: {
                        enabled: false
                    }
                }
            },
            credits: {
                enabled: false
            }
        });
    }

    function getMonthName(month) {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return months[month - 1];
    }
</script>

<main>
    <h1>Selecciona un mes:</h1>
    <select bind:value={selectedMonth} on:change={fetchData}>
        {#each Array.from({ length: 12 }, (_, i) => i + 1) as month}
            <option value={month}>{getMonthName(month)}</option>
        {/each}
    </select>
    <div id="chart-container" style="height: 400px;"></div>
</main>
