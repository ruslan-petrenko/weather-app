<script setup lang="ts">
import WeatherCard from '@/components/WeatherCard.vue';
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import { onMounted } from 'vue';

let favoriteCities: any = [];

onMounted(() => {
  favoriteCities = JSON.parse(localStorage.getItem('cities')) || [];
})
</script>

<template>
  <swiper
    :slidesPerView="'auto'"
    :centeredSlides="true"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    class="mySwiper"
  >
    <swiper-slide v-for="(city, index) of favoriteCities" class="slides" :key="index">
      <WeatherCard :city="city"/>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.slides {
  max-width: 1000px;
}
</style>