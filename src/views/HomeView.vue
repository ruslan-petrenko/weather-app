<script setup lang="ts">
  import WeatherCard from '@/components/WeatherCard.vue';
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const selectedCity = computed(() => store.state.selectedCity)

</script>

<template>
  <div v-if="selectedCity">
    <WeatherCard :city="selectedCity"/>
  </div>
</template>