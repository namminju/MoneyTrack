<template>
  <div class="calendar">
    <!-- 헤더: 월/년 + 이동 버튼 -->
    <div class="calendar__header">
      <button @click="prevMonth">◀</button>
      <span>{{ currentYear }}년 {{ currentMonth + 1 }}월</span>
      <button @click="nextMonth">▶</button>
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
          <div class="summary__income" v-if="getAmount(date, '수입')">
            +{{ getAmount(date, '수입') }}
          </div>

          <div class="summary__expense" v-if="getAmount(date, '지출')">
            -{{ getAmount(date, '지출') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import '@/css/expense/expense.css';

const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());
const selectedDate = ref(today);
import { defineProps, defineEmits } from 'vue';

// 요일
const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
const props = defineProps({
  selectedDate: Date,
});
const emit = defineEmits(['update:selectedDate']);
// 더미 데이터
const recordData = ref([
  { date: '2025-04-06', type: '수입', amount: 10000 },
  { date: '2025-04-06', type: '지출', amount: 5000 },
  { date: '2025-04-07', type: '지출', amount: 8000 },
  { date: '2025-04-22', type: '지출', amount: 5000 },
  { date: '2025-04-29', type: '지출', amount: 8000 },
  { date: '2025-04-29', type: '수입', amount: 8000 },
]);

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
    selectedDate.value = date;
    console.log('📅 선택된 날짜:', date);
    emit('update:selectedDate', date);
  }
}

// 선택된 날짜인지 확인
function isSelected(date) {
  if (!date || !selectedDate.value) return false;
  return (
    date.getFullYear() === selectedDate.value.getFullYear() &&
    date.getMonth() === selectedDate.value.getMonth() &&
    date.getDate() === selectedDate.value.getDate()
  );
}

// 해당 날짜에 기록이 있는지
function hasData(date) {
  if (!date) return false;
  const dateStr = date.toISOString().slice(0, 10);
  return recordData.value.some((r) => r.date === dateStr);
}

// 수입/지출 합계
function getAmount(date, type) {
  if (!date) return 0;
  const dateStr = date.toISOString().slice(0, 10);
  const filtered = recordData.value.filter(
    (r) => r.date === dateStr && r.type === type
  );
  return filtered.reduce((acc, cur) => acc + cur.amount, 0);
}
</script>
