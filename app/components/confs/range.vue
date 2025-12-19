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
import type { ComponentProps } from '@/types/index.ts';

// domProps 和 styleProps分离
const { min, max, step, value } = defineProps(transformDefaultPropsToComponentProps(rangeDomProps));
const styleProps = reverseDefaultPropsFromComponentProps(useAttrs()?.styleProps as ComponentProps);

const modelValue: Ref<number> = ref(value);
</script>

<style lang="scss" scoped>
.wrapper {
  input {
    @include fullInParent();
  }
}
</style>
