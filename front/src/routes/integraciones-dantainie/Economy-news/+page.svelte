<script>
    import {onMount} from "svelte";
    import { Button, Col, Row } from '@sveltestrap/sveltestrap';

    let drivers=[];
    let currentPage = 1;  
    let offset = 0;
	const limit = 10;


    onMount(() => {
        
        getEconomyNews();
       
    });

    async function getEconomyNews(){
        const url = 'https://global-economy-news.p.rapidapi.com/?category=fiat';
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64b1bc86admsh2173949f683de0ap147fb6jsn6582873dd616',
            'X-RapidAPI-Host': 'global-economy-news.p.rapidapi.com'
        }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
</script>