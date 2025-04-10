<template>
  <div class="calendar m-3">
    <!-- calendar header -->
    <div class="calendar__header">
      <!-- 이전 달 이동 버튼 -->
      <button class="calendar__header__button" @click="prevMonth">
        <i class="fa-solid fa-angle-left" />
      </button>

      <!-- 원하는 달 선택 -->
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

      <!-- 다음 달 이동 버튼 -->
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
        :recordData="props.recordData"
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

// default를 오늘로 지정
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

<!-- style -->
<style scoped>
/* 달력 */
.calendar {
  display: grid;
  grid-auto-rows: 0.1fr 0.1fr 1fr;
  border-radius: 2.4rem;
  width: 68%;
  padding: 0 0 1rem 0;
  margin: 0 auto;
  font-family: sans-serif;
  background-color: var(--trk-ivory);
}
.calendar__header {
  height: 5rem;
  background-color: var(--trk-green);
  display: flex;
  border-radius: 2.4rem 2.4rem 0 0;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  padding: clamp(4px, 1.6rem, 8px);
}

.calendar__header__button {
  font-size: 2rem;
  margin: 0 4%;
  color: white;
  border: none;
  background-color: transparent;
}
.calendar__weekdays,
.calendar__grid {
  font-weight: bold;
  font-size: 1.6rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}
.calendar__weekdays {
  font-weight: bold;
}
.calendar__weekdays__day {
  padding: 1rem;
  position: relative;
}

.sunday {
  color: red;
}

.saturday {
  color: blue;
}

@media (max-width: 1024px) {
  .calendar {
    width: 96vw;
    height: auto;
  }
  .calendar__header {
    width: 96vw;
  }

  .calendar__grid__cell {
    height: clamp(20px, 8vh, 100px);
  }
}

/* datepicker style 강제 지정 */
:deep(.mx-datepicker svg) {
  fill: white !important;
}
:deep(.mx-datepicker) {
  cursor: pointer;
}
</style>
