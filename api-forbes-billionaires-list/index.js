const API_BASE = '/api/v1';

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

    module.exports.list = lista;

module.exports = (app, dbForBillionaires) => {

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
        dbForBillionaires.find({}, (err, list) => {
            if (err) {
             res.sendStatus(500, 'Internal Error');
            } else {
                res.send(JSON.stringify(list.map((w) => {
                    delete w._id;
                    return w;
                }))); 
            }
        });
    });

    app.get(API_BASE + "/forbes-billionaires-list/:name", (req, res) => {
        let personName = req.params.name;

        dbForBillionaires.findOne({ name: personName }, (err, searchedPerson) => {
            if (err) {
                res.sendStatus(404,"Person not found");
            } else {
                res.send(JSON.stringify(searchedPerson));
            }
        })
    });

    app.post(API_BASE + "/forbes-billionaires-list/", (req, res) => {
        let person = req.body;

        dbForBillionaires.findOne({ name: person.name }, (err, existingPerson) => {
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

    app.delete(API_BASE + "/forbes-billionaires-list/:name", (req, res) => {
        let billionaireDeleted = req.params.name;

        dbForBillionaires.remove({ "name": billionaireDeleted }, {}, (err, numRemoved) => {
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

    app.put(API_BASE + "/forbes-billionaires-list/:name", (req, res) => {
        let nameToUpdate = req.params.name;
        let newData = req.body;

        dbForBillionaires.update({ name: nameToUpdate }, { $set: newData }, (err, numUpdated) => {
            if (err) {
                res.sendStatus(400, "Bad request");
            } else {
                if (numUpdated === 0) {
                    res.sendStatus(404, "Not found");
                } else {
                    res.sendStatus(200, "Ok");
                }
            }
        });
    });

    app.put(API_BASE + "/forbes-billionaires-list/:id", (req, res) => {
        let idToUpdate = req.params.id;
        let newData = req.body;

        dbForBillionaires.update({ _id: idToUpdate }, { $set: newData }, (err, numUpdated) => {
            if (err) {
                res.sendStatus(400, "Bad request");
            } else {
                if (numUpdated === 0) {
                    res.sendStatus(404, "Not found");
                } else {
                    res.sendStatus(200, "Ok");
                }
            }
        });
    });
}