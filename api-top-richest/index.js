

const API_BASE = '/api/v1';


// Lista de millonarios inicial
let list = [
    { name: 'Elon Musk', net_worth: 240, bday_year: 1971, age: 51, nationality: 'Sudáfrica' },
    { name: 'Jeff Bezos', net_worth: 150, bday_year: 1964, age: 58, nationality: 'Estados Unidos de América' },
    { name: 'Gautam Adani', net_worth: 138, bday_year: 1962, age: 60, nationality: 'India' },
    { name: 'Bernard Arnault', net_worth: 135, bday_year: 1949, age: 73, nationality: 'Francia' },
    { name: 'Bill Gates', net_worth: 118, bday_year: 1966, age: 66, nationality: 'Sudáfrica' },
    { name: 'Larry Page', net_worth: 100, bday_year: 1973, age: 49, nationality: 'Estados Unidos de América' },
    { name: 'Sergey Brin', net_worth: 96, bday_year: 1973, age: 48, nationality: 'Sudáfrica' },
    { name: 'Steve Ballmer', net_worth: 94, bday_year: 1956, age: 66, nationality: 'Estados Unidos de América' },
    { name: 'Larry Ellison', net_worth: 93, bday_year: 1944, age: 78, nationality: 'Estados Unidos de América' },
    { name: 'Mukesh Ambani', net_worth: 89, bday_year: 1957, age: 65, nationality: 'India' },
    { name: 'Carlos Slim Helu', net_worth: 72, bday_year: 1940, age: 82, nationality: 'México' }
];


module.exports = (app, dbtop100richest) => {


    // Ruta para cargar datos iniciales
    app.get(API_BASE + '/loadInitialData', (req, res) => {
        // Insertar la lista inicial en la base de datos dbtop100richest
        dbtop100richest.insert(list);
        res.sendStatus(200, 'Ok');
    });

    // Ruta para obtener a todos los famosos
    app.get(API_BASE + '/top-richest', (req, res) => {
        // Obtener la lista de famosos desde la base de datos dbFamouPeople
        dbtop100richest.find({}, (err, list) => {
            if (err) {
                res.sendStatus(500, 'Error interno');
            } else {
                res.send(JSON.stringify(list));
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

    // Ruta para actualizar un millonario por ID
    app.put(API_BASE + '/top-richest/:id', (req, res) => {
        const millonarioActualizado = req.body;
        const idParam = parseInt(req.params.id);

        // Encontrar el índice del millonario con el ID especificado
        const indiceActualizar = list.findIndex(m => m.id === idParam);

        // Verificar si el ID en la URL coincide con el ID en los datos
        if (idParam !== millonarioActualizado.id) {
            res.status(400).send('El ID en la URL no coincide con el ID en los datos');
        } else if (indiceActualizar !== -1) {
            // Actualizar el millonario
            list[indiceActualizar] = millonarioActualizado;
            res.status(200).send('Millonario actualizado exitosamente');
        } else {
            // Millonario no encontrado
            res.status(404).send('Millonario no encontrado');
        }
    });

    // Ruta para eliminar un millonario por ID
    app.delete(API_BASE + '/top-richest/:id', (req, res) => {
        const idParam = parseInt(req.params.id);
        const indiceEliminar = list.findIndex(m => m.id === idParam);

        if (indiceEliminar !== -1) {
            list.splice(indiceEliminar, 1);
            res.status(200).send('Millonario eliminado exitosamente');
        } else {
            res.status(404).send('Millonario no encontrado');
        }
    });

    // Ruta para manejar métodos no permitidos
    app.all(API_BASE + '/top-richest', (req, res) => {
        res.status(405).send('Método no permitido');
    });

}
