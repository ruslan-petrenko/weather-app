<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavApp from './components/NavApp.vue'
</script>

<template>
  
  <header>
    <NavApp /> 
  </header>
  <main> 
    <RouterView />
  </main>   
</template>

<style scoped>
main {
    margin: 0 auto;
    max-width: 1500px;
    padding: 50px;
}
</style>
