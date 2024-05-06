<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { dev } from '$app/environment';

    let API = "/api/v2/top-richest";

    if (dev){
        API = "http://localhost:10000"+API;
    }

    let data = [];
    let dataReady = false;

    onMount(() => {
        getData();
    });

    async function getData() {
        const res = await fetch(API);
        try {
            const fetchedData = await res.json();
            data = fetchedData;
            console.log(data);

            if (data.length > 0) {
                dataReady = true;
                g(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function g(data) {
        const uniqueNationalities = [...new Set(data.map(item => item.nationality))];
        const colors = uniqueNationalities.map((nationality, index) => `rgb(${index * 40}, ${index * 80}, ${index * 120})`);

        const traces = uniqueNationalities.map((nationality, index) => {
            const filteredData = data.filter(item => item.nationality === nationality);
            return {
                x: filteredData.map(item => item.age),
                y: filteredData.map(item => item.name),
                mode: 'markers',
                marker: {
                    size: 10,
                    color: colors[index]
                },
                name: nationality,
                type: 'scatter',
                legendgroup: nationality
            };
        });

        const layout = {
            title: 'Edad de los Millonarios Agrupados por Nacionalidad',
            xaxis: { title: 'Edad' },
            yaxis: { title: 'Nombre' },
            showlegend: true,
            margin: { t: 50, b: 50, l: 100, r: 100 },
            legend: {
                title: 'Nacionalidad',
                traceorder: 'reversed'
            }
        };

        Plotly.newPlot('chart', traces, layout);
    }
</script>

<main>
    <div id="chart"></div>
</main>
