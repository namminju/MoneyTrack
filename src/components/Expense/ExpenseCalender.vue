<template>
  <div class="calendar">
    <!-- 헤더: 월/년 + 이동 버튼 -->
    <div class="calendar__header">
      <button
        v-if="!editingDate"
        class="calendar__header__button"
        @click="prevMonth"
      >
        <i class="fa-solid fa-angle-left"></i>
      </button>

      <!-- 텍스트 클릭 시 DatePicker 팝업 열기 -->
      <!-- <div @click="togglePicker" class="calendar__header__text">
        {{ currentYear }}년 {{ currentMonth + 1 }}월
      </div> -->

      <DatePicker
        ref="pickerRef"
        v-model="selectedMonthYear"
        type="month"
        :popup-style="{ zIndex: 9999 }"
        :editable="false"
        :clearable="false"
        @change="applyDateChangeFromPicker"
        class="calendar__header__text"
        style="width: 15rem"
      >
        <template #input>
          {{ currentYear }}년 {{ String(currentMonth + 1).padStart(2, '0') }}월
        </template>
      </DatePicker>

      <button
        class="calendar__header__button"
        v-if="!editingDate"
        @click="nextMonth"
      >
        <i class="fa-solid fa-angle-right"></i>
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

    <!-- 날짜 셀 -->
    <div class="calendar__grid">
      <div
        v-for="(date, index) in calendarDates"
        :key="index"
        class="calendar__grid__cell"
        :class="{
          selected: isSelected(date),
          sunday: index % 7 === 0,
          saturday: index % 7 === 6,
        }"
        @click="selectDate(date)"
      >
        <div v-if="date" class="date-number">{{ date.getDate() }}</div>
        <div v-show="hasData(date)" class="summary">
          <div class="summary__income" v-if="getAmount(date, '1')">
            +{{ getAmount(date, '1') }}
          </div>
          <div class="summary__expense" v-if="getAmount(date, '0')">
            -{{ getAmount(date, '0') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import '@/css/expense/expense.css';

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

const emit = defineEmits(['update:selectedDate']);

const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());

const editingDate = ref(false);
const selectedMonthYear = ref(new Date());

// 🔁 DatePicker 팝업 제어용
const pickerRef = ref(null);
const togglePicker = () => {
  pickerRef.value.toggle();
};

function applyDateChangeFromPicker(date) {
  currentYear.value = date.getFullYear();
  currentMonth.value = date.getMonth();
  editingDate.value = false;
}

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

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

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}

function selectDate(date) {
  if (date) {
    emit('update:selectedDate', date);
  }
}

function isSelected(date) {
  if (!date || !props.selectedDate) return false;
  return (
    date.getFullYear() === props.selectedDate.getFullYear() &&
    date.getMonth() === props.selectedDate.getMonth() &&
    date.getDate() === props.selectedDate.getDate()
  );
}

function formatDateToLocalString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function hasData(date) {
  if (!date) return false;
  const dateStr = formatDateToLocalString(date);
  return recordData.value.some((r) => r.date === dateStr);
}

function getAmount(date, type) {
  if (!date) return 0;
  const dateStr = formatDateToLocalString(date);

  const filtered = recordData.value.filter(
    (r) => r.date === dateStr && r.is_salary === Number(type)
  );

  return filtered.reduce((acc, cur) => acc + cur.amount, 0);
}
</script>

<style scoped>
.calendar__header__selects {
  display: flex;
  gap: 8px;
  align-items: center;
}

button {
  border: none;
  cursor: pointer;
}
:deep(.mx-datepicker svg) {
  fill: white !important;
}
:deep(.mx-datepicker) {
  cursor: pointer;
}
</style>
