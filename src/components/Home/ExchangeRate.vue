<template>
  <div class="home-card">
    <div class="position-relative w-100">
      <div class="fw-600 fs-20 trk-text-6 text-center">지금 환율은?</div>
      <div class="home-card__income">
        <div class="d-flex justify-content-around w-100">
          

            <div class="text-center overflow-hidden">
              <img class="nation-flag" src="@/images/nationFlags/na.png" alt="">
              <div class="fw-600">{{ dollarRate }} 원</div>
            </div>

            <div class="text-center nation-flag">
              <img class="nation-flag" style="width :100%;" src="@/images/nationFlags/jp.png" alt="">
              <div class="fw-600">{{ yenRate }} 원</div>
            </div>

            <div class="text-center nation-flag">
              <img class="nation-flag" src="@/images/nationFlags/china.png" alt="">
              <div class="fw-600">{{ dollarRate }} 원</div>
            </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import exchangeRate from '@/utils/exchangeRate.js';

//현재 달러가격 구하기
const dollarRate = ref('');
const getDollar = async () => {
  const result = await exchangeRate.Wondollor();
  console.log(result);
  dollarRate.value = result[0].bkpr;
}
getDollar();

//현재 옌 구하기
const yenRate = ref('');
const getYen = async () => {
  const result = await exchangeRate.WonYen();
  yenRate.value = result[0].bkpr;
}
getYen();

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
    max-width: 9rem; 
    width: 100%;
    /* object-fit: contain; */
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
  }
</style>