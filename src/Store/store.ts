import { configureStore, createSlice } from "@reduxjs/toolkit";
import {WeatherList} from '../model/WeatherList';
import axios from 'axios';
import recentSearchSlice from './recentSearchSlice'


const store = configureStore({
    reducer: { recentSearches: recentSearchSlice.reducer},
})



export default store;