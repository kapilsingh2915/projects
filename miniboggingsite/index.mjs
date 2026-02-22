import express from 'express';
import mongoose from 'mongoose';
import { URI,PORT } from './config.mjs';
import router from './src/route.mjs';
const app= express();
app.use(express.json());
mongoose.connect(URI).then(()=>console.log("database connected successfully")).catch((err)=>console.log(err));
app.use('/',router);
app.listen(PORT||8080,()=>{
    console.log(`Server is running on PORT : ${PORT||8080}`)
})