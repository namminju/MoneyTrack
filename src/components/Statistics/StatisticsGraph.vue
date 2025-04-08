<template>
  <div class="statistic-graph" style="display: flex">
    <PieChart :categoryRatios="categoryRatios" />
    <BarChart
      :monthlyTotal="monthlyTotal"
      :dailyTotal="dailyTotal"
      :selectedPeriod="selectedPeriod"
    />
  </div>
</template>

<script setup>
import PieChart from './PieChart.vue';
import BarChart from './BarChart.vue';
const props = defineProps({
  categoryRatios: {
    type: Array,
    required: true,
  },
  filteredData: {
    type: Array,
    required: true,
  },
  selectedPeriod: {
    type: Object,
    required: true,
  },
  monthlyTotal: {
    type: Array,
    required: true,
  },
  dailyTotal: {
    type: Array,
    required: true,
  },
});
</script>
