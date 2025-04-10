import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('Category', () => {
  const BASEURL = 'api/Category';
  const state = reactive({ categoryList: [], isLoading: false });

  //카테고리 조회
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

  //카테고리 읽기 전용으로 읽도록 computed
  const categoryList = computed(() => state.categoryList);

  return {
    categoryList,
    fetchcategoryList,
  };
});
