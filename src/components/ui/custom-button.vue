<template>
  <button
    :class="['btn', buttonClass]"
    @click="handleClick"
    :disabled="isDisabled"
    :fullWidth="fullWidth"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { ButtonType } from "@/types/button.types";

export default defineComponent({
  name: "CustomButton",
  props: {
    buttonType: {
      type: String as PropType<ButtonType>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const handleClick = (event: MouseEvent) => {
      if (!props.isDisabled && props.onClick) {
        props.onClick(event);
      }
    };

    const buttonClass = computed(() => {
      return {
        btn__start: props.buttonType === "start",
        btn__top: props.buttonType === "top",
        btn__answer: props.buttonType === "answer",
      };
    });

    return {
      handleClick,
      buttonClass,
    };
  },
});
</script>

<style lang="scss" scoped>
button:disabled {
  background-color: $light-grey;
  color: $dark-grey;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn {
  padding: 10px 30px;
  font-size: 1.2rem;
  border-radius: 10px;
  border: 0;
  font-weight: 500;
  cursor: pointer;

  &__start {
    background-color: $dark-blue;
    color: $white;
  }
  &__top {
    background-color: $black;
    color: $white;
  }
  &__answer {
    padding: 5px 15px;
    background-color: $grey-background;
    color: $dark-grey;

    &:hover {
      background-color: $grey;
    }
  }
}
</style>
