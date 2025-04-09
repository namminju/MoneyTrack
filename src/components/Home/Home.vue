<template>
  <div>
    Home
  </div>
</template>

<script setup>
  import '@/css/header/header.css';
  import userService from '@/utils/userService.js';

  //초기화
  userService.checkIsLogin();
</script>

