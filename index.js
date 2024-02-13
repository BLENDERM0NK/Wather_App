import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;
const API_KEY = "7bfd80fdd0e938a24e2a6511a0fb4597"

const API_URL = "https://api.openweathermap.org/data/2.5/weather?"

app.get("/", (req,res)=>{

    res.render("index.ejs");
    // try {
    //     const result = await axios.get(API_URL);
    //     res.send(result.data.weather);
    // }catch (error){
    //     res.status(404)
    // }
    
});

app.post("/submit", async(req, res)=>{
    const city = (req.body["cityName"]);
    
    try{
        const result = await axios.get(API_URL + `q=${city}&units=metric&appid=${API_KEY}`)
        // res.render("index.ejs", {content: result.main.temp})
        // console.log(result.data.weather[main])
        const data = result.data.main.temp
        const temp_min = result.data.main.temp_min
        const temp_max = result.data.main.temp_max
        const feels_like = result.data.main.feels_like
        const pressure = result.data.main.pressure
        const humidity = result.data.main.humidity
        const wind_speed = result.data.wind.speed
        const todayDate = new Date();
        const visibility = result.data.visibility
        
        const country = result.data.sys.country
        var date = todayDate.getDate();
        var month = todayDate.getMonth() + 1;
        var year = todayDate.getFullYear();

        res.render("main.ejs", {content: data, temp_m: temp_min, temp_ma: temp_max, wind: wind_speed, City: city, feels_l: feels_like, Pressure: pressure, Humidity: humidity, date: date, month: month, year: year, country: country, visibility: visibility});
    }catch(error){
        res.status(404);
    }
});

app.post("/reset", (req,res)=>{
    res.render("index.ejs")
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});