<template>
  <div class="rules">
    <ul class="rules__list">
      <li class="rules__list--element">You have to answer 10 questions</li>
      <li class="rules__list--element">
        For each correct answer You get 1 point
      </li>
      <li class="rules__list--element">
        Hurry up. If You will have the same result with any other player - time
        will decide about place
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.rules {
  &__list {
    font-size: 11px;
    text-align: left;
    color: $dark-grey;
    list-style-image: url("../assets/question-mark.svg");

    &--element {
      padding-bottom: 4px;
    }
  }
}
</style>
