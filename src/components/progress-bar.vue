<template>
  <div class="container">
    <div v-bind:style="fillerStyles">
      <span class="label">{{ `${completed}%` }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  bgcolor: {
    type: String,
    required: true,
  },
  completed: {
    type: Number,
    required: true,
  },
});

const fillerStyles = computed(() => ({
  height: "100%",
  width: `${props.completed}%`,
  backgroundColor: props.bgcolor,
  transition: "width 1s ease-in-out",
  borderRadius: "inherit",
  textAlign: "right",
}));
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
