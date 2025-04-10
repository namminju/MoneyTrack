<template>
  <div class="home-card" @click="toNaverCurrency">
    <div class="position-relative w-100">
      <div class="fw-600 fs-20 trk-text-6 text-center">지금 환율은?</div>
      <div class="clear-10"></div>
      <div class="home-card__income">
        <div class="d-flex justify-content-around gap-2 w-100">
          

            <div class="text-center overflow-hidden">
              <img class="nation-flag" src="@/images/nationFlags/na.png" alt="">
              <div class="fw-600">{{ dollarRate }} 원</div>
            </div>

            <div class="text-center">
              <img class="nation-flag" style="width :100%;" src="@/images/nationFlags/jp.png" alt="">
              <div class="fw-600"> {{ yenRate}} 원</div>
            </div>

            <div class="text-center">
              <img class="nation-flag" src="@/images/nationFlags/china.png" alt="">
              <div class="fw-600">{{ cDollarRate }} 원</div>
            </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import exchangeRate from '@/utils/exchangeRate.js';

//현재 환율 구하기 start
const dollarRate = ref(1470);
const yenRate = ref(1070);
const cDollarRate = ref(195);
const curUnit = ['USD', 'JPY(100)', 'CNH'];

const getCurrency = async () => {
  const result = await exchangeRate.getCurrency();
  const filteredItem = result.filter((item) => curUnit.includes(item.cur_unit));
  console.log(filteredItem);

  dollarRate.value = filteredItem.find((item) => item.cur_unit === 'USD').bkpr;
  yenRate.value = filteredItem.find((item) => item.cur_unit === 'JPY(100)').bkpr;
  cDollarRate.value = filteredItem.find((item) => item.cur_unit === 'CNH').bkpr;
}
getCurrency();
//현재 환율 구하기 end


//네이버 환률로 보내버리기
const toNaverCurrency = () => {
  window.open('https://finance.naver.com/marketindex/');
}


</script>

<style scoped>
  .home-card__income {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .home-card__income__span {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
  
  .nation-flag {
    /* width: 10rem; */
    max-height: 5rem;
    max-width: 8rem; 
    width: 100%;
    height:100%;
    /* object-fit: contain; */
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
  }
</style>