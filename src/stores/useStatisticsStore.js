import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useStatisticsStore = defineStore('statistics', () => {
  const rawData = ref([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/Expense');
      rawData.value = res.data;
    } catch (err) {
      console.error('데이터 가져오기 실패: ', err);
    }
  };
  const selectedType = ref('전체');
  const selectedPeriod = ref('월간');
  const selectedMonth = ref(0);
  const selectedYear = ref(0);

  const isSameMonth = (dateA, dateB) => {
    return (
      new Date(dateA).getFullYear() === new Date(dateB).getFullYear() &&
      new Date(dateA).getMonth() === new Date(dateB).getMonth()
    );
  };
  const isSameYear = (dateA, dateB) => {
    return new Date(dateA).getFullYear() === new Date(dateB).getFullYear();
  };

  const filteredData = computed(() => {
    return rawData.value.filter((item) => {
      const date = new Date(item.date);
      if (selectedType.value === '수입' && item.type !== 1) return false;
      if (selectedType.value === '지출' && item.type !== 2) return false;

      if (
        selectedPeriod.value === '월간' &&
        (date.getFullYear() !== selectedYear.value ||
          date.getMonth() + 1 !== selectedMonth.value)
      )
        return false;
      if (
        selectedPeriod.value === '연간' &&
        date.getFullYear() !== selectedYear.value
      )
        return false;
      return true;
    });
  });

  const categoryTotals = computed(() => {
    const result = {};
    filteredData.value.forEach((item) => {
      const name = item.cate_name;
      result[name] = (result[name] || 0) + item.amount;
    });
    return result;
  });

  const totalAmount = computed(() => {
    return Object.values(categoryTotals.value).reduce((a, b) => a + b, 0);
  });

  const categoryRatios = computed(() => {
    return Object.entries(categoryTotals.value)
      .map(([name, amount]) => ({
        category: name,
        amount,
        ratio: Math.round((amount / totalAmount.value) * 100),
      }))
      .sort((a, b) => b.ratio - a.ratio);
  });
  return {
    rawData,
    fetchData,
    selectedType,
    selectedPeriod,
    selectedMonth,
    selectedYear,
    filteredData,
    categoryTotals,
    totalAmount,
    categoryRatios,
  };
});
