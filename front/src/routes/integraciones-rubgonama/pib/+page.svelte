<svelte:head>
	<script src="https://d3js.org/d3.v5.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.css">
</svelte:head>

<script>
	import { onMount } from "svelte";
	import { dev } from "$app/environment";

	const billionairesAPI = "/api/v2/forbes-billionaires-list?limit=100000";
	const worldBankAPI = "https://api.worldbank.org/v2/country/{countryCode}/indicator/NY.GDP.MKTP.CD?format=json&date=2022";

	if (dev){
		API = "http://localhost:10000"+API;
	}

	let billionairesData = [];
	let gdpData = {};
	let countryCodes = {
	"United States": "USA",
	"France": "FRA",
	"Mexico": "MEX",
	"India": "IND",
	};

	onMount(async () => {
	await fetchBillionairesData();
	await fetchGDPData();
	createChart();
	});

	async function fetchBillionairesData() {
	try {
	const res = await fetch(billionairesAPI);
	billionairesData = await res.json();
	} catch (error) {
	console.error(`Error fetching billionaires data: ${error}`);
	}
	}

	async function fetchGDPData() {
	try {
	for (const country in countryCodes) {
	const res = await fetch(worldBankAPI.replace("{countryCode}", countryCodes[country]));
	const data = await res.json();
	if (data[1]) {
	gdpData[country] = data[1][0].value;
	}
	}
	} catch (error) {
	console.error(`Error fetching GDP data: ${error}`);
	}
	}

	function createChart() {
	if (!billionairesData.length || !Object.keys(gdpData).length) {
	console.log("No hay datos disponibles para crear la gráfica.");
	return;
	}

	let countries = ["x"];
	let netWorthData = ["Net Worth (in billions)"];
	let gdpDataArray = ["GDP"];

	for (const country in countryCodes) {
	const countryBillionaires = billionairesData.filter(billionaire => billionaire.country === country);
	const totalNetWorth = countryBillionaires.reduce((sum, billionaire) => sum + (billionaire.net_worth * 1000000000), 0);
	if (gdpData[country]) {
	countries.push(country);
	netWorthData.push(totalNetWorth);
	gdpDataArray.push(gdpData[country]);
	}
	}

	bb.generate({
	data: {
	x: "x",
	columns: [
	countries,
	netWorthData,
	gdpDataArray
	],
	types: {
	"Net Worth (in billions)": "area-spline",
	"GDP": "area-spline"
	},
	axes: {
	"Net Worth": "y",
	"GDP": "y2"
	}
	},
	axis: {
	x: {
	type: "category"
	},
	y2: {
	show: true,
	label: {
	text: "GDP",
	position: "outer-middle"
	}
	}
	},
	bindto: "#graph_1"
	});
	}
</script>

<style>
	#graph_1 {
		width: 100%;
		height: 400px;
		margin: 0 auto;
	}
</style>

<div id="graph_1"></div>