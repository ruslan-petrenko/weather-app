<script setup lang="ts">
import { computed} from 'vue';
import {ref} from 'vue'
import { useStore } from 'vuex'
import { formatDate } from '@/services/helpers';
import ButtonGroup from './ButtonGroup.vue';

const store = useStore()

const whetherRangeList: any = [
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' }, 
  { value: 'fiveDays', label: '5 Days' }
]
// const data: any = reactive({ selectedOption: { value: 'today', label: 'Today' }});

let isFavorite = ref(true);
const weatherData = computed(() => store.state.weatherData)

function handleSelectTimeRange(timeRenge: object) {
  store.commit('setTimeRange', timeRenge)
    store.dispatch('getTodayWeatherData', store.getters.currentTimeStemp)
}

function changeHeart() {
  isFavorite.value = !isFavorite.value
}

const weatherList = computed(() => {
  if (store.state.selectedTimeRange === 'today' ) {
    const endOfTheDayIndex = weatherData.value?.list?.findIndex((el: any) => formatDate(el.dt_txt) === '12 AM')
    return weatherData.value.list?.filter((el: any, i: number) => i <= endOfTheDayIndex)
  }

  if (store.state.selectedTimeRange === 'tomorrow' ) {
    return []
  }
  return weatherData.value.list
})

function getWeatherIcon(item: any) {
  const percentOfClouds = item.clouds.all;
  const weatherType = item.weather[0].main;
  if (weatherType === 'Rain') {
    if (percentOfClouds <= 70) {
      return 'cloud-sun-rain'
    } 

    return 'cloud-rain'
  } 

  if (weatherType === 'Clear') {
    return 'sun'
  }

  if (percentOfClouds <= 70) {
    return 'cloud-sun'
  }

  return 'cloud'
}
</script>

<template>
  <div class="weather-wrapp">
    <div class="button-wrapp">
      <div>
        <ButtonGroup :options="whetherRangeList" :selectedOption="store.state.selectedTimeRange" @select="handleSelectTimeRange" />
      </div>
      <font-awesome-icon class="heart" :icon="[isFavorite ? 'far' : 'fas', 'heart']" @click="changeHeart"/>
    </div>
    <div>
      <p class="city">{{ weatherData.city?.name }}</p>
    </div>
    <div class="card-wrapp">
      <div v-for="(item, index) of weatherList" :key="index">
        <div class="card">
          <p class="time">{{ formatDate(item.dt_txt) }}</p>
          <div class="items-wrapp">
            <font-awesome-icon class="weather-icon" :icon="['fas', getWeatherIcon(item)]" />
            <p class="item">Temp: <span class="temp">{{(item.main.temp).toFixed(1)}} &#8451;</span></p>
            <p class="item">Feel like: <span class="temp">{{(item.main.feels_like).toFixed(1)}} &#8451;</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-wrapp {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
  background: #FFFFFF;
  box-shadow: 0px 24px 38px rgba(0, 0, 0, 0.11), 0px 9px 46px rgba(0, 0, 0, 0.09), 0px 11px 15px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
}

.button-wrapp {
  display: flex;
  justify-content: space-between;
}

.card-wrapp {
  display: flex;
  overflow-x: scroll;
  padding: 20px;
/* margin-right: 10px; */
}

.card {
    width: 170px;
    padding: 10px;
    box-shadow: 0 2px 4px #0000001f, 0 3px 6px #00000026, 0 0 4px #00000026;
    border-radius: 10px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    background-color: white;
}
.city {
    font-family: 'Inter', sans-serif;
    font-size: 45px;
    color: var(--black-800);
    padding: 30px 27px;
}

.time {
  margin-bottom: 15px;
  color: var(--black-800);
  text-align: center;
}
.items-wrapp {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.weather-icon {
  margin-bottom: 15px;
  font-size: 50px;
  color: var(--purple-500);
}
.item {
    padding: 6px 0;
    color: var(--black-800);
    font-size: 14px;
}
.item:first-child .item:last-child {
  padding: 0;
}

.temp {
  font-weight: 300;
}


.heart {
  font-size: 25px;
  padding: 14px;
  cursor: pointer;
  color: var(--text-color);
}

.location {
    font-size: 47px;
    color: var(--text-color);
}
</style>