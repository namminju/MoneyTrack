<template>
      <Alert
      :type="alertType"
      :message="alertMessage"
      :show="isVisible"
      @close="isVisible = false"
    />
    <slot/>
  </template>
  
  <script setup>
  import Alert from '@/components/common/Alert.vue';
  import { ref, provide } from 'vue';

  // 상태
  const isVisible = ref(false);
  const alertType = ref('info');
  const alertMessage = ref('');

  // 알림 표시 함수
  const showAlert = (type, message) => {
    alertType.value = type;
    alertMessage.value = message;
    isVisible.value = true;
  };

  // 전역에서 사용할 alert 호출 함수들
  const useAlertApi = {
  success: (msg) => showAlert('success', msg),
  error: (msg) => showAlert('error', msg),
  warning: (msg) => showAlert('warning', msg),
  info: (msg) => showAlert('info', msg),
  };

  // 전역에 provide
  provide('useAlert', useAlertApi);
  </script>