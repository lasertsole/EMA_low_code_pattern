<template>
  <div class="root">
    <input
      type="number"
      :min="min"
      :max="max"
      inputmode="numeric"
      :value="modelValue"
      @input="limitInput($event)"
      :disabled="disabled" />

    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model="modelValue"
      :disabled="disabled" />

    <select
      v-if="!isEmpty(options)"
      @change="selectChange($event)">
      <template
        v-for="(item, index) in options"
        :key="item.unit ? item.unit : index">
        <option>
          {{ typeof item === 'string' ? item : item.unit }}
        </option>
      </template>
    </select>
  </div>
</template>

<script lang="ts" setup>
import {
  type Value,
  type ComponentPropItemConfigOption,
  type ComponentPropItemConfig,
  isComponentPropItemConfigOptionObj
} from '~/types';
import type { PropType } from 'vue';
import { isNil, isEmpty, find, isString } from 'lodash-es';

const value = defineModel('value', {
  type: [String, Object] as PropType<Value>,
  required: true
});

const attrs: ComponentPropItemConfig | undefined = useAttrs()?.config as ComponentPropItemConfig | undefined;

const min: Ref<number> = ref(0);
const max: Ref<number> = ref(0);
const modelValue: Ref<number> = ref(0);
const step: Ref<number> = ref(0);
const unit: Ref<string | undefined> = ref();
const options: ComponentPropItemConfigOption[] = attrs?.options ?? [];
const disabled: ComputedRef<boolean> = computed(() => isNil(unit.value));

watchEffect(() => {
  if (isNil(value.value) || isString(value.value)) {
    unit.value = undefined;
  } else if (isComponentPropItemConfigOptionObj(value.value)) {
    if (!isNil(value.value.min)) {
      min.value = value.value.min;
    }
    if (!isNil(value.value.max)) {
      max.value = value.value.max;
    }
    if (!isNil(value.value.value)) {
      modelValue.value = Number(value.value.value);
    }
    if (!isNil(value.value.step)) {
      step.value = value.value.step;
    }
    unit.value = value.value.unit;
  }
});

watch(modelValue, newVal => {
  if (isComponentPropItemConfigOptionObj(value.value)) {
    value.value.value = Number(newVal);
  }
});

/************以下是输入框逻辑***********/
function limitInput(e: Event): void {
  const inputDom: HTMLInputElement = e.target as HTMLInputElement;
  let val: number = parseInt(inputDom.value);
  if (isNaN(val)) {
    val = min.value;
  } else {
    // 核心逻辑：手動截斷
    if (val > max.value) val = max.value;
    else if (val < min.value) val = min.value;
    inputDom.value = String(val);
  }
  modelValue.value = val;
  inputDom.value = String(val);
}
/************以上是输入框逻辑***********/

/************以下是控制多选框逻辑***********/
function selectChange(e: Event): void {
  if (isNil(options)) return;
  const selectDom: HTMLSelectElement = e.target as HTMLSelectElement;
  let selectUnit: string = selectDom.value;

  const selectOption: ComponentPropItemConfigOption | undefined = find(options, item => {
    if (isComponentPropItemConfigOptionObj(item)) {
      return selectUnit === item.unit;
    } else {
      return selectUnit === item;
    }
  });

  if (!isNil(selectOption)) {
    value.value = selectOption;
  }
}
/************以上是控制多选框逻辑***********/
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
