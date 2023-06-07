<script setup lang="ts">
const props = withDefaults(defineProps<{
  options: { type: any },
  selectedOption: {
    value: string,
    label: string,  
  },
  type: 'primary' | 'secondary' 
}>(), {type: 'primary'})

const emit = defineEmits(['select'])
</script>

<template>
  <div>
    <button  v-for="(option, index) of props.options" :key="index" 
            :class="[{ active: option.value === selectedOption.value}, props.type ]" 
            @click="emit('select', option)">{{ option.label}}</button>
  </div>
  
</template>

<style scoped>
.active {
  background: var(--purple-700);
}

button {
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  color: var(--text-color);
  background: white;
  padding: 14px 32px;
  border: none;
  border-left: 1px solid var(--purple-700);
  border-right: 1px solid var(--purple-700);

}
.primary {
  border: 1px solid rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
}

.primary:first-child {
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}

.primary:last-child {
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;

}

@media (max-width: 570px) {
  button {
    font-size: 20px;
    padding: 10px 10px;
}
}

@media (max-width: 430px) {
  button {
    font-size: 17px;
    padding: 10px 10px;
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