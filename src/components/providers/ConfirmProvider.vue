<template>
  <Confirm
    :show="isVisible"
    :message="message"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
  <slot />
</template>

<script setup>
import Confirm from "@/components/common/Confirm.vue";
import { ref, provide } from "vue";

// 상태
const isVisible = ref(false);
const message = ref("");
let resolveCallback = null;
let rejectCallback = null;

// confirm 표시 함수
const showConfirm = (msg) => {
  message.value = msg;
  isVisible.value = true;

  return new Promise((resolve, reject) => {
    resolveCallback = resolve;
    rejectCallback = reject;
  });
};

const handleConfirm = () => {
  isVisible.value = false;
  resolveCallback?.();
};

const handleCancel = () => {
  isVisible.value = false;
  rejectCallback?.();
};

// 전역 provide
provide("useConfirm", showConfirm);
</script>
