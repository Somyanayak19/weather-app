import { useNavigate, useSearchParams } from 'react-router-dom';
import './CityWeatherInfo.css'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RecentSearches } from '../../model/RecentSearch';
import { WeatherInfo } from '../../model/WeatherInfo';
import { useState, useEffect } from 'react';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import Grid from '@mui/material/Grid';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';

const CityWeatherInfo = () => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', ]
    const navigate = useNavigate();
    const [city] = useSearchParams();
    const recentSearches = useSelector((state: RecentSearches) => state.recentSearches.list);
    let formattedDate;
    useEffect(() => {
        if (recentSearches.length === 0) {
            navigate('/');
        }
    }, [recentSearches]);
    const [weatherDetails, setWeatherDetails] = useState(recentSearches.find((search: WeatherInfo) => search.name === city.get('city')));
    console.log("searchParams", city.get('city'));
    console.log("weatherDetails", weatherDetails);
    const element = document.getElementById('grid-conatiner');
    if (element) {
        element.style.backgroundColor = "#623ffc";
    }
    if(weatherDetails){
    let date = new Date(weatherDetails.dt * 1000 - weatherDetails.timezone * 1000);
    date = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' })); // Convert to Date object
    
     formattedDate = date.toLocaleString('en-US', {
      month: 'long',
      weekday: 'long',
      day: '2-digit', 
    });
}
    return (
        <Grid container className="city-weather-details" spacing={2} style={{ height: '100%', marginLeft: '0px' }}>
            <Grid item xs={6} >
                <div style={{ paddingTop: '8%' }}>
                    <ThunderstormIcon sx={{ fontSize: '20vh' }}></ThunderstormIcon>
                    <h1>{weatherDetails?.main?.temp} &deg;C</h1>
                    {/* <div className='city-weather-details'>
                <ThunderstormIcon sx={{ fontSize: '56px' }}></ThunderstormIcon>
                <h1>{weatherDetails?.name}, {weatherDetails?.sys?.country}
                    <div style={{ fontSize: '20px' }}>   </div>
                    <div><WbCloudyIcon sx={{ fontSize: '30px', color: 'white' }} /> {weatherDetails?.main?.temp} &deg;c</div></h1>
                <h3>{weatherDetails?.weather[0]?.description} <div> Wind Speed: {weatherDetails?.wind?.speed}m/s </div></h3>

            </div> */}</div>
            </Grid>

            <Grid item xs={6} >
                <div style={{ paddingTop: '8%' }} >
                    <h3>{weatherDetails?.name}, {weatherDetails?.sys?.country}</h3>
                    <div className="flex-container">
                        <div style={{flexGrow: 1}}><div>Humidity:</div>
                        <div>Wind speed:</div>
                        <div>Date:</div>
                        <div>Weather:</div></div>
                        <div style={{flexGrow: 1, fontWeight: 'bold'}}><div>{weatherDetails?.sys?.country}</div>
                        <div>{weatherDetails?.wind?.speed} m/s</div>
                        <div>{formattedDate}</div>
                        <div>{weatherDetails?.weather[0]?.description} </div></div>
                    </div>
                </div>
            </Grid>

            <Grid item xs={12} > 
             <div className="flex-container">
             {weekDays.map((item)=>{
                return  (<div style={{flexGrow: 1}}>
                <FilterDramaIcon sx={{fontSize: '56px'}}></FilterDramaIcon>
               <div>{item}</div>
            </div>)
             })
            }
                       
                    </div></Grid>
        </Grid>);
}

export default CityWeatherInfo;