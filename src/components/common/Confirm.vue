<script setup>
const props = defineProps({
  show: Boolean,
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["confirm", "cancel"]);

const confirm = () => emit("confirm");
const cancel = () => emit("cancel");
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="trk-confirm-backdrop"
    >
      <div class="trk-confirm-dialog trk-bg-1">
        <p class="trk-confirm-message">{{ message }}</p>
        <div class="trk-confirm-buttons">
          <button
            class="trk-btn-cancel"
            @click="cancel"
          >
            취소
          </button>
          <button
            class="trk-btn-confirm"
            @click="confirm"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.trk-confirm-backdrop {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.trk-confirm-dialog {
  text-align: center;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  max-width: 360px;
  width: 90%;
}

.trk-confirm-message {
  margin-bottom: 1.5rem;
}

.trk-confirm-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1rem;
}
</style>
