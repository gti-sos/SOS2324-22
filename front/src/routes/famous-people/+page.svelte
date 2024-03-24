<script>
    import {onMount} from "svelte";
    let API = "http://localhost:10000/api/v1/famous-people"

    onMount(() => {
        getPeople();
    })

    async function getPeople() {
        
            let response = await fetch(API,{
                method: "GET"
            });
            let data = await response.json();
            console.log(data);
        } 
            
    
        
</script>

