
import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'

dotenv.config();


//app config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints

app.use('/api/admin',adminRouter)


app.get('/', (req,res) => {
    res.send("API Working egt")
})

app.listen(port, () => console.log("Server Started", port))