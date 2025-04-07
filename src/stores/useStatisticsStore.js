import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useStatisticsStore = defineStore('statistics', () => {
  const rawdata = ref([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/Expense');
      rawdata.value = res.data;
    } catch (err) {
      console.error('데이터 가져오기 실패: ', err);
    }
  };
  const selectedType = ref('전체');
  const selectedPeriod = ref('월간');

  const filteredData = computed(() => {
    return rawdata.value.filter((item) => {
      if (selectedType.value === '전체') return true;
      if (selectedType.value === '수입') return item.type === 1;
      if (selectedType.value === '지출') return item.type === 2;
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
    return Object.values(categoryTotals.value)
      .map(([name, amount]) => ({
        category: name,
        amount,
        ratio: Math.round((amount / totalAmount / value) * 100),
      }))
      .sort((a, b) => b.ratio - a.ratio);
  });
  return {
    rawData,
    fetchData,
    selectedType,
    selectedPeriod,
    filteredData,
    categoryTotals,
    totalAmount,
    categoryRatios,
  };
});
