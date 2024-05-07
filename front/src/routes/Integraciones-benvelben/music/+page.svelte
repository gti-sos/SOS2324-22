<script>
  import { onMount } from 'svelte';
  

  let artists = [
    { name: 'Ed Sheeran', id: '6eUKZXaKkcviH0Ku9w2n3V' },
    { name: 'Billie Eilish', id: '6qqNVTkY8uBg9cP3Jd7DAH' },
    { name: 'Drake', id: '3TVXtAsR1Inumwj472S9r4' },
    { name: 'Taylor Swift', id: '06HL4z0CvFAxyc27GXpf02' },
    { name: 'Beyoncé', id: '6vWDO969PvNqNYHIOW5v0m' }
  ];
  
  let selectedArtistId = ''; // ID del artista seleccionado
  let topTracks = []; // Array para almacenar los top tracks del artista seleccionado

  onMount(() => {
  
  });

  async function getTopTracks() {
    const options = {
      method: 'GET',
      url: `https://spotify-statistics-and-stream-count.p.rapidapi.com/artist/${selectedArtistId}`,
      headers: {
        'X-RapidAPI-Key': '744984621cmsha5593e77613e5d0p103591jsn5d3532ea0b8f',
        'X-RapidAPI-Host': 'spotify-statistics-and-stream-count.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(options.url, {
        method: options.method,
        headers: options.headers
      });

      if (!response.ok) {
        throw new Error('Failed to fetch top tracks');
      }

      const data = await response.json();
      topTracks = data.topTracks; // Asignar los top tracks obtenidos a la variable
      console.log(topTracks); // Mostrar los top tracks en la consola
      renderChart(); // Llamar a la función para renderizar la gráfica
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  }

  function renderChart() {
    const chartData = topTracks.map(track => {
      return {
        name: track.name,
        y: track.streamCount
      };
    });

    Highcharts.chart('chart-container', {
      chart: {
        type: 'scatter',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },
      title: {
        text: 'Top 10 Canciones Más Escuchadas'
      },
      xAxis: {
        gridLineWidth: 1,
        title: {
          text: 'Nombre de la Canción'
        },
        labels: {
          format: '{value}'
        },
        categories: topTracks.map(track => track.name) 
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
          text: 'Conteo de Reproducciones'
        },
        labels: {
          format: '{value}'
        }
      },
      series: [{
        data: chartData
      }]
    });
  }
</script>

<style>
  main {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 10px;
  }

  h1, h2 {
    color: #333;
    margin-bottom: 10px;
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    margin-bottom: 5px;
  }

  #chart-container {
    width: 600px;
    height: 400px;
    margin-top: 20px;
  }
</style>

<main>
  <h1>Selecciona un Artista</h1>
  <select bind:value={selectedArtistId}>
    {#each artists as artist}
      <option value={artist.id}>{artist.name}</option>
    {/each}
  </select>
  <button on:click={getTopTracks}>Obtener Top Tracks</button>

  <h2>Top Tracks del Artista Seleccionado</h2>
  <ul>
    {#each topTracks as track}
      <li>{track.name} - {track.streamCount} reproducciones</li>
    {/each}
  </ul>

  <h2>Gráfico de Dispersión</h2>
  <div id="chart-container"></div>
</main>
 
