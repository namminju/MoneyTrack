<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="d-flex justify-content-between">
        <div>
          <input
            type="text"
            :value="formattedAmount"
            @input="onAmountInput"
            class="w-50 text-end"
          />
          원<span class="text-danger">* </span>
          <span><i class="fa-solid fa-pencil"></i></span>
        </div>
        <i class="fa-solid fa-xmark trk-text-5 pointer" @click.self="close" />
      </div>

      <form class="p-3 input-container">
        <label>
          분류
          <div class="d-flex gap-3">
            <label
              class="radio-button input_bg_color"
              :class="{ selected: transactionType === 1 }"
            >
              <input
                type="radio"
                class="hidden-checkbox"
                :value="1"
                v-model="transactionType"
                name="type"
              />
              <div class="m-auto">수입</div>
            </label>
            <label
              class="radio-button input_bg_color"
              :class="{ selected: transactionType === 0 }"
            >
              <input
                type="radio"
                class="hidden-checkbox"
                :value="0"
                v-model="transactionType"
                name="type"
              />
              <div class="m-auto">지출</div>
            </label>
          </div>
        </label>

        <label>
          <div>카테고리</div>
          <select v-model="selectedCategory" class="input_bg_color input-style">
            <CategoryOption @init="(first) => (selectedCategory = first)" />
          </select>
        </label>

        <label>
          <span>거래처<span class="text-danger">*</span></span>
          <input type="text" v-model="place" placeholder="입력하세요" />
        </label>

        <label>
          결재 수단
          <select v-model="paymentMethod" class="input_bg_color input-style">
            <option value="카드">카드</option>
            <option value="현금">현금</option>
          </select>
        </label>

        <label>날짜 <input type="date" v-model="date" /></label>
        <label>
          메모 <input type="text" v-model="memo" placeholder="입력하세요" />
        </label>
        <label>고정비 <input type="checkbox" v-model="isFixed" /></label>
      </form>

      <button
        type="button"
        class="trk-btn-confirm"
        @click="submitForm"
        :disabled="!place || !date || !amount"
      >
        추가
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, inject } from 'vue';

//store
import { useExpenseStore } from '@/stores/expense';
const { AddExpense } = useExpenseStore();

//components
import CategoryOption from './CategoryOption.vue';

//성공, 실패 모달
const alert = inject('useAlert');

//변수 입력
const transactionType = ref(1); // 1: 수입, 0: 지출
const selectedCategory = ref('');
const paymentMethod = ref('카드');
const amount = ref(0); // 실제 금액
const place = ref('');
const today = new Date().toISOString().split('T')[0];
const date = ref(today);
const memo = ref('');
const isFixed = ref(false);

//props
const props = defineProps({
  selectedDate: {
    type: Date,
  },
});

// 쉼표 포함 금액 표시
const formattedAmount = computed(() =>
  amount.value ? amount.value.toLocaleString() : ''
);

// 입력 시 숫자만 추출해서 저장
function onAmountInput(e) {
  const raw = e.target.value.replaceAll(',', '').replace(/[^\d]/g, '');
  amount.value = Number(raw);
}

// 값 변경 실시간 반영
watch(
  () => props.selectedDate,
  (newVal) => {
    if (newVal) {
      const year = newVal.getFullYear();
      const month = String(newVal.getMonth() + 1).padStart(2, '0');
      const day = String(newVal.getDate()).padStart(2, '0');
      date.value = `${year}-${month}-${day}`;
    }
  },
  { immediate: true }
);

// Emits
const emit = defineEmits(['close']);
const close = () => emit('close');

//add 성공시 팝업
const successPopup = () => {
  alert.success('내역이 추가되었습니다.');
  close();
};

//add 실패시 팝업
const failPopup = () => {
  alert.error('내역 추가를 실패했습니다.\n 다시 시도해주세요');
};

//내역 추가 함수
const submitForm = async () => {
  const user = ref(JSON.parse(sessionStorage.getItem('user')));

  //데이터 형태
  const formData = {
    user_id: user.value.id,
    type: paymentMethod.value === '카드' ? 1 : 2,
    type_name: paymentMethod.value,
    name: place.value,
    amount: Number(amount.value),
    date: date.value,
    cate_id: selectedCategory.value?.cate_id ?? null,
    cate_name: selectedCategory.value?.name ?? '미분류',
    cate_icon: selectedCategory.value?.icon ?? '',
    is_salary: transactionType.value === 1 ? 1 : 0,
    is_fixed: isFixed.value ? 1 : 0,
    memo: memo.value,
    is_hide: 0,
    is_delete: 0,
  };

  try {
    await AddExpense(formData, successPopup, failPopup);
  } catch (e) {
    console.error('추가 실패:', e);
  }
};
</script>

<style scoped>
/* modal style */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(1px);
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: bold;
  width: 54%;
  height: calc(70vh + 3vw);
  min-height: 380px;
  padding: 2.8rem;
  border-radius: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  max-width: 500px;
  max-height: 90vh;
  font-size: 1.6rem;
  background-color: var(--trk-light-yellow);
}

/* Input Style */
input {
  /* 주어진 범위의 크기만큼 */
  width: 100%;
  cursor: pointer;
}

input,
.input-style {
  background-color: var(--trk-ivory);
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  border: none;
}

/* Input Container Style */
.input-container {
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-between;
}
.input-container > label {
  display: grid;
  align-items: center;
  grid-template-columns: 4.8fr 12fr;
  gap: 1rem;
  margin: 2% 4%;
}

.input_bg_color {
  background-color: var(--trk-ivory);
}

/* 버튼 비활성화 상태 */
button:disabled {
  box-shadow: 0 0;
  background-color: var(--trk-disabled-middle);
}

/* 체크 박스 스타일 */
input[type='checkbox'] {
  width: 2rem;
  height: 2rem;
  border: none;
  accent-color: var(--trk-green);
}

/* radio-button 선택 시  */
.radio-button.selected {
  font-weight: bolder;
  box-shadow: inset 0 0 0 0.4rem var(--trk-green);
  color: var(--trk-green);
}

/* 체크 박스 보이지 않도록록 */
.hidden-checkbox {
  display: none;
}
/* 체크 박스 선택(버튼형) */

.radio-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.radio-button {
  border-radius: 2rem;
}

/* select style */
select {
  appearance: none;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .modal-content {
    padding: 1.6rem;
  }
}
</style>
