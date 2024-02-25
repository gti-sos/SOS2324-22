let list = [
    { name: 'Elon Musk', net_worth: 240, bday_year: 1971, age: 51, nationality: 'South Africa' },
    { name: 'Jeff Bezos', net_worth: 150, bday_year: 1964, age: 58, nationality: 'United States of America' },
    { name: 'Gautam Adani', net_worth: 138, bday_year: 1962, age: 60, nationality: 'India' },
    { name: 'Bernard Arnault', net_worth: 135, bday_year: 1949, age: 73, nationality: 'France' },
    { name: 'Bill Gates', net_worth: 118, bday_year: 1966, age: 66, nationality: 'South Africa' },
    { name: 'Larry Page', net_worth: 100, bday_year: 1973, age: 49, nationality: 'United States of America' },
    { name: 'Sergey Brin', net_worth: 96, bday_year: 1973, age: 48, nationality: 'South Africa' },
    { name: 'Steve Ballmer', net_worth: 94, bday_year: 1956, age: 66, nationality: 'United States of America' },
    { name: 'Larry Ellison', net_worth: 93, bday_year: 1944, age: 78, nationality: 'United States of America' },
    { name: 'Mukesh Ambani', net_worth: 89, bday_year: 1957, age: 65, nationality: 'India' },
    { name: 'Carlos Slim Helu', net_worth: 72, bday_year: 1940, age: 82, nationality: 'Mexico' }
];

    function calcularTotalNetWorthPorPais(lista) {
        const totalNetWorthPorPais = {};

        lista.forEach(individuo => {
            const pais = individuo.nationality;
            const netWorth = individuo.net_worth;

            if (!totalNetWorthPorPais[pais]) {
                totalNetWorthPorPais[pais] = 0;
            }

            totalNetWorthPorPais[pais] += netWorth;
        });

        return totalNetWorthPorPais;
    }

    const medias = calcularTotalNetWorthPorPais(list);

    let contenedorResultados = document.createElement("div");
    contenedorResultados.className = "contenedor-de-resultados";

    for (const pais in medias) {
        const totalNetWorth = medias[pais];
        const parrafo = document.createElement("p");
        parrafo.innerHTML = `En el país ${pais}: hay ${totalNetWorth} de net worth.`;
        contenedorResultados.appendChild(parrafo);
    }

    document.body.appendChild(contenedorResultados);
