<script setup lang="ts">
  import { computed, onMounted, reactive } from 'vue';
  import { useStore } from 'vuex'
  import { formatDate } from '@/services/helpers';
  import axios from 'axios';
  import CardApp from '@/components/CardApp.vue'
  import ChartApp from '@/components/ChartApp.vue'
  const props = defineProps<{
    city?: string
  }>()

const store = useStore();
const localState: any = reactive({ lecalWeatherDate: null });

const chartData = computed(() => {
  return store.state.weatherData.list?.map((el: any) => {
    return {
      time: formatDate(el.dt_txt),
      tempMax: el.main.temp_max.toFixed(1),
      tempMin: el.main.temp_min.toFixed(1)
      } 
  })
})

onMounted( async () => {
  const citiesData = store.state.citiesData.find((el: any) => el.city === props.city);
  console.log('citiesData ', citiesData)

  if (props.city) {
    localState.localWeatherData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${citiesData.lat}&lon=${citiesData.lng}&appid=2f8673a8a811d84d4b8b8056e686c0b7&cnt=5&units=metric`)
      .then(response => response.data)   
  }
})


</script>

<template>
  <div v-if="chartData" class="wrapp">
    <CardApp :localWeatherData="localState.localWeatherData"/>
    <ChartApp :key="chartData.lenght" :data="chartData"/>
  </div> 
</template>

<style scoped>
.wrapp {
  display: flex;
  flex-flow: column;
  height: 100%;
}

</style>