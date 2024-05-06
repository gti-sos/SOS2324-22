<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
</svelte:head>

<script>
import { onMount } from "svelte";
import { dev } from "$app/environment";

let companyyear = {};
let seasonyear = {};
let API = "/api/v2/forbes-billonaires";

if (dev) {
  API = "http://localhost:10000" + API;
}

async function getForbesBillonaires() {
  try {
    const res = await fetch(API, { method: "GET" });
    if (!res.ok) throw new Error("Fetch failed");

    const result = await res.json();
    companyyear = {};

    result.forEach((x) => {
      const year = x.year;
      if (!companyyear[year]) {
        companyyear[year] = 1;
      } else {
        companyyear[year]++;
      }
    });

    return companyyear;
  } catch (error) {
    console.error("Error fetching Forbes data:", error);
    return {};
  }
}

async function getGolfLeaderboard() {
  const url = 'https://golf-leaderboard-data.p.rapidapi.com/tours';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '64b1bc86admsh2173949f683de0ap147fb6jsn6582873dd616',
      'X-RapidAPI-Host': 'golf-leaderboard-data.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Fetch failed");

    const result = await response.json();
    seasonyear = {};

    result.results.forEach((item) => {
      const year = item.season_id;
      if (!seasonyear[year]) {
        seasonyear[year] = 1;
      } else {
        seasonyear[year]++;
      }
    });

    return seasonyear;
  } catch (error) {
    console.error("Error fetching Golf data:", error);
    return {};
  }
}

async function grafica() {
  const golf = await getGolfLeaderboard();
  const forbes = await getForbesBillonaires();

  if (!golf || !forbes) {
    console.error("Data error: One or both datasets are invalid.");
    return;
  }

  const years = Object.keys(forbes).sort(); // Para obtener años ordenados
  const empresas = years.map((year) => forbes[year] || 0);
  const competiciones = years.map((year) => golf[year] || 0);

  Highcharts.chart('container', {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Competiciones y Empresas mejor cotizadas por año',
    },
    xAxis: {
      categories: years, // Años en el eje X
      title: {
        text: 'Años',
      },
    },
    yAxis: {
      title: {
        text: 'Count (Conteo)',
      },
    },
    series: [
      {
        name: 'Número de empresas mejor cotizadas',
        data: empresas,
      },
      {
        name: 'Número de competiciones',
        data: competiciones,
      },
    ],
  });
}

onMount(async () => {
  await grafica(); // Espera a que la gráfica se configure correctamente.
});
</script>

<main>
  <div id="container"></div>
</main>
