<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { dev } from "$app/environment";

    let data = [];
    let people = [];
    let API = "/proxy"
    let earthquakeCounts = {};
    let deathOrBirthByYear = {};

    if (dev){
        API = "http://localhost:10000"+API;
    }

    onMount(async () => {
        await getPeople();
        await getEarthquakes();
        await createChart();
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

    async function getEarthquakes() {
        const url = 'https://everyearthquake.p.rapidapi.com/earthquakesByDate?startDate=1940-01-27&endDate=1980-01-27&start=100&count=100&type=earthquake&latitude=33.962523&longitude=-118.3706975&radius=1000&units=miles&magnitude=3&intensity=1';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e99485811amshe99535bc8127ca8p160f5djsn7283ed2a2237',
                'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            data = result.data.map(r => ({
                date: r.date
            }));

            data.forEach(d => {
                const year = d.date.slice(0, 4);
                if (year in earthquakeCounts) {
                    earthquakeCounts[year]++;
                } else {
                    earthquakeCounts[year] = 1;
                }
            });

            console.log(earthquakeCounts);
        } catch (error) {
            console.error(error);
        }
    }

    async function createChart() {
        const chartOptions = {
            chart: {
                type: 'bar',
                height: 400,
            },
            series: [
                {
                name: 'Terremotos',
                data: Object.values(earthquakeCounts),
                },
                {
                name: 'Nacimientos',
                data: Object.keys(deathOrBirthByYear).map(year => deathOrBirthByYear[year].born),
                },
                {
                name: 'Muertes',
                data: Object.keys(deathOrBirthByYear).map(year => deathOrBirthByYear[year].died),
                }
            ],
            xaxis: {
                categories: Object.keys(earthquakeCounts),
                title: {
                    text: 'Año',
                },
            },
            yaxis: {
                title: {
                    text: 'Cantidad',
                },
            },
        };

    new ApexCharts(document.querySelector("#chart"), chartOptions).render();
  }


</script>


<main>
    <div id="chart"></div>
</main>
