<script>
    import { dev } from "$app/environment";
    let mode = "production";

    if(dev){
        mode = "development"
    }
</script>


<h1>Ahora mismo estás en {mode}</h1>