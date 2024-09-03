import { useSummary } from "@/composable/useSummary";
import { Answer } from "@/types/summary.types";
import { mockedResult } from "@/mocks/results";
import {
  mockedGetAnswersDataForPieQartResult,
  mockedGetAverageScoreDataForBarChartResult,
  mockedGetAverageTimeDataForBarChartResult,
  mockedGetTimePerQuestionBarChartDataFromSummaryResult,
} from "@/mocks/tests";

describe("useSummary", () => {
  const {
    getAverageResponseTime,
    getTimePerQuestionBarChartDataFromSummary,
    getAnswersDataForPieQart,
    getAverageScoreDataForBarChart,
    getAverageTimeDataForBarChart,
  } = useSummary();

  /////  getAverageResponseTime

  it("should calculate average response time correctly", () => {
    const answers: Answer[] = [
      { question: "", correct: "", picked: "", time: "15" },
      { question: "", correct: "", picked: "", time: "15" },
    ];
    const averageTime = getAverageResponseTime(answers);
    expect(averageTime).toBe(15.0);
  });

  /////   getTimePerQuestionBarChartDataFromSummary

  it("should return correct time per question bar chart data", () => {
    const summary = mockedResult;
    const chartData = getTimePerQuestionBarChartDataFromSummary(summary);
    expect(chartData).toEqual(
      mockedGetTimePerQuestionBarChartDataFromSummaryResult
    );
  });

  /////   getAnswersDataForPieQart

  it("should return correct answers data for pie chart", () => {
    const summary = mockedResult;
    const chartData = getAnswersDataForPieQart(summary);
    expect(chartData).toEqual(mockedGetAnswersDataForPieQartResult);
  });

  /////   getAverageScoreDataForBarChart

  it("should return correct average score data for bar chart", () => {
    const summary = mockedResult;
    const chartData = getAverageScoreDataForBarChart(summary);

    expect(chartData).toEqual(mockedGetAverageScoreDataForBarChartResult);
  });

  ///// getAverageTimeDataForBarChart

  it("should return correct average time data for bar chart", () => {
    const summary = mockedResult;
    const chartData = getAverageTimeDataForBarChart(summary);

    expect(chartData).toEqual(mockedGetAverageTimeDataForBarChartResult);
  });
});
