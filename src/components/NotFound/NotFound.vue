<template>
  <div class="flex-center min-h-50">
    <div class="min-h-40 min-w-40">
      <div class="text-center fw-700 fs-30 p-4">페이지를 찾을 수 없어요</div>
      
      <div class="clear-10"></div>
      
      <div class="notfound-img">
        <img src="../../images/character/rabbit-4.png" alt="">
      </div>
      
      <div class="clear-10"></div>

      <div>
        <div>{{ time }}초 후 홈으로 이동합니다.</div>
      </div>

    </div>

  </div>
</template>

<script setup>
  import { ref, onUnmounted } from 'vue';
  import router from '@/router';

  const time = ref(3);
  let timer;

  //3초뒤 홈으로 이동
  timer = setInterval(() => {
    time.value -= 1;
    if(time.value <= 0) {
      clearInterval(timer);
      router.push('/home');
    }
  }, 1000);

  //타이머 정리
  onUnmounted(() => {
    clearInterval(timer);
  })

</script>

<style scoped>
  .notfound-img {
    overflow: hidden;
    width: 200px;
    margin: auto;
  }
  .notfound-img > img {
    padding-right: 2rem;
    width: 100%;
    object-fit: contain;
  }
</style>
