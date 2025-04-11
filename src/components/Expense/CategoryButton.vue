<template>
  <div :class="wrapperClass">
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
      <i :class="category.icon" />
      {{ category.name }}
    </label>
  </div>
</template>

<script setup>
defineProps({
  category: Object,
  isSelected: Boolean,
  toggleCategory: Function,
  wrapperClass: {
    type: String,
    default: '', // 기본은 아무 클래스도 적용하지 않음
  },
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
.chcekbox-button:hover {
  background-color: var(--trk-ivory);
  scale: 1.01;
  font-weight: 700;
}
.chcekbox-button.selected {
  background-color: var(--trk-green);
  color: white;
  font-weight: 700;
}
@media (max-width: 380px) {
  .chcekbox-button,
  .radio-button {
    padding: 6px 8px;
  }
}
</style>
