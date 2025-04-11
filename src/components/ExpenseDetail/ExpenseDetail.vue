<template>
  <div class="full-container trk-bg-2">
    <div class="detail-box trk-bg-1">
      <div class="detail-box__header">
        <span class="header__button">
          <BackButton to="/expense" />
        </span>
        <span class="fw-600 fs-20">세부 지출 내역</span>
      </div>
      <div class="detail-box__item">
        <div class="box__itemWrapper">
          <div class="detail-box__item__text">
            <div class="info">
              <div class="info-row">
                <span class="label-amt fw-600 fs-30">
                  <strong class="amount-value">{{
                    states.expense.amount?.toLocaleString()
                  }}</strong>
                </span>
                <span class="value"></span>
              </div>
              <div
                class="info-row"
                v-for="(value, label) in infoFields"
                :key="label"
              >
                <span class="label">{{ label }}</span>
                <span class="value">{{ value }}</span>
              </div>
            </div>
          </div>
          <div class="detail-box__item__button">
            <button class="trk-btn-confirm" @click="gotoEdit">수정</button>
            <button class="trk-btn-cancel" @click="handleDelete">삭제</button>
          </div>
        </div>
      </div>
    </div>

    <ExpenseFilterContainer
      :transactions="expenseStore.expenseList"
      :selectedDate="selectedDate"
    />
  </div>
</template>

<script setup>
import '@/css/expenseDetail/expenseDetail.css';
import { reactive, onMounted, ref, watch, computed, inject } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import useRouterUtil from '@/utils/useRouterUtil';
import ExpenseFilterContainer from '@/components/Expense/ExpenseFilterContainer.vue';
import { useExpenseStore } from '@/stores/expense';
import BackButton from '../common/BackButton.vue';

const expenseStore = useExpenseStore();
const { gotoExpense, gotoExpenseDetail, gotoExpenseEdit } = useRouterUtil();
const route = useRoute();

const states = reactive({ expense: {} });
const infoFields = ref({});
const id = computed(() => route.params.id);
const selectedDate = ref(new Date());
const alert = inject('useAlert');
const confirm = inject('useConfirm');

watch(
  () => route.params.id,
  async () => {
    await fetchExpense();
  }
);

const fetchExpense = async () => {
  try {
    const response = await axios.get(`/api/Expense/${id.value}`);
    console.log(response);

    if (!response.data) {
      console.log('error');
    }

    states.expense = response.data;
    selectedDate.value = new Date(states.expense.date);

    infoFields.value = {
      제목: states.expense.name,
      분류: !!states.expense.is_salary ? '수입' : '지출',
      '결제 수단': states.expense.type_name,
      카테고리: states.expense.cate_name,
      날짜: states.expense.date,
      메모: states.expense.memo || '',
      '고정비 여부': !!states.expense.is_fixed ? 'O' : 'X',
    };
  } catch (err) {
    console.log('데이터 조회 실패');
  }
};

onMounted(fetchExpense);

const gotoEdit = () => {
  gotoExpenseEdit(id.value);
};

const handleDelete = () => {
  confirm('정말 삭제하시겠습니까?')
    .then(() => {
      expenseStore.deleteExpense(id.value);
      gotoExpense();
      alert.success('내역이 삭제되었습니다.');
    })
    .catch(() => {
      console.log('삭제 취소');
    });
};
</script>
