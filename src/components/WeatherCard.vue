<script setup lang="ts">
  import { computed, onMounted, watchEffect, reactive } from 'vue';
  import { useStore } from 'vuex'
  import {useRoute} from 'vue-router'
  import { formatDate } from '@/services/helpers';
  import CardApp from '@/components/CardApp.vue'
  import ChartApp from '@/components/ChartApp.vue'
  import { getWeatherData } from '@/services/api'

  const props = defineProps<{
    city: any
  }>()

const store = useStore();
const localState: any = reactive({ lecalWeatherDate: null });
const route = useRoute();
const path = computed(() => route.path)

const chartData = computed(() => {
  if (localState.localWeatherData) {
    return localState.localWeatherData.list?.map((el: any) => {
      return {
        time: formatDate(el.dt_txt),
        tempMax: el.main.temp_max.toFixed(1),
        tempMin: el.main.temp_min.toFixed(1)
        } 
    })
  }
  return []
})

async function getData() {
  localState.localWeatherData = await getWeatherData(props.city, store.getters.currentTimeStemp)
}

watchEffect(async () => {
  if (props.city) await getData()
})

onMounted(async() => getData())


</script>

<template>
  <div v-if="chartData && localState.localWeatherData" class="wrapp">
    <CardApp :currentPage="path" :localWeatherData="localState.localWeatherData"/>
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