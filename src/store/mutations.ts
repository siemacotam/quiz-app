import { Question } from "@/services";
import { State } from "./types";

export const mutations = {
  setName(state: State, name: string) {
    state.name = name;
  },
  setQuestions(state: State, questions: Question[]) {
    const time = new Date().getTime();

    state.startTime = time;
    state.questions = questions.map((question) => ({
      ...question,
      pickedAnswer: "",
      time: 0,
    }));
  },
  setAnswer(
    state: State,
    { index, answer }: { index: number; answer: string; time: number }
  ) {
    state.questions[index].pickedAnswer = answer;
    state.questions[index];
  },
  setCurrentQuestion(state: State, index: number) {
    state.currentQuestionIndex = index;
  },
  completeQuiz(state: State) {
    state.quizCompleted = true;
  },
  setQuestionTime(state: State, index: number) {
    const time = new Date().getTime();
    const spentTime = time - state.startTime;

    state.questions[index].time += spentTime;
    state.startTime = time;
  },
  resetState(state: State) {
    state.questions = [];
    state.currentQuestionIndex = 0;
    state.quizCompleted = false;
    state.startTime = 0;
    state.name = "";
  },
};
