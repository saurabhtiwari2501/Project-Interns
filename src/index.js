const express = require('express')
const mongoose = require('mongoose')
const route = require('./route/route')

const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://prince9871:BZjeaWxY1uTLCefz@cluster0.pelsn1m.mongodb.net/group47Database', {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB Running"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log("Express Running on " + (process.env.PORT || 3000))
})
