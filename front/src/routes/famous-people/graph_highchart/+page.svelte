<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
</svelte:head>


<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";

    let data = [];
    let result ="";

    let API = "/api/v2/famous-people"

    if (dev){
        API = "http://localhost:10000"+API;
    }


    onMount(async ()=>{
        await getData();
    })

    async function getData(){
        const res = await fetch(API, {
            method: "GET",
        });
        try{
            const dataReceived = await res.json();
            result = JSON.stringify(dataReceived, null, 2);
            data = dataReceived;

            const groupedData = {};
            data.forEach(person => {
                const key = `${person.country}-${person.birth_year}`;
                if (!groupedData[key]) {
                    groupedData[key] = [];
                }
                groupedData[key].push(person);
            });

        
            const categories = Object.keys(groupedData);
            const seriesData = categories.map(key => {
            const people = groupedData[key];
            const totalAgeOfDeath = people.reduce((sum, person) => sum + person.age_of_death, 0);
            const averageAgeOfDeath = totalAgeOfDeath / people.length;
            return Math.round(averageAgeOfDeath * 100) / 100; // Redondear a 2 decimales
        });

            fillChart(categories, seriesData);
            fillScatterChart(data);
        }catch(error){
            console.log(error);
        } 
    }

    async function fillChart(categories,seriesData){
        const chart = Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Average Age of Death of Famous People by Country and Birth Year'
            },
            xAxis: {
                categories: categories,
                title: {
                    text: 'Country and Birth Year'
                }
            },
            yAxis: {
                title: {
                    text: 'Average Age of Death'
                }
            },
            series: [{
                name: 'Average Age of Death',
                data: seriesData
            }]
        });
    }



    async function fillScatterChart(data) {
    try {
        
        const scatterData = data.map(person => ({
            name: person.name,
            x: new Date(person.birth_year, 0), 
            y: person.age_of_death,
            z: person.death_year - person.birth_year 
        }));

        
        const chart = Highcharts.chart('scatterContainer', {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Relationship between Birth Year, Age of Death, and Life Duration'
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Birth Year'
                }
            },
            yAxis: {
                title: {
                    text: 'Age of Death'
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.name}<br>Born: {point.x:%Y}<br>Died at age: {point.y}<br>Life Duration: {point.z} years'
            },
            series: [{
                name: 'Famous People',
                colorByPoint: true,
                data: scatterData
            }]
        });
    } catch (error) {
        console.log(error);
    }
}


</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
    <figure class="highcharts-figure">
        <div id="scatterContainer"></div>
    </figure>
</main>