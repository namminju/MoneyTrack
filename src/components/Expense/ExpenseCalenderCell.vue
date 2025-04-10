<template>
  <div
    :class="[
      styles.calendar__grid__cell,
      {
        [styles.selected]: isSelected,
        [styles.sunday]: isSunday,
        [styles.saturday]: isSaturday,
      },
    ]"
    @click="handleClick"
  >
    <!-- 날짜 표시  -->
    <div v-if="date" :class="styles.dateNumber">{{ date.getDate() }}</div>

    <!-- summary 내역 -->
    <div v-show="hasData" :class="styles.summary">
      <!-- income -->
      <div
        v-if="income"
        :class="[styles.summary__item, styles.summary__income]"
      >
        +{{ income.toLocaleString() }}
      </div>

      <!-- outcome -->
      <div
        v-if="expense"
        :class="[styles.summary__item, styles.summary__expense]"
      >
        -{{ expense.toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

//styles
import styles from '@/css/expense/expenseCalenderCell.module.css';

//props
const props = defineProps({
  date: Date,
  index: Number,
  selectedDate: Date,
  recordData: Array,
});

//event
const emit = defineEmits(['select']);

//주말 여부 확인
const isSunday = computed(() => props.index % 7 === 0);
const isSaturday = computed(() => props.index % 7 === 6);

//선택 여부 확인
const isSelected = computed(() => {
  if (!props.date || !props.selectedDate) return false;
  return (
    props.date.getFullYear() === props.selectedDate.getFullYear() &&
    props.date.getMonth() === props.selectedDate.getMonth() &&
    props.date.getDate() === props.selectedDate.getDate()
  );
});

//날짜 형식 변경
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

//data 여부 확인
const hasData = computed(() => {
  if (!props.date) return false;
  const dateStr = formatDate(props.date);
  return props.recordData.some((r) => r.date === dateStr);
});

//수익 합산 게산
const income = computed(() => {
  if (!props.date) return 0;
  const dateStr = formatDate(props.date);
  return props.recordData
    .filter((r) => r.date === dateStr && r.is_salary === 1 && r.is_delete === 0)
    .reduce((sum, r) => sum + r.amount, 0);
});

//지출 합산 게산
const expense = computed(() => {
  if (!props.date) return 0;
  const dateStr = formatDate(props.date);
  return props.recordData
    .filter((r) => r.date === dateStr && r.is_salary === 0 && r.is_delete === 0)
    .reduce((sum, r) => sum + r.amount, 0);
});

//클릭 시 event 함수
function handleClick() {
  if (props.date) emit('select', props.date);
}
</script>
