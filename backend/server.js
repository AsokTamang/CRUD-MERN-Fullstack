import express from 'express'
import dotenv from 'dotenv'
import { productRouter } from './routes/productroute.js'
import path from 'path'



import {conDB} from "./config/db.js"



dotenv.config()     //this code helps us to access the datas or any secret keys inside the dotenv file.


const app=express()
const PORT=process.env.PORT
const __dirname=path.resolve();


app.use(express.json())  //this code allows us to recieve the data from the req.body into json format.


app.use('/api/products',productRouter)    //here we are using the productrouter to handle all the route functioanlity which is in the file called productroute.js
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'frontend','dist')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
    })
}
app.listen(PORT,()=>{
    conDB();   //this is function that is used for connecting our backend server to our mongoDb.
    console.log('server is connected.')})

