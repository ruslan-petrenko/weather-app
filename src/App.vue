<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
</script>

<template>
  
  <header>
    <Nav></Nav>   
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
