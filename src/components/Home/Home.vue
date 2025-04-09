<template>
  <div class="w-100 min-h-50 p-4">
    <div class="home-box">
        <div class="home-box__content max-w-30">
          <MyTotal>{{ incomeTotal - expenseTotal }}</MyTotal>
        </div>
        <div class="home-box__content max-w-60">
          <MyExpense></MyExpense>
        </div>
        <div class="home-box__content max-w-30">
asdf
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

  //지난주데이터
  const lastWeekArr = ref([]);
  //지난주 지출 구하기
  const lastWeekTotal = computed(() => {
    
  })
  //이번주데이터
  const thisWeekArr = ref([]);
  //이번주 지출 구하기
  const thisWeekARr = computed(() => {
    
  })




  //모든 데이터 구하기
  statisticsStore.fetchData()
  .then((e) => {
    const expenseData = totalData.value;
    
    const today = new Date();  //오늘

    // 수입 데이터 별도로 만들기
    expenseData.forEach(expense => {
      console.log(expense);

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
}
@media(max-width: 768px) {
  .home-box__content {
    max-width: 100%;
  }
}
</style>

