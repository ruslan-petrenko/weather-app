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
    return weatherData.value.list?.filter((el, i) => i <= endOfTheDayIndex)
  }

  if (store.state.selectedTimeRange === 'tomorrow' ) {
    return []
  }

  // weatherData.value.list.filter((item: any) => console.log(item))
  return weatherData.value.list
})


</script>

<template>
  <div class="weather-wrapp">
    <div class="button-wrapp">
      <div>
        <ButtonGroup :options="whetherRangeList" :selectedOption="store.state.selectedTimeRange" @select="handleSelectTimeRange" />
      </div>
      <font-awesome-icon class="icon" :icon="[isFavorite ? 'far' : 'fas', 'heart']" @click="changeHeart"/>
    </div>
    <div>
      <p class="city">{{ weatherData.city?.name }}</p>
    </div>
    <div class="card-wrapp">
      <div v-for="(item, index) of weatherList" :key="index">
        <div class="card">
          <p class="item time">{{ formatDate(item.dt_txt) }}</p>
          <p class="item">Temp: {{(item.main.temp).toFixed(1)}} &#8451;</p>
          <p class="item">Feel like: {{(item.main.feels_like).toFixed(1)}} &#8451;</p>
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
    height: 190px;
    padding: 10px;
    box-shadow: 0px 24px 38px rgba(0, 0, 0, 0.11), 0px 9px 46px rgba(0, 0, 0, 0.09), 0px 11px 15px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    background-color: white;
}
.city {
    font-family: 'Inter', sans-serif;
    font-size: 45px;
    color: var(--text-color);
    padding: 30px 27px;
}

.item {
  color: var(--text-color);
}
.item:last-child {
  border: none
}

.time {
  text-align: center;
}

.icon {
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