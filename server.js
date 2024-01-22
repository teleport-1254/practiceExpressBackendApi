require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutsRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express()

// middlewares -------
// middleware to access req in routes
app.use(express.json())

// logs all req
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
// -----------

// routes
app.use('/api/workouts', workoutsRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // async
        // do something when connected
        
        // listen for requests.
        app.listen(process.env.PORT, () => {
            console.log(`connected to db. \nlistening on port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error)
    })