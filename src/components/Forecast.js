import React from "react";

const Forecast=({data})=>{
    const date = new Date(data.dt*1000).toLocaleDateString()

    return(
        <div className="forecast-card">
            <p>{date}</p>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}/>

            <p>{data.main.temp}°C</p>
            <p>{data.weather[0].main}</p>
        </div>
    )
}

export default Forecast
