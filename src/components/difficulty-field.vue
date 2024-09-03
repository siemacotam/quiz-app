<template>
  <div class="container">
    <p>Difficulty:</p>
    <img
      :key="n"
      v-for="n in quantity"
      class="star"
      alt="star"
      src="../assets/star.svg"
    />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { difficulties, Difficulties } from "@/const/quiz-options";

export default defineComponent({
  name: "DifficultyField",
  props: {
    level: { type: String as PropType<Difficulties>, required: true },
  },
  setup(props: { level: Difficulties }) {
    const getQuantity = () => {
      switch (props.level) {
        case difficulties.easy:
          return 1;
        case difficulties.medium:
          return 2;
        case difficulties.hard:
          return 3;
        default:
          return 1;
      }
    };

    const quantity = getQuantity();
    return { quantity };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.star {
  height: 16px;
  width: 16px;
}
</style>
