<template>
  <div
    ref="root"
    class="root">
    <!-- <template v-if="disabled">
    <input
      type="number"
      :min="value?.min"
      :max="value?.max"
      inputmode="numeric"
      :value="modelValue"
      @input="limitInput($event)"
      :disabled="isNil(unit)" />
    <input
      type="range"
      :min="value.min"
      :max="value.max"
      :step="value.step"
      v-model="modelValue"
      :disabled="isNil(unit)" />
    </template> -->

    <select
      v-if="!isEmpty(componentPropItemConfig.options)"
      @change="selectChange($event)">
      <template
        v-for="item in componentPropItemConfig.options"
        :key="item.unit">
        <option>
          {{ typeof item === 'string' ? item : item.unit }}
        </option>
      </template>
    </select>
  </div>
</template>

<script lang="ts" setup>
import {
  type ComponentPropItemConfig,
  type ComponentPropItemConfigOption,
  type ComponentPropItemConfigOptionObj,
  isComponentPropItemConfigOptionObj,
  MOD_COMPONENT_EVENT_ENUM
} from '~/types';
import type { ShallowRef, Reactive, PropType } from 'vue';
import { isNil, isEmpty, find, isString } from 'lodash-es';

// domProps 和 styleProps分离
const props = defineProps({
  value: {
    type: Object as PropType<ComponentPropItemConfigOptionObj>,
    required: true
  }
});

const min: Ref<number> = ref(0);
const max: Ref<number> = ref(0);
const modelValue: Ref<number> = ref(0);
const step: Ref<number> = ref(0);
const unit: Ref<string | undefined> = ref();
watchEffect(() => {
  if (isString(props.value)) {
    unit.value = undefined;
  } else if (isComponentPropItemConfigOptionObj(props.value)) {
    if (!isNil(props.value.min)) {
      min.value = props.value.min;
    }
    if (!isNil(props.value.max)) {
      max.value = props.value.max;
    }
    if (!isNil(props.value.value)) {
      modelValue.value = props.value.value;
    }
    if (!isNil(props.value.step)) {
      step.value = props.value.step;
    }
    unit.value = props.value.unit;
  }
});
const componentPropItemConfig: Reactive<ComponentPropItemConfig> = useAttrs()
  ?.config as Reactive<ComponentPropItemConfig>;

// const modelValue: Ref<number> = ref(value);

const rootDom: ShallowRef<HTMLDivElement | null> = useTemplateRef('root');

// const disabled: Ref<boolean> = ref(false);

// watch(modelValue, newVal => {
//   if (!isNil(rootDom.value)) {
//     sendUpdateEvent({ emitDom: rootDom.value, value: newVal });
//   }
// });

// /************以下是输入框逻辑***********/
// function limitInput(e: Event): void {
//   const inputDom: HTMLInputElement = e.target as HTMLInputElement;
//   let val: number = parseInt(inputDom.value);

//   if (isNaN(val)) {
//     val = min;
//   } else {
//     // 核心逻辑：手動截斷
//     if (val > max) val = max;
//     else if (val < min) val = min;
//     inputDom.value = String(val);
//   }

//   modelValue.value = val;
//   inputDom.value = String(val);
// }
// /************以上是输入框逻辑***********/

/************以下是控制多选框逻辑***********/
function selectChange(e: Event): void {
  if (isNil(componentPropItemConfig.options) || isNil(rootDom.value)) return;
  const selectDom: HTMLSelectElement = e.target as HTMLSelectElement;
  let value: ComponentPropItemConfigOption | undefined = selectDom.value;

  value = find(componentPropItemConfig.options, item => {
    if (isComponentPropItemConfigOptionObj(item)) {
      return value === item.unit;
    } else {
      return value === item;
    }
  });

  sendUpdateEvent({ emitDom: rootDom.value, event: MOD_COMPONENT_EVENT_ENUM.changeSelectedOption, value });
}
/************以上是控制多选框逻辑***********/
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
