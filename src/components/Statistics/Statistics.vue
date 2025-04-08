<template>
  <div class="statistics-page">
    <Header />
    <StatisticsFilterBox @updateFilter="onFilterUpdate" />

    <!-- <StatisticsGraph
      :filteredType="selectedType"
      :filteredPeriod="selectedPeriod"
    />

    <CategoryList :filteredType="selectedType" /> -->
    <h2>📊 테스트용 통계 페이지</h2>

    <p>🔹 전체 지출 합계: {{ statStore.totalAmount }} 원</p>

    <ul>
      <li v-for="item in statStore.categoryRatios" :key="item.category">
        {{ item.category }}: {{ item.amount }}원 ({{ item.ratio }}%)
      </li>
    </ul>
  </div>
  <div>Statictics</div>
</template>

<script setup>
import '@/css/statistics/statistics.css';
import Header from '@/components/Header/Header.vue';
import { ref } from 'vue';
import StatisticsFilterBox from './StatisticsFilterBox.vue';
// import StatisticsGraph from './StatisticsGraph.vue';
// import CategoryList from './CategoryList.vue';
import { useStatisticsStore } from '@/stores/useStatisticsStore';

const store = useStatisticsStore();
const selectedType = ref('전체');
const selectedPeriod = ref('월간');

onMounted(() => {
  storeToRefs.fetchData();
});

const onFilterUpdate = ({ type, period }) => {
  selectedType.value = type;
  selectedPeriod.value = period;
};
</script>

<!-- <script setup>
import { onMounted } from 'vue';
import { useStatisticsStore } from '@/stores/useStatisticsStore';

const statStore = useStatisticsStore();

onMounted(() => {
  statStore.fetchData();
});
</script>

<template>
  <div class="test-statistics">
    <h2>📊 테스트용 통계 페이지</h2>

    <p>🔹 전체 지출 합계: {{ statStore.totalAmount }} 원</p>

    <ul>
      <li v-for="item in statStore.categoryRatios" :key="item.category">
        {{ item.category }}: {{ item.amount }}원 ({{ item.ratio }}%)
      </li>
    </ul>
  </div>
</template> -->
