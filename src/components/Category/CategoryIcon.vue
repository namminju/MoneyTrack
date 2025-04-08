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
  식비: 'fa-solid fa-utensils', // 식사 아이콘
  교통비: 'fa-solid fa-bus', // 버스 아이콘
  '문화/여가': 'fa-solid fa-palette', // 팔레트 아이콘
  건강: 'fa-solid fa-heart-pulse', // 건강 심장 아이콘
  쇼핑: 'fa-solid fa-bag-shopping', // 쇼핑백 아이콘
  뷰티: 'fa-solid fa-spa', // 스파/뷰티 아이콘
  집: 'fa-solid fa-house', // 집 아이콘
  금융: 'fa-solid fa-piggy-bank', // 저금통 아이콘
  교육: 'fa-solid fa-book', // 책 아이콘
  반려동물: 'fa-solid fa-dog', // 강아지 아이콘
  기타: 'fa-solid fa-question', // 물음표 아이콘
};

// 해당 카테고리에 맞는 아이콘 클래스 반환
const iconClass = computed(() => {
  return categoryIconMap[props.category] || categoryIconMap['기타'];
});
</script>
