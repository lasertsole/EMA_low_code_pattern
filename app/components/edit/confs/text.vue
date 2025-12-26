<template>
  <div
    class="root"
    tabindex="-1">
    <div
      ref="inputDom"
      class="inputArea"
      @input.stop="inputFunc($event)"
      contenteditable="true"
      :readonly="readonly"></div>
    <Transition name="fade">
      <div
        class="clear"
        v-show="!isEmpty(value)"
        @click.stop="clearFunc()">
        <img src="@/assets/img/text_clear_btn.svg" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { type ModelRef, type ShallowRef, onMounted } from 'vue';
import { isEmpty, isNil } from 'lodash-es';

const value: ModelRef<string> = defineModel('value', {
  type: String,
  required: true
});

const inputDom: ShallowRef<HTMLElement | null> = useTemplateRef('inputDom');

//给输入框赋初值
onMounted(() => {
  if (isNil(inputDom.value)) return;
  inputDom.value.textContent = value.value;
});

// 输入回调函数
function inputFunc(event: Event): void {
  if (!(event instanceof InputEvent)) {
    return;
  }

  const target = event.target as HTMLInputElement;

  if (event.inputType === 'deleteContentBackward' && (target.innerHTML === '<br>' || isEmpty(target.innerHTML))) {
    target.textContent = '';
    value.value = '';
  } else if (isEmpty(target.innerHTML)) {
    target.textContent = '';
    value.value = '';
  } else {
    value.value = target.innerHTML;
  }
}

// 清理回调函数
function clearFunc(): void {
  if (isNil(inputDom.value)) return;
  inputDom.value.textContent = '';
  value.value = '';

  if (!isNil(inputDom.value)) {
    inputDom.value.focus();
  }
}
</script>

<style lang="scss" scoped>
$clearIconSize: 20px;
$textContainerPadding: 0.3rem;
.root {
  position: relative;
  min-height: 3rem;
  background-color: #f2f2f2;
  transition-property: background-color, border-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  padding-left: $textContainerPadding;
  padding-right: calc($clearIconSize + $textContainerPadding);
  padding-top: $textContainerPadding;
  padding-bottom: $textContainerPadding;
  outline: none;

  &:focus-within {
    border-color: var(--theme-color);
    background-color: transparent;
  }

  > .inputArea {
    outline: none;
    word-break: break-all;
    &:empty:before {
      color: gray;
    }
  }

  > .clear {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: $textContainerPadding;
    top: 50%;
    transform: translateY(-50%);
    @include fixedHeight($clearIconSize);

    > img {
      pointer-events: none;
      transition: opacity 0.3s ease;
      height: 100%;
      width: auto;
      aspect-ratio: 1 / 1;
    }

    &.fade-enter-active,
    &.fade-leave-active {
      will-change: opacity;
      transition: opacity 0.3s ease;
    }

    &.fade-enter-from,
    &.fade-leave-to {
      opacity: 0;
    }
    &.fade-enter-to,
    &.fade-leave-from {
      opacity: 1;
    }
  }
}
</style>
