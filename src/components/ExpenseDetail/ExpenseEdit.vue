<template>
  <div class="full-container trk-bg-2">
    <div class="detail-box trk-bg-1">
      <div class="edit-box__header">
        <span class="header__button"><BackButton :to="`/expenseDetail/${id}`" />
        </span>
        <span class="fw-600 fs-20">지출 내역 수정</span>
      </div>
      <form class="edit-box__item" @submit.prevent="updateExpense">
        <div class="box__itemWrapper">
          <div class="edit-box__item__text">
            <div class="info">
              <div class="info-row">
                <span class="label">금액</span>
                <input
                  type="text"
                  class="trk-br-6 edit-box__form__input"
                  v-model.number="Item.amount"
                />
              </div>
              <div class="info-row">
                <span class="label">제목</span>
                <input
                  type="text"
                  class="trk-br-6 edit-box__form__input"
                  v-model="Item.name"
                />
              </div>
              <div class="info-row">
                <span class="label">결제 수단</span>
                <select
                  class="trk-br-6 edit-box__form__input"
                  v-model="Item.type"
                >
                  <option
                    v-for="type in expenseTypes"
                    :key="type.type_id"
                    :value="type.type_id"
                  >
                    {{ type.name }}
                  </option>
                </select>
              </div>

              <div class="info-row">
                <span class="label">카테고리</span>
                <select
                  class="trk-br-6 edit-box__form__input"
                  v-model="Item.cate_id"
                >
                  <option
                    v-for="cate in expenseCategories"
                    :key="cate.cate_id"
                    :value="cate.cate_id"
                  >
                    {{ cate.name }}
                  </option>
                </select>
              </div>
              <div class="info-row">
                <span class="label">날짜</span>
                <input
                  type="date"
                  class="trk-br-6 edit-box__form__input"
                  v-model="Item.date"
                />
              </div>
              <div class="info-row">
                <span class="label">메모</span>
                <input
                  type="text"
                  class="trk-br-6 edit-box__form__input"
                  v-model="Item.memo"
                />
              </div>
              <div class="info-rowcb">
                <span class="label">고정비 여부</span>
                <input type="checkbox" v-model="Item.is_fixed" />
              </div>
            </div>
          </div>
          <div class="edit-box__item__button">
            <button
              type="submit"
              class="trk-btn-confirm"
              @click="updateExpense"
            >
              저장
            </button>
            <button type="button" class="trk-btn-cancel" @click="gotoDetail">
              취소
            </button>
          </div>
        </div>
      </form>
    </div>
    <ExpenseFilterContainer
      :transactions="expenseStore.expenseList"
      :selectedDate="selectedDate"
    />
  </div>
</template>
<script setup>
import '@/css/expenseDetail/expenseEdit.css';
import { reactive, onMounted, ref, inject } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import expenseData from '../../../db/expense.json';
import useRouterUtil from '@/utils/useRouterUtil';
import { useExpenseStore } from '@/stores/expense';
import BackButton from '../common/BackButton.vue';
import ExpenseFilterContainer from '@/components/Expense/ExpenseFilterContainer.vue';

const expenseStore = useExpenseStore();
const route = useRoute();
const alert = inject('useAlert');

const { gotoExpense, gotoExpenseDetail } = useRouterUtil();

const id = route.params.id;

const expenseTypes = expenseData.expenseType;
const expenseCategories = expenseData.expenseCategory;
const selectedDate = ref(new Date());

const Item = reactive({
  name: '',
  amount: '',
  type: null,
  type_name: '',
  cate_id: null,
  cate_name: '',
  cate_icon:'',
  date: '',
  memo: '',
  is_salary: null,
  is_fixed: null,
});

const fetchExpense = async () => {
  try {
    const response = await axios.get(`/api/Expense/${id}`);
    const data = response.data;
    selectedDate.value = new Date(data.date);

    Item.name = data.name;
    Item.amount = data.amount;
    Item.type = data.type;
    Item.type_name = data.type_name;
    Item.cate_id = data.cate_id;
    Item.cate_name = data.cate_name;
    Item.cate_icon=data.cate_icon;
    Item.date = data.date;
    Item.memo = data.memo;
    Item.is_salary = !!data.is_salary;
    Item.is_fixed = !!data.is_fixed;
  } catch (err) {
    console.error('데이터 조회 실패', err);
    gotoExpense();
  }
};

onMounted(fetchExpense);

const updateExpense = async () => {
  try {
    const selectedType = expenseTypes.find((t) => t.type_id === Item.type);
    const selectedCate = expenseCategories.find(
      (c) => c.cate_id === Item.cate_id
    );

    Item.type_name = selectedType ? selectedType.name : '';
    Item.cate_name = selectedCate ? selectedCate.name : '';
    Item.cate_icon = selectedCate ? selectedCate.icon : '';

    await axios.patch(`/api/Expense/${id}`, {
      name: Item.name,
      amount: parseInt(Item.amount),
      type: Item.type,
      type_name: Item.type_name,
      cate_id: Item.cate_id,
      cate_name: Item.cate_name,
      cate_icon: Item.cate_icon,
      date: Item.date,
      memo: Item.memo,
      is_salary: Item.is_salary ? 1 : 0,
      is_fixed: Item.is_fixed ? 1 : 0,
    });

    console.log('수정 완료');
    gotoExpenseDetail(id);
    alert.success('내역이 수정되었습니다.');
  } catch (err) {
    console.log('저장 실패');
  }
};

const gotoDetail = () => {
  gotoExpenseDetail(id);
};
</script>
