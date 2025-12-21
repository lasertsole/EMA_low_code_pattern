<template>
  <div class="text">
    <div
      ref="inputDom"
      class="inputArea"
      @input.stop="inputFunc($event)"
      contenteditable="true"
      :readonly="readonly"
      :placeholder="placeholder"
      :style="styleProps">
      {{ modelValue }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isEmpty } from 'lodash-es';
import type { StyleValue } from 'vue';

// domProps 和 styleProps分离
const { placeholder, readonly, value } = defineProps(
  textDomProps as {
    readonly [x: string]: any;
  }
);
const styleProps = useAttrs()?.styleProps as StyleValue;

const modelValue = ref(value);

// 输入回调函数
function inputFunc(event: Event): void {
  if (!(event instanceof InputEvent)) {
    return;
  }

  const target = event.target as HTMLInputElement;

  if (event.inputType === 'deleteContentBackward' && (target.innerHTML === '<br>' || isEmpty(target.innerHTML))) {
    target.textContent = '';
    modelValue.value = '';
  } else if (isEmpty(target.innerHTML)) {
    target.textContent = '';
    modelValue.value = '';
  } else {
    modelValue.value = target.innerHTML;
  }
}
</script>

<style lang="scss" scoped>
$clearIconSize: 20px;
.text {
  position: relative;

  > .inputArea {
    outline: none;
    word-break: break-all;

    &:empty:before {
      content: attr(placeholder);
      color: gray;
    }
  }
}
</style>
