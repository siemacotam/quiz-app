<template>
  <div class="text-field-container">
    <input
      id="textField"
      v-model="inputValue"
      type="text"
      class="text-field"
      :placeholder="placeholder"
      @input="updateValue"
    />
    <p class="text-field__error" v-if="required">Name is required</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  name: "TextField",
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Enter text here...",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newValue) => {
        inputValue.value = newValue;
      }
    );

    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit("update:modelValue", target.value);
    };

    return { inputValue, updateValue };
  },
});
</script>

<style lang="scss" scoped>
.text-field-container {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

.text-field {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &__error {
    color: red;
    padding-top: 5px;
    font-size: 14px;
  }
}

.text-field:focus {
  border-color: #007bff;
  outline: none;
}
</style>
