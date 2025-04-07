<template>
  <div class="filter-container">
    <div class="filter-container__header">
      <div>
        {{ selectedDate ? selectedDate.toLocaleDateString() : '없음' }}
      </div>
      <i
        class="fa-solid fa-filter pointer"
        @click="showFilter = !showFilter"
      ></i>
    </div>

    <!-- 필터 패널 -->

    <FilterPanel
      v-if="showFilter"
      :allCategories="allCategories"
      v-model:selectedCategories="selectedCategories"
      v-model:selectedType="selectedType"
    />

    <ExpenseFilterItem
      v-for="(transaction, index) in filteredTransactions"
      :key="index"
      :transaction="transaction"
    />

    <button class="plus_button">
      <i class="fa-solid fa-plus" style="color: #f9e0bb"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import '@/css/expense/expense.css';
import ExpenseFilterItem from './ExpenseFilterItem.vue';
import FilterPanel from './FilterPanel.vue';
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

const showFilter = ref(false);
const allCategories = [
  { name: '식비', icon: 'fa-solid fa-utensils' },
  { name: '교통', icon: 'fa-solid fa-bus' },
  { name: '문화', icon: 'fa-solid fa-palette' },
];

const selectedCategories = ref([]); // 체크된 항목들이 배열로 들어감
const selectedType = ref('전체');

const filteredTransactions = computed(() => {
  const selectedDateStr = props.selectedDate.toISOString().slice(0, 10);

  return props.transactions.filter((tx) => {
    const matchType =
      selectedType.value === '전체' || tx.type === selectedType.value;

    const matchCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(tx.category);

    const matchDate = tx.date === selectedDateStr;

    return matchType && matchCategory && matchDate;
  });
});
</script>

<style scoped>
.category-button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.filter-panel___label {
  padding: 1rem 0;
}
.category-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 10px;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.category-button.selected {
  background-color: #000000;
  color: white;
}

.hidden-checkbox {
  display: none;
}
select {
  appearance: none; /* 기본 화살표 제거 */
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 10px;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}
</style>
