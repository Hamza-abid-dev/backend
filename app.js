const express = require('express')
const colors = require('colors')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./Routes/AuthRoutes')
const app = express()
require('dotenv').config()
app.use(cors())
app.use(express.json())
const database = async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_)
       console.log('database connection established'.bgGreen)
    } catch (error) {
        console.log(`database connection error: ${error}`.bgRed)
    }
}
database()
app.use('/user/login', router)
PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server in running at ${PORT}`.bgBlue)
})