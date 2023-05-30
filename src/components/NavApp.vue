<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import AutocompleateApp from '@/components/AutocompleateApp.vue';
const props = defineProps<{
  showSideBar: boolean,
  routers: {path: string, name: string}[]
}>()

const emit = defineEmits(['toggleSideBar'])

const store = useStore();
const search = ref('Truskavets');


watchEffect(async () => {
  const city = store.state.citiesData.find((el: any) => el.city === search.value)
  if (city) {
    store.commit('setCity', city)
    await store.dispatch('getWeatherData', store.getters.currentTimeStemp);
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
        <AutocompleateApp 
        :value="search" 
        :data="store.state.citiesData" searchByProp="city" @input="handleInput" placeholder="Find city"/>
      </div>
      
      <div class="links">
        <RouterLink class="link" v-for="(router, index) of props.routers" :key="index" :to="router.path">
          {{ router.name }}</RouterLink>
      </div>
      <div
          class="burger-btn-wrapp"
          @click="emit('toggleSideBar')"
        >
          <div
            class="burger-btn"
            :class="props.showSideBar ? 'open' : ''"
          />
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

@media (max-width: 850px) {
  nav {
    padding: 0 50px;
  }
}

@media (max-width: 710px) {
  nav {
    padding: 0 30px;
  }
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.links {
  display: flex;
}

@media (max-width: 720px) {
  .links {
    display: none;
  }
}

.link {
  display: inline-block;
  font-size: 20px;
  font-weight: 400;
  color: var(--text-color);
  text-decoration: none;
  padding: 30px 8px;
}

.router-link-active {
  background: var(--purple-700);
}

.burger-btn-wrapp {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 25px;
  height: 20px;
}

@media (min-width: 721px) {
  .burger-btn-wrapp {
    display:  none;
  }
}

.burger-btn {
  width: 20px;
  z-index: 1;
  background: var(--text-color);
  transition: all 0.5s ease-in-out;
  height: 2px;
  border-radius: 10px;
}

.burger-btn::before,
.burger-btn::after {
  position: absolute;
  content: "";
  width: 20px;
  height: 2px;
  background: var(--text-color);
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
}
.burger-btn::before {
  transform: translateY(-6px);
}
.burger-btn::after {
  transform: translateY(6px);
}

/*ANIMATION*/
.burger-btn.open {
  transform: translateX(-50px);
  box-shadow: none;
  background: transparent
}
.burger-btn.open::before {
  transform: rotate(45deg) translate(35px, -35px);
}
.burger-btn.open::after {
  transform: rotate(-45deg) translate(35px, 35px);
}
</style>