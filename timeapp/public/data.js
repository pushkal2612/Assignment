
const gettimedata=()=>{
    const cityname=document.getElementById("cityname").value
    fetch("/timezone?location="+cityname).then(result=>{
        return result.json()
       
    }).then(data=>{
         city.innerHTML=data.city
        timezone.innerHTML=data.timezone
         date.innerHTML=data.date
         time.innerHTML=data.time
        
    }).catch(err=>{
        console.log(err);
    }).innerHTML
}