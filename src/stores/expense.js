import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useExpenseStore = defineStore("expense", () => {
  const BASEURL = "api/Expense";
  const state = reactive({ expenseList: [], isLoading: false });

  // ✅ 사용자 ID 가져오는 함수
  const getUserIdFromSession = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user?.id ?? '';
  };

  const fetchExpenseList = async () => {
    state.isLoading = true;
    try {
      const userId = getUserIdFromSession(); // ✅ 세션에서 가져옴
      const response = await axios.get(`${BASEURL}?user_id=${userId}`);
      if (response.status === 200) {
        state.expenseList = response.data;
      } else {
        console.error("조회 실패");
      }
    } catch (e) {
      console.error("error: " + e);
    } finally {
      state.isLoading = false;
    }
  };

  const AddExpense = async (expense) => {
    state.isLoading = true;
    try {
      const response = await axios.post(BASEURL, expense);
      if (response.status === 201) {
        await fetchExpenseList(); // ✅ 따로 id 전달하지 않음
      } else {
        console.error("등록 실패");
      }
    } catch (e) {
      console.error("error: " + e);
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
      await axios.patch(`/${BASEURL}/${id}`, { is_delete: 1 });
    } catch (err) {
      console.error("삭제 실패", err);
      throw err;
    }
  };

  return {
    expenseList,
    fetchExpenseList,
    AddExpense,
    getExpenseById,
    deleteExpense,
  };
});
