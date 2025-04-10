<template>
  <div class="category-list">
    <h2>카테고리별 지출 비율</h2>
    <ul>
      <li v-for="item in categoryRatios" :key="item.category">
        {{ item.category }}: {{ item.amount }}원 ({{ item.ratio }}%)
      </li>
    </ul>
  </div>
</template>
<script></script>
