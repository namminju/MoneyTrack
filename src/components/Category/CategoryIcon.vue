<template>
  <i :class="iconClass"></i>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

// 카테고리별 아이콘 매핑
const categoryIconMap = {
  식비: 'fa-solid fa-utensils',
  교통: 'fa-solid fa-bus',
  문화: 'fa-solid fa-palette',
  급여: 'fa-solid fa-wallet',
  용돈: 'fa-solid fa-coins',
  기타: 'fa-solid fa-question',
};

// 해당 카테고리에 맞는 아이콘 클래스 반환
const iconClass = computed(() => {
  return categoryIconMap[props.category] || categoryIconMap['기타'];
});
</script>
