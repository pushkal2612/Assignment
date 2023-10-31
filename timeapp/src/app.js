const express=require("express")
const app=express();
const port=7000;
const path=require("path")
const time=require("./timeapi")

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})
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

app.get("/timezone",(req,resp)=>{
    const city=req.query.location;
    
        time.gettimedata(city,(result,err)=>{
                resp.send({
                    city: result.city,
                    timezone : result.timezone,
                    date : result.date,
                    time : result.time,
                })
        });
    
})