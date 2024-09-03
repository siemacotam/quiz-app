<template>
  <div class="pie">
    <Pie :data="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import { PropType } from "vue";
import { ChartProps } from "@/types/charts.types";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "PieChart",
  components: {
    Pie,
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
.pie {
  height: 300px;
  width: 300px;
}
</style>
