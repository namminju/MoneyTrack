<template>
  <div class="statistic-graph">
    <!-- <div class="chart-box">
      <PieChart :categoryRatios="categoryRatios" />
    </div>
    <div class="chart-box">
      <BarChart
        :monthlyTotal="monthlyTotal"
        :dailyTotal="dailyTotal"
        :selectedPeriod="selectedPeriod"
      />
    </div> -->
    <div class="chart_box">
      <button @click="istoggletype">
        {{ chartType === 'pie' ? '막대차트 보기' : '원형차트 보기' }}
      </button>

      <component
        :is="chartType === 'pie' ? PieChart : BarChart"
        :categoryRatios="categoryRatios"
        :monthlyTotal="monthlyTotal"
        :dailyTotal="dailyTotal"
        :selectedPeriod="selectedPeriod"
      ></component>
    </div>
    <div class="category_box">
      <ul>
        <li v-for="item in props.categoryRatios" :key="item.category">
          {{ item.category }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import PieChart from './PieChart.vue';
import { ref } from 'vue';
import BarChart from './BarChart.vue';
const props = defineProps({
  categoryRatios: {
    type: Array,
  },
  filteredData: {
    type: Array,
  },
  selectedPeriod: {
    type: Object,
  },
  monthlyTotal: {
    type: Array,
  },
  dailyTotal: {
    type: Array,
  },
});
const chartType = ref('pie');
const istoggletype = () => {
  chartType.value = chartType.value === 'pie' ? 'bar' : 'pie';
};
</script>
