let cool = require("cool-ascii-faces");
const { application } = require("express");
let bodyParser = require("body-parser");
let express = require("express");

let app = express();

let DTN = require('./index-DTN');
let JRR = require('./index-JRR');

const PORT = (process.env.PORT || 10000);

app.use(bodyParser.json());

app.use("/",express.static("./public"));

app.use("/samples/JRR", express.static("./samples/JRR"));

app.get("/samples/DTN", (req,res) => {
  res.send(`<html><body><h1>${DTN.mediaBeneficio(DTN.lista)}</h1><body><html>`)
});

app.get("/samples/JRR", (req,res) => {
  res.send(`<html><body><h1>${JRR.calculaMedia(JRR.list)}</h1><body><html>`)
});

app.use("/samples/RGA",express.static("./samples/RGA"));

app.use("/samples/BVB", express.static("./samples/BVB"));

app.get("/cool", (req,res)=>{
    res.send(`<html><body><h1>${cool()}</h1><body><html>`);
});


const API_BASE = "/api/v1";

app.listen(PORT, ()=> {
    console.log(`server listening on ${PORT}` );
});


