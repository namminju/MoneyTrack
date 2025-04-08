<template>
  <div class="filter-container__box pointer">
    <div class="filter-container__box__left">
      <CategoryIcon
        :category="props.transaction.category"
        class="trk-bg-6 trk-text-1"
      />
      <div class="filter-container__box__item">
        <div class="">{{ props.transaction.memo }}</div>
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
import CategoryIcon from '@/components/Category/CategoryIcon.vue';
const props = defineProps(['transaction']);
</script>
