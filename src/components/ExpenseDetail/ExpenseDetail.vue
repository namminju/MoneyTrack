<template>
  <div class="full-container trk-bg-2">
    <div class="detail-box trk-bg-1">
      <div class="detail-box__header">
        <span @click="gotoExpense()" class="detail-box__header__button">
          <i class="fa-solid fa-chevron-left"></i>
        </span>
        <span class="detail-box__header__title">세부 지출 내역</span>
      </div>
      <div class="detail-box__item">
        <div class="detail-box__item__text">
          <div class="info">
            <div class="info-row">
              <span class="amount-unit"
                ><strong class="amount-value">{{
                  states.expense.amount?.toLocaleString()
                }}</strong>
                원</span
              >
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

    <ExpenseFilterContainer
      :transactions="expenseStore.expenseList"
      :selectedDate="selectedDate"
    />
  </div>
</template>

<script setup>
import "@/css/expenseDetail/expenseDetail.css";
import { reactive, onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import useRouterUtil from "@/utils/useRouterUtil";
import ExpenseFilterContainer from "@/components/Expense/ExpenseFilterContainer.vue";
import { useExpenseStore } from "@/stores/expense";

const expenseStore = useExpenseStore();
const { gotoExpense, gotoExpenseDetail, gotoExpenseEdit } = useRouterUtil();
const route = useRoute();

const states = reactive({ expense: {} });
const infoFields = ref({});
const id = computed(() => parseInt(route.params.id));
const selectedDate = ref(new Date());

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
      console.log("error");
    }

    states.expense = response.data;
    selectedDate.value = new Date(states.expense.date);

    infoFields.value = {
      제목: states.expense.name,
      분류: !!states.expense.is_salary ? "수입" : "지출",
      "결제 수단": states.expense.type_name,
      카테고리: states.expense.cate_name,
      날짜: states.expense.date,
      메모: states.expense.memo || "메모 없음",
      "고정비 여부": !!states.expense.is_fixed ? "O" : "X",
    };
  } catch (err) {
    console.log("데이터 조회 실패");
  }
};

onMounted(fetchExpense);

const gotoEdit = () => {
  gotoExpenseEdit(id.value);
};

const handleDelete = async () => {
  try {
    await axios.patch(`/api/Expense/${id.value}`, { is_delete: 1 });
    gotoExpense();
  } catch (e) {
    console.log("삭제 실패");
  }
};
</script>
