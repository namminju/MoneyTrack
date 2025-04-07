<template>
  <div class="filter-box"></div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['updateFilter']);
const selectedType = ref('전체');
const selectedPeriod = ref('월간');

const apply = () => {
  emit('updateFilter', {
    type: selectedType.value,
    period: selectedPeriod.period,
  });
};
</script>
