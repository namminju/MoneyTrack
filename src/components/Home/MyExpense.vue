<template>
  <div class="home-card">
    <div class="position-relative w-100">
      <div class="fw-600 fs-20 trk-text-6">지난주보다 이만큼 아꼈어요!</div>
      <div class="home-card__income">
        <div class="home-card__compare">
          <div class="clear-5"></div>
          <div>지난주: {{ parseInt(lastWeekTotal).toLocaleString('ko-KR') }}</div>
          <div class="clear-5"></div>
          <div>이번주: {{ parseInt(thisWeekTotal).toLocaleString('ko-KR') }}</div>
        </div>
        <div>
          <span class="fs-30 home-card__income__span" :class="parseInt(comparedValue) < 0 ? 'text-danger' : 'text-primary'">
            {{ parseInt(comparedValue).toLocaleString('ko-KR') }} 원
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  thisWeekTotal: Number,
  lastWeekTotal: Number
})

const comparedValue = ref('');

watch(() => props.thisWeekTotal, (thisWeekTotal) => {
  const lastWeekTotal = props.lastWeekTotal;
  // 비교시작
  if (thisWeekTotal < lastWeekTotal) {
    comparedValue.value = lastWeekTotal - thisWeekTotal;
  }
  else {
    comparedValue.value = thisWeekTotal - lastWeekTotal;
    comparedValue.value *= (-1);
  }
});

</script>

<style scoped>
  .home-card__income {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
  .home-card__income__span {
    position: absolute;
    bottom: 0px;
    right: 0px;
    font-weight: 600;
  }

  .home-card__compare {
    position: absolute;
    bottom: 0px;
    font-weight: 600;
  }
</style>