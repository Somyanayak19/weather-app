import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import './WeatherDetails.css'
import Button from '@mui/material/Button';
import React from 'react';
import { WeatherInfo } from '../../model/WeatherInfo';
import { useNavigate, createSearchParams } from "react-router-dom";

interface WeatherDetailsProps {
     WeatherInfo: WeatherInfo;
}
const WeatherDetails = ({ WeatherInfo }: WeatherDetailsProps) => {
     const navigate = useNavigate();
     console.log("re-render");
     let date = new Date(WeatherInfo.dt * 1000 - WeatherInfo.timezone * 1000);
  date = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' })); // Convert to Date object
  
  const formattedDate = date.toLocaleString('en-US', {
    month: 'long',
    weekday: 'long',
    day: '2-digit', 
  });
     const checkEmpty = JSON.stringify(WeatherInfo) !== "{}";

   const openCityWeather = (city: string) => {
     navigate({pathname:"./weather",
       search: createSearchParams({
          city: city
       }).toString()},
     );
     }
 
     return (<div className='weather-details'>
          <h1>{WeatherInfo?.name}, {WeatherInfo?.sys?.country}
               <div style={{ fontSize: '20px' }}>  {formattedDate} </div>
               <div><WbCloudyIcon sx={{ fontSize: '30px', color: 'white' }} /> {WeatherInfo.main.temp} &deg;c</div></h1>
          <h3>{WeatherInfo?.weather[0]?.description} <div> Wind Speed: {WeatherInfo.wind.speed}m/s </div></h3>
          <Button variant="contained" onClick={()=>openCityWeather(WeatherInfo?.name)}>More Details</Button>
     </div>);

};


export default WeatherDetails;