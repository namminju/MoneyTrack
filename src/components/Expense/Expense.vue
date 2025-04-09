<template>
  <div :class="styles['expense-full-container']">
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
import styles from '@/css/expense/expense.module.css';

import ExpenseCalendar from './ExpenseCalender.vue';
import ExpenseFilterContainer from './ExpenseFilterContainer.vue';
import { useExpenseStore } from '@/stores/expense';
import { useCategoryStore } from '@/stores/category';

const expenseStore = useExpenseStore();
const categoryStore = useCategoryStore();

const today = new Date();
const selectedDate = ref(today);

onMounted(async () => {
  try {
    await categoryStore.fetchcategoryList();
    await expenseStore.fetchExpenseList();
  } catch (e) {
    console.error('지출 데이터 불러오기 실패:', e);
  }
});
</script>
