<template>
  <div class="filter-box">
    <div class="type__buttons">
      <button
        v-for="type in typeOptions"
        :key="type.id"
        style="color: white"
        @click="selectedType = type"
        :class="{ active: selectedType.value === type }"
      >
        {{ type.name }}
      </button>
    </div>
    <div class="period_buttons">
      <button
        v-for="period in periodOptions"
        :key="period.id"
        style="color: white"
        @click="selectedPeriod.value = period"
        :class="{ active: selectedPeriod.value === period.id }"
      >
        {{ period.name }}
      </button>
    </div>
    <DatePicker
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
const selectedPeriod = ref(periodOptions[0]);
const currentDate = ref(new Date());
const selectedYear = ref(currentDate.value.getFullYear());
const showDateSelector = ref(false);

const formattedDate = computed(() => {
  const y = currentDate.value.getFullYear();
  const m = currentDate.value.getMonth() + 1;
  return selectedPeriod.value.id === 1 ? `${y}년 ${m}월` : `${y}년`;
});

watch(currentDate, (newVal) => {
  console.log('📆 선택된 날짜:', newVal);
});

const goToPrev = () => {
  const d = new Date(currentDate.value);
  selectedPeriod.value.id === 1
    ? d.setMonth(d.getMonth() - 1)
    : d.setFullYear(d.getFullYear() - 1);
  currentDate.value = d;
};

const goToNext = () => {
  const d = new Date(currentDate.value);
  selectedPeriod.value.id === 1
    ? d.setMonth(d.getMonth() + 1)
    : d.setFullYear(d.getFullYear() + 1);
  currentDate.value = d;
};

const selectMonth = (month) => {
  const newDate = new Date(selectedYear.value, month - 1);
  currentDate.value = newDate;
  showDateSelector.value = false;
};

const selectYearOnly = () => {
  currentDate.value = new Date(selectedYear.value, 0);
  showDateSelector.value = false;
};

const applyFilter = () => {
  console.log('✅ 필터 적용됨!', selectedType.value, selectedPeriod.value);
  emit('updateFilter', {
    type: selectedType.value,
    period: selectedPeriod.value,
    year: currentDate.value.getFullYear(),
    month: currentDate.value.getMonth() + 1,
  });
};
</script>
