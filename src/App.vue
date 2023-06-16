<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed,ref } from 'vue';
import NavApp from './components/NavApp.vue'
import SidebarApp from './components/SidebarApp.vue'
import ModalApp from './components/ModalApp.vue'

let isOpen = ref(false)

const route = useRoute();
const path = computed(() =>route.path)

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
    <NavApp :current-page="path" :routers="routers" @toggleSideBar="toggleSideBar" :showSideBar="isOpen" /> 
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
