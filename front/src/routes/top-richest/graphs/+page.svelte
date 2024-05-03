
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
    import { Button, Col, Row,Input } from '@sveltestrap/sveltestrap';
    let data = [];
    import { onMount } from "svelte";
    let dataAvailable = false;

    onMount(() => {
        getData();
    });

    let API = "https://sos2324-22.appspot.com/api/v2/top-richest";

    async function getInitial() {
        try {
            let response = await fetch(API + "/loadInitialData", {
                method: "GET",
            });

            let status = await response.status;
            console.log(`Status code: ${status}`);
            if (status === 200) {
                await getData();
            }

        } catch (error) {
            console.log(`Error loading initail data: ${error}`)
        }
    }

    async function getData() {
        try {
            const res = await fetch(API);
            const dat = await res.json();
            data = dat;
            console.log(data);

            if (data.length > 0) {
                dataAvailable = true;
                g1(data);
                g2(data);
            }
        } catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }

    function g1(data) {
        Highcharts.chart('scatter-chart-container', {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Patrimonio Neto de los Millonarios'
            },
            xAxis: {
                title: {
                    text: 'Edad'
                },
                gridLineWidth: 1
            },
            yAxis: {
                title: {
                    text: 'Patrimonio Neto'
                },
                startOnTick: false,
                endOnTick: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b><br/>Edad: ' + this.point.x + '<br/>Patrimonio Neto: ' + this.point.y;
                }
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        symbol: 'circle'
                    }
                }
            },
            series: [{
                data: data.map(millonario => ({
                    name: millonario.name,
                    x: millonario.age,
                    y: millonario.net_worth
                }))
            }]
        });
    }


    function g2(data) {
        const tiposPais = [...new Set(data.map(item => item.nationality))];

        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble'
            },
            title: {
                text: 'Número de Millonarios por Nacionalidad'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '13%',
                    maxSize: '35%',
                    zMin: 0,
                    zMax: 300,
                    layoutAlgorithm: {
                        gravitationalConstant: 0.05,
                        splitSeries: true,
                        seriesInteraction: false,
                        dragBetweenSeries: true,
                        parentNodeLimit: true
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 0
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
            series: tiposPais.map(nationality => ({
                name: nationality,
                data: data.filter(item => item.nationality === nationality).map(item => ({
                    name: item.name,
                    value: parseFloat(item.net_worth)
                }))
            }))
        });
    }
</script>

{#if dataAvailable==false}
    <div style="justify-content: center; text-align: center; margin-top: 20px">
        <a href="/top-richest" class="button-margin-left">

            <Button outline style="margin-left: 10px;"color="secondary" >Volver </Button>
        </a>
    </div>
    <p class="container">No hay datos disponibles</p>
{/if}
<div id="container"></div>
<div id="scatter-chart-container"></div>

<style>
    .container {
        margin: 50px auto;
        padding: 20px;
    }
</style>
