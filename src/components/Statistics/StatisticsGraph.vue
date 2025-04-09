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
        :categoryRatios="filteredRatios"
        :monthlyTotal="monthlyTotal"
        :dailyTotal="dailyTotal"
        :selectedPeriod="selectedPeriod"
        :filteredData="filteredCatergory"
      ></component>
    </div>
    <div class="category_box">
      <ul>
        <li v-for="item in props.categoryRatios" :key="item.category">
          <label
            ><input
              type="checkbox"
              :value="item.category"
              v-model="selectedCategory"
            />{{ item.category }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import PieChart from './PieChart.vue';
import { ref, computed, onMounted } from 'vue';
import BarChart from './BarChart.vue';
const props = defineProps({
  categoryRatios: Array,
  filteredData: Array,
  selectedPeriod: Object,
  monthlyTotal: Array,
  dailyTotal: Array,
});
const selectedCategory = ref([]);

onMounted(() => {
  selectedCategory.value = props.categoryRatios.map((item) => item.category);
});

const filteredCatergory = computed(() => {
  if (selectedCategory.value.length === 0) return props.filteredData;
  return props.filteredData.filter((item) =>
    selectedCategory.value.includes(item.cate_name)
  );
});

const totalAmount = computed(() =>
  filteredCatergory.value.reduce((sum, item) => sum + item.amount, 0)
);

const filteredRatios = computed(() => {
  const filtered_cate = {};

  filteredCatergory.value.forEach((item) => {
    if (!filtered_cate[item.cate_name]) filtered_cate[item.cate_name] = 0;
    filtered_cate[item.cate_name] += item.amount;
  });
  return Object.entries(filtered_cate).map(([category, amount]) => ({
    category,
    amount,
    ratio: totalAmount.value
      ? Math.round((amount / totalAmount.value) * 100)
      : 0,
  }));
});

const chartType = ref('pie');
const istoggletype = () => {
  chartType.value = chartType.value === 'pie' ? 'bar' : 'pie';
};
</script>
