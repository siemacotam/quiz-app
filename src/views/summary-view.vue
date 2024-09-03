<template>
  <div class="summary" v-if="score">
    <ConfettiAnimation />
    <h1 class="summary__title">Congratulations {{ score.name }}</h1>

    <div class="summary__container">
      <div class="summary__container--element">
        <p class="summary__container--title">Time summary</p>

        <LineChart :chartData="timePerQuestionBarChartDataFromSummary" />
        <div>
          <p class="summary__caption">
            Average answer time -{{ score.averageTime }}s
          </p>
          <p class="summary__caption">Total time - {{ score.time }}s</p>
        </div>
      </div>

      <div class="summary__container--element">
        <p class="summary__container--title">Effectiveness</p>
        <PieChart :chartData="dataForPieChart" />
        <p class="summary__caption">Your score: {{ score.score }}</p>
      </div>
      <div class="summary__container--element summary__container--element-big">
        <p class="summary__container--title">Comparison</p>
        <div class="summary__flex">
          <BarChart :chartData="dataWithScoreAverage" />
          <BarChart :chartData="dataWithTimeAverage" />
        </div>
      </div>
    </div>

    <SummaryQuestions :data="score.answers" />
    <div class="summary__button-container">
      <CustomButton buttonType="top" :onClick="navigateToHome"
        >Go to homepage</CustomButton
      >
    </div>
  </div>
  <div v-else>
    Something went wrong with results. Please go back to main page
  </div>
</template>

<script setup lang="ts">
// components
import BarChart from "@/components/charts/bar-chart.vue";
import PieChart from "@/components/charts/pie-chart.vue";
import LineChart from "@/components/charts/line-chart.vue";
import ConfettiAnimation from "@/components/congrats-background.vue";
import SummaryQuestions from "@/components/summary-questions.vue";
import CustomButton from "@/components/ui/custom-button.vue";

import { useSummary } from "@/composable/useSummary";
import { ChartProps } from "@/types/charts.types";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToHome = () => router.push("/");

const {
  getTimePerQuestionBarChartDataFromSummary,
  getAnswersDataForPieQart,
  getAverageScoreDataForBarChart,
  getAverageTimeDataForBarChart,
  getQuizSummary,
} = useSummary();

const score = getQuizSummary();

let timePerQuestionBarChartDataFromSummary: ChartProps;
let dataForPieChart: ChartProps;
let dataWithScoreAverage: ChartProps;
let dataWithTimeAverage: ChartProps;

if (score) {
  timePerQuestionBarChartDataFromSummary =
    getTimePerQuestionBarChartDataFromSummary(score);

  dataForPieChart = getAnswersDataForPieQart(score);

  dataWithScoreAverage = getAverageScoreDataForBarChart(score);

  dataWithTimeAverage = getAverageTimeDataForBarChart(score);
}
</script>

<style lang="scss">
.summary {
  max-width: 1200px;
  margin: 10px auto;

  @include respond-to(mobile) {
    padding: 10px;
  }

  &__button-container {
    display: flex;
    justify-content: center;
    margin: 40px 0 60px;
  }

  &__question-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    &--title {
      width: 100%;
      font-size: 1.3rem;
      margin: 25px 0;
    }
  }

  &__question {
    width: calc(50% - 5px);
    font-size: 14px;
    padding: 6px;
    border: 1px solid $grey;
    border-radius: 10px;

    @include respond-to(mobile) {
      width: 100%;
    }
  }

  &__caption {
    font-size: 13px;
    font-weight: 500;
  }

  &__title {
    margin: 20px 0;
    text-align: center;
  }

  &__flex {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    @include respond-to(mobile) {
      flex-direction: column;
    }
  }

  &__answer {
    font-weight: 600;
    color: green;
    text-decoration: none;
  }

  &__container {
    display: flex;
    flex-wrap: wrap;

    &--title {
      border-bottom: 1px solid $grey;
      padding-bottom: 8px;
      font-weight: 600;
      letter-spacing: 1px;
    }

    &--element {
      background-color: $light-grey;
      width: calc(50% - 10px);
      margin: 5px;
      border: 1px solid $grey;
      border-radius: 10px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      &-big {
        width: 100%;
      }

      @include respond-to(mobile) {
        width: 100%;
      }
    }
  }
}

.wrong {
  color: red;
  text-decoration: line-through;
}
</style>
