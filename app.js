import Express  from "express";
const app=Express();
import https from "https";
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from "body-parser";
// 👇️
const __filename = fileURLToPath(import.meta.url);
console.log(__filename)

// Path
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);
const dirPath=path.join(__dirname ,"index.html");


//  Handling Get request 
app.get("/",function(req,res){
    res.sendFile(dirPath);
})
app.use(bodyParser.urlencoded({extended:true}));
// Handling Post request 
app.post("/",function(req,res){

    console.log("Post received");
    const query=req.body.cityName;
    console.log(query);
    const apiKey="185ab5df1e3ed3e344716805c324d51d";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+"";

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData= JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDesc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather currently: "+weatherDesc+".</p>");
            res.write("<h1>The temperature in "+query+" is "+temp+" degree celsius. </h1>");
            console.log("<img src="+imageURL+">");
            res.write("<img src="+imageURL+">");
            res.send();
        })
   })
})
app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
/*
    
   */