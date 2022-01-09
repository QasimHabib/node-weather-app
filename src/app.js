const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const path = require('path')
const hbs= require('hbs')
//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))
console.log(path.join(__dirname, '../templates/partials'))
const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //customizing the views directory
hbs.registerPartials(partialsPath)

// configure the static publicDirectoryPath
app.use(express.static(publicDirectoryPath)) 


//hbs.registerPartial(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Qasim Habib"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Page",
        name: "Qasim Habib"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        name: "Qasim Habib",
        info: "This is some kind of helping page"
    })
})

app.get('/weather',  (req, res) => {
    if(! req.query.address){
       return res.send({
            error: "You must enter an address"
        })
    }

        geocode(req.query.address, (error, {latitude, longitude, location} ={})=> { //{data is destructured} "otherwise =>" (error, data)=>{data.latitude}     /   ={} Es6 default function parameter bcs ew cant't destructured an undefined
            if(error){
                return res.send({
                    error: error
                })          //write return beacuse if error occur we want to terminate the callback function here
            }
        
            forecast(latitude, longitude, (error, forecastData)=> { //data.latitude
               if(error){
                return res.send({
                    error: error
                })
               }
               return res.send({
                   address: req.query.address,
                   forecastt: forecastData,
                   location: location
               })
            })
        })
   
})

app.get('/help/*', (req, res) => {
   res.render('404',{
       title: "404",
       name: "Qasim Habib",
       errorMessage: "Help aricle not found"
   })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: "404",
        name: "Qasim Habib",
        errorMessage: "Page not found"
    })
})



app.listen(3001, ()=>{
    console.log("App is listening on port 3001")
})