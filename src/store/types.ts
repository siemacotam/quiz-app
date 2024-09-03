import { Question } from "@/services";

export interface QuestionWithAnswer extends Question {
  pickedAnswer: string;
  time: number;
}

export interface State {
  questions: QuestionWithAnswer[];
  currentQuestionIndex: number;
  quizCompleted: boolean;
  startTime: number;
  name: string;
}
