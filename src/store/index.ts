import { createStore } from 'vuex'
import data from '@/assets/ua.json';
import axios from 'axios'

const APIKEY = "2f8673a8a811d84d4b8b8056e686c0b7"

const store = createStore({
  state () {
    return {
      weatherData: [],
      citiesData: data,
      selectedCity: null,
      selectedTimeRange: { value: 'today', label: 'Today' }, 
    }
  },
  getters: {
    currentTimeStemp (state: any) {
      const hoursInOneDay = 24;
      const curentHours = new Date().getHours();
      const timeStamps = ((hoursInOneDay - curentHours + 1) / 3).toFixed();
      if (state.selectedTimeRange.value === 'today') {         
      return timeStamps
    } 
      if (state.selectedTimeRange.value === 'tomorrow') {
        return Number(timeStamps) + 8
      } else {
        return null
      }
    }
  },

  mutations: {
    setWeatherData(state: any, payload: any) {
      state.weatherData = payload
    },
    setCity(state: any, city: any) {
      state.selectedCity = city;
    },
    setTimeRange(state: any, timeRange: object) {
      state.selectedTimeRange = timeRange;
    },
    setTimeStamps(state: any, ) {
      const hoursInOneDay = 24;
      const curentHours = new Date().getHours();
      const timeStamps = Math.round((hoursInOneDay - curentHours) / 3);
      state.timeStamp = timeStamps
    }
  },

  actions: {
    async getWeatherData({ commit, state }: any, counts: number | undefined) {
      
      await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${state.selectedCity.lat}&lon=${state.selectedCity.lng}&appid=${APIKEY}${counts ? '&cnt=' + counts : ''}&units=metric`)
      .then(response => {
          commit('setWeatherData', response.data)
      })      
    }
  }
})
export default store