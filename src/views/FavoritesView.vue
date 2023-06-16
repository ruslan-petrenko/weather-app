<script setup lang="ts">
import WeatherCard from '@/components/WeatherCard.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';
import { useStore } from 'vuex'
import { onMounted, reactive } from 'vue';
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'

const store = useStore()



const dataFavCities: any = reactive({ favoriteCities: []});

const whetherRangeList: any = [
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' }, 
  { value: 'fiveDays', label: '5 Days' }
]

function handleSelectTimeRange(timeRenge: object) {
  store.commit('setTimeRange', timeRenge)
}

function init() {
  const storedCities = JSON.parse(localStorage.getItem('cities')) || [];
  dataFavCities.favoriteCities = storedCities.map((cityData: object) => {
    const city = storedCities.find((el: object) => el.city === cityData.city)
    if (city) {
      return city
    }
    return null
  })
}
onMounted(async () => {init()})
</script>

<template>
  <div class="button-group-wrapp">
    <ButtonGroup
        :options="whetherRangeList" 
        :selectedOption="store.state.selectedTimeRange" 
        type="primary"
        @select="handleSelectTimeRange"/>
  </div>
  <swiper
    :slidesPerView="'auto'"
    :centeredSlides="true"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    class="mySwiper"
  >
    <swiper-slide v-for="(city, index) of dataFavCities.favoriteCities" class="slides" :key="index">
      <WeatherCard v-if="city" :city="city"/>
    </swiper-slide>
  </swiper>

</template>

<style scoped>
.slides {
  max-width: 1000px;
}

.mySwiper {
  padding: 38px 0;
}

.button-group-wrapp {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>