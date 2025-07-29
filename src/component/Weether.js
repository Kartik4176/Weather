import React, { useState } from 'react';

import './Weether.css';
import { FaSearch,FaWind } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';

import { MdExplore } from 'react-icons/md';
import { MdMyLocation } from 'react-icons/md';
import { WiBarometer } from 'react-icons/wi';
import { WiDayHaze } from 'react-icons/wi';
import { WiSunrise, WiSunset } from 'react-icons/wi';
import { GiWaveSurfer } from 'react-icons/gi';
import { GiMountaintop } from 'react-icons/gi';
import { WiThermometerExterior } from 'react-icons/wi';
import { WiThermometer } from 'react-icons/wi';






const Weether = () => {



          // variable to store the city name.
    const [city, setCity] = useState('');

    // variable to store the weather bole to temperature.
    const [weather, setWeather] = useState( );

    const [error,setError] = useState('');


// History thing.
const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('weatherHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);



    const API_KEY ="3f2afdc86191296cbcd011f441a5d4e0";
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;


      let sunrise = '';
let sunset = '';

if (weather?.sys?.sunrise && weather?.sys?.sunset) {
  sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
     

   // This function update the city name as we enter something.
function handleOnChange(event){
  setCity(event.target.value);
  //console.log(event.target.value); // this will print the city name typed.
}


// Function to fetch the weather data from url then store in the response variable , then store in a output variable, if correct input is typed then output data is stored in a setWeather, and if wrong input is entered then setError will be called.
async function fetchData(){
  try {

    let response = await fetch(url);
    let output = await response.json();

    if(response.ok){
      setWeather(output);
      console.log(output);
      setError('');

      // history thing
        const updatedHistory = [city, ...history.filter((c) => c !== city)].slice(0, 5);
        setHistory(updatedHistory);
        localStorage.setItem('weatherHistory', JSON.stringify(updatedHistory));


    }else{
      console.log("Incorrect Data Typed");
      setError('No Data Found, Please enter correct detail')
    }
    
  } catch (error) {
    
  }
  
}



  return (




     


    <div className='container'>

        <video autoPlay muted loop className="background-video">
          <source src="/hii.mp4" type="video/mp4" />

        Your browser does not support the video tag.
      </video>


             







      <div className='city'>
        
         <input
          type='text'
          value={city}
          onChange={handleOnChange}
          placeholder='Enter Your City'
          
        />

        <button 
          onClick ={()=> fetchData()}>
            <FaSearch></FaSearch>
        </button>

        
        

      </div>

       <p className='error_mess'>{error}</p>


             
          


       {weather && weather.weather && weather.weather[0] &&
       <div className='content'>
          <div className='weather-image'>
           <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />

            <h3 className='desc'>{weather.weather[0].description}</h3>
          </div>

           <div className='weather_temp'>
             <h3 > {weather.main.temp}<span> °Cel</span></h3>
           </div>

           <div className='weather-city'>
              <div className='location'>
                <MdLocationOn></MdLocationOn>
              </div>
                <div>
                  <p>{weather.name},<span>{weather.sys.country}</span></p>
                </div>

           </div>

           <div className='weather_feel'>
               <p className='fe'>Feels Like</p>
               <p className='temp'>{weather.main.feels_like}<span>°C</span></p>

           </div>

            <div className='weather-stats'>

                <div className='wind'>
                   <div className='wind-icon'>
                    <FaWind></FaWind>
                   </div>
                   <h3 className='wind-speed'>{weather.wind.speed}<span> Km/hr</span></h3>
                   <h3 className='wind-heading'>Wind Speed</h3>
                </div>

                  
                  <div className='longitude'>
                   <div className='long-icon'>
                    <MdExplore></MdExplore>
                   </div>
                   <h3 className='long_data'>{weather.coord.lon}<span> °</span></h3>
                   <h3 className='long-heading'>LONGITUDE</h3>
                </div>

                    
                     <div className='latitude'>
                   <div className='lat-icon'>
                    <MdMyLocation></MdMyLocation>
                   </div>
                   <h3 className='lat_data'>{weather.coord.lat}<span> °</span></h3>
                   <h3 className='lat-heading'>LATITUDE</h3>
                </div>

                  
                  <div className='pre'>
                   <div className='pre-icon'>
                    <WiBarometer></WiBarometer>
                   </div>
                   <h3 className='pre_data'>{weather.main.pressure}<span> N/m²</span></h3>
                   <h3 className='lat-heading'>PRESSURE</h3>
                </div>
                  


                 <div className='humidity'>
                   <div className='humidity-icon'>
                    <WiHumidity></WiHumidity>
                   </div>
                   <h3 className='humidity-percentage'>{weather.main.humidity}<span> %</span></h3>
                   <h3 className='humidity-heading'>Humidity</h3>
                </div>
               
                 
                  <div className='visi'>
                   <div className='visi-icon'>
                    <WiDayHaze ></WiDayHaze >
                   </div>
                   <h3 className='visi_data'>{weather.visibility}<span> met</span></h3>
                   <h3 className='visi-heading'>VISIBILITY</h3>
                </div>
                     
 


                     <div className='rise'>
                   <div className='rise-icon'>
                    <WiSunrise ></WiSunrise >
                   </div>
                   <h3 className='rise_data'>{sunrise}<span></span></h3>
                   <h3 className='rise-heading'>SUN RISE</h3>
                </div>

                  <div className='set'>
                   <div className='set-icon'>
                    <WiSunset></WiSunset >
                   </div>
                   <h3 className='set_data'>{sunset}<span></span></h3>
                   <h3 className='rise-heading'>SUN SET</h3>
                </div>


                   <div className='sea'>
                   <div className='sea-icon'>
                    <GiWaveSurfer></GiWaveSurfer >
                   </div>
                   <h3 className='sea_data'>{weather.main.sea_level}<span> hPa</span></h3>
                   <h3 className='sea-heading'>SEA LEVEL</h3>
                </div>


                   <div className='grou'>
                   <div className='grou-icon'>
                    <GiMountaintop></GiMountaintop >
                   </div>
                   <h3 className='grou_data'>{weather.main.grnd_level}<span> hPa</span></h3>
                   <h3 className='grou-heading'>GROUND LEVEL</h3>
                </div>
      

                      
                   <div className='min'>
                   <div className='min-icon'>
                    <WiThermometerExterior></WiThermometerExterior >
                   </div>
                   <h3 className='min_data'>{weather.main.temp_min}<span> °C</span></h3>
                   <h3 className='min-heading'>MINIMUM </h3>
                </div>
               

                        <div className='max'>
                   <div className='max-icon'>
                    <WiThermometer></WiThermometer >
                   </div>
                   <h3 className='max_data'>{weather.main.temp_max}<span> °C</span></h3>
                   <h3 className='max-heading'>MAXIMUM </h3>
                </div>




        
<div className="history-toggle">
        <button onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
      </div>

      {showHistory && (
        <div className="search-history">
          <h3>Recent Searches:</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index} onClick={() => setCity(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}






            </div>
       </div>
       }
    </div>





  )
}

export default Weether
