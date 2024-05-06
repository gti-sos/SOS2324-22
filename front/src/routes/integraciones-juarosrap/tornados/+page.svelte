<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    
    
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { dev } from "$app/environment";

    let data = [];
    let people = [];
    let deathOrBirthByYear = {};
    let tornadoCountByYear = {};
    let API = "/api/v2/famous-people"

    if (dev){
        API = "http://localhost:10000"+API;
    }

    onMount(async () => {
        await getTornadoesFatalities();
        await getPeople();
        fillChart();
    });

    async function getPeople(){
        const res = await fetch(API,{
            method: "GET",
        });
        try {
            people = await res.json();
            console.log(people)

            people.forEach(person => {
                const birthYear = person.birth_year;
                const deathYear = person.death_year;

                
                if (birthYear && !deathOrBirthByYear[birthYear]) {
                    deathOrBirthByYear[birthYear] = { born: 1, died: 0 };
                } 

                if (deathYear && !deathOrBirthByYear[deathYear]) {
                    deathOrBirthByYear[deathYear] = { born: 0, died: 1 };
                }
        });

        console.log(deathOrBirthByYear);
        return deathOrBirthByYear;
        } catch (e) {
            console.log(e + "Fetching data");
        }
    }

    async function getTornadoesFatalities() {
        
        const url = 'https://tornado-data-2021.p.rapidapi.com/weather/tornadoes/1950-2021/highest-injuries?per_page=200';
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e99485811amshe99535bc8127ca8p160f5djsn7283ed2a2237',
            'X-RapidAPI-Host': 'tornado-data-2021.p.rapidapi.com'
        }};

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result)
            data = result.results;
            
            data = data.map(d => ({
                year: d.year
            }));

            data.forEach(tornado => {
                const year = tornado.year;
                if (!tornadoCountByYear[year]) {
                    tornadoCountByYear[year] = 1;
                } else {
                    tornadoCountByYear[year]++;
                }
        });
        return tornadoCountByYear;
            console.log(data);
        } catch (e) {
            console.log(e+ "Fetching data");
        }
    }

    async function fillChart() {
        const peopleData = await getPeople();
        const tornadoData = await getTornadoesFatalities();

       
        const years = Object.keys(peopleData);
        const birthDeathsData = years.map(year => peopleData[year].born + peopleData[year].died);

        
        const tornadoCountData = years.map(year => tornadoData[year] || 0);

       
        const chart = Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: "Tornadoes by year vs deaths or births of famous people"
            },
            xAxis: {
                categories: years,
                title: {
                    text: 'Year'
                }
            },
            yAxis: [{
                title: {
                    text: 'Number of Tornadoes'
                }
            }, {
                title: {
                    text: 'Number of Deaths or Births'
                },
                opposite: true
            }],
            series: [{
                name: 'Tornadoes',
                data: tornadoCountData
            }, {
                name: 'Deaths or Births',
                data: birthDeathsData,
                yAxis: 1
            }]
        });
}



</script>

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }

    main {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>

<main>
    <div id='container'></div>
</main>
