<template>
  <div class="root">
    <input
      type="number"
      inputmode="numeric"
      v-model="value"
      :disabled="disabled" />
  </div>
</template>

<script lang="ts" setup>
const { disabled } = defineProps({
  disabled: {
    type: Boolean,
    required: true
  }
});

const value = defineModel('value', {
  type: Number,
  required: true
});
</script>

<style lang="scss" scoped>
.root {
  @include fullHeight;
  display: flex;
  align-items: center;
  input {
    &[type='number'] {
      @include fullHeight;
      min-width: 1rem;
      max-width: 2.5rem;
    }
  }
}
</style>
