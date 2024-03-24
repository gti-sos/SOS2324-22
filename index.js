import bodyParser from "body-parser";
import express from "express";
import dataStore  from "nedb";
import {LoadBackendFP} from "./back/api-famous-people/index.js";
import {LoadBackendFB} from "./back/api-forbes-billonaires/index.js";
import {LoadBackendFBL} from "./back/api-forbes-billionaires-list/index.js";
import {LoadBackendTR} from "./back/api-top-richest/index.js";
import {handler} from "./front/build/handler.js"
import cors from "cors";

let app = express();


let dbFamouPeople = new dataStore();
let db = new dataStore();
let dbForBillionaires = new dataStore();
let dbtop100richest = new dataStore();


const PORT = (process.env.PORT || 10000);

app.use(cors());

app.use(bodyParser.json());
LoadBackendFP(app,dbFamouPeople);
LoadBackendFB(app,db); 
LoadBackendFBL(app,dbForBillionaires);
LoadBackendTR(app, dbtop100richest);

app.use(handler);

//app.use("/",express.static("./public"));


app.listen(PORT, ()=> {
    console.log(`server listening on ${PORT}`);
});




