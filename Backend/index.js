import express, { urlencoded } from "express";
import { PORT, URI } from "./config.js";
import mongoose from "mongoose";
import router from "./Router/todo.js";
import cors from "cors"
const app=express()

app.use(cors())
app.use(express.json())

app.use("/todo",router)
mongoose.connect(URI).then(()=>{
    console.log("mongodb is connected successfully ")
}).catch((error)=>{
    console.log("mongodb is not connected successfully",error)
})
app.listen(PORT,()=>{
    console.log(`server is running on the port of http://localhost:${PORT}`)
})