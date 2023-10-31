const express=require("express")
const app=express();
const port=7000;
const path=require("path")
const geocode=require("./geocode")
const weather=require("./weather");

const publicpath = path.join(__dirname,"../public")
app.use(express.static(publicpath))
app.get("/",(req,resp)=>{
    resp.sendFile(path.join(__dirname,"../templetes/views"))
})
const viewpath=path.join(__dirname,"../templetes/views")
app.set("view engine","hbs")
app.set("views",viewpath)



app.get("/",(req,resp)=>{
    resp.render("index")
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})

app.get("/weather",(req,resp)=>{
    const city=req.query.location;
    geocode.getgeocode(city,(data,err)=>{
        if(err){
            console.log(err);
            return
        }
        weather.getweatherdata(data.lat,data.lng,(result,err)=>{
                resp.send({
                    city: result.city,
                    Lat : data.lat,
                    Lng : data.lng,
                    Temp : result.temp,
                    Pressure : result.pressure,
                    Humidity : result.humidity
                })
        });
    })
})