<!-- components/expense/CategoryButton.vue -->
<!-- option을 반환 select 테그 내부에  사용. 기본 스타일-->
<!-- select에서 style 및 변수로 적용 -->
<!-- components/expense/CategoryButton.vue -->
<!-- category를 db에서 가져와 보여줌 -->
<!-- 무조건 처음 값으로 지정 -->

<template>
  <option
    v-for="(category, index) in categories"
    :key="index"
    :value="category"
  >
    <!-- 카테고리 값 출력 -->
    {{ category.name }}
  </option>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useCategoryStore } from '@/stores/category';

// select에 초기값 넘겨주기 위한 이벤트
const emit = defineEmits(['init']);

// 카테고리 가져오기(from DB)
const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categoryList[0] || []);

// categoryList가 로드되면 첫 번째 값을 emit
watch(
  categories,
  (newVal) => {
    if (newVal.length > 0) {
      emit('init', newVal[0]);
    }
  },
  { immediate: true }
);
</script>
