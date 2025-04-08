<template>
  <div class="content-box">
    <div class="edit-box">
      <div class="edit-box__header">
        <span class="edit-box__header__button" @click="gotoDetail">
          <i class="fa-solid fa-chevron-left"></i>
        </span>
        <span class="edit-box__header__title">지출 내역 수정</span>
      </div>
      <form class="edit-box__item" @submit.prevent="updateExpense">
        <div class="edit-box__item__text">
          <div class="info">
            <div class="info-row">
              <span class="label">금액</span>
              <input
                type="text"
                class="edit-box__form__input"
                v-model="Item.amount"
              />
            </div>
            <div class="info-row">
              <span class="label">제목</span>
              <input
                type="text"
                class="edit-box__form__input"
                v-model="Item.name"
              />
            </div>
            <div class="info-row">
              <span class="label">결제 수단</span>
              <select class="edit-box__form__input" v-model="Item.type">
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
              <select class="edit-box__form__input" v-model="Item.cate_id">
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
                class="edit-box__form__input"
                v-model="Item.date"
              />
            </div>
            <div class="info-row">
              <span class="label">메모</span>
              <input
                type="text"
                class="edit-box__form__input"
                v-model="Item.memo"
              />
            </div>
            <div class="info-row">
              <span class="label">고정비 여부</span>
              <input type="checkbox" v-model="Item.is_salary" />
            </div>
          </div>
        </div>
        <div class="edit-box__item__button">
          <button
            type="submit"
            class="edit-box__item__button__item"
            @click="updateExpense"
          >
            저장
          </button>
          <button
            type="button"
            class="edit-box__item__button__item"
            @click="gotoDetail"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import "@/css/expenseDetail/expenseEdit.css";
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import expenseData from "../../../db/expense.json";

const route = useRoute();
const router = useRouter();
const id = parseInt(route.params.id);
const expenseTypes = expenseData.expenseType;
const expenseCategories = expenseData.expenseCategory;

const Item = reactive({
  name: "",
  amount: "",
  type: null,
  type_name: "",
  cate_id: null,
  cate_name: "",
  date: "",
  memo: "",
  is_salary: false,
});

const fetchExpense = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/Expense/${id}`);
    const data = response.data;

    Item.name = data.name;
    Item.amount = data.amount;
    Item.type = data.type;
    Item.type_name = data.type_name;
    Item.cate_id = data.cate_id;
    Item.cate_name = data.cate_name;
    Item.date = data.date;
    Item.memo = data.memo;
    Item.is_salary = data.is_salary;
  } catch (err) {
    console.error("데이터 조회 실패", err);
    router.push("/expense");
  }
};

onMounted(fetchExpense);

const updateExpense = async () => {
  try {
    const selectedType = expenseTypes.find((t) => t.type_id === Item.type);
    const selectedCate = expenseCategories.find(
      (c) => c.cate_id === Item.cate_id
    );

    Item.type_name = selectedType ? selectedType.name : "";
    Item.cate_name = selectedCate ? selectedCate.name : "";

    await axios.put(`http://localhost:3000/Expense/${id}`, {
      id: Number(id), // 혹은 parseInt(id)
      name: Item.name,
      amount: Number(Item.amount),
      type: Number(Item.type),
      type_name: Item.type_name,
      cate_id: Number(Item.cate_id),
      cate_name: Item.cate_name,
      date: Item.date,
      memo: Item.memo,
      is_salary: Item.is_salary ? 1 : 0, // boolean → 숫자로
});

    console.log("수정 완료");
    router.push(`/expenseDetail/${id}`);
  } catch (err) {
    console.log("저장 실패");
  }
};

const gotoDetail = () => {
  router.push(`/expenseDetail/${id}`);
};
</script>
