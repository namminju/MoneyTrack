import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useExpenseStore = defineStore('expense', () => {
  const BASEURL = 'api/Expense';
  const state = reactive({ expenseList: [], isLoading: false });

  const fetchExpenseList = async () => {
    state.isLoading = true;
    try {
      const response = await axios.get(BASEURL);
      if (response.status === 200) {
        state.expenseList = response.data;
      } else {
        console.error('조회 실패');
      }
    } catch (e) {
      console.error('error: ' + e);
    } finally {
      state.isLoading = false;
    }
  };

  const AddExpense = async (expense) => {
    state.isLoading = true;
    console.log(expense.value);
    console.log(expense.value);
    try {
      const response = await axios.post(BASEURL, expense);
      if (response.status === 201) {
        console.log(response.data);
        fetchExpenseList();
      } else {
        console.error('등록 실패');
      }
    } catch (e) {
      console.error('error: ' + e);
    } finally {
      state.isLoading = false;
    }
  };

  const expenseList = computed(() => state.expenseList);

  return {
    expenseList,
    fetchExpenseList,
    AddExpense,
  };
});
