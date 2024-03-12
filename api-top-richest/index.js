const API_BASE = '/api/v1';

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

module.exports = (app, dbtop100richest) => {

    app.get(API_BASE + "/top-richest/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/32912906/2sA2xh3t5t");
    });

    // Ruta para cargar datos iniciales
    app.get(API_BASE + '/top-richest/loadInitialData', (req, res) => {
        dbtop100richest.find({}, (err, docs) => {
            if (err) {
                return res.status(500).send("Internal Error");
            }
            if (docs.length === 0) {
                dbtop100richest.insert(list);
                return res.status(201).send("Created");
            }
            return res.status(409).send("Conflict");
        });
    });

    // Método DELETE para eliminar todos los millonarios
    app.delete(API_BASE + '/top-richest', (req, res) => {
        dbtop100richest.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                return res.status(500).send("Internal Error");
            }
            if (numRemoved > 0) {
                return res.status(200).send("All millonarios deleted successfully");
            }
            return res.status(404).send("No millonarios found to delete");
        });
    });

    // Ruta para obtener a todos los millonarios o filtrar por diferentes campos
    app.get(API_BASE + '/top-richest', (req, res) => {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        // Crear un objeto de consulta con los parámetros de búsqueda disponibles
        const query = {};
        if (req.query.name) query.name = req.query.name;
        if (req.query.net_worth) query.net_worth = parseInt(req.query.net_worth);
        if (req.query.bday_year) query.bday_year = parseInt(req.query.bday_year);
        if (req.query.age) query.age = parseInt(req.query.age);
        if (req.query.nationality) query.nationality = req.query.nationality;

        dbtop100richest.find(query)
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .exec((err, resultList) => {
                if (err) {
                    return res.status(500).send('Internal Error');
                }
                res.send(JSON.stringify(resultList.map((p) => {
                    delete p._id;
                    return p;
                })));
            });
    });

// Método POST para agregar un nuevo millonario
app.post(API_BASE + '/top-richest', (req, res) => {
    const nuevoMillonario = req.body;

    // Verificar si el millonario ya existe en la base de datos
    dbtop100richest.findOne(nuevoMillonario, (err, millonarioExistente) => {
        if (err) {
            return res.status(500).send("Internal Error");
        }

        // Si el millonario existe en la base de datos, devolver un error 409 (Conflict)
        if (millonarioExistente) {
            return res.status(409).send("Millonario already exists");
        }

        // Si no existe, agregar el nuevo millonario a la base de datos
        dbtop100richest.insert(nuevoMillonario, (err, nuevoMillonarioInsertado) => {
            if (err) {
                return res.status(500).send("Internal Error");
            }
            res.status(201).send("Millonario added successfully");
        });
    });
});


// Método GET para obtener un millonario por su nombre
app.get(API_BASE + '/top-richest/:name', (req, res) => {
    const nombreMillonario = req.params.name;

    // Buscar el millonario por su nombre en la base de datos
    dbtop100richest.findOne({ name: nombreMillonario }, (err, millonario) => {
        if (err) {
            return res.status(500).send("Internal Error");
        }

        // Si el millonario no se encuentra, devolver un error 404 (Not Found)
        if (!millonario) {
            return res.status(404).send("Millonario not found");
        }

        // Si se encuentra, devolver el millonario
        res.json(millonario);
    });
});

// Método GET para obtener millonarios por país
app.get(API_BASE + '/top-richest/pais/:nationality', (req, res) => {
    const nationality = req.params.nationality;

    // Buscar millonarios por país en la base de datos
    dbtop100richest.find({ nationality }, (err, millonarios) => {
        if (err) {
            return res.status(500).send("Internal Error");
        }

        // Si no se encuentran millonarios para el país especificado, devolver un error 404 (Not Found)
        if (millonarios.length === 0) {
            return res.status(404).send("No millonarios found for the specified nationality");
        }

        // Devolver el conteo de millonarios y un mensaje con el conteo
        const count = millonarios.length;
        res.json({ message: `Se encontraron ${count} millonarios de ${nationality}`, millonarios });
    });
});


// Método PUT para actualizar un millonario por su nombre
app.put(API_BASE + '/top-richest/:name', (req, res) => {
    const nombreMillonario = req.params.name;
    const newData = req.body;

    // Validar que todos los campos requeridos estén presentes y bien escritos
    const camposRequeridos = ['name', 'net_worth', 'bday_year', 'age', 'nationality'];
    const camposIncorrectos = camposRequeridos.filter(campo => {
        if (!newData.hasOwnProperty(campo)) return true;
        if (campo === 'age' || campo === 'net_worth' || campo === 'bday_year') {
            return isNaN(newData[campo]);
        }
        return typeof newData[campo] !== 'string' || newData[campo].trim() === '';
    });

    // Si hay campos incorrectos, devolver un error 400 (Bad Request) indicando qué campos están incorrectos
    if (camposIncorrectos.length > 0) {
        return res.status(400).json({ error: `Los siguientes campos están incorrectos o faltan: ${camposIncorrectos.join(', ')}` });
    }

    // Convertir los campos numéricos de string a número
    newData.age = parseInt(newData.age);
    newData.net_worth = parseFloat(newData.net_worth);
    newData.bday_year = parseInt(newData.bday_year);

    // Actualizar el millonario en la base de datos
    dbtop100richest.update({ name: nombreMillonario }, { $set: newData }, {}, (err, numUpdated) => {
        if (err) {
            return res.status(500).send("Internal Error");
        }

        // Si no se encuentra el millonario, devolver un error 404 (Not Found)
        if (numUpdated === 0) {
            return res.status(404).send("Millonario not found");
        }

        res.status(200).send("Millonario updated successfully");
    });
});

// Método DELETE para eliminar un millonario por su nombre
app.delete(API_BASE + '/top-richest/:name', (req, res) => {
    const nombreMillonario = req.params.name;

    // Eliminar el millonario de la base de datos
    dbtop100richest.remove({ name: nombreMillonario }, {}, (err, numRemoved) => {
        if (err) {
            return res.status(500).send("Internal Error");
        }

        // Si no se encuentra el millonario, devolver un error 404 (Not Found)
        if (numRemoved === 0) {
            return res.status(404).send("Millonario not found");
        }

        res.status(200).send("Millonario deleted successfully");
    });
});

app.all(API_BASE+"/top-richest", (req,res) =>{
    res.sendStatus(405,"Method not allowed");
  });

};

