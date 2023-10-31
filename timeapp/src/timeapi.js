const axios = require("axios")

const gettimedata=(city,callback)=>{
const url=`https://api.ipgeolocation.io/timezone?apiKey=0e6012fd393a4b62ba4fe07b356a23bc&location=${city}`
axios.get(url).then(result=>{
    const dt=result.data
    const dt1=result.data.geo
    const city=dt1.location;
    const timezone=dt.timezone;
    const date=dt.date;
    const time=dt.time_12;
    callback({city,timezone,date,time})
}).catch(err=>{
    callback({undefined,err})
})
}

module.exports={gettimedata}