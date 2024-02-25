let lista = [
    {
        rank: 1,
        name: 'Bernard Arnault & family',
        net_worth: 211,
        age: 74,
        country: 'France',
        source: 'LVMH',
        industry: 'Fashion & Retail',
    },
    {
        rank: 2,
        name: 'Elon Musk',
        net_worth: 180,
        age: 51,
        country: 'United States',
        source: 'Tesla, SpaceX',
        industry: 'Automotive',
    },
    {
        rank: 3,
        name: 'Jeff Bezos',
        net_worth: 114,
        age: 59,
        country: 'United States',
        source: 'Amazon',
        industry: 'Technology',
    },
    {
        rank: 4,
        name: 'Larry Ellison',
        net_worth: 107,
        age: 78,
        country: 'United States',
        source: 'Oracle',
        industry: 'Technology',
    },
    {
        rank: 5,
        name: 'Warren Buffet',
        net_worth: 106,
        age: 92,
        country: 'United States',
        source: 'Berkshire Hathaway',
        industry: 'Finance and Investments',
    },
    {
        rank: 6,
        name: 'Bill Gates',
        net_worth: 104,
        age: 67,
        country: 'United States',
        source: 'Microsoft',
        industry: 'Technology',
    },
    {
        rank: 7,
        name: 'Michael Bloomberg',
        net_worth: 94.5,
        age: 81,
        country: 'United States',
        source: 'Bloomberg LP',
        industry: 'Media & Entertainment',
    },
    {
        rank: 8,
        name: 'Carlos Slim Helu & family',
        net_worth: 93,
        age: 83,
        country: 'Mexico',
        source: 'Telecom',
        industry: 'Telecom',
    },
    {
        rank: 9,
        name: 'Mukesh Ambani',
        net_worth: 83.4,
        age: 65,
        country: 'India',
        source: 'Diversified',
        industry: 'Diversified',
    },
    {
        rank: 10,
        name: 'Steve Ballmer',
        net_worth: 80.7,
        age: 67,
        country: 'United States',
        source: 'Microsoft',
        industry: 'Technology',
    }];

function mediaBillones(lista) {
    let sumaPersonaPorPais = {};
    let vecesPais = {};

    lista.forEach(element => {
        const pais = element.country;
        const billones = element.net_worth;


        if (sumaPersonaPorPais[pais] == undefined) {
            sumaPersonaPorPais[pais] = 0;
            vecesPais[pais] = 0;
        }

        sumaPersonaPorPais[pais] += billones;
        vecesPais[pais]++;
    });

    const paisReps = Object.keys(vecesPais).filter(p => vecesPais[p] > 1);

    const medias = paisReps.reduce((res, pais) => {
        res[pais] = sumaPersonaPorPais[pais] / vecesPais[pais];
        return res;
    }, {});

    return medias;

}

let contenedorResultados = document.createElement("div");
contenedorResultados.className = "contenedor-de-resultados";


const medias = mediaBillones(lista);


for (const pais in medias) {
    const billones = medias[pais];
    const parrafo = document.createElement("p");
    parrafo.innerHTML = `Media de billones de los billonarios en ${pais}: ${billones} años`;
    contenedorResultados.appendChild(parrafo);
}


document.body.appendChild(contenedorResultados);
