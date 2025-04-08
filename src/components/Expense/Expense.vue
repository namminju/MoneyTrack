<template>
  <div class="expense-full-container">
    <ExpenseCalendar
      :recordData="expenseStore.expenseList"
      v-model:selectedDate="selectedDate"
    />
    <ExpenseFilterContainer
      :transactions="expenseStore.expenseList"
      :selectedDate="selectedDate"
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import '@/css/expense/expense.css';
import ExpenseCalendar from './ExpenseCalender.vue';
import ExpenseFilterContainer from './ExpenseFilterContainer.vue';
import { useExpenseStore } from '@/stores/expense';

const expenseStore = useExpenseStore();

const today = new Date();
const selectedDate = ref(today);

onMounted(async () => {
  try {
    await expenseStore.fetchExpenseList();
  } catch (e) {
    console.error('지출 데이터 불러오기 실패:', e);
  }
});

// 더미 데이터
// const recordData = ref([
//   {
//     date: '2025-04-06',
//     time: '09:30',
//     type: '수입',
//     amount: 10000,
//     memo: '아르바이트 월급',
//     category: '급여',
//   },
//   {
//     date: '2025-04-06',
//     time: '13:15',
//     type: '지출',
//     amount: 5000,
//     memo: '점심 - 김밥',
//     category: '식비',
//   },
//   {
//     date: '2025-04-07',
//     time: '18:45',
//     type: '지출',
//     amount: 8000,
//     memo: '카페',
//     category: '식비',
//   },
//   {
//     date: '2025-04-22',
//     time: '11:00',
//     type: '지출',
//     amount: 5000,
//     memo: '버스비',
//     category: '교통',
//   },
//   {
//     date: '2025-04-29',
//     time: '20:00',
//     type: '지출',
//     amount: 8000,
//     memo: '야식 - 라면',
//     category: '식비',
//   },
//   {
//     date: '2025-04-29',
//     time: '08:00',
//     type: '수입',
//     amount: 8000,
//     memo: '용돈',
//     category: '용돈',
//   },
// ]);
</script>
