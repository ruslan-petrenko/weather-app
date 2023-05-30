<script setup lang="ts">
import { onMounted, watchEffect, ref } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps<{
  data: any[]
}>()
const chartRef = ref(null);
let chart: any = null

watchEffect(() => {
  if(props.data.length && chart) {
    chart.data = {
        labels: props.data.map(row => row.time),
        datasets: [
          {
            label: 'Max temperature',
            data: props.data.map(row => row.tempMax),
            borderColor: 'rgba(193, 55, 162, 1)',
          },
          {
            label: 'Min temperature',
            data: props.data.map(row => row.tempMin),
            borderColor: '#8660ae',
          }
        ]
      }
      chart.update()
    }
})

onMounted(() => {
  chart = new Chart(
    chartRef.value,
    {
      type: 'line',
      data: {
        labels: props.data.map(row => row.time),
        datasets: [
          {
            label: 'Max temperature',
            data: props.data.map(row => row.tempMax),
            borderColor: 'rgba(193, 55, 162, 1)',
          },
          {
            label: 'Min temperature',
            data: props.data.map(row => row.tempMin),
            borderColor: '#8660ae',
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
      <canvas ref="chartRef" class="chart"></canvas>
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