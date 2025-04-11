<template>
  <div class="category-list">
    <div class="w-100">
      <div class="w-100 text-center">
        <div class="fw-600 fs-20">카테고리별 비율</div>
      </div>

      <div class="clear-10"></div>

      <div
        v-for="item in filteredcategoryRatios"
        :key="item.category"
        class="category-list_item"
      >
        <div class="__label">
          {{ item.category }}
        </div>

        <div class="category-list__container">
          <!-- 가시성을 위한 2배길이 -->
          <div
            class="category-list__bar__fill"
            :style="{
              width: `${item.ratio * 2}%`,
              backgroundColor: getColor(item.category),
            }"
          ></div>
        </div>
        <div class="percentage" :style="{ color: getColor(item.category) }">
          {{ item.ratio }}%
        </div>

        <div
          :style="{ color: getColor(item.category) }"
          class="fw-600 text-end"
        >
          {{ parseInt(item.amount).toLocaleString('ko-KR') }} 원
        </div>
      </div>
      <!-- v-for end -->
    </div>
  </div>
</template>
<script setup>
import { defineProps, computed } from 'vue';
import '@/css/statistics/statistics.css';

const props = defineProps({
  categoryRatios: Array,
});

const filteredcategoryRatios = computed(() => {
  return props.categoryRatios.filter((item) => item.category !== '수입');
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
  display: flex;
  padding: 1rem;
  width: 100%;
}
.category-list_item {
  display: grid;
  align-items: center;

  grid-template-columns: 3fr 8fr 3fr 3fr;
  gap: 2rem;
  max-width: 700px;
  margin: auto;
  margin-bottom: 10px;
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

@media (max-width: 600px) {
  .category-list_item {
    display: grid;
    align-items: center;
    margin-bottom: 10px;
    grid-template-columns: 5fr 7fr 3fr 6fr;
    gap: 0.8rem;
    font-size: 1.4rem;
    font-weight: 600;
  }
}
</style>
