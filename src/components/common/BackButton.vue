<template>
  <button
    @click="handleBack"
    class="trk-btn-back trk-bg-5 trk-text-1 my-2 mx-2 cursor-pointer"
  >
    <i class="fa-solid fa-arrow-left"></i>
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  to: {
    type: String,
    default: "",
  },
});

const handleBack = () => {
  if (props.to) {
    router.push(props.to);
  } else {
    router.back();
  }
};
</script>

<style scoped>
.trk-btn-back {
  height: fit-content;
  width: fit-content;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 20px;
}
.trk-btn-back:hover {
  opacity: 0.85;
}
</style>
