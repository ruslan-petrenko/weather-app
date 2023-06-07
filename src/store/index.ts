import { createStore } from 'vuex'
import data from '@/assets/ua.json';

const store = createStore({
  state () {
    return {
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
  }
})
export default store