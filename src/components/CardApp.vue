<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue';
import {ref} from 'vue'
import { useStore } from 'vuex'
import { formatDate } from '@/services/helpers';
import ButtonGroup from './ButtonGroup.vue';
const props = defineProps<{
  localWeatherData: any,
  currentPage: string,
}>()

const store = useStore()

const whetherRangeList: any = [
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' }, 
  { value: 'fiveDays', label: '5 Days' }
]

const isFavorite = ref(false)  
const storeWeatherData = computed(() => store.state.weatherData)
const currentCityName = computed(() => props.localWeatherData ? props.localWeatherData.city.name : storeWeatherData.value.city.name)
let storedCities: any = [];

function handleSelectTimeRange(timeRenge: object) {
  store.commit('setTimeRange', timeRenge)
}

function storeFavoriteCity() {
  if (isFavorite.value) {
    storedCities = storedCities.filter((obj : string) => obj.city != currentCityName.value);
    localStorage.setItem('cities', JSON.stringify(storedCities));
    isFavorite.value = false;
  } else {
    if (storedCities.length < 5) {
      storedCities.push({city: props.localWeatherData.city.name, latitude: props.localWeatherData.city.coord.lat, longitude: props.localWeatherData.city.coord.lon});
      localStorage.setItem('cities', JSON.stringify(storedCities));
      isFavorite.value = true;
    } else {
      alert('Array is full')
    }
    
  }
  console.log('city ', currentCityName.value, )

}

const weatherList = computed(() => {
  const data = props.localWeatherData ? props.localWeatherData : storeWeatherData.value
  if (store.state.selectedTimeRange === 'today' ) {
    const endOfTheDayIndex = data.list?.findIndex((el: any) => formatDate(el.dt_txt) === '12 AM')
    return data.list?.filter((el: any, i: number) => i <= endOfTheDayIndex)
  }

  if (store.state.selectedTimeRange === 'tomorrow' ) {
    return []
  }
  return data.list
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

watchEffect(() => {
  storedCities = JSON.parse(localStorage.getItem('cities') as any) || [];
  isFavorite.value = storedCities.find((obj: any) => obj.city === currentCityName.value)     
})

onMounted(() => {
  storedCities = JSON.parse(localStorage.getItem('cities') as any) || [];
  isFavorite.value = storedCities.find((obj: any) => obj.city === currentCityName.value)   
})
</script>

<template>
  <div class="weather-wrapp">
    <div class="button-wrapp" :class="props.currentPage == '/favorites' ? 'hide-block' : ''">
      <div>
        <ButtonGroup 
        :options="whetherRangeList" 
        :selectedOption="store.state.selectedTimeRange" 
        type="secondary"
        @select="handleSelectTimeRange"/>
      </div>
      <font-awesome-icon class="heart" :icon="[isFavorite ? 'fas' : 'far', 'heart']" @click="storeFavoriteCity"/>
    </div>


    <div class="city-wrapp">
      <p class="city">{{ currentCityName }}</p>
      <font-awesome-icon v-if="props.currentPage === '/favorites'" class="heart" :icon="[isFavorite ? 'fas' : 'far', 'heart']" @click="storeFavoriteCity"/>
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
  box-shadow: 0px 24px 38px rgba(0, 0, 0, 0.11), 
  0px 9px 46px rgba(0, 0, 0, 0.09), 
  0px 11px 15px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
}

.button-wrapp {
  display: flex;
  justify-content: space-between;
}

.hide-block {
  display: none;
}

.card-wrapp {
  display: flex;
  overflow-x: scroll;
  padding: 20px;
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
  font-size: 20px;
  background-color: white;
}

.city-wrapp {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.city {
  font-size: 45px;
  color: var(--black-800);
  padding: 30px 27px;
}
.heart {
  font-size: 25px;
  padding: 14px;
  cursor: pointer;
  color: var(--text-color);
}

@media (max-width: 570px) {
  .city {
    font-size: 30px;
}
  .heart {
    font-size: 20px;
    padding: 12px;
  }
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

.location {
  font-size: 47px;
  color: var(--text-color);
}
</style>