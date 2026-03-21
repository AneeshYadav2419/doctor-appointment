
// import express from 'express'
// import dotenv from 'dotenv';
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import adminRouter from './routes/adminRoute.js'
// import doctorRouter from './routes/doctorRoute.js';
// import userRouter from './routes/userRoute.js';

// dotenv.config();


// //app config

// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()

// //middleware
// app.use(express.json())
// app.use(cors()) // used to connect frontend to backend

// //api endpoints

// app.use('/api/admin',adminRouter) // localhost:4000/api/admin/add-doctor
// app.use('/api/doctor',doctorRouter)
// app.use('/api/user',userRouter)


// app.get('/', (req,res) => {
//     res.send("API Working egt")
// })

// app.listen(port, () => console.log("Server Started", port))

import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'





// app config
const app = express()
const port = process.env.PORT || 4000


// connect services (parallel execution for speed)
await Promise.all([
  connectDB(),
  connectCloudinary()
])

// middlewares
app.use(express.json({ limit: '10kb' })) // prevent large payload attacks
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: '*', // production me specific origin use karo
  credentials: true
}))

// health check route (fast response)
app.get('/', (req, res) => {
  res.status(200).send("API Working 🚀")
})

// api routes
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// global error handler (reliability)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  })
})

// handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err)
  process.exit(1)
})

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})