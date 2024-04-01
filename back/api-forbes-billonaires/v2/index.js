const API_BASE = "/api/v2";

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

  

 function mediaBeneficio(list){
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

function validarDatos(req, res, next) {
  const json = req.body;

  const esquema = {
      'rank': 'number', 
      'name': 'string', 
      'country': 'string', 
      'sale': 'number', 
      'profit': 'number', 
      'asset': 'number', 
      'market_value': 'number', 
      'year': 'number'
  };

  const receivedKeys = Object.keys(json);
  const expectedKeys = Object.keys(esquema);
  const missingKeys = expectedKeys.filter(key => !receivedKeys.includes(key));
  
  
  const extraKeys = receivedKeys.filter(key => !expectedKeys.includes(key));
  if (extraKeys.length > 0) {
      console.error(`There are more keys than expected: ${extraKeys.join(', ')}`);
      return res.sendStatus(400, "Bad request");
  }

  
  if (missingKeys.length > 0) {
      console.error(`There are missing keys: ${missingKeys.join(', ')}` );
      return res.sendStatus(400, "Bad request");
  }

  
  const erroresTipo = [];

  expectedKeys.forEach(key => {
      const tipoEsperado = esquema[key];
      const valor = json[key];
      if (typeof valor !== tipoEsperado) {
          erroresTipo.push(`El valor de '${key}' debe ser de tipo '${tipoEsperado}'`);
      }
  });

  if (erroresTipo.length > 0) {
      console.error(`Errores de tipo: ${erroresTipo.join(', ')}`);
      return res.sendStatus(400, "Bad request");
  }
  next();
}

function LoadBackendFB2(app,db) {

  db.insert(lista);

  app.get(API_BASE+"/forbes-billonaires/docs",(req,res)=> {
    res.redirect("https://documenter.getpostman.com/view/32927299/2sA35HX1PB");
  });

  //API

  app.get(API_BASE+"/forbes-billonaires/loadInitialData", (req, res) => {
    db.find({}, (err, docs) => {
      if(err){
          res.sendStatus(500, "Internal Error");
      }else {
          if (docs.length === 0) {
              db.insert(lista);
              res.sendStatus(201, "Created");
          } else{
              res.sendStatus(409, "Conflict");
          }
        }
      });
  });

  app.get(API_BASE + '/forbes-billonaires', (req, res) => {
    const queryParams = req.query;
    const limit = parseInt(queryParams.limit) || 10;
    const offset = parseInt(queryParams.offset) || 0;

    const filter = {};
    for (const key in queryParams) {
        if (key !== 'limit' && key !== 'offset' && queryParams.hasOwnProperty(key)) {
            const value = isNaN(queryParams[key]) ? queryParams[key] : parseFloat(queryParams[key]);
            filter[key] = value;
        }
    }

    db.find(filter)
        .skip(offset)
        .limit(limit)
        .exec((err, list) => {
            if (err) {
                res.status(500).json({ error: 'Internal Error' });
            } else {
                res.json(list.map(({ _id, ...rest }) => rest));
            }
        });
});

  app.get(API_BASE+"/forbes-billonaires",(req,res) => {
    db.find({}, (err,lista) => {
      if(err){
        res.sendStatus(500, "Internal error");
      }else{
        res.send(JSON.stringify(lista.map((c) => {
          delete c._id;
          return c;
        }))); 
      }
    })
  });

  app.get(API_BASE + "/forbes-billonaires/:name", (req, res) => {
    let companyName = req.params.name;
  
    db.find({ name: companyName }, (err, searchedCompany) => {
      if (err) {
        return res.sendStatus(404, "Company not found");
    } else {
        if(searchedCompany.length === 0){
            res.sendStatus(404,"Company not found");
        } else {
            const filteredResult = searchedCompany.map(company => {
                const { _id, ...rest } = company; 
                return rest; 
            });
            res.send(filteredResult);
        }
    }
});
});
  app.get(API_BASE+"/forbes-billonaires/:name/:country", (req,res) => {
    let name=req.params.name;
    let country=req.params.country;
    db.find({"name": name, "country":country}, (err,search) => {
        if(err){
            res.sendStatus(404,"Not Found");
        }else if(search.length===0){
            res.sendStatus(404,"Not found");
        }else if(search.length===1){
            let elem=search[0];
            delete elem._id;
            res.send(elem);
        }else{
            res.send(search.map((c)=> {
                delete c._id;
                return c;
            }));
        }
    });
  });



  app.post(API_BASE+"/forbes-billonaires/:name", (req,res) => {
    res.sendStatus(405, "Method not allowed");
  });

  app.post(API_BASE+"/forbes-billonaires/",validarDatos, (req,res)=>{
    let company = req.body;
    db.findOne({"name" : company.name}, (err, alreadyCompany) => {
      if(err){
        res.sendStatus(500,"Internal Error");
      }else{
        if(alreadyCompany){
          res.sendStatus(409, "Person already exists");
        }else{
          db.insert(company, (err, newCompany) => {
            if(err){
              res.sendStatus(500,"Internal Error");
            }else {
              res.sendStatus(201,"Ok");
            }
          });
        }
      }
    });
  });
  
  app.delete(API_BASE+"/forbes-billonaires/:name",(req,res) => {
    let name = req.params.name;

    db.remove({"name" : name}, {},(err, numRemoved) => {
      if(err){
        res.sendStatus(500,"Internal error");
      }else{
        if(numRemoved>=1){
          res.sendStatus(200,"Ok");
        }else{
          res.sendStatus(404,"Not found");
        }
      }
    });
  });

  app.delete(API_BASE+"/forbes-billonaires", (req,res) => {
    db.remove({},{multi:true},(err, numRemoved)=>{
      if(err){
        res.sendStatus(500,"Internal Error");
      }else{
        if(numRemoved>=1){
          res.sendStatus(200,"All removed");
        }else{
          res.sendStatus(404, "Person not found");
        }
      }
    });
  });

  app.delete(API_BASE+"/forbes-billonaires/:name/:country", (req,res) => {
    let name=req.params.name;
    let country=req.params.country;

    db.remove( {"name":name, "country":country},{ multi: true },(err,numRemoved)=>{
    if(err){
        res.sendStatus(500,"Internal Error");
    }else{
        if(numRemoved>=1){
            res.sendStatus(200,"Removed");
        }else{
            res.sendStatus(404,"Not found");
        }
    }
    });
});


  app.put(API_BASE+"/forbes-billonaires/:name/:country", (req,res) => {
    const { name, country } = req.params;
    const nuevo = req.body;

    db.find({ name, country }, (err, info) => {
      if (err) {
        res.sendStatus(500, "Internal Error");
      } else if (info.length === 0) {
        res.sendStatus(404, "Not Found");
      } else {
        db.update({ name, country }, {$set: nuevo}, (err, numUpdated) => {
          if (err) {
            res.sendStatus(500, "Internal Error");
          } else {
            if (numUpdated === 0) {
              res.sendStatus(404, "Not Found");
            } else {
              res.sendStatus(200, "Ok");
            }
          }
        });
      }
    });
  });


  app.put(API_BASE+"/forbes-billonaires", (req,res) =>{
    res.sendStatus(405,"Method not allowed");
  });

  app.put(API_BASE+"/forbes-billonaires/:name", (req,res) => {
    let name = req.params.name;
    let newData = req.body;

    db.update({"name": name}, {$set: newData}, (err,numUpdated) => {
      if(err){
        console.log(err);
        res.sendStatus(400, "Bad request");
      }else{
        if(numUpdated===0){
          res.sendStatus(404, "Not found");
        }else{
          res.sendStatus(200, "Ok");
        }
      }
    });
  });

}

export {LoadBackendFB2,lista};