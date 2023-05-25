<script setup lang="ts">
import { onMounted, watchEffect } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps<{
  data: any[]
}>()

let chart: any = null

watchEffect(() => {

  if(props.data.length && chart) {
    chart.data = {
        labels: props.data.map(row => row.time),
        datasets: [
          {
            label: 'Max temperature',
            data: props.data.map(row => row.tempMax)
          },
          {
            label: 'Min temperature',
            data: props.data.map(row => row.tempMin)
          }
        ]
      }
      chart.update()
    }
})

onMounted(() => {
  chart = new Chart(
    document.querySelector('.chart'),
    {
      type: 'line',
      data: {
        labels: props.data.map(row => row.time),
        datasets: [
          {
            label: 'Max temperature',
            data: props.data.map(row => row.tempMax)
          },
          {
            label: 'Min temperature',
            data: props.data.map(row => row.tempMin)
          }
        ]
      }
    }
  );
})
  
</script>

<template>
  <div  class="chart-wrapp">
    <div>
    <canvas class="chart"></canvas>
  </div>
  </div>
  
</template>

<style scoped>
.chart {
  height: 500px;
  padding: 10px;
  background: white;
  box-shadow: 0px 24px 38px rgba(0, 0, 0, 0.11), 0px 9px 46px rgba(0, 0, 0, 0.09), 0px 11px 15px rgba(0, 0, 0, 0.16);
  border-radius: 16px;
}
</style>