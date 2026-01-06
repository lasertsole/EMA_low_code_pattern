<template>
  <div class="configItem">
    <div class="key">{{ title }}</div>
    <div class="value">
      <component
        :is="ConfComponentName_To_ConfComponentInstance_Map[value.config.type]"
        v-bind="value"
        v-model:disabled="value.disabled"
        :value="value.value"
        @update:value="updateValue">
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isFunction } from 'lodash-es';
import type { PropType } from 'vue';
import { type ComponentPropItem, type ComponentProps, type Value } from '~/types';

const { globalProps, title } = defineProps({
  globalProps: { required: true, type: Object as PropType<ComponentProps> },
  title: { required: true, type: String }
});

const value = defineModel('value', { required: true, type: Object as PropType<ComponentPropItem> });

function updateValue(newVal: Value | undefined): void {
  /**如果有值校验函数，且值不通过校验，则保持s旧值 */
  if (isFunction(value.value.vaildate) && !value.value.vaildate({ globalProps, newVal, oldVal: value.value.value }))
    return;

  // 如果有值改变副作用函数，则调用
  if (isFunction(value.value.valueChangeSideEffect)) {
    value.value.valueChangeSideEffect!({ globalProps, newVal, oldVal: value.value.value });
  }

  // 更新现值
  value.value.value = newVal;
}
</script>

<style lang="scss" scoped>
.configItem {
  &:not(:first-of-type) {
    margin-top: 1rem;
  }
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 2;
  > .key {
    @include flexCenter;
    margin-right: 1rem;
    word-break: break-all;
  }
}
</style>
