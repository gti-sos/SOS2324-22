<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/variwide.js"></script>
</svelte:head>

<script>
    import {onMount} from "svelte";
    import { dev } from "$app/environment";
    

    let API = "/api/v2/forbes-billonaires";
    if (dev){
        API="http://localhost:10000"+API;
    }

    let data = [];
    let forbesBillonairesData = false;

    onMount(async() => {
        await getData();

    });


    async function getData() {
        try {
            const res = await fetch(API);
            const dat = await res.json();
            data = dat;

            if (data.length > 0) {
                forbesBillonairesData = true;
                createChart();
            }
        } catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }

    

    async function createChart() {
    
    if (!data) {
        console.log("No hay datos disponibles para crear la gráfica.");
        return;
    }

    Highcharts.chart('container', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Forbes Billonaires Companies'
                },
                tooltip: {
                    valueSuffix: '$'
                },
                subtitle: {
                    text:
                    'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
                },
                plotOptions: {
                    series: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: [{
                            enabled: true,
                            distance: 20
                        }, {
                            enabled: true,
                            distance: -40,
                            format: '{point.percentage:.1f}%',
                            style: {
                                fontSize: '1.2em',
                                textOutline: 'none',
                                opacity: 0.7
                            },
                            filter: {
                                operator: '>',
                                property: 'percentage',
                                value: 10
                            }
                        }]
                    }
                },
                series: [
                    {
                        name: 'Profit',
                        colorByPoint: true,
                        data: data.map(forbes => ({
                            name : forbes.name,
                            y : forbes.profit
                        
                        }))
                    }
                ]
            });

            
    let variwideData = data.map(item => ({
        name: item.name,
        y: item.asset,
        z: item.market_value / 1000 
    }));

    
    Highcharts.chart('pro', {
                chart: {
                    type: 'variwide'
                },
                title: {
                    text: 'Forbes Billionaires Companies'
                },
                subtitle: {
                    text: 'Source: <a href="https://www.forbes.com/billionaires/">Forbes</a>'
                },
                xAxis: {
                    type: 'category'
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'Profit',
                    data: variwideData,
                    dataLabels: {
                        enabled: true,
                        format: '€{point.y:.2f} billion' // Mostrar beneficio en miles de millones de euros
                    },
                    tooltip: {
                        pointFormat: 'Asset: <b>€ {point.y} billion</b><br>' +
                            'Market Value: <b>€ {point.z} billion</b><br>'
                    },
                    borderRadius: 3,
                    colorByPoint: true
                }]
            });



        }

</script>


<div id="container" style="width:100%; height:400px;"></div>
<div id="pro" style="width:100%; height:400px;"></div>