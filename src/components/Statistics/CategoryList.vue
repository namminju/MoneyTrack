<template>
  <div class="category-list">
    <h2>카테고리별 비율</h2>
    <div
      v-for="item in categoryRatios"
      :key="item.category"
      class="category-list_item"
    >
      <span class="__label">{{ item.category }}</span>
      <div class="category-list__container">
        <div
          class="category-list__bar__fill"
          :style="{
            width: `${item.ratio}%`,
            backgroundColor: getColor(item.category),
          }"
        ></div>
      </div>
      <span class="percentage" :style="{ color: getColor(item.category) }"
        >{{ item.ratio }}%</span
      >
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
import '@/css/statistics/statistics.css';

const props = defineProps({
  categoryRatios: Array,
});

const getColor = (category) => {
  const colors = {
    식비: '#FF5733',
    교통비: '#33FF57',
    문화여가: '#3357FF',
    쇼핑: '#FF33A1',
    집: '#FFA133',
    건강: '#33FFA1',
    교육: '#FF6384',
    반려동물: '#36A2EB',
    금융: '#FFCE56',
    수입: '#8AFFC1',
    뷰티: '#9966FF',
    기타: '#FF9F40',
  };
  return colors[category] || '#000000'; // 기본 색상
};
</script>
<style scoped>
.category-list {
  padding: 1rem;
  width: 300px;
}

.category-list_item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.__label {
  width: 50px;
}

.category-list__container {
  flex: 1;
  height: 10px;

  margin: 0 10px;
  border-radius: 5px;
  overflow: hidden;
}

.category-list__bar__fill {
  height: 100%;
  transition: width 0.3s ease;
}

.percentage {
  width: 40px;
  text-align: right;
  font-weight: bold;
}
</style>
