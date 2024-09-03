export interface Answer {
  question: string;
  correct: string;
  picked: string;
  time: string;
}

export interface Summary {
  name: string;
  score: number;
  time: number;
  averageTime: number;
  answers: Answer[];
}
