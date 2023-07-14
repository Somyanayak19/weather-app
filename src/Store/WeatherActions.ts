import axios from "axios";
import { addSearch } from "./recentSearchSlice";

export const fetchWeatherData = (selectedCity:string): any =>
 async (dispatch: any)=>{
    if (selectedCity) {
                try {
                    const apiKey = '48b9b302c08b44b00f26e50c61085e21';
                    const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`;
                    const response = await axios.get(url)
                    const weatherlist = response.data;
                    dispatch(addSearch(weatherlist));
                    console.log("weatherlist",weatherlist);
                } catch (error) {
                    console.error(error);
                }
            }
   
}