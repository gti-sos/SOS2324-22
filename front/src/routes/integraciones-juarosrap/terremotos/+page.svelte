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
        const allYears = new Set([
            ...Object.keys(earthquakeCounts),
            ...Object.keys(deathOrBirthByYear)
        ]);

        const sortedYears = Array.from(allYears).sort();

        const chartOptions = {
            chart: {
                type: 'line',
                height: 400,
                toolbar: {
                    show: true
                }
            },
            series: [
                {
                    name: 'Terremotos',
                    type: 'column',
                    data: sortedYears.map(year => earthquakeCounts[year] || 0),
                },
                {
                    name: 'Nacimientos',
                    type: 'line',
                    data: sortedYears.map(year => (deathOrBirthByYear[year]?.born || 0)),
                },
                {
                    name: 'Muertes',
                    type: 'line',
                    data: sortedYears.map(year => (deathOrBirthByYear[year]?.died || 0)),
                }
            ],
            xaxis: {
                categories: sortedYears,
                title: {
                    text: 'Año',
                },
            },
            yaxis: [
                {
                    seriesName: 'Terremotos',
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#008FFB'
                    },
                    labels: {
                        style: {
                            colors: '#008FFB',
                        }
                    },
                    title: {
                        text: 'Terremotos',
                        style: {
                            color: '#008FFB',
                        }
                    }
                },
                {
                    seriesName: 'Nacimientos',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#00E396'
                    },
                    labels: {
                        style: {
                            colors: '#00E396',
                        }
                    },
                    title: {
                        text: 'Nacimientos',
                        style: {
                            color: '#00E396',
                        }
                    }
                },
                {
                    seriesName: 'Muertes',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#FEB019'
                    },
                    labels: {
                        style: {
                            colors: '#FEB019',
                        }
                    },
                    title: {
                        text: 'Muertes',
                        style: {
                            color: '#FEB019',
                        }
                    }
                }
            ],
            tooltip: {
                shared: true,
                intersect: false
            }
        };

        new ApexCharts(document.querySelector("#chart"), chartOptions).render();
    }


</script>


<main>
    <div id="chart"></div>
</main>
