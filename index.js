let cool = require("cool-ascii-faces");

let express = require("express");

let app = express();

app.use("/",express.static("./public"));


app.get("/cool", (req,res)=>{
    res.send(`<html><body><h1>${cool()}</h1><body><html>`);
});