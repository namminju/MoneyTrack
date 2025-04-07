<template>
  <div class="filter-container__box pointer">
    <div class="filter-container__box__left">
      <i class="fa-solid fa-utensils"></i>
      <div class="filter-container__box__item">
        <div>{{ props.transaction.memo }}</div>
        <div>{{ props.transaction.time }}</div>
      </div>
    </div>
    <div>
      {{ props.transaction.type === '수입' ? '+' : '-'
      }}{{ props.transaction.amount.toLocaleString() }}
    </div>
  </div>
</template>
<script setup>
import '@/css/expense/expense.css';
const props = defineProps(['transaction']);
</script>
