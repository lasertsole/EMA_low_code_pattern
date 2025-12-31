<template>
  <div
    class="text"
    :style="styleProps"
    :placeholder="computedPlaceholder"
    v-html="domProps.value?.value"></div>
</template>

<script lang="ts" setup>
import type { PropType, StyleValue } from 'vue';
import type { ComponentProps } from '~/types';

// domProps 和 styleProps分离
const { domProps, styleProps } = defineProps({
  domProps: { type: Object as PropType<ComponentProps>, required: true },
  styleProps: { type: Object as PropType<StyleValue>, required: true }
});

const { placeholder } = toRefs(domProps);

const computedPlaceholder: ComputedRef<string> = computed(() => {
  let res: unknown = placeholder?.value.value;
  let str: string = '';
  if (typeof res === 'string') {
    str += res;
  }
  return str;
});
</script>

<style lang="scss" scoped>
$clearIconSize: 20px;
.text {
  position: relative;

  &:empty:before {
    content: attr(placeholder);
    color: gray;
  }

  > :deep(span) {
    &.strong {
      font-weight: bold;
    }

    &.italic {
      font-style: italic;
    }

    &.underline {
      text-decoration: underline;
    }

    &.hignlight {
      background-color: yellow;
    }
  }
}
</style>
