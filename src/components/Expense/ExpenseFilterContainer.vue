<template>
  <div class="filter-container">
    <!-- header: 해당 일자 및 필터 패널 버튼 -->
    <div class="filter-container__header">
      <div>
        {{ selectedDate ? selectedDate.toLocaleDateString() : '' }}
      </div>
      <i class="fa-solid fa-filter pointer" @click="showFilter = !showFilter" />
    </div>

    <!-- 내역 추가 모달(provider로 분리 필요) -->
    <Modal
      v-if="showModal"
      @close="showModal = false"
      :selectedDate="props.selectedDate"
    />

    <!-- 필터 패널 -->
    <FilterPanel
      v-if="showFilter"
      :allCategories="categoryStore.categoryList[0]"
      v-model:selectedCategories="selectedCategories"
      v-model:selectedType="selectedType"
    />

    <!-- 해당 일자 내역 수 및 필터 패널 버튼 -->
    <div class="summary-box">
      <div>총 {{ filteredTransactions.length }}건</div>
      <div>
        {{
          (totalIncome > totalExpense ? '+' : '') +
          (totalIncome - totalExpense).toLocaleString()
        }}
      </div>
    </div>

    <hr class="hidden" />

    <ExpenseFilterItem
      v-for="(transaction, index) in filteredTransactions"
      :key="index"
      :transaction="transaction"
    />

    <div class="margin-button" />

    <button
      class="plus_button"
      @click="
        () => {
          showModal = !showModal;
        }
      "
    >
      <i class="fa-solid fa-plus pointer"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

//components
import ExpenseFilterItem from './ExpenseFilterItem.vue';
import FilterPanel from './FilterPanel.vue';
import Modal from './AddModal.vue';

//store
import { useCategoryStore } from '@/stores/category';

//variables
const categoryStore = useCategoryStore();
const showModal = ref(false);
const showFilter = ref(false);
const selectedCategories = ref([]); // 체크된 항목들이 배열로 들어감
const selectedType = ref('');

//props
const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
  selectedDate: {
    type: Date,
    required: true,
  },
});

//날짜 형식
function formatDateToLocalString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

//filter 적용
const filteredTransactions = computed(() => {
  const selectedDateStr = formatDateToLocalString(props.selectedDate);

  //선택된 바에 따라 filtering
  return props.transactions.filter((tx) => {
    const matchType =
      selectedType.value === '' || tx.is_salary == selectedType.value;

    const matchCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(tx.cate_name);

    const matchDate = tx.date === selectedDateStr;

    return matchType && matchCategory && matchDate;
  });
});

//수익 합계 계산
const totalIncome = computed(() => {
  return filteredTransactions.value
    .filter((tx) => tx.is_salary === 1)
    .reduce((sum, tx) => sum + tx.amount, 0);
});

//지출 합계 계산
const totalExpense = computed(() => {
  return filteredTransactions.value
    .filter((tx) => tx.is_salary === 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
});
</script>

<style scoped>
/* 스크롤바 제거 */
.filter-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.filter-container::-webkit-scrollbar {
  display: none;
}

/* header */
.filter-container__header {
  font-size: 2rem;
  display: flex;
  font-weight: bold;
  justify-content: space-between;
}

/* 요약(총 개수, 총액) */
.summary-box {
  display: flex;
  font-size: 1.6rem;
  font-weight: bold;
  padding-top: 1rem;
  justify-content: space-between;
}

.summary-box :nth-child(1) {
  color: rgba(0, 0, 0, 0.5);
}

/* plus button */
.plus_button {
  position: fixed;
  right: 4%;
  bottom: 10%;
  width: clamp(10px, 8rem, 70px);
  height: clamp(10px, 8rem, 70px);
  border-radius: 50%;
  border: 0;
  background-color: var(--trk-green);
}

.plus_button * {
  color: var(--trk-yellow);
  margin: auto;
  font-size: clamp(5px, 4rem, 35px);
}

.margin-button {
  height: calc(clamp(10px, 12rem, 160px));
}

@media (max-width: 1024px) {
  /* 모바일 container */
  .filter-container {
    width: 94%;
    height: auto;
    margin: auto;
    overflow-y: visible;
    background-color: transparent;
  }
  /* plus button */
  .plus_button {
    bottom: 6%;
    position: fixed;
  }
  /* hr 숨기기 */
  .hidden {
    display: none;
  }
}
</style>
