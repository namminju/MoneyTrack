<template>
  <div class="filter-box">
    <div class="type__buttons">
      <button
        v-for="type in typeOptions"
        :key="type"
        @click="selectedType = type"
        :class="{ active: selectedType === type }"
      >
        {{ type }}
      </button>
    </div>
    <div class="period_buttons">
      <button
        v-for="period in periodOptions"
        :key="period"
        @click="selectedPeriod = period"
        :class="{ active: selectedPeriod === period }"
      >
        {{ period }}
      </button>
    </div>
    <button @click="applyFilter">적용</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['updateFilter']);
const typeOptions = ['전체', '수입', '지츨'];
const periodOptions = ['월간', '연간'];

const selectedType = ref('전체');
const selectedPeriod = ref('월간');

const applyFilter = () => {
  emit('updateFilter', {
    type: selectedType.value,
    period: selectedPeriod.period,
  });
};
</script>
