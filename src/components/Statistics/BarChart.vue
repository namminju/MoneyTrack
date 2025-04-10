<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import '@/css/statistics/statistics.css';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  plugins,
} from 'chart.js';
import { computed } from 'vue';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
const props = defineProps({
  selectedPeriod: Object,
  monthlyTotal: Array,
  dailyTotal: Array,
  filteredData: Array,
});

const chartData = computed(() => {
  console.log(props.monthlyTotal);
  const isMonthly = props.selectedPeriod?.id === 1;
  //Period id 는 월간/ 연간을 나타내는 값 1이면 월간 2이면 연간

  const totals = {};

  props.filteredData.forEach((item) => {
    const date = new Date(item.date);
    const key = isMonthly ? `${date.getDate()}일` : `${date.getMonth() + 1}월`;

    if (!totals[key]) {
      totals[key] = { income: 0, expense: 0 };
    }
    if (item.is_salary === 1) {
      totals[key].income += item.amount;
    } else {
      totals[key].expense += item.amount;
    }
  });

  const labels = Object.keys(totals).sort((a, b) => parseInt(a) - parseInt(b));
  const incomeData = labels.map((label) => totals[label].income);
  const expenseData = labels.map((label) => totals[label].expense);

  const datasets = [
    {
      label: '지출',
      data: expenseData,
      backgroundColor: '#ff6384',
    },
  ];
  if (!isMonthly) {
    datasets.push({
      label: '수입',
      data: incomeData,
      backgroundColor: '#36A2EB',
    });
  }
  return {
    labels,
    datasets,
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.raw.toLocaleString()}원`,
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => `${value.toLocaleString()}원`,
      },
    },
  },
};
</script>
