<template>
  <div
    class="wrapper"
    :style="computedStyleProps">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { ComponentProps } from '~/types';
const { styleProps } = defineProps({
  styleProps: { type: Object as PropType<ComponentProps>, required: true }
});

const computedStyleProps: ComputedRef = computed(() => {
  return reverseComponentPropsToDTO(styleProps);
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: inline-block;
  cursor: pointer;
  filter: grayscale(0%); // 限制after图层

  $borderWidth: 2px;
  &::after {
    transition-property: background-color, border-color;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    position: absolute;
    top: 0px;
    left: 0px;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border: $borderWidth solid transparent;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: inherit;
  }

  &:hover,
  &.selected {
    background-color: transparent;

    &::after {
      background-color: transparent;
      border-color: var(--theme-color);
    }
  }
}
</style>
