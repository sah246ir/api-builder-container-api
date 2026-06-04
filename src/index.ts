 
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import { corsHeaders } from "./Middlewares/cors-headers"; 
import { config } from "dotenv"; 
import { IndexRouter } from "./router";
import { Db, MongoClient } from "mongodb";
 
config()
const app = express() 
// initialize services
export const clients = (process.env.CLIENTS || "").split(",")
export const MONGO_URI = process.env.MONGO_URI || ""
export let client:Db;
export const Mongodb = new MongoClient(MONGO_URI,{ 
    serverSelectionTimeoutMS: 5000
})
app.use(cors({ 
    origin: clients,// array of client urls
    credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false })) 

// custom headers
app.use(corsHeaders);

// routes
app.use("", IndexRouter) 


 

// server listen
const server = app.listen(process.env.PORT, () => {
    console.log("server listening on http://localhost:"+process.env.PORT)
})

 
 


 
