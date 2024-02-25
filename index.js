let cool = require("cool-ascii-faces");
const { application } = require("express");

let express = require("express");

let app = express();

const PORT = (process.env.PORT || 10000);

app.use("/",express.static("./public"));

app.use("/samples/JRR", express.static("./samples/JRR"));

app.use("/samples/DTN",express.static("./samples/DTN"));

app.use("/samples/RGA",express.static("./samples/RGA"));

app.use("/samples/BVB",express.static("./samples/BVB"));

app.get("/cool", (req,res)=>{
    res.send(`<html><body><h1>${cool()}</h1><body><html>`);
});

app.listen(PORT, ()=> {
    console.log(`server listening on ${PORT}` );
});


