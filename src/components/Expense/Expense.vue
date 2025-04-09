<template>
  //적응형 스타일 적용
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
import { ref, onMounted, watch } from 'vue';
import styles from '@/css/expense/expense.module.css';

//components
import ExpenseCalendar from './ExpenseCalender.vue';
import ExpenseFilterContainer from './ExpenseFilterContainer.vue';

// stores
import { useExpenseStore } from '@/stores/expense';
import { useCategoryStore } from '@/stores/category';

const expenseStore = useExpenseStore();
const categoryStore = useCategoryStore();
const user = ref('');

//오늘 날짜로 default 설정
const today = new Date();
const selectedDate = ref(today);

// user 변경되면 데이터 다시 받아오기
watch(user, async (newUser) => {
  if (newUser && newUser.id) {
    await expenseStore.fetchExpenseList();
  }
});

//db 데이터 fetch
onMounted(async () => {
  const mockUser = {
    id: '1',
    name: '홍길동',
    email: 'hong@gmail.com',
    is_data: true,
  };

  try {
    // 임시 로그인
    sessionStorage.setItem('user', JSON.stringify(mockUser));

    user.value = JSON.parse(sessionStorage.getItem('user'));

    await categoryStore.fetchcategoryList();
    await expenseStore.fetchExpenseList();
  } catch (e) {
    console.error('지출 데이터 불러오기 실패:', e);
  }
});
</script>
