<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue';
import NavApp from './components/NavApp.vue'
import SidebarApp from './components/SidebarApp.vue'

let isOpen = ref(false)

const routers = [{path: '/', name: 'Home'}, {path: '/favorites', name: 'Favorites'}]
function toggleSideBar() {
  isOpen.value = !isOpen.value
}

function hideSidebar() {
  isOpen.value = !isOpen.value
}


</script>

<template>
  <header>
    <NavApp :routers="routers" @toggleSideBar="toggleSideBar" :showSideBar="isOpen" /> 
    <SidebarApp :routers="routers" :open="isOpen" @hideSidebar="hideSidebar"/>
  </header>
  <main> 
    <RouterView />
  </main>   
</template>

<style scoped>
main {
  margin: 0 auto;
  max-width: 1800px;
  padding: 50px;
}

@media (max-width: 570px) {
  main {
    padding: 20px;
}
}

</style>
