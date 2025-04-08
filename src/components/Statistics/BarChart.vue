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
});

const chartData = computed(() => {
  const isMonthly = props.selectedPeriod?.id === 1;
  //Period id 는 월간/ 연간을 나타내는 값 1이면 월간 2이면 연간
  const labels = isMonthly
    ? props.dailyTotal.map((item) => `${item.day}일`)
    : props.monthlyTotal.map((item) => `${item.month}월`);
  const data = isMonthly
    ? props.dailyTotal.map((item) => item.amount)
    : props.monthlyTotal.map((item) => item.amount);
  return {
    labels,
    datasets: [{ label: '지출금액', data, backgroundColor: '#36A2EB' }],
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
