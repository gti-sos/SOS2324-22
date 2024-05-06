import bodyParser from "body-parser";
import express from "express";
import dataStore  from "nedb";
import {LoadBackendFP1} from "./back/api-famous-people/v1/index.js";
import {LoadBackendFP2} from "./back/api-famous-people/v2/index.js";
import {LoadBackendFB} from "./back/api-forbes-billonaires/v1/index.js";
import {LoadBackendFB2} from "./back/api-forbes-billonaires/v2/index.js";
import {LoadBackendFBL1} from "./back/api-forbes-billionaires-list/v1/index.js";
import {LoadBackendFBL2} from "./back/api-forbes-billionaires-list/v2/index.js";
import {LoadBackendTR} from "./back/api-top-richest/v1/index.js";
import {LoadBackendTR2} from "./back/api-top-richest/v2/index.js";
import {handler} from "./front/build/handler.js"
import cors from "cors";

let app = express();


let dbFamousPeople1 = new dataStore();
let dbFamousPeople2 = new dataStore();
let db = new dataStore();
let db2 = new dataStore();
let dbForBillionaires1 = new dataStore();
let dbForBillionaires2 = new dataStore();
let dbtop100richest = new dataStore();
let dbtop100richest2 = new dataStore();



const PORT = (process.env.PORT || 10000);

app.use(cors());

app.use(bodyParser.json());
LoadBackendFP1(app,dbFamousPeople1);
LoadBackendFP2(app,dbFamousPeople2);
LoadBackendFB(app,db); 
LoadBackendFB2(app,db2);
LoadBackendFBL1(app, dbForBillionaires1);
LoadBackendFBL2(app, dbForBillionaires2);
LoadBackendTR(app, dbtop100richest);
LoadBackendTR2(app, dbtop100richest2);

app.use(handler);



//app.use("/",express.static("./public"));


app.listen(PORT, ()=> {
    console.log(`server listening on ${PORT}`);
});
