const express = require('express');
const https = require('https'); //native node modules, so no need to install, comes with node 
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
//we need to make a GET request to the openweatherMap's server(external server) 
//and fetch the data back as JSON and parse to get the relevant data


app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.post('/', function (req, res) {
    const query = req.body.cityName;
    const apiKey = "131d0084f4b9b07b58412f5acb88aae5"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?&q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function (response) {

        response.on("data", function (data) {
            const WeatherData = JSON.parse(data);
            const temp = WeatherData.main.temp;
            const weatherDesc = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + query+" is " + temp + " degrees celcius.</h1>");
            res.write("<p>The Weather is currently: " + weatherDesc + "</p>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    });
});


        //     const object ={
        //         name: "Sambhavi",
        //         favouriteFood : "Chicken"
        //     } 
        //     console.log(JSON.stringify(object));
        //})



        //})
        //res.send("Server is up and running");  
        //})


        app.listen(3000, function () {
            console.log("The server is running at port 3000");
        })