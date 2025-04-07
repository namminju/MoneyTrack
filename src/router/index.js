import { createRouter, createWebHistory } from 'vue-router';

import Header from '../components/Header/Header.vue';

import Login from '../components/User/Login.vue';
import Join from '../components/User/Join.vue';
import Home from '../components/Home/Home.vue';
import Expense from '@/components/Expense/Expense.vue';
import ExpenseDetail from '@/components/ExpenseDetail/ExpenseDetail.vue';
import Statistics from '@/components/Statistics/Statistics.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //기본 home
      path: '/home',
      name: 'home',
      components: {
        header: Header,
        default: Home,
      },
    },
    {
      //로그인
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      //회원가입
      path: '/join',
      name: 'join',
      component: Join,
    },
    {
      //지출&기록 페이지
      path: '/expense',
      name: 'expense',
      components: {
        header: Header,
        default: Expense,
      },
    },
    {
      //지출 자세히
      path: '/expenseDetail/:id',
      name: 'expenseDetail',
      components: {
        header: Header,
        default: ExpenseDetail,
      },
    },
    {
      //통계
      path: '/statistics',
      name: 'statistics',
      components: {
        header: Header,
        default: Statistics,
      },
    },
  ],
});

export default router;
