<template>
  <div class="question">
    <div class="background-container">
      <div class="question__container">
        <p class="question__content">{{ decodedQuestion }}</p>
      </div>
      <div class="question__answers">
        <button
          v-for="(answer, index) in allAnswers"
          :key="index"
          @click="selectAnswer(answer)"
          :class="{ picked: selectedAnswer === answer }"
          class="question__answer"
        >
          {{ decodedAnswer(answer) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { defineProps, defineEmits } from "vue";
import { decodeQuestion } from "@/utils/text";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["answer"]);

const isAlreadyPicked = computed(() => props.question.pickedAnswer);

const selectedAnswer = ref("");

watch(
  () => props.index,
  () => {
    if (isAlreadyPicked.value) {
      selectedAnswer.value = isAlreadyPicked.value;
    }
  }
);

const decodedQuestion = computed(() => decodeQuestion(props.question.question));

const decodedAnswer = (string: string) =>
  computed(() => decodeQuestion(string));

const allAnswers = computed(() => {
  const answers = [
    ...props.question.incorrect_answers,
    props.question.correct_answer,
  ];
  return answers.sort(() => Math.random() - 0.5);
});

const selectAnswer = (answer: string) => {
  selectedAnswer.value = answer;
  emits("answer", props.index, answer);
};
</script>

<style lang="scss" scoped>
.question {
  margin-top: 20px;

  &__container {
    flex-grow: 1;
    margin-top: 20px;
    padding-top: 10px;
  }

  &__content {
    padding: 20px 30px;
    margin: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2em 20px 2.5em 0.2in;
    background-color: $white;
    letter-spacing: 1px;
    font-weight: 500;
    font-family: "Comic Sans MS", sans-serif;
    font-size: 1.2rem;
  }

  &__answers {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    gap: 30px;
    @include respond-to(mobile) {
      padding: 5px;
      gap: 10px;
    }
  }

  &__answer {
    width: calc(50% - 30px);
    padding: 15px;
    border-radius: 2em 20px 2.5em 0.2in;
    border: none;
    cursor: pointer;
    font-family: "Comic Sans MS", sans-serif;
    font-size: 1.1rem;

    &:hover {
      background-color: $dark-grey;
      color: $white;
    }

    @include respond-to(mobile) {
      width: calc(50% - 5px);
      padding: 10px;

      &:hover {
        background-color: $white;
        color: $black;
      }
    }
  }
}

.picked {
  color: $white;
  background-color: $blue;
}

.background-container {
  background: url("@/assets/question-bg.jpg") no-repeat center center;
  background-size: cover;
  width: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  border-radius: 10px;

  @include respond-to(mobile) {
    min-height: 500px;
  }
}
</style>
