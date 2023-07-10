require('dotenv').config({path: '../key.env'})
const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public', 'register.html'))
})

app.get('/explorer', (req, res)=>{
    res.sendFile(path.join(path.join(__dirname, '../public', 'explorer.html')))
})

//Route to pass the google api key from dotenv
app.get('/googlekey', (req, res)=>{
    const key = {"key": process.env.GOOGLE_API_KEY}
    
    res.status(200).json(key)
})

app.listen(port, ()=>{
    console.log('Server running at port: '+port)
})