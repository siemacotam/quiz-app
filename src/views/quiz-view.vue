<template>
  <div class="quiz">
    <img class="homeView__background" alt="Vue logo" src="@/assets/bg.avif" />

    <audio hidden="true" ref="audio" loop>
      <source src="@/assets/audio/audio.mp3" type="audio/mpeg" />
    </audio>

    <ProgressBar :bgcolor="'#0000FF'" :completed="progress" />
    <div class="quiz__info-panel">
      <p class="quiz__info-panel--text">
        Question: {{ currentQuestionIndex + 1 }}/ 10
      </p>
      <p class="quiz__info-panel--text">
        Category: {{ currentQuestion?.category || "" }}
      </p>
      <DifficultyField
        v-if="currentQuestion?.difficulty"
        :level="currentQuestion?.difficulty"
      />
    </div>

    <QuizQuestion
      v-if="currentQuestion"
      :question="currentQuestion"
      :index="currentQuestionIndex"
      @answer="setAnswer"
    />
    <div class="quiz__buttons-panel">
      <div class="quiz__buttons-panel--container">
        <CustomButton
          :disabled="currentQuestionIndex <= 0"
          buttonType="answer"
          :onClick="previousQuestion"
          fullWidth
          >Previous
        </CustomButton>
      </div>
      <div class="quiz__buttons-panel--container">
        <CustomButton
          v-if="!quizCompleted"
          :disabled="currentQuestionIndex <= 0 || !allQuestionsAnswered"
          buttonType="answer"
          :onClick="submitQuiz"
          fullWidth
          >Submit
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import QuizQuestion from "../components/quiz-question.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuiz } from "@/composable/useQuiz";
import ProgressBar from "../components/progress-bar.vue";
import DifficultyField from "@/components/difficulty-field.vue";
import CustomButton from "@/components/ui/custom-button.vue";

const audio = ref<HTMLAudioElement>();

const router = useRouter();
const store = useStore();
const { setAnswer, previousQuestion, submitQuiz } = useQuiz();

onMounted(() => {
  if (audio.value) {
    audio.value.load();
    audio.value.play().catch((error) => {
      console.error("Audio play failed:", error);
    });
  }

  if (!isQuestionsAvailable.value) {
    router.push("/");
  }
});

onUnmounted(() => {
  if (audio.value) {
    audio.value.pause();
  }

  store.commit("resetState");
});

const isQuestionsAvailable = computed(() => store.getters.questionsAvailable);
const progress = computed(() => store.getters.progress);
const currentQuestionIndex = computed(() => store.state.currentQuestionIndex);
const currentQuestion = computed(() => store.getters.currentQuestion);
const quizCompleted = computed(() => store.state.quizCompleted);

const allQuestionsAnswered = computed(() => store.getters.allQuestionsAnswered);
</script>

<style lang="scss" scoped>
.quiz {
  max-width: 1200px;
  margin: 30px auto;

  @include respond-to(mobile) {
    padding: 0 20px;
    margin: 10px auto;
  }

  &__info-panel {
    display: flex;
    justify-content: space-evenly;
    margin-top: 12px;

    @include respond-to(mobile) {
      flex-direction: column;
    }

    &--text {
      font-size: 14px;
    }
  }

  &__buttons-panel {
    display: flex;

    &--container {
      padding: 10px;
      width: 50%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
