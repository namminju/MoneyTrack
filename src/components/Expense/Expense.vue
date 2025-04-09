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
import { reactive, ref, onMounted, watch } from 'vue';
import styles from '@/css/expense/expense.module.css';

import ExpenseCalendar from './ExpenseCalender.vue';
import ExpenseFilterContainer from './ExpenseFilterContainer.vue';
import { useExpenseStore } from '@/stores/expense';
import { useCategoryStore } from '@/stores/category';

const expenseStore = useExpenseStore();
const categoryStore = useCategoryStore();
const user = ref('');

const today = new Date();
const selectedDate = ref(today);

watch(user, async (newUser) => {
  if (newUser && newUser.id) {
    await expenseStore.fetchExpenseList(newUser.id);
  }
});

onMounted(async () => {
  const mockUser = {
    id: '2',
    name: '홍길동',
    email: 'hong@gmail.com',
    is_data: true,
  };

  try {
    // 임시 로그인
    sessionStorage.setItem('user', JSON.stringify(mockUser));

    user.value = JSON.parse(sessionStorage.getItem('user'));

    await categoryStore.fetchcategoryList(user.value.id);
    await expenseStore.fetchExpenseList(user.value.id);
  } catch (e) {
    console.error('지출 데이터 불러오기 실패:', e);
  }
});
</script>
