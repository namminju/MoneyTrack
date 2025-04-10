import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import session from '@/utils/session';

//조회 타입
export const typeOptions = [
  { id: 1, name: '전체' },
  { id: 2, name: '수입' },
  { id: 3, name: '지출' },
];

//조회 기간
export const periodOptions = [
  { id: 1, name: '월간' },
  { id: 2, name: '연간' },
];

export const useStatisticsStore = defineStore('statistics', () => {
  const rawData = ref([]);
  const user = session.get();
  const userID = parseInt(user?.id); // 세션에서 user ID 가져오기
  // console.log('userID:', userID); // 디버깅용

  //회원의 기본 지출 내용 출력
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/Expense');
      // rawData.value = res.data;
      rawData.value = res.data.filter((item) => item.user_id === userID);
      // console.log('data: ', rawData.value);
    } catch (err) {
      console.error('데이터 가져오기 실패: ', err);
    }
  };

  //필터링 조건들 export 후 페이지에서 사용자가 가져와야함
  const selectedType = ref(typeOptions[0]); //조회 타입 기본 전체
  const selectedPeriod = ref(periodOptions[0]); //조회 기간 기본 월간

  //년 & 월 변수들 초기값 = 오늘
  const today = new Date();
  const selectedMonth = ref(today.getMonth() + 1);
  const selectedYear = ref(today.getFullYear());

  const filteredData = computed(() => {

    const filteredArr = rawData.value.filter((item) => {
    // return rawData.value.filter((item) => {

      //해당 날짜
      const date = new Date(item.date);

      //수입을 선택했는데 && (지출이거나 || 수입 카테고리가 아닌 경우) == 수입만
      if (
        selectedType.value.id === 2 &&
        (item.is_salary !== 1 || item.cate_id !== 99)
      )
        return false;

      //지출을 선택했는데 && (수입이거나 || 수입 카테고리인 경우) == 지출만
      if (
        selectedType.value.id === 3 &&
        (item.is_salary === 1 || item.cate_id === 99)
      )
        return false; 

      //월간을 선택했는데 && (해당날짜가 선택된 날짜와 같지 않거나 || 해당 월이 선택된 월과 같지 않을 경우)
      if (
        selectedPeriod.value.id === 1 &&
        (date.getFullYear() !== selectedYear.value ||
          date.getMonth() + 1 !== selectedMonth.value)
      ) {
        return false;
      }

      // 연간이면 month는 비교 안 함
      if (
        selectedPeriod.value.id === 2 &&
        date.getFullYear() !== selectedYear.value
      ) {
        return false;
      }
      return true;
    });

    // console.log(filteredArr);
    return filteredArr;
  });

  const categoryTotals = computed(() => {
    // console.log('categoryTotals:', categoryTotals.v alue); // 디버깅용);
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
    //연간 필터링으로 막대 차트에 쓰일 월간 수입 지출 총합 계산
    const totals = Array.from({ length: 12 }, () => ({
      income: 0,
      expense: 0,
    })); //12월까지 각 월별 수입과 지출을 저장할 객체 배열 생성 및 초기화{income: 0, expense: 0}

    rawData.value.forEach((item) => {
      const date = new Date(item.date);
      if (date.getFullYear() !== selectedYear.value) return;

      const month = date.getMonth();

      if (item.is_salary === 1 || item.cate_id === 99) {
        totals[month].income += item.amount;
      } else {
        totals[month].expense += item.amount;
      }
    });
    return totals.map((item, index) => ({
      month: index + 1,
      income: item.income,
      expense: item.expense,
    }));
  });

  const dailyTotal = computed(() => {
    //월간 필터링으로 막대 차트에 쓰일 일일 지출 총합
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

      if (item.is_salary !== 1 || item.cate_id !== 99) {
        total[day - 1] += item.amount;
      }
    });
    return total.map((amount, index) => ({
      day: index + 1,
      amount,
    }));
  });

  const totalAmount = computed(() => {
    // return Object.values(categoryTotals.value).reduce((a, b) => a + b, 0);
    //reduce(a,b) a에 b를 누적시키면서 더하는 함수
    //카테고리별 금액인 categoryTotals의 값들의 합계를 반환
    return Object.entries(categoryTotals.value)
      .filter(([key]) => key !== '수입') // '수입' 카테고리 제외
      .reduce((acc, [, value]) => acc + value, 0);
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
