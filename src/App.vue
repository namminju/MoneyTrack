<template>
  <AlertProvider>
    <Main/>
  </AlertProvider>
</template>

<script setup>
  import AlertProvider from '@/components/providers/AlertProvider.vue';
  import Main from './components/Main/Main.vue';
</script>
