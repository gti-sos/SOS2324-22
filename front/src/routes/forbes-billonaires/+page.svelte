
<script>
        import {onMount} from "svelte";

        let API = "http://localhost:10000/api/v1/forbes-billonaires"

        onMount(() => {
                getForbes_billonaires();
        })

        async function getForbes_billonaires(){
                let response = await fetch(API, {
                                        method:"GET"
                });
                let data = await response.json();
                console.log(data);
        }
</script>