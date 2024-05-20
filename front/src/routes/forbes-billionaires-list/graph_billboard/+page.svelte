<svelte:head>
	<!-- Incluyendo los scripts de Billboard.js y D3.js -->
	<script src="https://d3js.org/d3.v5.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.css">
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

		const categories = data.map(forbes => forbes.name);
		const values = data.map(forbes => forbes.net_worth);

		bb.generate({
			data: {
				x: "x",
				columns: [
					["x", ...categories],
					["Net Worth", ...values]
				],
				type: "spline"
			},
			axis: {
				x: {
					type: "category"
				}
			},
			bindto: "#graph_1"
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