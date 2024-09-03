import { QuestionWithAnswer, State } from "./types";

export const initState: State = {
  questions: [] as QuestionWithAnswer[],
  currentQuestionIndex: 0,
  quizCompleted: false,
  startTime: 0,
  name: "",
};
