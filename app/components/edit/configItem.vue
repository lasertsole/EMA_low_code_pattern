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
import { isFunction } from 'lodash-es';
import type { PropType } from 'vue';
import { type ComponentPropItem, type ComponentProps, type Value } from '~/types';

const { globalProps, title } = defineProps({
  globalProps: { required: true, type: Object as PropType<ComponentProps> },
  title: { required: true, type: String }
});

const value = defineModel('value', { required: true, type: Object as PropType<ComponentPropItem> });

const oldVal: Ref<Value | undefined> = ref(undefined);
/**如果有值校验函数，且值不通过校验，则回退到旧值 */
watchEffect(() => {
  // 如果回退锁置为true，则重新将回退锁置false并退出
  if (
    isFunction(value.value.vaildate) &&
    !value.value.vaildate({ globalProps, newVal: value.value.value, oldVal: oldVal.value })
  ) {
    // 回退到旧值
    value.value.value = oldVal.value;
  } else {
    const newVal: Value | undefined = value.value.value;

    // 如果有值改变副作用函数，则调用
    if (isFunction(value.value.valueChangeSideEffect)) {
      value.value.valueChangeSideEffect!({ globalProps, newVal, oldVal: oldVal.value });
    }

    // 更新旧值
    oldVal.value = newVal;
  }
});
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
