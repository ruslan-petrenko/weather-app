import axios from 'axios';
import { reactive } from 'vue';

const APIKEY = "2f8673a8a811d84d4b8b8056e686c0b7";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const api = axios.create({ baseURL: BASE_URL });

export async function getWeatherData(city: any, timeStamp: any) {
  return await api.get(`?lat=${city.latitude}&lon=${city.longitude}&appid=${APIKEY}${timeStamp ? '&cnt=' + timeStamp : ''}&units=metric`)
  .then(response => response.data)
}  

export async function getCitiesData(city: string) {
  return await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}`, {headers: {
    'X-RapidAPI-Key': '3ea879bdb4msh017e456314f8be9p1408c9jsn873ce547414f',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }}).then(response => response.data)
}