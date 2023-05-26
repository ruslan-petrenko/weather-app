<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from 'vuex'
  import { formatDate } from '@/services/helpers';
  import CardApp from '@/components/CardApp.vue'
  import ChartApp from '@/components/ChartApp.vue'

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
    <CardApp/>
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