    const API_BASE = "/api/v1";

    let initial_list = [
      { name: 'George Washington',
        short_description: '1st president of the United States (1732–1799)',
        gender: 'Male',
        country: 'United States of America',
        occupation: 'Politician',
        birth_year: 1732,
        death_year: 1799,
        age_of_death: 67    
      },
      { name: 'Douglas Adams',
        short_description: 'English writer and humorist',
        gender: 'Male',
        country: 'United Kingdom',
        occupation: 'Artist',
        birth_year: 1952,
        death_year: 2001,
        age_of_death: 49    
      },
      { name: 'Abraham Lincoln',
        short_description: '16th president of the United States (1809-1865)',
        gender: 'Male',
        country: 'United States of America',
        occupation: 'Politican',
        birth_year: 1809,
        death_year: 1865,
        age_of_death: 56    
      },
      { name: 'Wolfgang Amadeus Mozart',
        short_description: 'Austrian composer of the Classical period',
        gender: 'Male',
        country: 'Archduchy of Austria',
        occupation: 'Artist',
        birth_year: 1756,
        death_year: 1791,
        age_of_death: 35    
      },
      { name: 'Adolf Hitler',
        short_description: 'chancellor and Führer of Germany, leader of the Nazi Party',
        gender: 'Male',
        country: 'Germany',
        occupation: 'Statesperson',
        birth_year: 1889,
        death_year: 1945,
        age_of_death: 56    
      },
      { name: 'J. R. R. Tolkien',
        short_description: 'British philologist and author of classic high fantasy works',
        gender: 'Male',
        country: 'United Kingdom',
        occupation: 'Researcher',
        birth_year: 1892,
        death_year: 1973,
        age_of_death: 81    
      },
      { name: 'Charles Darwin',
        short_description: 'British naturalist, author of "On the origin of species, by means of natural selection" (1809-1882)',
        gender: 'Male',
        country: 'United Kingdom',
        occupation: 'Researcher',
        birth_year: 1809,
        death_year: 1882,
        age_of_death: 73    
      },
      { name: 'John Lennon',
        short_description: 'English singer and songwriter, founding member of The Beatles (1940-1980)',
        gender: 'Male',
        country: 'United Kingdom',
        occupation: 'Artist',
        birth_year: 1940,
        death_year: 1980,
        age_of_death: 80    
      },
      { name: 'Ramesses IV',
        short_description: 'the third pharaoh of the Twentieth Dynasty of the New Kingdom of Ancient Egypt',
        gender: 'Male',
        country: 'Ancient Egypt',
        occupation: 'Statesperson',
        birth_year: -1200,
        death_year: -1149,
        age_of_death: 51    
      },
      { name: 'Louis Armstrong',
        short_description: 'American jazz trumpeter, composer and singer',
        gender: 'Male',
        country: 'United States of America',
        occupation: 'Artist',
        birth_year: 1900,
        death_year: 1971,
        age_of_death: 71    
      },
      { name: 'Michael Jackson',
        short_description: 'American recording artist; singer and songwriter (1958-2009)',
        gender: 'Male',
        country: 'United States of America',
        occupation: 'Artist',
        birth_year: 1958,
        death_year: 2009,
        age_of_death: 51   
      }];
    
    
      function validarDatos(req, res, next) {
        const json = req.body;
      
        const esquema = {
            'name': 'string', 
            'short_description': 'string', 
            'gender': 'string', 
            'country': 'string', 
            'occupation': 'string', 
            'birth_year': 'number', 
            'death_year': 'number', 
            'age_of_death': 'number'
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



    
    
    function LoadBackendFP(app,dbFamousPeople)  {

        app.get(API_BASE+"/famous-people/docs",(req,res)=> {
          res.redirect("https://documenter.getpostman.com/view/32927496/2sA2xe4E37");
        });

        app.get(API_BASE+"/famous-people/loadInitialData", (req, res) => {
          dbFamousPeople.find({}, (err, docs) => {
            if(err){
                res.sendStatus(500, "Internal Error");
            }else {
                if (docs.length === 0) {
                    dbFamousPeople.insert(initial_list);
                    res.sendStatus(201, "Created");
                } else{
                    res.sendStatus(409, "Conflict");
                }
            }
          });
        });



    app.get(API_BASE + '/famous-people', (req, res) => {
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

      dbFamousPeople.find(filter)
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

  app.get(API_BASE+"/famous-people/:name", (req,res) => {
    let companyName = req.params.name;

    dbFamousPeople.findOne( { name: companyName }, (err,searchedCompany) => {
      if(err){
        res.sendStatus(404,"Company not found");
      } else{
        //delete searchedCompany._id;    por si queremos borrar el id
        if(searchedCompany){
          res.send(searchedCompany);
        }else{
          res.sendStatus(404,"Company not found");
        }
        
      }
    })
  });

        app.post(API_BASE+"/famous-people", validarDatos, (req,res)=>{
            let person = req.body;

            dbFamousPeople.findOne({ name: person.name}, (err,existingPerson) => {
              if(err){
                res.sendStatus(500,"Internal Error");
              } else{
                if (existingPerson) {
                  res.sendStatus(409, "Person already exists");
                } else{
                  dbFamousPeople.insert(person, (err,newPerson) =>{
                    if (err) {
                      res.sendStatus(500,"Internal Error");
                    } else {
                      res.sendStatus(201,"Ok");
                    }
                  });
                }
              }                 
            });
          });

          app.post(API_BASE+"/famous-people/:name", (req,res) => {
            res.sendStatus(405, "Method not allowed");
          })
     
        
        app.delete(API_BASE + "/famous-people/:name", (req, res) => {
            let personToDelete = req.params.name;

            dbFamousPeople.remove({ "name": personToDelete }, {},(err,numRemoved) => {
              if(err){
                res.sendStatus(500,"Internal Error");
              }else{
                if (numRemoved >= 1){
                    res.sendStatus(200,"Ok");
                } else {
                    res.sendStatus(404,"Not found");
                }
              }
            });
          });

        app.delete(API_BASE + "/famous-people", (req,res)=> {

          dbFamousPeople.remove({}, {multi : true }, (err,numRemoved) => {
            if(err){
              res.sendStatus(500,"Internal Error");
            } else{
              if(numRemoved>=1){
                res.sendStatus(200,"All removed");
              } else{
                res.sendStatus(404,"Person not found");
              }
            }
          });
        });

        
          
        
        app.put(API_BASE+"/famous-people", (req,res) =>{
          res.sendStatus(405,"Method not allowed");
        });


        app.get(API_BASE+"/famous-people/:name/:country", (req,res) => {
          let name=req.params.name;
          let country=req.params.country;

          dbFamousPeople.find({"name":name, "country":country}, (err,info) => {
              if(err){
                  res.sendStatus(404,"Not Found");
              }else if(info.length===0){
                  res.sendStatus(404,"Not found");
              }else if(info.length===1){
                  let elem=info[0];
                  delete elem._id;
                  res.send(elem);
              }else{
                  res.send(info.map((c)=> {
                      delete c._id;
                      return c;
                  }));
              }
          });
        });

      app.put(API_BASE+"/famous-people/:name/:country", (req,res) => {
        const { name, country } = req.params;
        const nuevo = req.body;
      
        dbFamousPeople.find({ name, country }, (err, info) => {
          if (err) {
            res.sendStatus(500, "Internal Error");
          } else if (info.length === 0) {
            res.sendStatus(404, "Not Found");
          } else {
            dbFamousPeople.update({ name, country }, {$set: nuevo}, (err, numUpdated) => {
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

        app.delete(API_BASE+"/famous-people/:name/:country", (req,res) => {
          let name=req.params.name;
          let country=req.params.country;
      
          dbFamousPeople.remove( {"name":name, "country":country},{ multi: true },(err,numRemoved)=>{
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

        
        
};
export { LoadBackendFP };