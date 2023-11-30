import { PORT,mongodburl } from "./Config/config.js";
import { Book } from "./Models/bookmodels.js";
import cors from "cors"
import express from "express";
import mongoose from "mongoose";
import booksroutes from "./Routes/Bookroutes.js"
const app = express();
app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
    res.status(200).send('hi bro welcome to the servers')
})

app.use('/booksdata',booksroutes)

mongoose.connect(mongodburl).then(()=>{
    console.log("connect with database")
    app.listen(PORT,()=>{
        console.log('server is created')
    })
}).catch((error)=>{
console.log(error)
})


