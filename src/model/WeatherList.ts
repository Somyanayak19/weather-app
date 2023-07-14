import { WeatherInfo } from "./WeatherInfo";

export interface WeatherList {
    list: WeatherInfo[];
    selectedCity: string;
}