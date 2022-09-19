const express = require('express')
const mongoose = require('mongoose')
const route = require('./route/route')

const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://Saurabh-FunctionUp:SAURABHtiwari2501@cluster0.ppnw4vg.mongodb.net/PROJECT-INTERNDATA', {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB Running is on terminal"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log("Express Running on " + (process.env.PORT || 3000))
})
