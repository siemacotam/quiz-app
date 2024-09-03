import { useStore } from "vuex";
import { useRouter } from "vue-router";

export function useQuiz() {
  const store = useStore();
  const router = useRouter();

  const setAnswer = (index: number, answer: string, time: number) => {
    store.commit("setAnswer", { index, answer, time });
    nextQuestion();
  };

  const previousQuestion = () => {
    const index = store.state.currentQuestionIndex;

    if (index > 0) {
      store.commit("setCurrentQuestion", index - 1);
      store.commit("setQuestionTime", index);
    }
  };

  const nextQuestion = () => {
    const index = store.state.currentQuestionIndex;

    if (index < store.state.questions.length - 1) {
      store.commit("setCurrentQuestion", index + 1);
      store.commit("setQuestionTime", index);
    }
  };

  const submitQuiz = () => {
    store.commit("setQuestionTime", store.state.currentQuestionIndex);
    store.commit("completeQuiz");
    router.push("/summary");
  };

  return {
    setAnswer,
    previousQuestion,
    nextQuestion,
    submitQuiz,
  };
}
