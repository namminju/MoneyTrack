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

      <!-- 년/월 표시 또는 드롭다운 -->
      <div
        v-if="!editingDate"
        @click="editingDate = true"
        class="calendar__header__text"
      >
        {{ currentYear }}년 {{ currentMonth + 1 }}월
      </div>

      <div v-else class="calendar__header__selects">
        <select v-model="tempYear">
          <option v-for="year in yearRange" :key="year" :value="year">
            {{ year }}
          </option></select
        >년
        <select v-model="tempMonth">
          <option v-for="month in 12" :key="month" :value="month - 1">
            {{ month }}
          </option>
        </select>
        월
        <button
          class="calendar__header__selects__confirm-button"
          @click="applyDateChange"
        >
          확인
        </button>
        <!-- <button @click="editingDate = false">취소</button> -->
      </div>

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
          <div class="summary__income" v-if="getAmount(date, 1)">
            +{{ getAmount(date, 1) }}
          </div>
          <div class="summary__expense" v-if="getAmount(date, 2)">
            -{{ getAmount(date, 2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
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

console.log(props.recordData);
const emit = defineEmits(['update:selectedDate']);

const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());

// 날짜 수정 드롭다운 상태
const editingDate = ref(false);
const tempYear = ref(currentYear.value);
const tempMonth = ref(currentMonth.value);
const yearRange = Array.from({ length: 11 }, (_, i) => 2020 + i);

function applyDateChange() {
  currentYear.value = tempYear.value;
  currentMonth.value = tempMonth.value;
  editingDate.value = false;
}
function formatDateToLocalString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 요일
const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

// 달력용 날짜 계산
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

// 월 이동
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

// 날짜 선택
function selectDate(date) {
  if (date) {
    emit('update:selectedDate', date);
  }
}

// 선택된 날짜인지 확인
function isSelected(date) {
  if (!date || !props.selectedDate) return false;
  return (
    date.getFullYear() === props.selectedDate.getFullYear() &&
    date.getMonth() === props.selectedDate.getMonth() &&
    date.getDate() === props.selectedDate.getDate()
  );
}

// 해당 날짜에 기록이 있는지
function hasData(date) {
  if (!date) return false;
  const dateStr = formatDateToLocalString(date);
  return recordData.value.some((r) => r.date === dateStr);
}

// 수입/지출 합계
function getAmount(date, type) {
  if (!date) return 0;
  const dateStr = formatDateToLocalString(date);
  const filtered = recordData.value.filter(
    (r) => r.date === dateStr && r.type === type
  );
  return filtered.reduce((acc, cur) => acc + cur.amount, 0);
}
</script>

<style scoped>
.calendar__header__selects {
  display: flex;
}

button {
  border: none;
}
</style>
