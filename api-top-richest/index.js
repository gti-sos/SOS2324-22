const API_BASE = '/api/v1';

module.exports = (app, dbtop100richest) => {

    app.get(API_BASE + "/forbes-billionaires/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/32912906/2sA2xh3t5t");
    });

    // Ruta para cargar datos iniciales
    app.get(API_BASE + "/top-richest/loadInitialData", (req, res) => {
        // Insertar la lista inicial en la base de datos dbtop100richest
          if (docs.length === 0) {
              db.insert(lista);
              res.sendStatus(201, "Created");
          } else{
              res.sendStatus(409, "Conflict");
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
    app.get(API_BASE +'/top-richest', (req, res) => {
        const limit = req.query.limit || 10; // Número predeterminado de elementos por página
        const offset = req.query.offset || 0;

        dbtop100richest.find({})
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .exec((err, list) => {
                if (err) {
                    res.sendStatus(500, "Internal Error");
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

    // Ruta para manejar métodos no permitidos
    app.all(API_BASE + '/top-richest', (req, res) => {
        res.status(405).send('Método no permitido');
    });

    //search by name
    app.get(API_BASE + "/top-richest/name/:name", (req, res) => {
        let personName = req.params.name;

        dbtop100richest.findOne({ name: personName }, (err, searchedPerson) => {
            if (searchedPerson) {
                res.send(JSON.stringify(searchedPerson));
            } else {
                res.sendStatus(404).send("Person not found");
            }
        });
    });

    //search by net worth
    app.get(API_BASE + "/top-richest/net_worth/:net_worth", (req, res) => {
        let netWorth = req.params.net_worth;

        dbtop100richest.findOne({ net_worth: parseInt(netWorth) }, (err, searchedPerson) => {
            if (searchedPerson) {
                res.send(JSON.stringify(searchedPerson));
            } else {
                res.sendStatus(404).send("Person not found");
            }
        });
    });

    //search by birth year
    app.get(API_BASE + "/top-richest/birth_year/:birth_year", (req, res) => {
        let birthYear = req.params.birth_year;

        dbtop100richest.findOne({ bday_year: parseInt(birthYear) }, (err, searchedPerson) => {
            if (searchedPerson) {
                res.send(JSON.stringify(searchedPerson));
            } else {
                res.sendStatus(404).send("Person not found");
            }
        });
    });

    //search by age
    app.get(API_BASE + "/top-richest/age/:age", (req, res) => {
        let age = req.params.age;

        dbtop100richest.findOne({ age: parseInt(age) }, (err, searchedPerson) => {
            if (searchedPerson) {
                res.send(JSON.stringify(searchedPerson));
            } else {
                res.sendStatus(404).send("Person not found");
            }
        });
    });

    //search by nationality
    app.get(API_BASE + "/top-richest/nationality/:nationality", (req, res) => {
        let nationality = req.params.nationality;

        dbtop100richest.findOne({ nationality: nationality }, (err, searchedPerson) => {
            if (searchedPerson) {
                res.send(JSON.stringify(searchedPerson));
            } else {
                res.sendStatus(404).send("Person not found");
            }
        });
    });
}
