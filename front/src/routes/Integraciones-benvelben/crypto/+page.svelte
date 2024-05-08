<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/modules/treemap.js"></script>
    <script src="https://code.highcharts.com/modules/bar.js"></script>
</svelte:head>

<script>
  import { onMount } from 'svelte';
  

  let coins = [];

  onMount(async () => {
    try {
      const response = await fetchCoins();
      coins = response.data.coins;
      formatPrices(); // Convertir precios de string a float
      renderChart();
    } catch (error) {
      console.error('Error fetching coins:', error);
    }
  });

  async function fetchCoins() {
    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'price',
        orderDirection: 'desc',
        limit: '25', // Limitamos a 10 monedas para el ejemplo
        offset: '0'
      },
      headers: {
        'X-RapidAPI-Key': '744984621cmsha5593e77613e5d0p103591jsn5d3532ea0b8f',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };

    const response = await fetch(options.url, {
      method: options.method,
      headers: options.headers
    });

    if (!response.ok) {
      throw new Error('Failed to fetch coins');
    }

    return response.json();
  }

  function formatPrices() {
    coins.forEach(coin => {
      coin.price = parseFloat(coin.price); // Convertir precios a float
    });
  }

  function renderChart() {
    console.log(coins);
    const coinNames = coins.map(coin => coin.name);
    const precios = coins.map(coin => coin.price);

    Highcharts.chart('chart-container', {
      chart: {
        type: 'bar' 
      },
      title: {
        text: 'Precio de mercado de criptomonedas'
      },
      xAxis: {
        categories: coinNames,
        title: {
          text: 'Criptomoneda'
        }
      },
      yAxis: {
        title: {
          text: 'Precio'
        }
      },
      series: [{
        name: 'Precio',
        data: precios
      }]
    });
  }
</script>

<main>
  <div id="chart-container"></div>
</main>
