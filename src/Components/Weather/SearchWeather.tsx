import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useMemo, useState } from 'react';
import WeatherDetails from './WeatherDetails';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addCity, addSearch } from '../../Store/recentSearchSlice';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import './SearchWeather.css';
import SearchBox from '../../UI/SearchBox';
import React from 'react';
import { WeatherInfo } from '../../model/WeatherInfo';
import { WeatherList } from '../../model/WeatherList';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherData } from '../../Store/WeatherActions';
import { RecentSearches } from '../../model/RecentSearch';


const SearchWeather = () => {

    const recentSearches = useSelector((state: RecentSearches) => state.recentSearches.list);

    const selectedCity = useSelector((state: RecentSearches) => state.recentSearches.selectedCity);

    const dispatch = useDispatch();
    const element = document.getElementById('grid-conatiner');
    if (element) {
        element.style.backgroundColor = "#98c487";
    }

    const [error, setError] = useState(false);
    const [weatherData, setWeatherData] = useState();
    let [searchTerm, setSearchTerm] = useState('');
    let [options, setOptions] = useState([]);
    let [city, setCity] = useState('');

    document.body.style.backgroundColor = "#98c487";

    useEffect(() => {
        dispatch(fetchWeatherData(selectedCity));
    }, [selectedCity,dispatch]);

    useEffect(()=>{
        setWeatherData(recentSearches.find((search: WeatherInfo) => search.name === selectedCity));
    },[recentSearches])

    useEffect(() => {
        const getCities = async () => {
            const cityList = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
                "country": "India"
            }); 
            setOptions(cityList.data.data);
        }
        getCities();
    }, []);

    const memoizationWeatherDetails = useMemo(()=>{
        if(weatherData){
       return <WeatherDetails WeatherInfo={weatherData} />;
        }
    },[weatherData]);


    const inputChange = (data: string) => {
        setSearchTerm(data);
        if ((data).trim() === '' || (data).length < 3) {
            setError(true);
        } else {
            setError(false);
        }
    }

    const fetchWeatherDetails = (e: any) => {
        setCity(e.target.innerText);
        setSearchTerm('');
    }

    const submitSearch = (e: any) => {
        e.preventDefault();
        if (!city || city.trim() === '') {
          //  setWeatherData({});
            return;
        }
        if (!recentSearches.find((search: WeatherInfo) => search.name === city)) {
            console.log("test",city);
            dispatch(addCity(city));
        }
        else {
            const fetchdatafromStore = recentSearches.find((search: WeatherInfo) => search.name === city)
            setWeatherData(fetchdatafromStore)
        }

    }

    return <Grid item xs={6}>
        <Card style={{ height: '80vh', backgroundColor: '#dfeff5' }}>
            <CardContent>
                <Typography variant="h4" component="span" style={{ fontWeight: 'bold' }}>
                    Weather App <ThunderstormIcon />
                </Typography>
                <Typography variant="body1" component="span" color="text.secondary">
                    <form onSubmit={submitSearch} style={{ display: 'block' }}>
                        <Autocomplete
                            freeSolo
                            open={searchTerm.length > 3 && options.length > 0}
                            onChange={fetchWeatherDetails}
                            options={options}
                            renderInput={(params: any) => (
                                <>
                                    <SearchBox error={error} params={{ ...params }} changeInput={inputChange} />
                                </>
                            )}
                        />
                    </form>
                </Typography>
                <Typography variant="body2" component="span" color="text.secondary">
                    {weatherData &&<div> {memoizationWeatherDetails} </div> }
                </Typography>
            </CardContent>
        </Card>
    </Grid>
}
export default SearchWeather;