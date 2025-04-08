<template>
  <div class="filter-box">
    <div class="type__buttons">
      <button
        v-for="type in typeOptions"
        :key="type.id"
        @click="selectedType = type"
        :class="{ active: selectedType.value === type }"
      >
        {{ type.name }}
      </button>
    </div>
    <div class="period_buttons">
      <button
        v-for="period in periodOptions"
        :key="period"
        @click="selectedPeriod = period"
        :class="{ active: selectedPeriod.value === period }"
      >
        {{ period.name }}
      </button>
    </div>

    <div class="date_navigation">
      <button @click="goToPrev">◀</button>
      <span class="current_date" @click="showDateSelector = true">{{
        formattedDate
      }}</span>
      <button @click="goToNext">▶</button>
    </div>

    <button @click="applyFilter">적용</button>

    <div v-if="showDateSelector" class="date_selector_modal">
      <div class="modal_content">
        <div class="year_header">
          <button @click="selectedYear--">◀</button>
          <span>{{ selectedYear }}년 </span>
          <button @click="selectedYear++">▶</button>
        </div>

        <div v-if="selectedPeriod.value === '월간'" class="month_grid">
          <button v-for="month in 12" :key="month" @click="selectMonth(month)">
            {{ month }}월
          </button>
        </div>

        <div v-else class="confirm_year_only">
          <button @click="selectYearOnly">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { typeOptions, periodOptions } from '@/stores/useStatisticsStore.js';

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
