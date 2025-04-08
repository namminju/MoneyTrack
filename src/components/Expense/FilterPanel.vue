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
          class="button-text"
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
      <option :value="0">전체</option>
      <option :value="2">수입</option>
      <option :value="1">지출</option>
    </select>
  </div>
</template>

<script setup>
import CategoryIcon from '../Category/CategoryIcon.vue';
const props = defineProps({
  allCategories: Array,
  selectedCategories: Array,
  selectedType: Number,
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
  gap: 1rem;
  flex-wrap: wrap;
}
.filter-panel___label {
  padding: 1rem 0;
}
 
.button-text {
  font-size: 1.3rem;
}
 
</style>
