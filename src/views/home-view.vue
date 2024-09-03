<template>
  <div class="homeView">
    <img class="homeView__background" alt="Vue logo" src="../assets/bg.avif" />

    <img class="homeView__logo" alt="Quiz logo" src="../assets/quiz.webp" />
    <h1 class="homeView__title">Quiz App</h1>

    <StartQuiz />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StartQuiz from "@/components/start-quiz.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    StartQuiz,
  },
});
</script>

<style lang="scss">
.homeView {
  text-align: center;
  padding: 30px;

  @include respond-to(mobile) {
    padding: 10px;
  }

  &__logo {
    height: 100px;
    animation: shake 0.5s infinite;
    animation-delay: 2s;

    @include respond-to(mobile) {
      height: 50px;
    }
  }

  &__background {
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    opacity: 0.1;
    z-index: -1;
  }

  &__title {
    margin: 10px 0 40px;
    font-weight: 500;
    letter-spacing: 2px;
    font-size: 2rem;
    font-weight: 600;
    font-family: "Comic Sans MS", sans-serif;

    @include respond-to(mobile) {
      font-size: 2rem;
      margin: 20px 0 20px;
    }
  }

  @keyframes shake {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(2px, 0);
    }
    50% {
      transform: translate(0, 2px);
    }
    75% {
      transform: translate(-2px, 0);
    }
    100% {
      transform: translate(0, -2px);
    }
  }
}
</style>
