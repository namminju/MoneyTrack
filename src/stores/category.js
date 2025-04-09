import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('Category', () => {
  const BASEURL = 'api/Category';
  const state = reactive({ categoryList: [], isLoading: false });

  const fetchcategoryList = async () => {
    state.isLoading = true;
    try {
      const response = await axios.get(BASEURL);
      if (response.status === 200) {
        state.categoryList = response.data;

        //console.log(response.data);
      } else {
        console.error('조회 실패');
      }
    } catch (e) {
      console.error('error: ' + e);
    } finally {
      state.isLoading = false;
    }
  };
  const categoryList = computed(() => state.categoryList);

  return {
    categoryList,
    fetchcategoryList,
  };
});
