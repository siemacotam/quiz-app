export const mockedGetTimePerQuestionBarChartDataFromSummaryResult = {
  labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"],
  datasets: [
    {
      label: "time per question",
      backgroundColor: ["blue"],
      data: [4.45, 3.42, 1.5, 2.02, 1.25, 3.18, 2.5, 1.68, 1.94, 4.79],
    },
  ],
};

export const mockedGetAnswersDataForPieQartResult = {
  labels: ["Correct", "Wrong"],
  datasets: [
    {
      label: "Score",
      backgroundColor: ["green", "red"],
      data: [2, 8],
    },
  ],
};

export const mockedGetAverageScoreDataForBarChartResult = {
  labels: ["Score"],
  datasets: [
    {
      label: "You",
      data: [2],
      backgroundColor: ["green"],
    },
    {
      label: "Last 10 average",
      data: [8],
      backgroundColor: ["red"],
    },
  ],
};

export const mockedGetAverageTimeDataForBarChartResult = {
  labels: ["Time"],
  datasets: [
    {
      label: "You",
      data: [26.716],
      backgroundColor: ["green"],
    },
    {
      label: "Last 10 average",
      data: [26],
      backgroundColor: ["red"],
    },
  ],
};
