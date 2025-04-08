<template>
  <div class="content-box">
    <div class="detail-box">
      <div class="detail-box__header">
        <span
          @click="$router.push('/expense')"
          class="detail-box__header__button"
        >
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
          <button class="detail-box__item__button__item" @click="gotoEdit">
            수정
          </button>
          <button class="detail-box__item__button__item" @click="deleteExpense">
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/css/expenseDetail/expenseDetail.css";
import { reactive, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const states = reactive({ expense: {} });
const infoFields = ref({});
const id = parseInt(route.params.id);
console.log("현재 ID:", id);

const fetchExpense = async () => {
  const id = parseInt(route.params.id);
  try {
    const response = await axios.get(`http://localhost:3000/Expense/${id}`);
    console.log("응답 데이터:", response.data);
    if (!response.data) {
      console.log("error");
    }
    states.expense = response.data;

    infoFields.value = {
      제목: states.expense.name,
      "결제 수단": states.expense.type_name,
      카테고리: states.expense.cate_name,
      날짜: states.expense.date,
      메모: states.expense.memo || "메모 없음",
      "고정비 여부": states.expense.is_salary ? "O" : "X",
    };
  } catch (err) {
    console.log("데이터 조회 실패");
  }
};
onMounted(fetchExpense);

const gotoEdit = () => {
  const id = parseInt(route.params.id);
  router.push(`/expenseEdit/${id}`);
};

const deleteExpense = async () => {
  const id = parseInt(route.params.id);

  try {
    await axios.patch(`http://localhost:3000/Expense/${id}`, {
      is_delete: 1,
    });
    alert("삭제 완료");
    router.push("/expense");
  } catch (err) {
    alert("삭제에 실패했습니다.");
  }
};
</script>
