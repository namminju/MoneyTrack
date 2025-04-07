<template>
  <div class="statistic-graph" style="display: flex">
    <PieChart :filteredType="filteredType" />
    <BarChart :filteredPeriod="filteredPeriod" />
  </div>
</template>

<script setup>
import PieChart from './PieChart.vue';
import BarChart from './BarChart.vue';
defineProps(['filteredType', 'filteredPeriod']);
</script>
