<script setup lang="ts">
import { useStore } from 'vuex'
import { formatDate } from '@/services/helpers';
import Card from '@/components/Card.vue';
import Chart from '../components/Chart.vue'
import { computed, onMounted } from 'vue';

const store = useStore()

const chartData = computed(() => {
  return store.state.weatherData.list?.map((el: any) => {
    return {
        time: formatDate(el.dt_txt),
        tempMax: el.main.temp_max.toFixed(1),
        tempMin: el.main.temp_min.toFixed(1)

      } 
  })
})


</script>

<template>
  <div v-if="chartData" class="wrapp">
    <Card/>
    <Chart :key="chartData.lenght" :data="chartData"/>
  </div> 
</template>


<style scoped>
  .wrapp {
    display: flex;
    flex-flow: column;
    height: 100%;
  }
</style>