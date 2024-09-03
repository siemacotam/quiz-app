<template>
  <div class="line">
    <Line :data="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { PropType } from "vue";
import { ChartProps } from "@/types/charts.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "PieChart",
  components: {
    Line,
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
.line {
  height: 300px;
  width: 300px;
}
</style>
