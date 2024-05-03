<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
</svelte:head>

<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";

    let API1 = "/api/v2/famous-people";
    let API2 = "/api/v2/forbes-billionaires-list";
    let API3 = "/api/v2/top-richest";
    let API4 = "/api/v2/forbes-billonaires";

    if (dev) {
        API1 = "http://localhost:10000" + API1;
        API2 = "http://localhost:10000" + API2;
        API3 = "http://localhost:10000" + API3;
        API4 = "http://localhost:10000" + API4;
    }

    async function fetchDataAndExtractValues() {
        try {
            const res1 = await fetch(API1);
            const data1 = await res1.json();

            const res2 = await fetch(API2);
            const data2 = await res2.json();

            const res3 = await fetch(API3);
            const data3 = await res3.json();

            const res4 = await fetch(API4);
            const data4 = await res4.json();

            const valuesFromData1 = data1.map(item => item.country);
            const valuesFromData2 = data2.map(item => item.country);
            const valuesFromData3 = data3.map(item => item.nationality);
            const valuesFromData4 = data4.map(item => item.country);

            const allValues = [
                ...valuesFromData1,
                ...valuesFromData2,
                ...valuesFromData3,
                ...valuesFromData4,
            ];

            const normalizedValues = allValues.map(normalizeCountry);

            return normalizedValues;
        } catch (error) {
            console.error("Error fetching and processing data:", error);
            return [];
        }
    }

    function normalizeCountry(country) {
        if (country === "United States of America" || country === "United States" || country === "United State") {
            return "United States";
        }
        return country;
    }

    async function createChart() {
        try {
            const allValues = await fetchDataAndExtractValues();
            const countryCounts = countCountries(allValues);
            const chartData = Object.entries(countryCounts).map(([country, count]) => ({ name: country, y: count }));

            Highcharts.chart("chart-container", {
                chart: {
                    type: "bar",
                    backgroundColor: "#f4f4f4",
                    borderRadius: 10
                },
                title: {
                    text: "Número de empresas y millonarios por países",
                    style: {
                        color: "#333",
                        fontWeight: "bold"
                    }
                },
                xAxis: {
                    title: {
                        text: "",
                        style: {
                            color: "#333",
                            fontWeight: "bold"
                        }
                    },
                    categories: chartData.map(data => data.name),
                    labels: {
                        style: {
                            color: "#333"
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: "",
                        style: {
                            color: "#333",
                            fontWeight: "bold"
                        }
                    },
                    labels: {
                        style: {
                            color: "#333"
                        }
                    }
                },
                series: [{
                    name: "Número de millonarios y empresas",
                    data: chartData.map(data => data.y)
                }],
                credits: {
                    enabled: false
                }
            });
        } catch (error) {
            console.error("Error creating chart:", error);
        }
    }

    function countCountries(data) {
        const countryCounts = {};
        data.forEach(country => {
            countryCounts[country] = (countryCounts[country] || 0) + 1;
        });
        return countryCounts;
    }

    onMount(createChart);
</script>

<div id="chart-container"></div>

<style>
    #chart-container {
        width: 100%;
        height: 600px;
        margin: 0 auto;
        border-radius: 10px;
    }
</style>

         
