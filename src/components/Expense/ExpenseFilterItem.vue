<template>
  <!-- 클릭 시 해당하는 detail 페이지로 이동 -->
  <div
    :class="[styles['filter-container__box'], styles.pointer]"
    @click.stop="router.push(`/expensedetail/${props.transaction.id}`)"
  >
    <div :class="styles['filter-container__box__left']">
      <i :class="[props.transaction.cate_icon, 'trk-bg-6', 'trk-text-1']"></i>

      <div :class="styles['filter-container__box__item']">
        <!-- 내역 title -->
        <div>{{ props.transaction.name }}</div>
        <div>
          <!-- category 및 type 표기 -->
          {{ props.transaction.cate_name }}/{{ props.transaction.type_name }}
        </div>
      </div>
    </div>
    <div>
      <!-- 수익/지출에 따라 표기 -->
      {{ props.transaction.is_salary === 1 ? '+' : '-' }}
      {{ props.transaction.amount }}
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

//styles
import styles from '@/css/expense/expenseFilterItem.module.css';

// 페이지 이동을 위하여
const router = useRouter();

//props
const props = defineProps(['transaction']);
</script>
