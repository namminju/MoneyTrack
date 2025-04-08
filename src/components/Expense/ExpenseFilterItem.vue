<template>
  <div
    class="filter-container__box pointer"
    @click.stop="router.push(`/expensedetail/${props.transaction.id}`)"
  >
    <div class="filter-container__box__left">
      <CategoryIcon
        :category="props.transaction.cate_name"
        class="trk-bg-6 trk-text-1"
      />
      <div class="filter-container__box__item">
        <div class="">{{ props.transaction.name }}</div>
        <div>
          {{ props.transaction.cate_name }}/{{ props.transaction.type_name }}
        </div>
      </div>
    </div>
    <div>
      {{ props.transaction.type === 2 ? '+' : '-'
      }}{{ props.transaction.amount.toLocaleString() }}
    </div>
  </div>
</template>
<script setup>
import '@/css/expense/expense.css';
import CategoryIcon from '@/components/Category/CategoryIcon.vue';
import { useRouter } from 'vue-router';
const props = defineProps(['transaction']);
const router = useRouter();
</script>
