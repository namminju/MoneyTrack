<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-content__header d-flex justify-content-between">
        <div>
          <input type="number" class="w-50 text-end" />
          원
          <span><i class="fa-solid fa-pencil pointer"></i></span>
        </div>
        <i class="fa-solid fa-xmark trk-text-5 pointer" @click.self="close" />
      </div>
      <form class="p-3 input-container">
        <label>
          분류
          <div class="d-flex gap-3">
            <label
              class="radio-button input_bg_color"
              :class="{ selected: transactionType === '수입' }"
            >
              <input
                type="radio"
                class="hidden-checkbox"
                value="수입"
                v-model="transactionType"
                name="type"
              />
              <div class="m-auto">수입</div>
            </label>
            <label
              class="radio-button input_bg_color"
              :class="{ selected: transactionType === '지출' }"
            >
              <input
                type="radio"
                class="hidden-checkbox"
                value="지출"
                v-model="transactionType"
                name="type"
              />
              <div class="m-auto">지출</div>
            </label>
          </div>
        </label>

        <label>
          <div>카테고리</div>

          <select
            :value="selectedType"
            @change="onTypeChange"
            class="input_bg_color input-style"
          >
            <option value="">미분류</option>
            <option>식비</option>
            <option>월급</option>
          </select>
        </label>
        <label> 거래처<input type="text" placeholder="입력하세요" /> </label>
        <label> 결재 수단<input type="text" placeholder="선택하세요" /> </label>
        <label> 날짜<input type="datetime-local" </label>
        <label> 메모<input type="text" placeholder="입력하세요" /> </label>
        <label> 고정비<input type="checkbox" /> </label>
      </form>

      <button type="button" @click="" class="add-btn">추가</button>
    </div>
  </div>
</template>

<script setup>
import '@/css/expense/expense.css';
import { ref } from 'vue';

const transactionType = ref('수입'); // 기본 선택값 (optional)

const emit = defineEmits(['close']);
const close = () => emit('close');
</script>

<style scoped>
.modal-content__header,
.modal-content__footer {
  font-size: 2.4rem;
  height: 8%;
}
.input-container {
  display: flex;
  flex-direction: column;
  height: 80%;
}
.input-container > label {
  display: grid;
  align-items: center;
  grid-template-columns: 3.6fr 12fr;
  margin: 2% 5%;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); /* 🔥 반투명한 검정 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(1px); /* 선택사항: 배경 블러 처리 */
}

.modal-content {
  font-weight: bold;
  width: 50%;
  height: 60vw;
  min-height: 380px;
  padding: 2.8rem;
  border-radius: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  max-width: 600px;
  max-height: 80%;
  font-size: 2rem;
  background-color: #f9e0bb;
}
.input_bg_color {
  background-color: #edf1d6;
}
input,
.input-style {
  background-color: #edf1d6;
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  border: none;
}
.add-btn {
  margin: auto;
  background-color: #609966;
  color: white;
  width: 90%;
  padding: 2% 0;
  border: none;
  border-radius: 4rem;
}
input[type='checkbox'] {
  width: 20px;
  height: 20px;
  border: none;
  accent-color: #609966;
}
.radio-button.selected {
  font-weight: bolder;
  box-shadow: inset 0 0 0 0.4rem #609966; /* 안쪽 테두리처럼 보임 */
  color: #609966;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield; /* Firefox용 */
}
</style>
