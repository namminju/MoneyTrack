<template>
  <div class="w-100 min-h-50 p-4">
    <div class="home-box">

        <div class="home-box__content max-w-35" v-show="isUser">
          <MyTotal>{{ parseInt(incomeTotal - expenseTotal).toLocaleString('ko-KR') }}</MyTotal>
        </div>

        <div class="home-box__content max-w-40" v-show="isUser">
          <MyExpense :thisWeekTotal="thisWeekTotal" :lastWeekTotal="lastWeekTotal"></MyExpense>
        </div>

        <!-- 비로그인시 -->
        <div class="home-box__content max-w-75" v-show="!isUser">
          <div class="home-card" @click="toLogin">
            <div class="flex-center w-100 fw-600 fs-30 trk-text-6">
                로그인 해서 내 정보를 불러오세요!
            </div>
          </div>
        </div>

        <div class="home-box__content max-w-35">
          <ExchangeRate/>
        </div>

        <div class="home-box__content max-w-40">
          <div class="home-card">
            <div class="d-flex w-100 justify-content-center gap-2">
              <div class="home-rabbit">
                <img src="@/images/character/rabbit-1.png" alt="">
              </div>
              <div class="home-speech">
                <div class="speech-bubble">
                  어떻게 하면 효율적으로 내 자산을 관리할까?
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div class="home-box__content max-w-35 min-h-40" v-show="isUser">
          <div class="home-card h-100 hover-opacity">
            <ExpenseFilterContainer
            :transactions="expenseStore.expenseList"
            :selectedDate="selectedDate"
            :plusButtonShow="false"
            />
          </div>
        </div>

        <div class="home-box__content max-w-40 min-h-40" v-show="isUser">
          <div class="home-card h-100 hover-opacity" @click="toStatistics">
            <CategoryList :categoryRatios="categoryRatios"></CategoryList>
          </div>
        </div>
        

    </div>
  </div>
</template>

<script setup>
  import { computed, ref, onMounted } from 'vue';
  
  import userService from '@/utils/userService.js';
  import { useStatisticsStore } from '@/stores/useStatisticsStore.js';
  import MyTotal from './MyTotal.vue';
  import MyExpense from './MyExpense.vue';
  import ExchangeRate from './ExchangeRate.vue';
  import CategoryList from '../Statistics/CategoryList.vue';
  import { storeToRefs } from 'pinia';  
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/userStore.js';

  const router = useRouter();

  //유저 초기화
  const isUser = userService.checkIsLogin();

  //Expense 카드 start
  // stores
  import { useExpenseStore } from '@/stores/expense';
  import { useCategoryStore } from '@/stores/category';

  //expense 입력용
  import ExpenseFilterContainer from '@/components/Expense/ExpenseFilterContainer.vue';

  // init store & user
  const expenseStore = useExpenseStore();
  const categoryStore = useCategoryStore();

  //오늘 날짜로 default 설정
  const today = new Date();
  const selectedDate = ref(today);

  //db 데이터 fetch
  onMounted(async () => {
    try {
      await categoryStore.fetchcategoryList();
      await expenseStore.fetchExpenseList();
    } catch (e) {
      console.error('지출 데이터 불러오기 실패:', e);
    }
  });
  //Expense 카드 end

  //지출 데이터 가져오기
  const statisticsStore = useStatisticsStore();
  const totalData = computed(() => statisticsStore.rawData);
  
  //수입데이터
  const incomeArr = ref([]);
  //토탈 수입 구하기
  const incomeTotal = computed(() => {
    return incomeArr.value.reduce((sum, item) => sum + (item.amount || 0), 0);
  });
  //지출데이터
  const expenseArr = ref([]);
  //토탈 수입 구하기
  const expenseTotal = computed(() => {
    return expenseArr.value.reduce((sum, item) => sum + (item.amount || 0), 0);
  });

  //이번주데이터
  const thisWeekArr = ref([]);
  //이번주 지출 구하기
  const thisWeekTotal = computed(() => {
    return thisWeekArr.value.reduce((sum, item) => sum + (item.amount || 0), 0);
  })
  //지난주데이터
  const lastWeekArr = ref([]);
  //지난주 지출 구하기
  const lastWeekTotal = computed(() => {
    return lastWeekArr.value.reduce((sum, item) => sum + (item.amount || 0), 0);
  })


  //모든 데이터 구하기
  statisticsStore.fetchData()
  .then((e) => {
    const expenseData = totalData.value;

    const now= new Date();  //지금

    //이번주 = 이번주 일요일 ~ 지금
    const thisSunday = new Date();
    thisSunday.setDate(now.getDate() - now.getDay());
    thisSunday.setHours(0, 0, 0, 0);

    //저번주 = 저번주 일요일 ~ 이번주 일요일
    const lastSunday = new Date();
    lastSunday.setDate(thisSunday.getDate() - 7);

    // 수입 데이터 별도로 만들기
    expenseData.forEach(expense => {
      
      const expenseDate = new Date(expense.date); //지출날짜
      //이번주 일요일 ~ 오늘
      if(expenseDate.getTime() > thisSunday.getTime() && expenseDate.getTime() < now.getTime()) {
        if(!expense.is_salary) {
          thisWeekArr.value.push(expense);
        }
      }

      //저번주 일요일 ~ 이번주 일요일
      if(expenseDate.getTime() > lastSunday.getTime() && expenseDate.getTime() < thisSunday.getTime()) {
        if(!expense.is_salary) {
          lastWeekArr.value.push(expense);
        }
      }

      //수입일경우
      if(expense.is_salary == 1) {
        incomeArr.value.push(expense);
      }
      //지출인 경우
      else {
        expenseArr.value.push(expense);
      }
      
    });

  })

//통계 필수 start
const store = useStatisticsStore();
const {
  selectedType,
  selectedPeriod,
  categoryRatios,
} = storeToRefs(store);

onMounted(() => {
  const a = store.fetchData();
  useCategoryStore().fetchcategoryList();
});
//통계 필수 end

//통계페이지로 보내기
const toStatistics = () => {
  router.push('/statistics');
}

//로그인으로 보내기
const toLogin = () => {
  router.push('/login');
}

</script>

<style>
.home-box {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;

}
.home-box__content {
  width: 100%;
}

.home-card {
  display: flex;
  padding: 2rem;
  background-color: var(--trk-ivory);
  box-shadow: 2px 3px 3px 1px var(--trk-green);
  border-radius: 2rem;
  min-height: 15rem;
}
@media(max-width: 768px) {
  .home-box__content {
    max-width: 100%;
  }
}

.home-rabbit > img {
  max-height: 12rem;
}

.home-speech {
  position: relative;
  padding: 10px;
}
.speech-bubble {
  position: relative;
  background: var(--trk-light-yellow);
  border-radius: 10px;
  padding: 10px;
  max-width: 200px;
  box-shadow: 2px 3px 3px 1px var(--trk-yellow);
  font-weight: 600;
  color: var(--trk-dark-green);
}

.speech-bubble::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -40px;
  border-width: 20px;
  border-style: solid;
  border-color: transparent var(--trk-light-yellow) transparent transparent;
  transform: translateY(-50%);
  z-index: 1; /* z-index 추가 */
}

.hover-opacity:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>

<style scoped>
  .filter-container {
    width: 100%;
    height: auto;
    padding: 2rem;
  }
  .margin-button {
    height: auto !important;
  }
</style>
