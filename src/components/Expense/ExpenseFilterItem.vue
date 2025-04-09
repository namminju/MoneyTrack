<template>
  <div
    class="filter-container__box pointer"
    @click.stop="router.push(`/expensedetail/${props.transaction.id}`)"
  >
    <div class="filter-container__box__left">
      <i :class="props.transaction.cate_icon" class="trk-bg-6 trk-text-1"></i>

      <div class="filter-container__box__item">
        <div class="">{{ props.transaction.name }}</div>
        <div>
          {{ props.transaction.cate_name }}/{{ props.transaction.type_name }}
        </div>
      </div>
    </div>
    <div>
      {{ props.transaction.is_salary === 1 ? '+' : '-'
      }}{{ props.transaction.amount }}
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const props = defineProps(['transaction']);
const router = useRouter();
</script>
