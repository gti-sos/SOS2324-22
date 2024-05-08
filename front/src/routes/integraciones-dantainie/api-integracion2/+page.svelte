<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</svelte:head>
<script>
    import { onMount } from 'svelte';
    import { dev } from "$app/environment";
    

    let companies = [];
    let athletes = [];
    let API = "/proxy1"

    if (dev){
        API = "http://localhost:10000"+API;
    }

    onMount(async () => {
        await getForbesBillonaires();
        await getHighPaidAthletes();
        await generateChart();
    });

    async function getForbesBillonaires(){
        const res = await fetch(API,{
            method: "GET",
        });
        try {
            const result = await res.json();
            const data = result;
            console.log(result);
            companies = data.map(x => ({
                rank: x.rank
            }))
            console.log(companies);
            return companies;
        
        } catch (e) {
            console.log(e + "Fetching data");
        }
    }

    async function getHighPaidAthletes(){

        const url = 'https://the-worlds-highest-paid-athletes-1990-2023.p.rapidapi.com/2008';
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64b1bc86admsh2173949f683de0ap147fb6jsn6582873dd616',
            'X-RapidAPI-Host': 'the-worlds-highest-paid-athletes-1990-2023.p.rapidapi.com'
        }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const data = result;
            console.log(result);
            athletes = data.map(x => ({
                rank: Number(x.rank)
            }))
            console.log(athletes);
            return athletes
        } catch (error) {
            console.error(error);
        }
    }

    async function generateChart() {

        const countOccurrences = (arr) => {
        const count = {};
        arr.forEach(item => {
            count[item.rank] = (count[item.rank] || 0) + 1;
        });
        return count;
        };

        const companyCounts = countOccurrences(companies);
        const athleteCounts = countOccurrences(athletes);

        const uniqueRanks = Array.from(new Set([...Object.keys(companyCounts), ...Object.keys(athleteCounts)])).sort((a, b) => a - b);

        const companyCountsOrdered = uniqueRanks.map(rank => companyCounts[rank] || 0);
        const athleteCountsOrdered = uniqueRanks.map(rank => athleteCounts[rank] || 0);

        // Crear el gráfico
        const chartOptions = {
        series: [
            {
            name: 'Empresas',
            data: companyCountsOrdered
            },
            {
            name: 'Atletas',
            data: athleteCountsOrdered
            }
        ],
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
            horizontal: false,
            },
        },
        xaxis: {
            categories: uniqueRanks,
            title: {
            text: 'Ranking',
            },
        },
        yaxis: {
            title: {
            text: 'Conteo',
            },
        },
        title: {
            text: 'Comparación de Rankings entre Empresas y Atletas',
        },
        };

        new ApexCharts(document.querySelector('#chart'), chartOptions).render();
        
    }
</script>

<main>
    <div id="chart"></div>
</main>



