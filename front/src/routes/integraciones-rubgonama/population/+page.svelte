<svelte:head>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.css">
</svelte:head>

<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";

    let countryAPI = "https://restcountries.com/v2/all";
    let billionairesAPI = "/proxy2";
    if (dev) {
        billionairesAPI = "http://localhost:10000" + billionairesAPI;
    }

    let billionairesData = [];
    let countryData = [];
    let netWorthByCountry = {};

    onMount(async () => {
        await fetchBillionairesData();
        await fetchCountryData();
        createChart();
    });

    async function fetchBillionairesData() {
        try {
            const res = await fetch(billionairesAPI);
            billionairesData = await res.json();

            billionairesData.forEach(billionaire => {
                let country = billionaire.country;
                const netWorth = billionaire.net_worth * 1000000000;
                if (country === "United States") {
                    country = "United States of America";
                }
                if (netWorthByCountry[country]) {
                    netWorthByCountry[country] += netWorth;
                } else {
                    netWorthByCountry[country] = netWorth;
                }
            });
        } catch (error) {
            console.error(`Error fetching billionaires data: ${error}`);
        }
    }

    async function fetchCountryData() {
        try {
            const res = await fetch(countryAPI);
            countryData = await res.json();
        } catch (error) {
            console.error(`Error fetching country data: ${error}`);
        }
    }

    function createChart() {
        if (!Object.keys(netWorthByCountry).length || !countryData.length) {
            console.log("No hay datos disponibles para crear la gráfica.");
            return;
        }

        let countryNames = ["x"];
        let populationData = ["Population"];
        let netWorthData = ["Net Worth (in billions)"];

        for (const country in netWorthByCountry) {
            let countryInfo = countryData.find(c => c.name === country);
            if (countryInfo) {
                countryNames.push(country);
                populationData.push(countryInfo.population);
                netWorthData.push(netWorthByCountry[country]);
            }
        }

        bb.generate({
            data: {
                x: "x",
                columns: [
                    countryNames,
                    populationData,
                    netWorthData
                ],
                types: {
                    Population: "bar",
                    "Net Worth (in billions)": "bar"
                },
                axes: {
                    Population: "y",
                    "Net Worth (in billions)": "y2"
                }
            },
            axis: {
                x: {
                    type: "category"
                },
                y2: {
                    show: true,
                    label: {
                        text: "Net Worth (in billions)",
                        position: "outer-middle"
                    }
                }
            },
            bindto: "#graph_1"
        });
    }
</script>

<style>
    #graph_1 {
        width: 100%;
        height: 400px;
        margin: 0 auto;
    }
</style>

<div id="graph_1"></div>