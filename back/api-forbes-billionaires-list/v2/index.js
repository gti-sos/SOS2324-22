const API_BASE = '/api/v2';

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


function validarDatos(req, res, next) {
    const json = req.body;

    const esquema = {
        'rank': 'number',
        'name': 'string',
        'net_worth': 'number',
        'age': 'number',
        'country': 'string',
        'source': 'string',
        'industry': 'string',
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
        console.error(`There are missing keys: ${missingKeys.join(', ')}`);
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

function LoadBackendFBL2(app, dbForBillionaires) {

    dbForBillionaires.insert(lista);

    app.get(API_BASE + '/forbes-billionaires-list/loadInitialData', (req, res) => {
        dbForBillionaires.find({}, (err, docs) => {
            if (err) {
                res.sendStatus(500, "Internal Error");
            } else {
                if (docs.length === 0) {
                    dbForBillionaires.insert(lista);
                    res.sendStatus(201, "Created");
                } else {
                    res.sendStatus(409, "Conflict");
                }
            }
        });
    });

    app.get(API_BASE + '/forbes-billionaires-list', (req, res) => {
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

        dbForBillionaires.find(filter)
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


    app.get(API_BASE + "/forbes-billionaires-list/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/26204506/2sA35HXLnk");
    });

    app.get(API_BASE + "/forbes-billionaires-list/:rank", (req, res) => {
        let rank = parseInt(req.params.rank);

        dbForBillionaires.findOne({ rank: rank }, { _id: 0 }, (err, searchedPerson) => {
            if (err || !searchedPerson) {
                res.sendStatus(404, "Person not found");
            } else {
                res.send(searchedPerson);
            }
        })
    });

    app.post(API_BASE + "/forbes-billionaires-list/",validarDatos, (req, res) => {
        let person = req.body;

        dbForBillionaires.findOne({ rank: person.rank }, (err, existingPerson) => {
            if (err) {
                res.sendStatus(500, "Internal Error");
            } else {
                if (existingPerson) {
                    res.sendStatus(409, "Person already exists");
                } else {
                    dbForBillionaires.insert(person, (err, newPerson) => {
                        if (err) {
                            res.sendStatus(500, "Internal Error");
                        } else {
                            res.sendStatus(201, "Ok");
                        }
                    });
                }
            }
        });
    });

    app.post(API_BASE + "/forbes-billionaires-list/:name", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    })

    app.delete(API_BASE + "/forbes-billionaires-list/:rank", (req, res) => {
        let rank = parseInt(req.params.rank);

        dbForBillionaires.remove({ rank : rank }, {}, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500, "Internal Error");
            } else {
                if (numRemoved >= 1) {
                    res.sendStatus(200, "Ok");
                } else {
                    res.sendStatus(404, "Not found");
                }
            }
        });
    });

    app.delete(API_BASE + "/forbes-billionaires-list", (req, res) => {
        dbForBillionaires.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                res.sendStatus(500, "Internal Error");
            } else {
                if (numRemoved >= 1) {
                    res.sendStatus(200, "All removed");
                } else {
                    res.sendStatus(404, "Person not found");
                }
            }
        });
    });

    app.put(API_BASE + "/forbes-billionaires-list", (req, res) => {
        res.sendStatus(405, "Method not allowed");
    });

    app.put(API_BASE + "/forbes-billionaires-list/:rank", validarDatos, (req, res) => {
        let rank = parseInt(req.params.rank);
        let newData = req.body;

        dbForBillionaires.findOne({ rank: rank }, (err, billionaire) => {
            if (err) {
                return res.sendStatus(500);
            }

            if (!billionaire) {
                return res.sendStatus(404);
            }

            if (newData.rank && newData.rank !== rank) {
                return res.sendStatus(400);
            }

            dbForBillionaires.update({ rank: rank }, { $set: newData }, {}, (err, numUpdated) => {
                if (err) {
                    return res.sendStatus(500);
                }

                if (numUpdated === 0) {
                    return res.sendStatus(404);
                }

                dbForBillionaires.findOne({ rank: rank }, { _id: 0 }, (err, updatedBillionaire) => {
                    if (err) {
                        return res.sendStatus(500);
                    }
                    res.status(200).json(updatedBillionaire);
                });
            });
        });
    });
    
}
export {LoadBackendFBL2,lista};