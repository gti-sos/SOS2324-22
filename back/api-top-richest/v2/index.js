const API_BASE = "/api/v2";

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


  function validarDatos(req, res, next) {
    const json = req.body;
  
    const esquema = {
        'name': 'string', 
        'net_worth': 'number', 
        'bday_year': 'number', 
        'age': 'number', 
        'nationality': 'string', 
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





function LoadBackendTR2(app,dbtop100richest2)  {

  dbtop100richest2.insert(list);

    app.get(API_BASE+"/top-richest/docs",(req,res)=> {
      res.redirect("https://documenter.getpostman.com/view/32912906/2sA35HXLnj");
    });

    app.get(API_BASE+"/top-richest/loadInitialData", (req, res) => {
      dbtop100richest2.find({}, (err, docs) => {
        if(err){
            res.sendStatus(500, "Internal Error");
        }else {
            if (docs.length === 0) {
                dbtop100richest2.insert(list);
                res.sendStatus(201, "Created");
            } else{
                res.sendStatus(409, "Conflict");
            }
        }
      });
    });



app.get(API_BASE + '/top-richest', (req, res) => {
  const queryParams = req.query;
  const limit = parseInt(queryParams.limit) || 20;
  const offset = parseInt(queryParams.offset) || 0;

  const filter = {};
  for (const key in queryParams) {
      if (key !== 'limit' && key !== 'offset' && queryParams.hasOwnProperty(key)) {
          const value = isNaN(queryParams[key]) ? queryParams[key] : parseFloat(queryParams[key]);
          filter[key] = value;
      }
  }

  dbtop100richest2.find(filter)
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

app.get(API_BASE+"/top-richest/:name", (req,res) => {
let personName = req.params.name;

dbtop100richest2.find( { name: personName }, (err,searchedPerson) => {
    if(err){
        res.sendStatus(404,"Company not found");
    } else {
        if(searchedPerson.length === 0){
            res.sendStatus(404,"Company not found");
        } else {
            const filteredResult = searchedPerson.map(person => {
                const { _id, ...rest } = person; // Remove _id field
                return rest; // Return object without _id field
            });
            res.send(filteredResult);
        }
    }
});
});


    app.post(API_BASE+"/top-richest", validarDatos, (req,res)=>{
        let person = req.body;

        dbtop100richest2.findOne({ name: person.name}, (err,existingPerson) => {
          if(err){
            res.sendStatus(500,"Internal Error");
          } else{
            if (existingPerson) {
              res.sendStatus(409, "Person already exists");
            } else{
              dbtop100richest2.insert(person, (err,newPerson) =>{
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

      app.post(API_BASE+"/top-richest/:name", (req,res) => {
        res.sendStatus(405, "Method not allowed");
      })
 
    
    app.delete(API_BASE + "/top-richest/:name", (req, res) => {
        let personToDelete = req.params.name;

        dbtop100richest2.remove({ "name": personToDelete }, {},(err,numRemoved) => {
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

    app.delete(API_BASE + "/top-richest", (req,res)=> {

      dbtop100richest2.remove({}, {multi : true }, (err,numRemoved) => {
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

    app.put(API_BASE+"/top-richest/:name", (req,res) => {
      let name = req.params.name;
      let newData = req.body;
  
      dbtop100richest2.update({"name": name}, {$set: newData}, (err,numUpdated) => {
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
      
    
    app.put(API_BASE+"/top-richest", (req,res) =>{
      res.sendStatus(405,"Method not allowed");
    });


    app.get(API_BASE+"/top-richest/:name/:nationality", (req,res) => {
      let name=req.params.name;
      let nationality=req.params.nationality;

      dbtop100richest2.find({"name":name, "nationality":nationality}, (err,info) => {
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

  app.put(API_BASE+"/top-richest/:name/:nationality", (req,res) => {
    const { name, nationality } = req.params;
    const nuevo = req.body;
  
    dbtop100richest2.find({ name, nationality }, (err, info) => {
      if (err) {
        res.sendStatus(500, "Internal Error");
      } else if (info.length === 0) {
        res.sendStatus(404, "Not Found");
      } else {
        dbtop100richest2.update({ name, nationality }, {$set: nuevo}, (err, numUpdated) => {
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

    app.delete(API_BASE+"/top-richest/:name/:nationality", (req,res) => {
      let name=req.params.name;
      let nationality=req.params.nationality;
  
      dbtop100richest2.remove( {"name":name, "nationality":nationality},{ multi: true },(err,numRemoved)=>{
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

 app.use('/proxy', function(req,res){
        let url= 'https://sos2324-22.ew.r.appspot.com/api/v2/top-richest';
        console.log('piped: ' + req.url);
        req.pipe(request(url)).pipe(res);
    });
    
    
};
export { LoadBackendTR2 };
