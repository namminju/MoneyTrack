<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script setup>
import '@/css/statistics/statistics.css';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  categoryRatios: {
    type: Array,
    required: true,
  },
});

const chartData = computed(() => ({
  labels: props.categoryRatios.map((item) => item.category),
  datasets: [
    {
      label: '지출 비율(%)',
      data: props.categoryRatios.map((item) => item.ratio),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#8AFFC1',
        '#9966FF',
        '#FF9F40',
        '#C9CBCF',
        '#FF6666',
        '#99CC99',
        '#FFCC99',
        '#66CCCC',
      ],
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
  },
};
</script>
