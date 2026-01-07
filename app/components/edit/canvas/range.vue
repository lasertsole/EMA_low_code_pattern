<template>
  <div
    class="root"
    :style="styleProps">
    <span class="num">{{ isNumber(min?.value) ? min?.value : 0 }}</span>
    <input
      type="range"
      :min="isNumber(min?.value) ? min?.value : 0"
      :max="isNumber(max?.value) ? max?.value : 0"
      :step="isNumber(step?.value) ? step?.value : 0"
      v-model="modelValue" />
    <span class="num">{{ isNumber(max?.value) ? max?.value : 0 }}</span>
  </div>
</template>

<script lang="ts" setup>
import { isNil, isNumber } from 'lodash-es';
import { type StyleValue, watch } from 'vue';
import type { ComponentProps } from '~/types';

// domProps 和 styleProps分离
const { domProps } = defineProps({
  domProps: { type: Object as PropType<ComponentProps>, required: true }
});

const { min, max, step, value } = toRefs(domProps);
const modelValue: Ref<number | undefined> = ref(Number(value?.value.value));
watch(
  () => value?.value.value,
  newVal => {
    modelValue.value = Number(newVal);
  }
);
watch(modelValue, newVal => {
  if (isNil(value?.value.value)) return;

  value.value.value = newVal;
});

const styleProps = useAttrs()?.styleProps as StyleValue;
</script>

<style lang="scss" scoped>
.root {
  @include fullHeight;
  display: flex;
  > input {
    flex-grow: 1;
  }

  > .num {
    @include marginX(1rem);
    display: flex;
    align-items: center;
  }
}
</style>
