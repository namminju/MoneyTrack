<template>
  <div class="filter-box">
    <!-- <DatePicker
      v-model="currentDate"
      :type="selectedPeriod.id === 1 ? 'month' : 'year'"
      format="yyyy-MM"
      locale="ko"
      placeholder="날짜 선택"
      :key="selectedPeriod.id"
      :editable="false"
      :input-class="'datepicker-input'"
      @change="changeDate"
    /> -->
    <div class="date_navigation date_navigation__header">
      <!-- <button @click="goToPrev" style="color: white">◀</button> -->
      <!-- <span class="current_date" @click="showDateSelector = true">{{
        formattedDate
      }}</span> -->
      <DatePicker
        class="datepicker-design"
        v-model="currentDate"
        :type="selectedPeriod.id === 1 ? 'month' : 'year'"
        format="yyyy-MM"
        :editable="false"
        :clearable="false"
        input-class="hidden-datepicker-input"
        @change="changeDate"
        ><template #input>
          {{
            selectedPeriod.id === 1
              ? `${currentDate.getFullYear()}년 ${String(
                  currentDate.getMonth() + 1
                ).padStart(2, '0')}월`
              : `${currentDate.getFullYear()}년`
          }}
        </template>
      </DatePicker>
      <div v-if="periodOptions.length > 0">
        <button
          style="color: white"
          class="perio-button"
          @click="onPeriodSelect()"
        >
          <i class="fa-solid fa-repeat" />
          <span class="m-hidden">
            {{ selectedPeriod.id === 1 ? ' month' : ' year' }}</span
          >
        </button>
      </div>
      <!-- <button @click="goToNext" style="color: white">▶</button> -->
    </div>
    <div class="statistics_calender_popup" v-if="showDatepicker">
      <DatePicker
        class="datepicker-design"
        v-model="currentDate"
        :type="selectedPeriod.id === 1 ? 'month' : 'year'"
        format="yyyy-MM"
        :editable="false"
        :clearable="false"
        input-class="hidden-datepicker-input"
        @change="changeDate"
        style="width: 15rem"
        ><template #input>
          {{
            selectedPeriod.id === 1
              ? `${currentDate.getFullYear()}년 ${String(
                  currentDate.getMonth() + 1
                ).padStart(2, '0')}월`
              : `${currentDate.getFullYear()}년`
          }}
        </template>
      </DatePicker>
    </div>
    <div class="filter-icon-container">
      <div class="">
        <select v-model="selectedType">
          <option v-for="type in typeOptions" :key="type.id" :value="type">
            {{ type.name }}
          </option>
        </select>
      </div>
      <i class="fa-solid fa-filter" style="color: var(--trk-dark-green)" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import { typeOptions, periodOptions } from '@/stores/useStatisticsStore.js';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

const emit = defineEmits(['updateFilter']);

const showDatepicker = ref(false);
const selectedType = ref(typeOptions[0]);
const selectedPeriod = ref(periodOptions[0]);
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
const changeDate = (date) => {
  if (selectedPeriod.value?.id === 1) {
    // 월간 통계: 선택한 날짜 그대로 사용
    currentDate.value = date;
  } else {
    // 연간 통계: 연도만 저장
    currentDate.value = new Date(
      date.getFullYear(),
      currentDate.value.getMonth()
    );
  }
  showDatepicker.value = false;

  applyFilter();
};
watch(currentDate, (newVal) => {
  // console.log('📆 선택된 날짜:', newVal);
  applyFilter();
});

// const toggleDatepicker = () => {
//   showDatepicker.value = !showDatepicker.value;
// };

// const showDateSelector = ref(false);

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

watch(selectedType, () => {
  applyFilter();
});

const onPeriodSelect = (period) => {
  selectedPeriod.value =
    selectedPeriod.value.id === 1 ? periodOptions[1] : periodOptions[0];
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
    month: selectedPeriod.value.id === 1 ? currentDate.value.getMonth() + 1 : 0,
  });
};
// console.log('selectedPeriod:', selectedPeriod.value);
// console.log('periodOptions:', periodOptions);
// console.log('currentDate:', currentDate.value);
</script>
<style scoped>
.filter-box {
  width: 100%;
}
.filter-icon-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.6rem;
}
.filter-icon-container i {
  font-size: 2.4rem;
}
.date_navigation__header {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  color: var(--trk-dark-green);
  font-weight: bold;
  font-size: 2rem;
  padding: clamp(4px, 1.6rem, 8px);
  background-color: var(--trk-ivory);
  border-radius: 2rem;
}
/* datepicker style 강제 지정 */
:deep(.mx-datepicker svg) {
  width: 2.4rem;
  height: 2.4rem;
  fill: var(--trk-dark-green);
}
:deep(.mx-datepicker) {
  text-align: center;
  cursor: pointer;
}

@media (max-width: 380px) {
  :deep(.mx-datepicker) {
    width: 68%;
  }
  .date_navigation__header {
    padding: 0;
  }
  .perio-button {
    font-size: 1rem;
  }
  .m-hidden {
    display: none;
  }
}
/* select style */
select {
  background-color: var(--trk-green);
  color: white;
  border: 0;
  border-radius: 1.2rem;
  font-weight: 600;
  appearance: none;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
