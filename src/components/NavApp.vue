<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import AutocompleateApp from '@/components/AutocompleateApp.vue';

const store = useStore();
const search = ref('Truskavets');

watchEffect(async () => {
  const city = store.state.cityesData.find((el: any) => el.city === search.value)
  if (city) {
    store.commit('setCity', city)
    await store.dispatch('getTodayWeatherData', store.getters.currentTimeStemp);
  }
})

function handleInput(value: string) {
  search.value = value;
}

</script>

<template>
  <nav>
    <div class="nav-content">
      <div class="finder-wrapp">
        <a href="/"><img src="./icons/Logo.png" alt="Logo"/></a>
        <AutocompleateApp :value="search" :data="store.state.cityesData" searchByProp="city" @input="handleInput" placeholder="Find city"/>
      </div>
      
      <div class="links">
        <RouterLink class="link" to="/">Home</RouterLink>
        <RouterLink class="link" to="/favorites">Favorites</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  padding: 0 115px;
  background: white;
  -webkit-box-shadow: 0px 12px 20px -13px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 12px 20px -13px rgba(0,0,0,0.75);
  box-shadow: 0px 12px 20px -13px rgba(0,0,0,0.75);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1800px;

}

.finder-wrapp {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
}

img {
  width: 80px;
  margin-right: 32px;
}


@media (max-width: 800px) {
  nav {
    padding: 0 50px;
  }
}

@media (max-width: 570px) {
  nav {
    padding: 0 30px;
  }
}

.links {
  display: flex;
}

.link {
  display: inline-block;
  font-family: 'Inter', 'sans-serif';
  font-size: 20px;
  font-weight: 400;
  color: var(--text-color);
  text-decoration: none;
  padding: 30px 8px;
}

.router-link-active {
  background: var(--purple-700);
}
</style>