<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/modules/treemap.js"></script>
    <script src="https://code.highcharts.com/modules/heatmap.js"></script>
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


    onMount( ()=>{
         getData();
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
            return Math.round(averageAgeOfDeath * 100) / 100; 
        });

            fillChart(categories, seriesData);
            fillAreaChart(data);
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

    async function fillAreaChart(data) {
    try {
        
        const summaryByYear = {};

   
        data.forEach(person => {
            const birthYear = person.birth_year;
            const deathYear = person.death_year;
            const ageOfDeath = person.age_of_death;

            for (let year = birthYear; year <= deathYear; year++) {
                if (!summaryByYear[year]) {
                    summaryByYear[year] = {
                        totalAge: 0,
                        totalPeople: 0
                    };
                }

                summaryByYear[year].totalAge += ageOfDeath;
                summaryByYear[year].totalPeople++;
            }
        });

      
        const areaData = Object.keys(summaryByYear).map(year => ({
            name: year.toString(),
            x: new Date(year, 0),
            y: summaryByYear[year].totalAge / summaryByYear[year].totalPeople
        }));

        
        const chart = Highcharts.chart('areaContainer', {
            chart: {
                type: 'area',
                zoomType: 'xy'
            },
            title: {
                text: 'Average Age of Death by Birth Year'
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Birth Year'
                }
            },
            yAxis: {
                title: {
                    text: 'Average Age of Death'
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: 'Year: {point.name}<br>Average Age of Death: {point.y:.2f}'
            },
            series: [{
                name: 'Average Age of Death',
                data: areaData
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
        <div id="areaContainer"></div>
    </figure>
</main>