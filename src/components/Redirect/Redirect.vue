<template>
  <div class="flex-center min-h-50">
    <div class="min-h-40 min-w-40">
      <div class="text-center fw-700 fs-30 p-4">페이지 이동중...</div>
      
      <div class="clear-10"></div>
      
      <div class="notfound-img">
        <img src="../../images/character/rabbit-3.png" alt="">
      </div>
      
      <div class="clear-10"></div>
    </div>

  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import router from '@/router';

  //리다렉션 페이지 설정
  const route = useRoute();
  const path = !route.query.path ? 'home' : route.query.path;

  //1초뒤 이동
  setTimeout(() => {
    router.push(`/${path}`);
  }, 1000);

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
