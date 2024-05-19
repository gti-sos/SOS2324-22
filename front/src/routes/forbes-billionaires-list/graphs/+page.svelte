<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
</svelte:head>

<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";

    let API = "/api/v2/forbes-billionaires-list?limit=100000";
    if (dev) {
        API = "http://localhost:10000" + API;
    }

    let data = [];
    let forbesBillionairesListData = false;

    onMount(async () => {
        await getData();
    });

    async function getData() {
        try {
            const res = await fetch(API);
            const dat = await res.json();
            data = dat;

            if (data.length > 0) {
                forbesBillionairesListData = true;
                createChart();
            }
        } catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }

    function createChart() {
        if (!data.length) {
            console.log("No hay datos disponibles para crear la gráfica.");
            return;
        }

        Highcharts.chart('graph_1', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Gente Billonaria según Forbes'
            },
            tooltip: {
                pointFormat: '<b>{point.name}:</b> {point.percentage:.2f}%'
            },
            series: [{
                name: 'Net Worth',
                colorByPoint: true,
                data: data.map(forbes => ({
                    name: forbes.name,
                    y: (forbes.net_worth / data.reduce((acc, curr) => acc + curr.net_worth, 0)) * 100
                }))
            }]
        });
		

        Highcharts.chart('graph_2', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Gente Billonaria según Forbes'
            },
            xAxis: {
                categories: data.map(forbes => forbes.rank.toString()),
                title: {
                    text: 'Rank'
                }
            },
            yAxis: {
                title: {
                    text: 'Net Worth ($)'
                }
            },
            tooltip: {
                valueSuffix: ' $'
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f} $',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        }
                    }
                }
            },
            series: [{
                name: 'Net Worth',
                colorByPoint: true,
                data: data.map(forbes => forbes.net_worth)
            }]
        });
    }
</script>

<style>
    #graph_1, #graph_2 {
        width: 100%;
        height: 400px;
        margin: 0 auto;
    }
</style>

<div id="graph_1"></div>
<div id="graph_2"></div>