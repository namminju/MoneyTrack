import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useExpenseStore = defineStore("expense", () => {
  const BASEURL = "api/Expense";
  const state = reactive({ expenseList: [], isLoading: false });

  const fetchExpenseList = async () => {
    state.isLoading = true;
    try {
      const response = await axios.get(BASEURL);
      if (response.status === 200) {
        state.expenseList = response.data;
      } else {
        console.error("조회 실패");
      }
    } catch (e) {
      alert("error: " + e);
    } finally {
      state.isLoading = false;
    }
  };
  const expenseList = computed(() => state.expenseList);

  const getExpenseById = async (id) => {
    try {
      const response = await axios.get(`${BASEURL}/${id}`);
      return response.data;
    } catch (err) {
      console.error("지출 단건 조회 실패", err);
      return null;
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.patch(`${BASEURL}/${id}`, { is_delete: 1 });
    } catch (err) {
      console.error("삭제 실패", err);
      throw err;
    }
  };

  return {
    expenseList,
    fetchExpenseList,
    getExpenseById,
    deleteExpense,
  };
});
