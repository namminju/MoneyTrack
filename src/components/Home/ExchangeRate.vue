<template>
  <div class="home-card">
    <div class="position-relative w-100">
      <div class="fw-600 fs-20 trk-text-6 text-center">지금 환율은?</div>
      <div class="home-card__income">
        <div class="d-flex justify-content-around">
          <div class="text-center nation-flag">
            <div><img src="@/images/nationFlags/na.png" alt=""></div>
            <div class="fw-600">{{ dollarRate }} 원</div>
          </div>
          
          <div class="text-center nation-flag" style="width:10rem">
            <div><img src="@/images/nationFlags/jp.png" alt=""></div>
            <div class="fw-600">{{ dollarRate }} 원</div>
          </div>

          <div class="text-center nation-flag">
            <div><img src="@/images/nationFlags/na.png" alt=""></div>
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
    /* object-fit: contain; */
    border: 1px solid;
    border-radius: 10px;
    background-color: #fff;
  }
</style>