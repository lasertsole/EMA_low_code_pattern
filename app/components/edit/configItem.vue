<template>
  <div class="configItem">
    <div class="key">{{ title }}</div>
    <div class="value">
      <component
        :is="ConfComponentName_To_ConfComponentInstance_Map[value.config.type]"
        v-bind="value"
        v-model:disabled="value.disabled"
        v-model:value="value.value">
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isNil } from 'lodash-es';
import type { PropType } from 'vue';
import { type ComponentPropItem, type ComponentProps } from '~/types';

const { globalProps, title, value } = defineProps({
  globalProps: { required: true, type: Object as PropType<ComponentProps> },
  title: { required: true, type: String },
  value: { required: true, type: Object as PropType<ComponentPropItem> }
});

// 如果有值改变副作用函数，则调用
if (!isNil(value.valueChangeSideEffect)) {
  watchEffect(() => {
    value.valueChangeSideEffect!({ globalProps, value: value.value });
  });
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
