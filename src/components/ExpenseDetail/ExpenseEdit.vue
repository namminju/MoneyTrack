<template>
  <div class="content-box">
    <div class="edit-box">
      <div class="edit-box__header">
        <span class="edit-box__header__button">
          <i class="fa-solid fa-chevron-left"></i>
        </span>
        <span class="edit-box__header__title">세부 지출 내역</span>
      </div>
      <form class="edit-box__item">
        <div class="edit-box__item__text">
          <div class="info">
            <div class="info-row">
              <span class="label">금액</span>
              <input type="text" class="edit-box__form__input" />
            </div>
            <div class="info-row">
              <span class="label">제목</span>
              <input type="text" class="edit-box__form__input" />
            </div>
            <div class="info-row">
              <span class="label">결제 수단</span>
              <select class="edit-box__form__input">
                <option>카드</option>
                <option>현금</option>
              </select>
            </div>

            <div class="info-row">
              <span class="label">카테고리</span>
              <select class="edit-box__form__input">
                <option>식비</option>
                <option>교통비</option>
                <option>문화/여가</option>
                <option>쇼핑</option>
                <option>집</option>
                <option>건강</option>
                <option>교육</option>
                <option>반려동물</option>
                <option>금융</option>
                <option>수입</option>
                <option>뷰티</option>
                <option>기타</option>
              </select>
            </div>
            <div class="info-row">
              <span class="label">날짜</span>
              <input type="date" class="edit-box__form__input" />
            </div>
            <div class="info-row">
              <span class="label">메모</span>
              <input type="text" class="edit-box__form__input" />
            </div>
            <div class="info-row">
              <span class="label">고정비 여부</span>
              <input type="checkbox" />
            </div>
          </div>
        </div>
        <div class="edit-box__item__button">
          <button class="edit-box__item__button__item">저장</button>
          <button class="edit-box__item__button__item">취소</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import "@/css/expenseDetail/expenseEdit.css";
</script>
