<script setup lang="ts">
import { RouterLink } from 'vue-router';
const props = defineProps<{
  open: boolean,
  routers: {path: string, name: string}[]
}>()

const emit = defineEmits(['hideSidebar'])

</script>

<template>
  <div class="sidebar" :class="props.open ? 'open' : ''" >
    <div class="links" v-for="(router, index) of props.routers" :key="index" :to="router.path">
        <RouterLink class="link" :to="router.path" @click="emit('hideSidebar')">{{ router.name }}</RouterLink>
      </div>
  </div>
  
</template>

<style scoped>
.sidebar {
  z-index: 2;
  position: fixed;
  top: 82px;
  background: white;
  right: -100%;
  transition: right 0.5s ease-in-out;
  height: 100%;
  -webkit-box-shadow: 0px 12px 20px -13px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 12px 20px -13px rgba(0,0,0,0.75);
  box-shadow: -3px 19px 15px 0px rgba(0,0,0,0.75);
}

.open {
  right: 0px;
}
.links {
  display: flex;
  flex-direction: column;
}

.link {
  display: inline-block;
  font-size: 20px;
  font-weight: 400;
  color: var(--text-color);
  text-decoration: none;
  padding: 30px 25px
}

.router-link-active {
  background: var(--purple-700);
}
</style>