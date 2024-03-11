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
    app.get(API_BASE + "/top-richest/loadInitialData", (req, res) => {
        // Insertar la lista inicial en la base de datos dbtop100richest
        dbtop100richest.find({}, (err, docs) => {
            if (err) {
                res.sendStatus(500).send("Internal Error");
            } else {
                if (docs.length === 0) {
                    dbtop100richest.insert(list);
                    res.sendStatus(201).send("Created");
                } else {
                    res.sendStatus(409).send("Conflict");
                }
            }
        });
    });

    // Ruta para obtener a todos los millonarios
    app.get(API_BASE + '/top-richest', (req, res) => {
        // Obtener la lista de millonarios desde la base de datos dbFamouPeople
        dbtop100richest.find({}, (err, listaMillonarios) => {
            if (err) {
                res.sendStatus(500).send('Error interno');
            } else {
                res.json(listaMillonarios);
            }
        });
    });

    app.get(API_BASE + '/top-richest', (req, res) => {
        const limit = req.query.limit || 10; // Número predeterminado de elementos por página
        const offset = req.query.offset || 0;

        dbtop100richest.find({})
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .exec((err, list) => {
                if (err) {
                    res.sendStatus(500).send("Internal Error");
                } else {
                    res.send(JSON.stringify(list.map((p) => {
                        delete p._id;
                        return p;
                    })));
                }
            });
    });

    // Ruta para agregar un nuevo millonario
    app.post(API_BASE + '/top-richest', (req, res) => {
        const nuevoMillonario = req.body;

        // Verificar si el millonario ya existe en la lista
        if (list.some(m => m.name === nuevoMillonario.name)) {
            res.status(409).send('El millonario ya existe');
        } else {
            list.push(nuevoMillonario);
            res.status(201).send('Millonario creado');
        }
    });

    // Ruta para actualizar un millonario por nombre
    app.put(API_BASE + '/top-richest/:nombre', (req, res) => {
        const millonarioActualizado = req.body;
        const nombreMillonario = req.params.nombre;

        // Encontrar el índice del millonario con el nombre especificado
        const indiceActualizar = list.findIndex(m => m.name === nombreMillonario);

        // Verificar si el nombre en la URL coincide con el nombre en los datos
        if (nombreMillonario !== millonarioActualizado.name) {
            res.status(400).send('El nombre en la URL no coincide con el nombre en los datos');
        } else if (indiceActualizar !== -1) {
            // Actualizar el millonario
            list[indiceActualizar] = millonarioActualizado;
            res.status(200).send('Millonario actualizado exitosamente');
        } else {
            // Millonario no encontrado
            res.status(404).send('Millonario no encontrado');
        }
    });

    // Ruta para eliminar un millonario por nombre
    app.delete(API_BASE + '/top-richest/:nombre', (req, res) => {
        const nombreMillonario = req.params.nombre;

        // Buscar el índice del millonario por su nombre
        const indiceEliminar = list.findIndex(m => m.name === nombreMillonario);

        if (indiceEliminar !== -1) {
            // Si se encuentra el millonario, eliminarlo de la lista
            list.splice(indiceEliminar, 1);
            res.status(200).send('Millonario eliminado exitosamente');
        } else {
            // Si no se encuentra el millonario, devolver un error 404
            res.status(404).send('Millonario no encontrado');
        }
    });

    app.delete(API_BASE + "/famous-people", (req, res) => {
        dbFamousPeople.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500).send("Internal Error");
            } else {
                if (numRemoved >= 1) {
                    res.sendStatus(200).send("All removed");
                } else {
                    res.sendStatus(404).send("Person not found");
                }
            }
        });
    });

    // Ruta para manejar métodos no permitidos
    app.all(API_BASE + '/top-richest', (req, res) => {
        res.status(405).send('Método no permitido');
    });
};
