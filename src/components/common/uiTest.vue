<template>
  <main class="p-4">
    <h2>Confirm 컴포넌트 테스트</h2>

    <button
      class="trk-btn-confirm"
      @click="handleLogout"
    >
      로그아웃
    </button>
  </main>
</template>

<script setup>
import { inject } from "vue";

const alert = inject("useAlert");
const confirm = inject("useConfirm");

const handleLogout = () => {
  confirm("정말 로그아웃 하시겠습니까?")
    .then(() => {
      // 확인 버튼 클릭 시
      alert.success("로그아웃이 완료되었습니다.");
    })
    .catch(() => {
      // 취소 버튼 클릭 시
      alert.info("로그아웃이 취소되었습니다.");
    });
};
</script>

<style scoped>
h2 {
  margin-bottom: 2rem;
}
</style>
