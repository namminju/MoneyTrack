import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const typeOptions = [
  { id: 1, name: '전체' },
  { id: 2, name: '수입' },
  { id: 3, name: '지출' },
];

export const periodOptions = [
  { id: 1, name: '월간' },
  { id: 2, name: '연간' },
];

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
  const selectedType = ref(typeOptions[0]);
  const selectedPeriod = ref(periodOptions[0]);
  const selectedMonth = ref(0);
  const selectedYear = ref(0);

  const filteredData = computed(() => {
    return rawData.value.filter((item) => {
      const date = new Date(item.date);

      if (selectedType.value.id === 2 && item.cate_id !== 99) return false; // 수입만
      if (selectedType.value.id === 3 && item.cate_id === 99) return false; // 지출만

      if (
        selectedPeriod.value.id === 1 &&
        (date.getFullYear() !== selectedYear.value ||
          date.getMonth() + 1 !== selectedMonth.value)
      )
        return false;

      if (
        selectedPeriod.value.id === 2 &&
        date.getFullYear() !== selectedYear.value
      )
        return false;
      return true;
    });
  });

  const categoryTotals = computed(() => {
    const result = {};

    // filteredData에서 하나씩 반복하면서
    filteredData.value.forEach((item) => {
      const category = item.cate_name; // 카테고리 이름
      const amount = item.amount; // 해당 항목의 금액

      // 만약 result에 이 카테고리가 없으면 0으로 초기화
      if (!result[category]) {
        result[category] = 0;
      }

      // 해당 카테고리의 총합에 금액을 더해줌
      result[category] += amount;
    });

    return result; // 카테고리별 총합 객체 반환
  });

  const monthlyTotal = computed(() => {
    const totals = Array.from({ length: 12 }, () => ({
      income: 0,
      expense: 0,
    })); //12월까지 각 월별 수입과 지출을 저장할 객체 배열 생성 및 초기화{income: 0, expense: 0}

    filteredData.value.forEach((item) => {
      const date = new Date(item.date);
      const month = date.getMonth();

      if (item.cate_id === 99) {
        totals[month].income += item.amount;
      } else {
        totals[month].expense += item.amount;
      }
    });
    return totals;
  });

  const dailyTotal = computed(() => {
    if (selectedPeriod.value.id !== 1) return [];

    const daysInMonth = new Date(
      selectedYear.value,
      selectedMonth.value,
      0
    ).getDate();
    const total = Array(daysInMonth).fill(0);

    filteredData.value.forEach((item) => {
      const date = new Date(item.date);
      const day = date.getDate();

      if (item.cate_id !== 99) {
        total[day - 1] += item.amount;
      }
    });
    return total.map((amount, index) => ({
      day: index + 1,
      amount,
    }));
  });

  const totalAmount = computed(() => {
    return Object.values(categoryTotals.value).reduce((a, b) => a + b, 0);
    //reduce(a,b) a에 b를 누적시키면서 더하는 함수
    //카테고리별 금액인 categoryTotals의 값들의 합계를 반환
  });

  const categoryRatios = computed(() => {
    return Object.entries(categoryTotals.value)
      .map(([name, amount]) => ({
        category: name,
        amount,
        ratio: Math.round((amount / totalAmount.value) * 100), //Math.round 소수점 반올림해서 정수로
      }))
      .sort((a, b) => b.ratio - a.ratio); //내림차순 정렬
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
    dailyTotal,
    monthlyTotal,
  };
});
