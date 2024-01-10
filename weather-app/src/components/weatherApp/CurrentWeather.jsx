import React, { useRef, useState } from 'react';
import './CurrentWeather.css';
import search_icon from '../assets/search.png'
import snow_icon from '../assets/snow.png'
import rain_icon from '../assets/rain.png'
import wind_icon from '../assets/wind.png'
import clear_icon from '../assets/clear.png'
import humidity_icon from '../assets/humidity.png'
import drizzle_icon from '../assets/drizzle.png'
import cloud_icon from '../assets/cloud.png'


function CurrentWeather() {
  const [wIcon, setwIcon] =useState(clear_icon);
  const [humidity, setHumidity] =useState("-");
  const [wind, setWind] =useState("-");
  const [wTemp, setWtemp] =useState("-");
  const [wLocation, setLocation] =useState("-");
  let inputRef = useRef("");
  const api_key = "789aaaff5c475e8abe2904e7dc1ef116";
  const search = async ()=> {
    if(inputRef.current.value === ""){
      return alert("Type Your city name or zipcode");
    };
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
     setHumidity(Math.floor(data.main.humidity) + " %");
     setWind(Math.floor(data.wind.speed)+ " Km/h"); 
     setWtemp(Math.floor(data.main.temp)+ " °C");    
     setLocation(data.name);
   switch(data.weather[0].icon) {
      case "01n" || "01d":
        return setwIcon(clear_icon);
      case "02n" || "02d" ||"03n" || "03d" ||"04n" || "04d":
          return setwIcon(cloud_icon);
      case "09n" || "09d" ||"10n" || "10d" ||"11n" || "11d":
              return setwIcon(rain_icon);
      case "050n" || "50d":
          return setwIcon(drizzle_icon);    
      case "013n" || "013d":
          return setwIcon(snow_icon);
      default:
        return setwIcon(clear_icon);
    }
  }
 
  return (
    <div className='main'>
        <div className='top-bar'>
            <input ref={inputRef} className='search-bar' type='text' placeholder='Placeholder'></input>
            <div className='search-icon'>
                <img src={search_icon} alt='SearchIcon' onClick={search}/>
            </div>
        </div>
        <div className='element-container'>
          <div className="weather-image">
            <img src={wIcon} alt='weather'/>
          </div>
          <div className="weather-temp">{wTemp}</div>
          <div className="weather-location">{wLocation}</div>
          <div className="data-container">
            <div className="element">
              <img src={wind_icon} alt="Wind Icon" className="icon" />
              <div className="data">
                <div className="wind-speed">{wind}</div>
                <div className="text">Wind</div>
              </div>
            </div>
            <div className="element">
              <img src={humidity_icon} alt="Humidity" className="icon" />
              <div className="data">
                <div className="humidity-percent">{humidity}</div>
                <div className="text">Humidity</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CurrentWeather;
