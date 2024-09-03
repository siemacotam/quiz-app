<template>
  <div class="start-quiz">
    <TextField
      v-model="username"
      placeholder="Type your username here..."
      :required="nameRequired"
    />
    <p class="start-quiz__title">Category</p>
    <div class="start-quiz__list">
      <div
        class="start-quiz__list-element"
        v-for="category in categories"
        :key="category.number"
      >
        <label>
          <input
            type="radio"
            v-model="selectedCategory"
            :value="category.number"
          />
          {{ category.name }}
        </label>
      </div>
    </div>
    <p class="start-quiz__title">Difficulty</p>
    <div class="start-quiz__list">
      <div
        class="start-quiz__list-element"
        v-for="difficulty in Object.keys(difficulties)"
        :key="difficulty"
      >
        <label>
          <input
            type="radio"
            v-model="selectedDifficulty"
            :value="difficulty"
          />
          {{ capitalizeFirstLetter(difficulty) }}
        </label>
      </div>
    </div>
    <div class="start-quiz__button-container">
      <CustomButton :disabled="loading" buttonType="start" :onClick="fetchData"
        >Start
      </CustomButton>
    </div>
    <p v-if="apiError">{{ apiError }}</p>
    <Loader v-if="loading" />
    <QuizRules />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { categories, difficulties } from "@/const/quiz-options";
import Loader from "@/components/loader-component.vue";
import { fetchQuestions, apiErrorMessages } from "@/services/index";
import CustomButton from "@/components/ui/custom-button.vue";
import TextField from "@/components/ui/text-field.vue";
import { capitalizeFirstLetter } from "@/utils/text";
import QuizRules from "@/components/quiz-rules.vue";

const selectedCategory = ref(21);
const selectedDifficulty = ref("easy");
const username = ref("");
const loading = ref(false);
const router = useRouter();
const nameRequired = ref(false);
const apiError = ref("");
const store = useStore();

const fetchData = async () => {
  nameRequired.value = false;
  apiError.value = "";

  if (!username.value) {
    nameRequired.value = true;
    return;
  }
  loading.value = true;

  const res = await fetchQuestions(
    String(selectedCategory.value),
    selectedDifficulty.value
  );

  if (res.response_code === 0) {
    store.commit("setQuestions", res.results);
    store.commit("setName", username);
  } else {
    apiError.value = apiErrorMessages[res.response_code];
    loading.value = false;
    return;
  }

  loading.value = false;
  router.push("/quiz");
};
</script>

<style lang="scss">
.start-quiz {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: $grey-background;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 30px;
  &__title {
    flex-grow: 1;
    font-weight: 600;
    padding-bottom: 6px;
    border-bottom: 1px solid $grey;
  }

  &__list {
    display: flex;
    flex-direction: row;

    @include respond-to(mobile) {
      flex-direction: column;
    }
  }

  &__list-element {
    width: 33.3%;

    @include respond-to(mobile) {
      width: 100%;
      text-align: left;
    }
  }

  &__button-container {
    display: flex;
    margin-top: 20px;
    flex-direction: column;
  }
}
</style>
