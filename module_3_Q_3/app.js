const express = require ("express");
const app=express()
const port=7000
const path = require("path")

app.get("/",(req,resp)=>{
    resp.sendFile(path.join(__dirname,"index.html"));
})
app.get("*",(req,resp)=>{
    resp.send("Page not found")
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})
