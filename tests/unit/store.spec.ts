import { mockedState } from "@/mocks/state";
import { QuestionType } from "@/services";
import { mutations } from "@/store/mutations";
import { State } from "@/store/types";

const {
  setName,
  setQuestions,
  setAnswer,
  setCurrentQuestion,
  completeQuiz,
  setQuestionTime,
  resetState,
} = mutations;

describe("store mutations", () => {
  let state: State;

  beforeEach(() => {
    state = mockedState;
  });

  it("setName sets the name", () => {
    setName(state, "John Doe");
    expect(state.name).toBe("John Doe");
  });

  it("setQuestions sets the questions and startTime", () => {
    const questions = [
      {
        type: "multiple" as QuestionType,
        difficulty: "easy",
        category: "Sports",
        question:
          "Which driver has been the Formula 1 world champion for a record 7 times?",
        correct_answer: "Michael Schumacher",
        incorrect_answers: ["Ayrton Senna", "Fernando Alonso", "Jim Clark"],
      },
      {
        type: "multiple" as QuestionType,
        difficulty: "easy",
        category: "Sports",
        question: "Which of the following sports is not part of the triathlon?",
        correct_answer: "Horse-Riding",
        incorrect_answers: ["Cycling", "Swimming", "Running"],
      },
    ];
    const time = new Date().getTime();

    setQuestions(state, questions);
    expect(state.startTime).toBe(time);
    expect(state.questions).toEqual(
      questions.map((question) => ({
        ...question,
        pickedAnswer: "",
        time: 0,
      }))
    );
  });

  it("setAnswer sets the picked answer for a question", () => {
    state.questions = [
      {
        type: "multiple" as QuestionType,
        difficulty: "easy",
        category: "Sports",
        question: "Which of the following sports is not part of the triathlon?",
        correct_answer: "Horse-Riding",
        incorrect_answers: ["Cycling", "Swimming", "Running"],
        pickedAnswer: "",
        time: 0,
      },
    ];
    setAnswer(state, { index: 0, answer: "Answer 1", time: 1000 });
    expect(state.questions[0].pickedAnswer).toBe("Answer 1");
  });

  it("setCurrentQuestion sets the current question index", () => {
    setCurrentQuestion(state, 2);
    expect(state.currentQuestionIndex).toBe(2);
  });

  it("completeQuiz sets quizCompleted to true", () => {
    completeQuiz(state);
    expect(state.quizCompleted).toBe(true);
  });

  it("setQuestionTime updates the time spent on a question", () => {
    state.startTime = 1000;
    state.questions = [
      {
        type: "multiple" as QuestionType,
        difficulty: "easy",
        category: "Sports",
        question: "Which of the following sports is not part of the triathlon?",
        correct_answer: "Horse-Riding",
        incorrect_answers: ["Cycling", "Swimming", "Running"],
        pickedAnswer: "",
        time: 0,
      },
    ];
    const time = new Date().getTime();

    setQuestionTime(state, 0);
    expect(state.questions[0].time).toBe(time - 1000);
    expect(state.startTime).toBe(time);
  });

  it("resetState resets the state", () => {
    state = {
      name: "John Doe",
      questions: [],
      currentQuestionIndex: 2,
      quizCompleted: true,
      startTime: 1000,
    };

    resetState(state);
    expect(state).toEqual({
      name: "",
      questions: [],
      currentQuestionIndex: 0,
      quizCompleted: false,
      startTime: 0,
    });
  });
});
