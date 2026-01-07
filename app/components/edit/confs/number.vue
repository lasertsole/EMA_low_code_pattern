<template>
  <div class="root">
    <input
      type="number"
      inputmode="numeric"
      :value="value"
      @input.prevent="processInput"
      :disabled="disabled" />
  </div>
</template>

<script lang="ts" setup>
import { isNil } from 'lodash-es';

const { disabled, value } = defineProps({
  disabled: {
    type: Boolean,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

const emits: (event: 'update:value', ...args: any[]) => void = defineEmits(['update:value']);

// 处理输入
function processInput(e: InputEvent): void {
  if (isNil(e.target)) return;
  emits('update:value', Number((e.target as HTMLInputElement).value));
  (e.target as HTMLInputElement).valueAsNumber = Number(value);
}
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

