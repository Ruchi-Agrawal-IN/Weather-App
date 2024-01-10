import React, { useState } from 'react';
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
  const [wIcon, setwIcon] =useState(clear_icon)
  const api_key = "789aaaff5c475e8abe2904e7dc1ef116";

  const search = async ()=> {
    const searchElement = document.getElementsByClassName('search-bar');
    if(searchElement[0].value === "") return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchElement[0].value}&units=metric&appid=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    humidity[0].innerHTML = Math.floor(data.main.humidity) + " %";
    
    const wind = document.getElementsByClassName("wind-speed");
    wind[0].innerHTML = Math.floor(data.wind.speed)+ " Km/h";
    
    const wTemp = document.getElementsByClassName("weather-temp");
    wTemp[0].innerHTML =  Math.floor(data.main.temp)+ " °C";
    
    const wLocation = document.getElementsByClassName("weather-location");
    wLocation[0].innerHTML = data.name;

   const wcode = data.weather[0].icon;
 if(wcode === "01n" ||wcode ===  "01d"){
      setwIcon(clear_icon);
    }else if(wcode === "02n" || wcode ===  "02d" || wcode === "03n" ||wcode ===  "03d" || wcode === "04n" ||wcode ===  "04d"){
      setwIcon(cloud_icon);
    }else if(wcode === "09n" || wcode ===  "09d" || wcode === "10n" ||wcode ===  "10d" || wcode === "11n" ||wcode ===  "11d"){
      setwIcon(rain_icon);
    }else if(wcode === "50n" || wcode ===  "50d"){
      setwIcon(drizzle_icon);
    }else if(wcode === "13n" || wcode ===  "13d"){
      setwIcon(snow_icon);
    }else{
      setwIcon(clear_icon);
    }
  //  switch(data.weather[0].icon) {
  //     case "01n" || "01d":
  //       return setwIcon(clear_icon);
  //     case "02n" || "02d" ||"03n" || "03d" ||"04n" || "04d":
  //         return setwIcon(cloud_icon);
  //     case "09n" || "09d" ||"10n" || "10d" ||"11n" || "11d":
  //             return setwIcon(rain_icon);
  //     case "050n" || "50d":
  //         return setwIcon(drizzle_icon);    
  //     case "013n" || "013d":
  //         return setwIcon(snow_icon);
  //     default:
  //       return setwIcon(clear_icon);
        
  //   }
 
  }
  
 
  return (
    <div className='main'>
        <div className='top-bar'>
            <input  className='search-bar' type='text' placeholder='Placeholder'></input>
            <div className='search-icon'>
                <img src={search_icon} alt='SearchIcon' onClick={search}/>
            </div>
        </div>
        <div className='element-container'>
          <div className="weather-image">
            <img src={wIcon} alt='weather'/>
          </div>
          <div className="weather-temp">24 °C</div>
          <div className="weather-location">London</div>
          <div className="data-container">
            <div className="element">
              <img src={wind_icon} alt="Wind Icon" className="icon" />
              <div className="data">
                <div className="wind-speed">6 Km/h</div>
                <div className="text">Wind</div>
              </div>
            </div>
            <div className="element">
              <img src={humidity_icon} alt="Humidity" className="icon" />
              <div className="data">
                <div className="humidity-percent">64%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CurrentWeather;
