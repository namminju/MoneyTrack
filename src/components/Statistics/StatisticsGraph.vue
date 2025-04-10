<template>
  <div class="statistic-graph row">
    
    <div class="chart_box col-md-9">
      <div class="button-container">
        <button
          @click="istoggletype"
          class="chart-toggle-btn"
          :class="{ active: chartType === 'pie' }"
        >
          <i class="fa-solid fa-chart-pie"></i></button
        ><button
          @click="istoggletype"
          class="chart-toggle-btn"
          :class="{ active: chartType === 'bar' }"
        >
          <i class="fa-solid fa-chart-column"></i>
        </button>
      </div>

      <component
        :is="chartType === 'pie' ? PieChart : BarChart"
        :categoryRatios="filteredRatios"
        :monthlyTotal="monthlyTotal"
        :dailyTotal="dailyTotal"
        :selectedPeriod="selectedPeriod"
        :filteredData="filteredCatergory"
      ></component>
    </div>

    <!-- category_box -->
    <div class="col-md-3">
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
  </div>
</template>

<script setup>
import PieChart from './PieChart.vue';
import { ref, computed, onMounted, defineEmits } from 'vue';
import BarChart from './BarChart.vue';
import CategoryButton from '../Expense/CategoryButton.vue';
import { useCategoryStore } from '@/stores/category';

const categoryStore = useCategoryStore();

const emit = defineEmits(['update:selectedCategories']);
//카테고리 선택시 emit을 정의 하지 않았다는 에러메세지가 발생
//해결하기 위한 emit 정의

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
  const updated = [...selectedCategory.value];
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
.button-container {
  align-self: flex-end;
  width: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3rem;
  background-color: var(--trk-disabled-light);
}
.category_box {
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}
button {
  padding: auto 0;
  aspect-ratio: 1/1;
  margin: 0;
  background-color: transparent;
}
.chart-toggle-btn i {
  padding: auto 0;
  font-size: 1.6rem;
  margin: 0 0.5rem;
  transition: color 0.2s;
  cursor: pointer;
}
.statistics-page button {
  padding: 0.3rem;
}
.chart-toggle-btn.active {
  color: white;
  background-color: var(--trk-green); /* 선택된 차트 색상 강조 */
}
.chart-toggle-btn i.active {
  color: white; /* 선택된 차트 색상 강조 */
}

@media (max-width: 1024px) {
  .category_box {
    flex-wrap: wrap;
    flex-direction: row;
    padding: 2rem;
    gap: 0.8rem 0;
    max-width: 700px;
    width: 100%;
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
  .category_box {
    padding: 4%;
    gap: 1rem 0rem;
  }
  .category_box > * {
    width: 30%; /* 두 개씩 배치 (6열 느낌) */
  }
} /* datepicker style 강제 지정 */
:deep(.mx-datepicker svg) {
  fill: white !important;
}
:deep(.mx-datepicker) {
  cursor: pointer;
}
</style>
