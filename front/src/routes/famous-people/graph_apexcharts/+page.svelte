<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';

  let API = "/api/v2/famous-people"

    if (dev){
        API = "http://localhost:10000"+API;
    }

  let data = [];
  let isDataReady = false;

  onMount(() => {
    fetchData();
  });

  async function fetchData() {
    const res = await fetch(API);
    try {
      
      const fetchedData = await res.json();
      data = fetchedData;
      console.log(data)

      if (data.length > 0) {
        isDataReady = true;
        createChart(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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
          name: 'Edad de Muerte',
          data: data.map(item => item.age_of_death), 
        },
      ],
      xaxis: {
        categories: data.map(item => item.name), 
        title: {
          text: 'Personas',
        },
      },
      yaxis: {
        title: {
          text: 'Edad (años)',
        },
      },
    };

    new ApexCharts(document.querySelector("#chart"), chartOptions).render();
  }
</script>

<main>
  
    <div id="chart"></div>
  
</main>
