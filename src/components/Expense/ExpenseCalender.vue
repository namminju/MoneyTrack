<template>
  <div class="calendar">
    <!-- calendar header -->
    <div class="calendar__header">
      <button class="calendar__header__button" @click="prevMonth">
        <i class="fa-solid fa-angle-left" />
      </button>

      <DatePicker
        v-model="selectedMonthYear"
        type="month"
        :popup-style="{ zIndex: 9999 }"
        :editable="false"
        :clearable="false"
        @change="applyDateChangeFromPicker"
        class="calendar__header__text"
        style="width: 15rem"
      >
        <!-- input 창 대체  -->
        <template #input>
          {{ currentYear }}년 {{ String(currentMonth + 1).padStart(2, '0') }}월
        </template>
      </DatePicker>

      <button class="calendar__header__button" @click="nextMonth">
        <i class="fa-solid fa-angle-right" />
      </button>
    </div>

    <!-- 요일 -->
    <div class="calendar__weekdays">
      <div
        v-for="(day, index) in weekDays"
        class="calendar__weekdays__day"
        :class="{
          sunday: index % 7 === 0,
          saturday: index % 7 === 6,
        }"
        :key="day"
      >
        {{ day }}
      </div>
    </div>
    <!-- 날짜 cell -->
    <div class="calendar__grid">
      <ExpenseCalenderCell
        v-for="(date, index) in calendarDates"
        :key="index"
        :date="date"
        :index="index"
        :selectedDate="props.selectedDate"
        :recordData="recordData"
        @select="selectDate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import DatePicker from 'vue-datepicker-next';

// css
import 'vue-datepicker-next/index.css';
import '@/css/expense/expense.css';

// components
import ExpenseCalenderCell from './ExpenseCalenderCell.vue';

// props
const props = defineProps({
  selectedDate: {
    type: Date,
    required: true,
  },
  recordData: {
    type: Array,
    required: true,
  },
});

const recordData = computed(() => props.recordData);

const today = new Date();

const selectedMonthYear = ref(today);
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());

// event 정의
const emit = defineEmits(['update:selectedDate']);

// 선택 변경
function applyDateChangeFromPicker(date) {
  currentYear.value = date.getFullYear();
  currentMonth.value = date.getMonth();
}

//요일 지정
const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

// 날짜 계산
const calendarDates = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekDay = firstDay.getDay();

  const dates = [];

  for (let i = 0; i < startWeekDay; i++) {
    dates.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(currentYear.value, currentMonth.value, i));
  }

  return dates;
});

//이전 달로 변경
function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}

//다음 달로 변경
function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}

//날짜 선택
function selectDate(date) {
  if (date) {
    emit('update:selectedDate', date);
  }
}
</script>

<style scoped>
/* datepicker style 강제 지정정 */
:deep(.mx-datepicker svg) {
  fill: white !important;
}
:deep(.mx-datepicker) {
  cursor: pointer;
}
</style>
