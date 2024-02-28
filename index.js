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
  const media = DTN.mediaBeneficio(DTN.list);
  const listHTML = `<html><body><h1>Media de beneficio por pais</h1><ul>
  ${Object.entries(media).map(([country, value]) => `<li>${country}: ${value} Milion dollars</li>`).join('')}
  </ul></body></html>`;
  res.send(listHTML);
});

app.get("/samples/JRR", (req,res) => {
  const media = JRR.calculaMedia(JRR.famous_people);

  const listHTML = `<html><body><h1>Media de edad de muerte</h1><ul>
    ${Object.entries(media).map(([country, value]) => `<li>${country}: ${value} years</li>`).join('')}
    </ul></body></html>`;

  res.send(listHTML);
});

app.use("/samples/RGA",express.static("./samples/RGA"));

app.use("/samples/BVB", express.static("./samples/BVB"));

app.get("/cool", (req,res)=>{
    res.send(`<html><body><h1>${cool()}</h1><body><html>`);
});


const API_BASE = "/api/v1";

app.get(API_BASE+"/famous-people", (req,res)=>{
    if(JRR.famous_people.lenght == 0){
        JRR.famous_people.push();
    };
    res.send(JSON.stringify(JRR.famous_people));
});

app.listen(PORT, ()=> {
    console.log(`server listening on ${PORT}`);
});




