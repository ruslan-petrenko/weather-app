<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue';
import NavApp from './components/NavApp.vue'
import SidebarApp from './components/SidebarApp.vue'

let buttonIsOpen = ref(false)

function toggleSideBar() {
  buttonIsOpen.value = !buttonIsOpen.value
}
</script>

<template>
  <header>
    <NavApp @toggleSideBar="toggleSideBar" :showSideBar="buttonIsOpen" /> 
    <SidebarApp :open="buttonIsOpen"/>
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
