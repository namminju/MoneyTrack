<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-content__header d-flex justify-content-between">
        <div>
          <input type="number" v-model.number="amount" class="w-50 text-end" />
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
            <option
              v-for="(category, index) in categoryStore.categoryList[0]"
              :key="index"
              :value="category"
            >
              {{ category.name }}
            </option>
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

        <label> 날짜 <input type="date" v-model="date" /> </label>
        <label>
          메모 <input type="text" v-model="memo" placeholder="입력하세요" />
        </label>
        <label> 고정비 <input type="checkbox" v-model="isFixed" /> </label>
      </form>
      <!-- <button
        type="button"
        class="trk-btn-confirm"
        @click="submitForm"
        :disabled="!place || !date || !amount"
      >
        추가
      </button> -->
      <button
        type="button"
        class="add-btn"
        @click="submitForm"
        :disabled="!place || !date || !amount"
      >
        추가
      </button>
    </div>
  </div>
</template>

<script setup>
import '@/css/expense/expense.css';
import { ref, watch } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { useExpenseStore } from '@/stores/expense';

const transactionType = ref(1); // 1: 수입, 0: 지출
const selectedCategory = ref(''); // 카테고리 전체 객체
const paymentMethod = ref('카드');
const amount = ref(null);
const place = ref('');
const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd 형태
const date = ref(today);
const memo = ref('');
const isFixed = ref(false);
const categoryStore = useCategoryStore();
const { AddExpense } = useExpenseStore();

const props = defineProps({
  selectedDate: {
    type: Date,
  },
});

// 날짜를 YYYY-MM-DD로 변환
const formatDateToInputString = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

watch(
  () => props.selectedDate,
  (newVal) => {
    if (newVal) {
      date.value = formatDateToInputString(newVal); // 💡 input에 맞게 포맷팅
    }
  },
  { immediate: true }
);

watch(
  () => categoryStore.categoryList[0],
  (newVal) => {
    if (newVal) {
      selectedCategory.value = newVal[0];
    }
  },
  { immediate: true }
);

// Emits
const emit = defineEmits(['close', 'submit']);
const close = () => emit('close');

const submitForm = async () => {
  const user = ref(JSON.parse(sessionStorage.getItem('user')));

  const formData = {
    user_id: user.value.id,
    type: paymentMethod.value == '카드' ? 1 : 2,
    type_name: paymentMethod.value,
    name: place.value,
    amount: Number(amount.value),
    date: date.value,
    cate_id: selectedCategory.value?.cate_id ?? null,
    cate_name: selectedCategory.value?.name ?? '미분류',
    cate_icon: selectedCategory.value?.icon ?? '',
    is_salary: transactionType.value == 1 ? 1 : 0,
    is_fixed: isFixed.value ? 1 : 0,
    memo: memo.value,
    is_hide: 0,
    is_delete: 0,
  };
  try {
    await AddExpense(formData);
  } catch (e) {}

  emit('submit', formData);
  close();
};
</script>

<style scoped>
.modal-content__header,
.modal-content__footer {
  font-size: 2rem;
  height: 8%;
}
.input-container {
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 80%;
}
.input-container > label {
  display: grid;
  align-items: center;
  grid-template-columns: 4fr 12fr;
  gap: 1rem;
  margin: 2% 4%;
}
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
  z-index: 1000;
  backdrop-filter: blur(1px);
}
.modal-content {
  font-weight: bold;
  width: 54%;
  height: calc(60vh+2vw);
  min-height: 380px;
  padding: 2.8rem;
  border-radius: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  min-width: 380px;
  max-width: 500px;
  max-height: 90vh;
  font-size: 2rem;
  background-color: var(--trk-light-yellow);
}
.input_bg_color {
  background-color: var(--trk-ivory);
}
input,
.input-style {
  background-color: var(--trk-ivory);
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  border: none;
}
.add-btn {
  margin: auto;
  background-color: var(--trk-green);
  color: white;
  width: 90%;
  padding: 2% 0;
  border: none;
  border-radius: 4rem;
  font-weight: bold;
}
.add-btn:disabled {
  background-color: #afafaf;
}
input[type='checkbox'] {
  width: 20px;
  height: 20px;
  border: none;
  accent-color: var(--trk-green);
}
.radio-button.selected {
  font-weight: bolder;
  box-shadow: inset 0 0 0 0.4rem var(--trk-green);
  color: var(--trk-green);
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
