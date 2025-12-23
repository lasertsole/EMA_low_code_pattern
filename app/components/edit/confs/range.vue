<template>
  <div
    ref="root"
    class="root">
    <input
      type="number"
      :min="min"
      :max="max"
      inputmode="numeric"
      :value="modelValue"
      @input="limitInput"
      :disabled="disabled" />
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model="modelValue"
      :disabled="disabled" />

    <select
      class="fontSelect"
      v-if="!isEmpty(options)">
      <template
        v-for="(item, index) in options"
        :key="index">
        <option>
          {{ typeof item === 'string' ? item : item.unit }}
        </option>
      </template>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { UPDATE_COMPONENT_ENUM, type ComponentPropItemConfig } from '~/types';
import type { ShallowRef } from 'vue';
import { isEmpty } from 'lodash-es';

// domProps 和 styleProps分离
const { min, max, step, value } = defineProps(
  rangeDomProps as {
    readonly [x: string]: any;
  }
);

const { options, selectedOption } = toRefs(useAttrs()?.config as ComponentPropItemConfig);

const modelValue: Ref<number> = ref(value);

const rootDom: ShallowRef<HTMLDivElement | null> = useTemplateRef('root');
watch(modelValue, newVal => {
  rootDom.value?.dispatchEvent(
    new CustomEvent('componentChange', {
      bubbles: true,
      cancelable: true,
      detail: {
        type: UPDATE_COMPONENT_ENUM.MOD,
        value: newVal
      }
    })
  );
});

function limitInput(e: Event): void {
  const inputDom: HTMLInputElement = e.target as HTMLInputElement;
  let val: number = parseInt(inputDom.value);

  if (isNaN(val)) {
    val = min;
  } else {
    // 核心逻辑：手動截斷
    if (val > max) val = max;
    else if (val < min) val = min;
    inputDom.value = String(val);
  }

  modelValue.value = val;
  inputDom.value = String(val);
}

const disabled: Ref<boolean> = computed(() => {
  return typeof selectedOption === 'string';
});

watch(
  () => value,
  newVal => {
    modelValue.value = newVal;
  }
);
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  input {
    &[type='number'] {
      @include fullHeight;
      min-width: 1rem;
      max-width: 2.5rem;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      -moz-appearance: textfield;
    }
    &[type='range'] {
      background-color: aqua;
      @include fullHeight;
      flex-grow: 1;
    }
  }
}
</style>
