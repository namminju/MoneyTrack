<template>
  <div class="filter-panel">
    <!-- 카테고리 선택(다중) -->
    <label class="filter-panel___label">Category</label>
    <div class="row gx-3 gy-3">
      <div class="row gx-3 gy-3">
        <CategoryButton
          v-for="category in allCategories"
          :key="category.name"
          :category="category"
          :isSelected="localSelectedCategories.includes(category.name)"
          :toggleCategory="toggleCategory"
          wrapperClass="col-6 col-sm-4 col-lg-6 col-xxl-4"
        />
      </div>
    </div>

    <!-- 수입/지출 선택 -->
    <label class="filter-panel___label">Type</label>
    <select :value="selectedType" @change="onTypeChange">
      <option value="">전체</option>
      <option :value="1">수입</option>
      <option :value="0">지출</option>
    </select>
  </div>
</template>

<script setup>
//components
import CategoryButton from './CategoryButton.vue';

//props
const props = defineProps({
  allCategories: Array,
  selectedCategories: Array,
  selectedType: Number,
});

//선택된 category 목록 변경 이벤트
const emit = defineEmits(['update:selectedCategories', 'update:selectedType']);

// 선택된 값 있으면 선택 목록 초기화
const localSelectedCategories = [...props.selectedCategories];

//버튼 조작(선택/미선택)
function toggleCategory(name) {
  const index = localSelectedCategories.indexOf(name);
  if (index === -1) {
    localSelectedCategories.push(name);
  } else {
    localSelectedCategories.splice(index, 1);
  }
  emit('update:selectedCategories', [...localSelectedCategories]);
}

// 수입/지출 선택 이벤트
function onTypeChange(event) {
  emit('update:selectedType', event.target.value);
}
</script>

<!-- style -->
<style scoped>
.filter-panel {
  font-weight: bold;
  background-color: var(--trk-light-yellow);
  position: absolute;
  width: 90%;
  border-radius: 2rem;
  right: 5%;
  z-index: 999;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.filter-panel select {
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;
}

.filter-panel___label {
  padding: 1rem 0;
}

@media (max-width: 1024px) {
  .filter-panel {
    padding: 2%;
    width: 58%;
    right: 2%;
  }
}
</style>
