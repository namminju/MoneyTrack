<template>
  <div class="filter-box">
    <div class="type__buttons">
      <button
        v-for="type in typeOptions"
        :key="type.id"
        style="color: white"
        @click="selectedType.value = type"
        :class="{ active: selectedType.value === type }"
      >
        {{ type.name }}
      </button>
    </div>
    <div class="period_buttons" v-if="periodOptions.length > 0">
      <button
        v-for="period in periodOptions"
        :key="period.id"
        style="color: white"
        @click="selectedPeriod.value = period"
        :class="{ active: selectedPeriod.value?.id === period.id }"
      >
        {{ period.name }}
      </button>
    </div>
    <DatePicker
      v-if="selectedPeriod.value"
      v-model="currentDate"
      :type="selectedPeriod.value?.id === 1 ? 'month' : 'year'"
      format="yyyy-MM"
      locale="ko"
      placeholder="날짜 선택"
    />
    <div class="date_navigation">
      <button @click="goToPrev" style="color: white">◀</button>
      <span class="current_date" @click="showDateSelector = true">{{
        formattedDate
      }}</span>
      <button @click="goToNext" style="color: white">▶</button>
    </div>
    <button @click="applyFilter" style="color: white">적용</button>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import { typeOptions, periodOptions } from '@/stores/useStatisticsStore.js';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

const emit = defineEmits(['updateFilter']);

const selectedType = ref(typeOptions[0]);
const selectedPeriod = ref(periodOptions[0] || { id: 1, name: '기본값' });
const currentDate = ref(new Date());

// periodOptions가 비동기로 로드될 경우 초기화 처리
watch(
  () => periodOptions,
  (newOptions) => {
    if (newOptions && newOptions.length > 0) {
      selectedPeriod.value = newOptions[0];
    }
  },
  { immediate: true }
);

watch(currentDate, (newVal) => {
  console.log('📆 선택된 날짜:', newVal);
});

const showDateSelector = ref(false);

watch(selectedPeriod, (newVal) => {
  if (newVal?.id === 1) {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth()
    );
  } else {
    currentDate.value = new Date(currentDate.value.getFullYear(), 0);
  }
});

const formattedDate = computed(() => {
  const y = currentDate.value.getFullYear();
  const m = currentDate.value.getMonth() + 1;
  return selectedPeriod.value?.id === 1 ? `${y}년 ${m}월` : `${y}년`;
});

const goToPrev = () => {
  const d = new Date(currentDate.value);
  selectedPeriod.value?.id === 1
    ? d.setMonth(d.getMonth() - 1)
    : d.setFullYear(d.getFullYear() - 1);
  currentDate.value = d;
};

const goToNext = () => {
  const d = new Date(currentDate.value);
  selectedPeriod.value?.id === 1
    ? d.setMonth(d.getMonth() + 1)
    : d.setFullYear(d.getFullYear() + 1);
  currentDate.value = d;
};

const applyFilter = () => {
  if (!selectedType.value || !selectedPeriod.value) {
    console.error('필터 데이터가 유효하지 않습니다.');
    return;
  }

  emit('updateFilter', {
    type: selectedType.value,
    period: selectedPeriod.value,
    year: currentDate.value.getFullYear(),
    month: currentDate.value.getMonth() + 1,
  });
};
console.log('selectedPeriod:', selectedPeriod.value);
console.log('periodOptions:', periodOptions);
console.log('currentDate:', currentDate.value);
</script>
