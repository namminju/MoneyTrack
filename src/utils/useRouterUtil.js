// src/utils/useRouterUtil.js
import { useRouter } from "vue-router";

const useRouterUtil = () => {
  const router = useRouter();

  return {
    gotoExpense() {
      router.push("/expense");
    },
    gotoExpenseDetail(id) {
      router.push(`/expenseDetail/${id}`);
    },
    gotoExpenseEdit(id) {
      router.push(`/expenseEdit/${id}`);
    },
  };
};

export default useRouterUtil;
