<script setup lang="ts">
const props = defineProps<{
  modalButtons: {value: string, label: string}[]
}>()
</script>

<template>
  <div class="mod-wrapp">
    <div class="mod-card">
      <span class="mod-question">Do you realy want to delete this location ?</span>
      <div class="btn-wrapp">
        <div v-for="(button, i) of props.modalButtons" :key="i">
          <button>{{button.value}}</button>
        </div>
      </div>
    </div>
  </div> 
</template>

<style scoped>
.mod-wrapp {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.mod-question {
  color: var(--text-color);
  margin-bottom: 36px;
  font-size: 25px;
}
.mod-card {
  padding: 140px 150px;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  box-shadow: 0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.btn-wrapp {
  display: flex;
  justify-content: center;
  gap: 50px;
}

button {
  cursor: pointer;
  font-size: 24px;
  font-weight: 400;
  color: var(--text-color);
  background: white;
  padding: 14px 32px;
  border: 1px solid var(--purple-700);
}

button:hover {
  background-color: var(--purple-700);
}
</style>