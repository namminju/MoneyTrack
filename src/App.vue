<template>
  <AlertProvider>
    <ConfirmProvider>
      <Main />
    </ConfirmProvider>
  </AlertProvider>
</template>

<script setup>
import AlertProvider from "@/components/providers/AlertProvider.vue";
import ConfirmProvider from "./components/providers/ConfirmProvider.vue";
import Main from "./components/Main/Main.vue";
</script>
