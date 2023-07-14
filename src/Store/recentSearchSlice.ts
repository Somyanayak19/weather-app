import { createSlice } from "@reduxjs/toolkit";
import { WeatherList } from "../model/WeatherList";
import axios from "axios";

const initialState : WeatherList = { list: [], selectedCity: '' };

 const recentSearchSlice = createSlice({
    name: "recentSearches",
    initialState,
    reducers: {
        addSearch: (state, action) => {
            state.list.unshift(action.payload);
        },
        addCity: (state, action) => {
            state.selectedCity = action.payload;
        }
    }
}

);
export default recentSearchSlice;
export const { addSearch, addCity } = recentSearchSlice.actions;