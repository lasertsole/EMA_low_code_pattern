<template>
  <div
    class="wrapper"
    :style="styleProps">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model="modelValue" />
  </div>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue';

// domProps 和 styleProps分离
const { min, max, step, value } = defineProps(
  rangeDomProps as {
    readonly [x: string]: any;
  }
);
const styleProps = useAttrs()?.styleProps as StyleValue;

const modelValue: Ref<number> = ref(value);
</script>

<style lang="scss" scoped>
.wrapper {
  input {
    @include fullInParent();
  }
}
</style>
