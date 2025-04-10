import { createRouter, createWebHistory } from "vue-router";
import userService from "@/utils/userService";

/**Router Pages */
import Header from "../components/Header/Header.vue";
import Login from "../components/User/Login.vue";
import FindId from '../components/User/FindId.vue';
import FindPw from '../components/User/FindPw.vue';
import Join from "../components/User/Join.vue";
import Mypage from '../components/User/Mypage.vue';
import Home from "../components/Home/Home.vue";
import Expense from "@/components/Expense/Expense.vue";
import ExpenseDetail from "@/components/ExpenseDetail/ExpenseDetail.vue";
import Statistics from "@/components/Statistics/Statistics.vue";
import ExpenseEdit from "@/components/ExpenseDetail/ExpenseEdit.vue";
import NotFound from '@/components/NotFound/NotFound.vue';
import Redirect from '@/components/Redirect/Redirect.vue';
import UiTest from "@/components/common/uiTest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //기본
      path: "/",
      name: "",
      components: {
        header: Header,
        default: Home,
      },
    },
    {
      //기본 home
      path: "/home",
      name: "home",
      components: {
        header: Header,
        default: Home,
      },
    },
    {
      //리다이렉팅
      path: "/redirect",
      name: "redirect",
      components: {
        header: Header,
        default: Redirect,
      },
    },
    {
      //로그인
      path: '/login',
      name: 'login',
      components: {
        header: Header,
        default: Login,
      },
      beforeEnter: (to, from, next) => {
        //로그인 판별 후 리다렉션
        if (userService.checkIsLogin()) {
          next('/');
        }
        else {
          next();
        }
      }
    },
    {
      //회원가입
      path: '/join',
      name: 'join',
      components: {
        header: Header,
        default: Join,
      },
      beforeEnter: (to, from, next) => {
        //로그인 판별 후 리다렉션
        if (userService.checkIsLogin()) {
          next('/');
        }
        else {
          next();
        }
      }
    },
    {
      //마이페이지
      path: '/mypage',
      name: 'mypage',
      components: {
        header: Header,
        default: Mypage,
      },
      beforeEnter: (to, from, next) => {
        //로그인 판별 후 리다렉션
        if (userService.checkIsLogin()) {
          next();
        }
        else {
          next('/');
        }
      }
    },
    {
      //지출&기록 페이지
      path: "/expense",
      name: "expense",
      components: {
        header: Header,
        default: Expense,
      },
      beforeEnter: (to, from, next) => {
        //로그인 판별 후 리다렉션
        if (userService.checkIsLogin()) {
          next();
        }
        else {
          next('/');
        }
      }
    },
    {
      //지출 자세히
      path: "/expenseDetail/:id",
      name: "expenseDetail",
      components: {
        header: Header,
        default: ExpenseDetail,
      },
      beforeEnter: (to, from, next) => {
        //로그인 판별 후 리다렉션
        if (userService.checkIsLogin()) {
          next();
        }
        else {
          next('/');
        }
      }
    },
    {
      //지출 자세히
      path: "/expenseEdit/:id",
      name: "expenseEdit",
      components: {
        header: Header,
        default: ExpenseEdit,
      },
      beforeEnter: (to, from, next) => {
        //로그인 판별 후 리다렉션
        if (userService.checkIsLogin()) {
          next();
        }
        else {
          next('/');
        }
      }
    },
    {
      //id 없이 detail 페이지 요청시 expense 페이지로 이동
      path: "/expenseDetail",
      redirect: "/expense",
    },
    {
      //id 없이 edit 페이지 요청시 expense 페이지로 이동
      path: "/expenseEdit",
      redirect: "/expense",
    },
    {
      //통계
      path: "/statistics",
      name: "statistics",
      components: {
        header: Header,
        default: Statistics,
      },
      beforeEnter: (to, from, next) => {
        //로그인 판별 후 리다렉션
        if (userService.checkIsLogin()) {
          next();
        }
        else {
          next('/');
        }
      }
    },
    {
      //에러페이지
      path: '/:pathMatch(.*)*', // 모든 경로에 매칭
      name: 'NotFound',
      components: {
        header: Header,
        default: NotFound,
      },
    },
    {
      // 라이브시 삭제
      // ui 테스트용
      path: "/uiTest",
      name: "uiTest",
      components: {
        header: Header,
        default: UiTest,
      },
    },
  ],
});

export default router;
