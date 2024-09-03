import { last10quizesResults } from "@/mocks/results";
import { QuestionWithAnswer } from "@/store/types";
import { ChartProps } from "@/types/charts.types";
import { Answer, Summary } from "@/types/summary.types";
import { useStore } from "vuex";

export function useSummary() {
  const store = useStore();

  const getAverageResponseTime = (answers: Answer[]): number =>
    parseFloat(
      (
        answers.reduce((sum, answer) => sum + parseFloat(answer.time), 0) /
        answers.length
      ).toFixed(2)
    );

  const getQuizSummary = (): Summary | undefined => {
    const score = store.getters.getScore || 0;
    const time: number =
      store.state.questions.reduce(
        (sum: number, obj: QuestionWithAnswer) => sum + obj.time,
        0
      ) || 0;
    const answers = store.getters.getAnswersList || [];

    const averageTime = getAverageResponseTime(answers);

    if (time === 0) return undefined;

    return {
      name: store.state.name,
      score: score,
      time: time / 1000,
      answers,
      averageTime,
    };
  };

  const getTimePerQuestionBarChartDataFromSummary = (
    data: Summary
  ): ChartProps => {
    const labels = data.answers.map((el, index) => `Q${index + 1}`);

    const datasets = [
      {
        label: "time per question",
        backgroundColor: ["blue"],
        data: data.answers.map((el) => Number(el.time)),
      },
    ];

    return {
      labels,
      datasets,
    };
  };

  const getAnswersDataForPieQart = (data: Summary): ChartProps => {
    const labels = ["Correct", "Wrong"];
    const score = data.score;
    const quantityOfQuestions = data.answers.length;

    const datasets = [
      {
        label: "Score",
        backgroundColor: ["green", "red"],
        data: [score, quantityOfQuestions - score],
      },
    ];

    return {
      labels,
      datasets,
    };
  };

  const getAverageScoreDataForBarChart = (data: Summary): ChartProps => {
    const labels = ["Score"];

    const averageScore =
      last10quizesResults.reduce((sum, answer) => sum + answer.score, 0) /
      data.answers.length;

    const datasets = [
      {
        label: "You",
        data: [data.score],
        backgroundColor: ["green"],
      },
      {
        label: "Last 10 average",
        data: [averageScore],
        backgroundColor: ["red"],
      },
    ];

    return {
      labels,
      datasets,
    };
  };

  const getAverageTimeDataForBarChart = (data: Summary): ChartProps => {
    const labels = ["Time"];

    const averageTime =
      last10quizesResults.reduce((sum, answer) => sum + answer.time, 0) /
      data.answers.length;

    const datasets = [
      {
        label: "You",
        data: [data.time],
        backgroundColor: ["green"],
      },
      {
        label: "Last 10 average",
        data: [averageTime],
        backgroundColor: ["red"],
      },
    ];

    return {
      labels,
      datasets,
    };
  };

  return {
    getQuizSummary,
    getAverageResponseTime,
    getTimePerQuestionBarChartDataFromSummary,
    getAnswersDataForPieQart,
    getAverageScoreDataForBarChart,
    getAverageTimeDataForBarChart,
  };
}
