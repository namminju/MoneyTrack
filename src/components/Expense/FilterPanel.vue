<template>
  <div class="filter-panel">
    <label class="filter-panel___label">Category</label>
    <div class="row gx-3 gy-3">
      <div v-for="category in allCategories" :key="category.name" class="col-4">
        <label
          :class="[
            'chcekbox-button',
            { selected: localSelectedCategories.includes(category.name) },
          ]"
          class="w-100 d-block"
        >
          <input
            type="checkbox"
            :value="category.name"
            :checked="localSelectedCategories.includes(category.name)"
            @change="toggleCategory(category.name)"
            class="hidden-checkbox"
          />
          <CategoryIcon :category="category.name" />
          {{ category.name }}
        </label>
      </div>
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
import 'bootstrap/dist/css/bootstrap.css';
import CategoryIcon from '../Category/CategoryIcon.vue';
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
.chcekbox-button {
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
.chcekbox-button.selected {
  background-color: #000000;
  color: white;
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
