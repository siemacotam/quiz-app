<template>
  <div class="summary__question-container">
    <p class="summary__question-container--title">Q&A</p>
    <div
      class="summary__question"
      v-for="(answer, index) in answers"
      :key="index"
    >
      <p>
        <span style="font-weight: 600">Q{{ index + 1 }}. </span>
        <span>{{ decodeQuestion(answer.question) }}</span>
      </p>

      <span
        class="summary__answer"
        :class="{ wrong: answer.correct !== answer.picked }"
      >
        {{ answer.picked }}
      </span>
      <span
        class="summary__answer"
        :class="{ wrong: answer.correct === answer.picked }"
        v-if="answer.correct !== answer.picked"
      >
        - {{ answer.correct }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { decodeQuestion } from "@/utils/text";
import { defineComponent, PropType, computed } from "vue";
import { Answer } from "@/types/summary.types";

export default defineComponent({
  name: "SummaryQuestions",
  props: {
    data: { type: Array as PropType<Answer[]>, required: true },
  },
  setup(props: { data: Answer[] }) {
    const answers = computed(() => props.data);

    return { decodeQuestion, answers };
  },
});
</script>
