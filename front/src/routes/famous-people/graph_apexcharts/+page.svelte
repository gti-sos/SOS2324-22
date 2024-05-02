<script>
    import { onMount } from "svelte";
    import ApexCharts from 'apexcharts';
    import { dev } from "$app/environment";
  
    let data = [];
    let API = "/api/v2/famous-people";
  
    if (dev){
      API = "http://localhost:10000" + API;
    }
  
    onMount(() => {
        getData();
    });
  
    async function getData(){
      try {
        const res = await fetch(API, {
          method: "GET",
        });
        const dataReceived = await res.json();
        data = dataReceived;
        createChart(data);
      } catch(error) {
        console.error("Error fetching data:", error);
      }
    }
  
    async function createChart(data) {
      
      const countByCountry = data.reduce((acc, curr) => {
        acc[curr.country] = (acc[curr.country] || 0) + 1;
        return acc;
      }, {});
  
      
      const totalPeople = data.length;
      const percentages = Object.entries(countByCountry).map(([country, count]) => ({
        country,
        percentage: ((count / totalPeople) * 100).toFixed(2)
      }));
  
      // Preparar datos para ApexCharts
      const chartData = {
        series: percentages.map(item => item.percentage),
        labels: percentages.map(item => item.country)
      };
  
      
      const options = {
        chart: {
          type: 'donut'
        },
        labels: chartData.labels,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
  
      
      const chart = new ApexCharts(document.querySelector("#chart"), options);
  
      
      chart.render();
    }
</script>



<main>
    <div id="chart"></div>
</main>