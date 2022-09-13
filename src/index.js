const express = require('express')
const mongoose = require('mongoose')
const route = require('./route/route')

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://prince9871:BZjeaWxY1uTLCefz@cluster0.pelsn1m.mongodb.net/group47Database')
