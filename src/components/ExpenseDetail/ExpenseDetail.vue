<template>
  <div class="content-box">
    <div class="detail-box">
      <div class="detail-box__header">
        <span class="detail-box__header__button">
          <i class="fa-solid fa-chevron-left"></i>
        </span>
        <span class="detail-box__header__title">세부 지출 내역</span>
      </div>
      <div class="detail-box__item">
        <div class="detail-box__item__text">
          <div class="info">
            <div class="info-row">
              <span class="amount-unit"
                ><strong class="amount-value">2,000,000</strong> 원</span
              >
            </div>
            <div class="info-row">
              <span class="label">제목</span>
              <span class="value">수입</span>
            </div>
            <div class="info-row">
              <span class="label">결제 수단</span>
              <span class="value">카드</span>
            </div>
            <div class="info-row">
              <span class="label">카테고리</span>
              <span class="value">수입</span>
            </div>

            <div class="info-row">
              <span class="label">날짜</span>
              <span class="value">2024-04-05</span>
            </div>
            <div class="info-row">
              <span class="label">메모</span>
              <span class="value">즐거운 월급이다</span>
            </div>
            <div class="info-row">
              <span class="label">고정비 여부</span>
              <span class="value"><input type="checkbox" /></span>
            </div>
          </div>
        </div>
        <div class="detail-box__item__button">
          <button class="detail-box__item__button__item">수정</button>
          <button class="detail-box__item__button__item">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/css/expenseDetail/expenseDetail.css";
</script>
