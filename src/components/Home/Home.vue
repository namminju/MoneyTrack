<template>
  <div class="w-100 min-h-50 p-4">
    <div class="home-box">
        <div class="home-box__content max-w-30">
          <MyTotal>{{ incomeTotal - expenseTotal }}</MyTotal>
        </div>
        <div class="home-box__content max-w-60">
          <MyExpense :thisWeekTotal="thisWeekTotal" :lastWeekTotal="lastWeekTotal"></MyExpense>
        </div>
        <div class="home-box__content max-w-30">
          <!-- <ExchangeRate/> -->
        </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import userService from '@/utils/userService.js';
  import { useStatisticsStore } from '@/stores/useStatisticsStore.js';
  import MyTotal from './MyTotal.vue';
  import MyExpense from './MyExpense.vue';
  import ExchangeRate from './ExchangeRate.vue';


  //초기화
  userService.checkIsLogin();

  //데이터 가져오기
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
        thisWeekArr.value.push(expense);
      }

      //저번주 일요일 ~ 이번주 일요일
      if(expenseDate.getTime() > lastSunday.getTime() && expenseDate.getTime() < thisSunday.getTime()) {
        lastWeekArr.value.push(expense);
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
  background-color: var(--trk-light-yellow);
  border: 1px solid var(--trk-yellow);
  box-shadow: 3px 5px 3px 1px var(--trk-yellow);
  border-radius: 2rem;
  min-height: 15rem;
  cursor: pointer;
}
.home-card:hover {
  opacity: 0.8;
}
@media(max-width: 768px) {
  .home-box__content {
    max-width: 100%;
  }
}
</style>

