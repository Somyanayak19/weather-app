import './App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SearchWeather from './Components/Weather/SearchWeather';
import { Provider } from 'react-redux';
import store from './Store/store';
import React from 'react';
import { RouterProvider,createBrowserRouter} from 'react-router-dom';
import CityWeatherInfo from './Components/Weather/CityWeatherInfo';


function App() {
   const router =  createBrowserRouter([
      {path: '/',element: <SearchWeather/>},
      {path: '/weather',element: <CityWeatherInfo/>},

     ]);

  return (
    <Grid container id="grid-conatiner" sx={{ flexGrow: 1, height: '100vh' ,backgroundColor:'#98c487',marginTop:'0px'}} justifyContent='center' alignItems='center' spacing={3} >
    <Provider store={store}><RouterProvider  router={router}/></Provider>
      
    </Grid>
  );

}

export default App;
