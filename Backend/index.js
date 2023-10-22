require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
const connection = async () => {
    
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
      });
      console.log("database connected successfully");
      app.listen(process.env.PORT, () => {
        console.log(`server running to por`,process.env.PORT);
      });
    } catch (error) {
      console.log(`something wrong in database server`);
      console.log("error", error);
    }
  };
  connection();
  