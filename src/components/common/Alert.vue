<script setup>
import { onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  show: Boolean,
  type: {
    type: String,
    default: "info",
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 2000,
  },
});

const emit = defineEmits(["close"]);

const timeout = ref(null);

const close = () => {
  clearTimeout(timeout.value);
  emit("close"); // 부모가 상태 관리
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      clearTimeout(timeout.value);
      timeout.value = setTimeout(() => {
        close();
      }, props.duration);
    }
  }
);

onBeforeUnmount(() => {
  clearTimeout(timeout.value);
});
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="trk-alert" :class="`trk-alert-${type}`">
      <span class="trk-alert-icon">
        <i v-if="type === 'success'" class="fa-solid fa-circle-check"></i>
        <i v-else-if="type === 'error'" class="fa-solid fa-circle-exclamation"></i>
        <i v-else-if="type === 'warning'" class="fa-solid fa-triangle-exclamation"></i>
        <i v-else class="fa-solid fa-circle-info"></i>
      </span>
      <span class="trk-alert-text">{{ message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.trk-alert {
  position: fixed;
  display: flex;
  align-items: center;
  top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 400px;
  width: calc(100% - 2rem);
  z-index: 1000;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
}

/* 타입별 스타일 */
.trk-alert-success {
  background-color: #d5f3dd;
  color: #1e4620;
}
.trk-alert-error {
  background-color: #fadad7;
  color: #611a15;
}
.trk-alert-warning {
  background-color: #f8edca;
  color: #665c00;
}
.trk-alert-info {
  background-color: #d3e1f8;
  color: #1a73e8;
}

/* 트랜지션 클래스 정의 (Vue 규칙) */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
