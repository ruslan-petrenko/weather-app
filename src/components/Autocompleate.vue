<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ICitiesData } from '../models/ICitiesData'

const props = defineProps<{
  placeholder: string,
  value: string,
  data: ICitiesData[],
  searchByProp: string
}>()

const emit = defineEmits(['input'])

let hideAutocomplete = ref(false);
const filteredData = computed(() => props.data.filter(el => el[props.searchByProp].toLowerCase().startsWith(props.value.toLowerCase())))
const isShowAutocomplete  = computed(() => filteredData.value.length > 0 && props.value && !hideAutocomplete.value )

function autocomplete(el: any) {
  emit('input', el[props.searchByProp])
  hideAutocomplete.value = true;
}

function onInput(e: any) {
  emit('input', e.target.value)
  if (filteredData.value[0]?.[props.searchByProp] === props.value) {
    hideAutocomplete.value = true
  } else {
    hideAutocomplete.value = false
  }
}
</script>

<template>
  <div class="wrapp">
    <div class="input-wrapp">
      <label for="input"><font-awesome-icon class="icon"  :icon="['fas', 'magnifying-glass']" /></label>
      <input :value="props.value" @input="onInput"  name="input" type="text" :placeholder="props.placeholder">
    </div>
    <div class="options-list" v-if="isShowAutocomplete">
      <p class="option" 
        v-for="(el, index) of filteredData" :key="index"  
        @click="autocomplete(el)">{{ el[props.searchByProp] }}
      </p>
    </div>
  </div>
    
</template>

<style scoped>
.wrapp {
  position: relative;
}
.input-wrapp {
  display: flex;
  align-items: center;
    max-width: 100%;
    padding: 8px 15px;
    color: var(--text-color);
    background: var(--purple-700);
    border-radius: 10px;
}

.icon {
  margin-right: 15px;
}

input {
  width: 100%;
  font-size: 20px;
  color: var(--text-color);
  border: none;
  outline: none;
  background: transparent;
}

input::placeholder {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: var(--text-color);
}
.options-list {
    position: absolute;
    max-height: 200px;
    overflow: scroll;
    left: 0;
    right: 0;
    z-index: 1;
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    font-weight: 400;
    border-radius: 10px;
    box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 31%);
    background: white;
}

.option {
  padding: 8px;
  border: 1px solid var(--blue-800);
  color: var(--text-color);
  border-top: none;
  border-right: none;
  border-left: none;
}

.option:hover {
  background: ;
  cursor: pointer;
}

.option:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.option:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>