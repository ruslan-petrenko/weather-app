<script setup lang="ts">
const props = defineProps<{
  options: { type: any },
  selectedOption: {
    value: string,
    label: string  
  }  
}>()

const emit = defineEmits(['select'])
</script>

<template>
  <button  v-for="(option, index) of props.options" :key="index" :class="{ active: option.value === selectedOption.value }" 
  @click="emit('select', option)">{{ option.label}}</button>
</template>

<style scoped>
.active {
  background: var(--purple-700);
}

button {
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: var(--text-color);
  background: white;
  padding: 14px 32px;
  border: none;
  border-left: 1px solid var(--purple-700);
  border-right: 1px solid var(--purple-700);

}

@media (max-width: 570px) {
  button {
    font-size: 15px;
    padding: 10px 10px;
}
}

@media (max-width: 400px) {
  button {
    font-size: 15px;
    padding: 10px 5px;
}

}
button:first-child {
  border-left: none;
  border-top-left-radius: 15px;
}

button:last-child {
  border-right: none;
  border-bottom-right-radius: 16px;
}
</style>