<!-- components/CategoryButton.vue -->
<!-- category 버튼 -->
<template>
  <!-- screen 크기에 따라 가로 버튼 개수 변경 -->
  <div class="col-6 col-sm-4 col-lg-6 col-xxl-4">
    <label
      :class="['chcekbox-button', { selected: isSelected }]"
      class="button-text"
    >
      <input
        type="checkbox"
        :value="category.name"
        :checked="isSelected"
        @change="toggleCategory(category.name)"
        class="hidden-checkbox"
      />
      <!-- 카테고리 아이콘 및 이름 출력 -->
      <i :class="category.icon" />
      {{ category.name }}
    </label>
  </div>
</template>

<script setup>
//props
defineProps({
  category: Object,
  isSelected: Boolean,
  toggleCategory: Function,
});
</script>

<!-- 스타일 -->
<style scoped>
.hidden-checkbox {
  display: none;
}
.button-text {
  font-size: 1.1rem;
}
.chcekbox-button,
.radio-button {
  background-color: white;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}
.chcekbox-button.selected {
  background-color: #000000;
  color: white;
}
</style>
