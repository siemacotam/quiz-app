import { State } from "./types";

export const getters = {
  questionsAvailable: (state: State) => state.questions.length > 0,
  currentQuestion: (state: State) =>
    state.questions[state.currentQuestionIndex],
  getScore: (state: State) => {
    let score = 0;

    state.questions.forEach((question, index) => {
      if (state.questions[index].pickedAnswer === question.correct_answer) {
        score++;
      }
    });
    return score;
  },
  getAnswersList: (state: State) =>
    state.questions.map((question) => ({
      question: question.question,
      correct: question.correct_answer,
      picked: question.pickedAnswer,
      time: (question.time / 1000).toFixed(2),
    })),
  allQuestionsAnswered: (state: State) =>
    state.questions.every((item) => item.pickedAnswer !== ""),
  progress: (state: State) =>
    state.questions.filter((answer) => answer.pickedAnswer !== "").length * 10,
  name: (state: State) => state.name,
};
