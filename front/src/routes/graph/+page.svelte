<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    import {onMount} from "svelte";
    import {dev} from "$app/environment";

    let API1 = "/api/v2/famous-people"
    let API2 = "/api/v2/forbes-billonaires";
    let API3 = "/api/v2/top-richest";
    if(dev){
        API1 = "http://localhost:10000" + API1;
        API2 = "http://localhost:10000" + API2;
        API3 = "http://localhost:10000" + API3;
    }
    
    async function getData(){
        try{

            let data=[]
            const res1 = await fetch(API1);
            const data1 = await res1.json();

            const res2 = await fetch(API2);
            const data2 = await res2.json();

            const res3 = await fetch(API3);
            const data3 = await res3.json();
            console.log(data1,data2,data3)


            fillChart(data1,data2,data3); 
        } catch (error){
            console.log( `Error fetching data: ${error}`);
        } 
    }


   
    
    async function fillChart(data1, data2, data3){
        let chartData = [];

        data1.forEach(person => {
            const richestPerson = data3.find(item => item.bday_year === person.death_year);
            const forbesBillionaire = data2.find(item => item.year === person.death_year);

            console.log(person.name, richestPerson, forbesBillionaire); 

            if (richestPerson && forbesBillionaire) {
                console.log("hola")
                chartData.push({
                    name: forbesBillionaire,
                    x: richestPerson.net_worth, 
                    y: person.age_of_death,    
                    country: person.country 
                });
            }
        });

        const chart = Highcharts.chart('container', {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Edad de muerte vs. Valor neto (con distribución por país)'
            },
            xAxis: {
                title: {
                    text: 'Valor neto (en miles de millones de dólares)'
                }
            },
            yAxis: {
                title: {
                    text: 'Edad de muerte'
                }
            },
            tooltip: {
                pointFormat: '<b>{point.name}</b><br>Valor neto: ${point.x}B<br>Edad de muerte: {point.y}<br>País: {point.country}'
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 8,
                        symbol: 'circle'
                    }
                }
            },
            series: [{
                name: 'Personas famosas',
                data: chartData
            }]
        });
    }



    onMount(()=>{
        getData();
    })


</script>


<div id="container" style="width:100%; height:400px;"></div>


<style>

    h2 {
        font-size: 24px;
        font-weight: normal;
        margin-top: 15px;
        margin-left: 2%;
        color: #15297c;
        list-style-type: circle;
    }

    ul {
        margin: 0;
        margin-left: 2%;
        padding: 0;
        list-style: none;
    }

    li {
        margin: 10px 0;
        list-style-type: circle;
    }

    a {
        color: #1e90ff;
        text-decoration: none;
        font-weight: bold;
        list-style-type: circle;
    }

    section {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0px 5px 8px 5px rgba(0, 0, 0, 0.1);
        margin-bottom: 1%;
        margin-top: 1.5%;
    }
</style>