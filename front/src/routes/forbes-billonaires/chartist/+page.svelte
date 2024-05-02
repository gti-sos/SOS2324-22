<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/chartist@0.11.4/dist/chartist.min.css">
  <script src="https://cdn.jsdelivr.net/npm/chartist@0.11.4/dist/chartist.min.js"></script>
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';

  let API = '/api/v2/forbes-billonaires';
  if (dev) {
    API = 'http://localhost:10000' + API;
  }

  let data = [];
  let isDataReady = false;

  onMount(() => {
    fetchData();
  });

  async function fetchData() {
    try {
      const res = await fetch(API);
      const fetchedData = await res.json();
      data = fetchedData; // Almacenar los datos obtenidos

      if (data.length > 0) {
        isDataReady = true;
        createBarChart();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function createBarChart() {
    new Chartist.Bar(
      '#bar-chart',
      {
        labels: data.map(item => item.name), // Nombres de las empresas
        series: [data.map(item => item.sale)], // Ventas de las empresas
      },
      {
        axisY: {
          onlyInteger: true,
        },
      }
    );
  }
</script>

<div id="bar-chart" style="width: 100%; height: 400px;"></div>
