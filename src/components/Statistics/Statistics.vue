<template>
  <div class="statistics-page">
    <Header />
    <StatisticsFilterBox @updateFilter="onFilterUpdate" />

    <StatisticsGraph
      :filteredType="selectedType"
      :filteredPeriod="selectedPeriod"
    />

    <CategoryList :filteredType="selectedType" />
  </div>
  <div>Statictics</div>
</template>

<script setup>
import '@/css/statistics/statistics.css';
import Header from '@/Header/Header.vue';
import { ref } from 'vue';
import StatisticsFilterBox from './StatisticsFilterBox.vue';
import StatisticsGraph from './StatisticsGraph.vue';
import CategoryList from './CategoryList.vue';

const selectedType = ref('전체');
const selectedPeriod = ref('월간');

const onFilterUpdate = ({ type, period }) => {
  selectedType.value = type;
  selectedPeriod.value = period;
};
</script>
