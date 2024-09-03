<template>
  <div class="container">
    <div :style="fillerStyles">
      <span class="label">{{ `${completed}%` }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { StyleValue } from "vue";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "ProgressBar",
  props: {
    bgcolor: {
      type: String,
      required: true,
    },
    completed: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const styles = computed(() => {
      return {
        height: "100%",
        width: `${props.completed}%`,
        backgroundColor: props.bgcolor,
        transition: "width 1s ease-in-out",
        borderRadius: "inherit",
        textAlign: "right",
      };
    });

    const fillerStyles = styles.value as StyleValue;

    return { fillerStyles };
  },
});
</script>

<style scoped>
.container {
  height: 20px;
  width: 100%;
  background-color: #e0e0de;
  border-radius: 50px;
}

.label {
  padding: 5px;
  color: white;
  font-weight: bold;
}
</style>
