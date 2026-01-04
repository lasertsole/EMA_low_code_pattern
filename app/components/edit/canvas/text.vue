<template>
  <div
    ref="root"
    class="text"
    :style="computedStyleProps"
    :placeholder="computedPlaceholder"
    v-html="domProps.value?.value"></div>
</template>

<script lang="ts" setup>
import { isNil } from 'lodash-es';
import type { PropType, ShallowRef, StyleValue } from 'vue';
import type { ComponentProps } from '~/types';

// domProps 和 styleProps分离
const { wrapper, domProps, styleProps } = defineProps({
  wrapper: { type: Object as PropType<HTMLElement>, required: true },
  domProps: { type: Object as PropType<ComponentProps>, required: true },
  styleProps: { type: Object as PropType<ComponentProps>, required: true }
});

const rootDom: ShallowRef<HTMLElement | null> = useTemplateRef('root');
const computedStyleProps: ComputedRef<StyleValue> = computed(() => {
  const res = reverseComponentPropsToDTO(styleProps);
  wrapper.style.width = res.width;

  nextTick(() => {
    if (!isNil(rootDom.value?.style?.width)) {
      rootDom.value.style.width = '100%';
    }
  });
  return res;
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
