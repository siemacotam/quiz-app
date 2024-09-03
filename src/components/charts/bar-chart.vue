<template>
  <div class="bar">
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";
import { PropType } from "vue";
import { ChartProps } from "@/types/charts.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartData: {
      type: Object as PropType<ChartProps>,
      required: true,
    },
  },
  data() {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return { options };
  },
};
</script>

<style>
.bar {
  height: 300px;
  width: 300px;
}
</style>
