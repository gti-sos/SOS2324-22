let lista = [
    { rank: 1,
      name: 'ICBC',
      country: 'China',
      sale: 151.381,
      profit: 41.9837,
      asset: 3473.238,
      market_value: 229.805,
      year: 2017    
    },
    { rank: 2,
      name: 'China Constuctition Bank',
      country: 'China',
      sale: 134.242,
      profit: 34.9814,
      asset: 3016.578,
      market_value: 200.458,
      year: 2017    
    },
    { rank: 3,
      name: 'Berkshire Hathaway',
      country: 'United State',
      sale: 222.935,
      profit: 24.074,
      asset: 620.854,
      market_value: 409.908,
      year: 2017    
    },
    { rank: 4,
      name: 'JPMorgan Chase',
      country: 'United State',
      sale: 102.494,
      profit: 24.231,
      asset: 2512.986,
      market_value: 306.616,
      year: 2017    
    },
    { rank: 5,
      name: 'Wells Fargo',
      country: 'United State',
      sale: 97.573,
      profit: 21.938,
      asset: 1943.443,
      market_value: 274.385,
      year: 2017    
    },
    { rank: 6,
      name: 'Agricultural Bank of China',
      country: 'China',
      sale: 115.698,
      profit: 27.7975,
      asset: 2816.039,
      market_value: 149.229,
      year: 2017    
    },
    { rank: 7,
      name: 'Bank of America',
      country: 'United State',
      sale: 92.214,
      profit: 16.563,
      asset: 2196.847,
      market_value: 231.876,
      year: 2017    
    },
    { rank: 8,
      name: 'Bank of China',
      country: 'China',
      sale: 113.107,
      profit: 24.8566,
      asset: 2611.539,
      market_value: 141.229,
      year: 2017    
    },
    { rank: 9,
      name: 'Apple',
      country: 'United State',
      sale: 217.481,
      profit: 45.217,
      asset: 331.141,
      market_value: 752.039,
      year: 2017    
    },
    { rank: 10,
      name: 'Toyota Motor',
      country: 'Japan',
      sale: 249.902,
      profit: 17.1115,
      asset: 412.496,
      market_value: 171.85,
      year: 2017    
    }];

  module.exports.list = lista;

module.exports.mediaBeneficio = function(list){
    let sumaBeneficioPais = {};
    let repeticion = {};


    list.forEach(element => {
        const pais = element.country;
        const beneficio = element.profit;
        const venta = element.sale;

        if(venta>100.000){

            if(sumaBeneficioPais[pais] == undefined){
                sumaBeneficioPais[pais] = 0;
                repeticion[pais] = 0; 
            }

            sumaBeneficioPais[pais] += beneficio;
            repeticion[pais]++;

        }
    });

    const pRepeticion = Object.keys(repeticion).filter(p => repeticion[p] > 1);

    const medias = pRepeticion.reduce((res,pais) => {
        res[pais] = sumaBeneficioPais[pais]/repeticion[pais];
        return res;
    }, {});

    return medias;
}



