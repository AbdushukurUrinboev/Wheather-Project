let express = require("express");
let https = require("https");
let bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")


});
app.post("/", function (req, res) {
    let query = req.body.cityName;
    let apiKey = "e72ca729af228beabd5d20e3b7749713";
    let unit = "metric";
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            let weatherData = JSON.parse(data);
            let temp = weatherData.main.temp;
            let weatherDescription = weatherData.weather[0].description;
            let icon = weatherData.weather[0].icon;
            let imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p> The weather is currently " + weatherDescription + "</p>");
            res.write("<h1> The temperature in "+ query +" is  " + temp + "degrees Celcius</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server is working");

});