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
    <!-- <div class="category_box">
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
    </div> -->

    <!-- category_box -->
    <div class="category_box">
      <CategoryButton
        v-for="category in categoryStore.categoryList[0]"
        :key="category.name"
        :category="category"
        :isSelected="selectedCategory.includes(category.name)"
        :toggleCategory="toggleCategory"
      />
    </div>
  </div>
</template>

<script setup>
import PieChart from './PieChart.vue';
import { ref, computed, onMounted } from 'vue';
import BarChart from './BarChart.vue';
import CategoryButton from '../Expense/CategoryButton.vue';
import { useCategoryStore } from '@/stores/category';

const categoryStore = useCategoryStore();

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

function toggleCategory(name) {
  const updated = [...selectedCategory.value]; // ✅ ref이므로 .value
  const index = updated.indexOf(name);

  if (index === -1) {
    updated.push(name);
  } else {
    updated.splice(index, 1);
  }

  selectedCategory.value = updated;
  emit('update:selectedCategories', updated);
}

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
<style scoped>
.category_box {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}

@media (max-width: 1024px) {
  .category_box {
    flex-wrap: wrap;
    flex-direction: row;
    padding: 2rem;
    gap: 1rem 0;
    max-width: 90vw;
  }

  .category_box > * {
    width: 23%; /* 두 개씩 배치 (6열 느낌) */
  }
}
@media (max-width: 700px) {
  .category_box > * {
    width: 30%; /* 두 개씩 배치 (6열 느낌) */
  }
}
@media (max-width: 400px) {
  .category_box > * {
    width: 48%; /* 두 개씩 배치 (6열 느낌) */
  }
}
</style>
