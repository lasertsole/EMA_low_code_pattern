<template>
<div class="text">
    <div
        ref="inputDom"
        class="inputArea"
        @input.stop="inputFunc($event)"
        contenteditable="true"
        :readonly="readonly"
        :placeholder="placeholder"
        :style="styleProps"
    >{{ modelValue }}</div>
    <Transition name="fade">
        <div class="clear" v-show="!isEmpty(modelValue)" @click.stop="clearFunc($event)">
            <img src='@/assets/img/text_clear_btn.svg' />
        </div>
    </Transition>
</div>
</template>

<script lang="ts" setup>
    import {type ShallowRef} from "vue";
    import { isEmpty, isNil } from "lodash-es";
    import type { StyleProps } from "@/types/index.ts";

    // domProps 和 styleProps分离
    const {placeholder, readonly, value} = defineProps(transformToComponentProps(textDomProps));
    const styleProps = useAttrs()?.styleProps as StyleProps;


    const modelValue = ref(value);

    // 输入回调函数
    function inputFunc(event: Event):void {
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

    const inputDom: ShallowRef<HTMLElement | null> = useTemplateRef("inputDom");
    // 清理回调函数
    function clearFunc(event: Event):void {
        modelValue.value = '';

        if (!isNil(inputDom.value)) {
            inputDom.value.focus();
        }
    }
</script>

<style lang="scss" scoped>
.text{
    position: relative;
    
    >.inputArea{
        outline: none;
        word-break: break-all;

        &:empty:before {
            content: attr(placeholder);
            color: gray;
        }
    }

    >.clear{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
        height: 100%;

        > img {
            pointer-events: none;
            transition: opacity 0.3s ease;
            height: 100%;
            width: auto;
            aspect-ratio: 1 / 1;
        }

        &.fade-enter-active,
        &.fade-leave-active{
            will-change: opacity;
            transition: opacity .3s ease;
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
    