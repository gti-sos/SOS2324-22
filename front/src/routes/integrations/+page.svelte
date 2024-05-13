<script>
      import { Button } from '@sveltestrap/sveltestrap';
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

    button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        margin-bottom: 10px;
        font-size: 14px;
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>

<main>
    <div class="container">
        <section>
            <h3>Juan</h3>
            <a href="/integraciones-juarosrap/dogs" style="text-decoration: none;">
                <button>Uso API de perros</button>
            </a>

            <a href="/integraciones-juarosrap/cars" style="text-decoration: none;">
                <button>Uso API de coches</button>
            </a>

            <a href="/integraciones-juarosrap/tornados" style="text-decoration: none;">
                <button>Integración API de tornados</button>
            </a>

            <a href="/integraciones-juarosrap/terremotos" style="text-decoration: none;">
                <button>Integración API de terremotos</button>
            </a>
        </section>

        <section>
            <h3>Dani</h3>
            <a href="/integraciones-dantainie/F1" style="text-decoration: none;">
                <button>Uso API de fomrula 1</button>
            </a>

            <a href="/integraciones-dantainie/MMA" style="text-decoration: none;">
                <button>Uso API de Cartelera MMA</button>
            </a>

            <a href="/integraciones-dantainie/golf-leaderboard" style="text-decoration: none;">
                <button>Integración de dos APIS</button>
            </a>

            <a href="/integraciones-dantainie/api-integracion2" style="text-decoration: none;">
                <button>Integración de dos APIS</button>
            </a>
        </section>

         <section>
            <h3>Benjamín</h3>
            <a href="/Integraciones-benvelben/crypto" style="text-decoration: none;">
                <button>Uso API de criptomonedas</button>
            </a>

            <a href="/Integraciones-benvelben/music" style="text-decoration: none;">
                <button>Uso API de Spotify </button>
            </a>

            <a href="/Integraciones-benvelben/netW" style="text-decoration: none;">
                <button>Uso API de conversion de moneda </button>
            </a>

             <a href="/Integraciones-benvelben/preciosABNB" style="text-decoration: none;">
                <button>Uso API de precios AirBnB </button>
            </a>

            
            

        </section>    

    </div>
</main>
