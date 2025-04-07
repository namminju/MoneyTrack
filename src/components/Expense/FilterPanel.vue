<template>
  <div class="filter-panel">
    <label class="filter-panel___label">Category</label>
    <div class="category-button-group">
      <label
        v-for="category in allCategories"
        :key="category.name"
        :class="[
          'category-button',
          { selected: localSelectedCategories.includes(category.name) },
        ]"
      >
        <input
          type="checkbox"
          :value="category.name"
          :checked="localSelectedCategories.includes(category.name)"
          @change="toggleCategory(category.name)"
          class="hidden-checkbox"
        />
        <i :class="category.icon"></i>
        {{ category.name }}
      </label>
    </div>

    <label class="filter-panel___label">Type</label>
    <select :value="selectedType" @change="onTypeChange">
      <option>전체</option>
      <option>수입</option>
      <option>지출</option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  allCategories: Array,
  selectedCategories: Array,
  selectedType: String,
});
const emit = defineEmits(['update:selectedCategories', 'update:selectedType']);

// 로컬 상태로 받아서 조작 후 emit
const localSelectedCategories = [...props.selectedCategories];

function toggleCategory(name) {
  const index = localSelectedCategories.indexOf(name);
  if (index === -1) {
    localSelectedCategories.push(name);
  } else {
    localSelectedCategories.splice(index, 1);
  }
  emit('update:selectedCategories', [...localSelectedCategories]);
}

function onTypeChange(event) {
  emit('update:selectedType', event.target.value);
}
</script>

<style scoped>
.category-button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.filter-panel___label {
  padding: 1rem 0;
}
.category-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 10px;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}
.category-button.selected {
  background-color: #000000;
  color: white;
}
.hidden-checkbox {
  display: none;
}
select {
  appearance: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 10px;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}
</style>
