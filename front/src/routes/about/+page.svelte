<script>
    import { dev } from "$app/environment";
    let mode = "production";

    if (dev) {
        mode = "development";
    }
</script>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: 100vh;
    }

    .container {
        width: 300px;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    section {
        text-align: center;
        margin-bottom: 20px;
    }

    h3 {
        font-family: Arial, sans-serif;
        font-size: 20px;
        margin-bottom: 10px;
    }
</style>

<h2>Ahora mismo estás en {mode}</h2>
<main>
    <div class="container">
        <section>
            <h3>Juan</h3>
            <a href="https://youtu.be/VtnP5eKRUBQ">Vídeo entregable D03</a>
        </section>
    
        <section>   
            <h3>Daniel Taillefer Nieto</h3>
            <a href="https://youtu.be/uqKAg8Nbj-c">Vídeo entregable D03</a>
        </section>

		<section>
			<h3>Rubén</h3>
			<a href="https://youtu.be/LumJZRwbbH0">Vídeo entregable D03</a>
		</section>

		<section>
            <h3>Benjamín (El volumen esta bajo, escuchar a volumen alto o activar los subtítulos)</h3>
            <a href="https://youtu.be/3fSuga2j_BM?si=2Rbul-0AMoYLn7cj">Vídeo entregable D03</a>
        </section> 
               
    </div>
</main>
