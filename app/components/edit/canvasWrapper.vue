<template>
  <div
    class="wrapper"
    ref="wrapper">
    <slot :wrapper="wrapperDom"></slot>
  </div>
</template>

<script lang="ts" setup>
import type { ShallowRef } from 'vue';

const wrapperDom: ShallowRef<HTMLElement | null> = useTemplateRef('wrapper');
</script>

<style lang="scss" scoped>
.wrapper {
  display: inline-block;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
  filter: grayscale(30%);
  transition-property: background-color, border-color, filter;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  border: 1px solid transparent;
  border-radius: 0.5rem;

  &:hover,
  &.selected {
    filter: grayscale(0%);
    background-color: transparent;
  }

  &.selected {
    border-color: var(--theme-color);
  }
}
</style>
