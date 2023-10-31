const axios=require("axios")

const getweatherdata=(lat,lng,callback)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=2efcb1475da327f09164daaace231821&units=metric`

    axios.get(url).then(result=>{
        const dt=result.data.main;
        const temp=dt.temp;
        const pressure = dt.pressure;
        const humidity = dt.humidity;
        const city = result.data.name;
        callback({city,temp,pressure,humidity})
    }).catch(err=>{
        callback(undefined,err)
    })
}
module.exports={getweatherdata}