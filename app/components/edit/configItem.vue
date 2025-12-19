<template>
  <div class="configItem">
    <div class="name">{{ title }}</div>
    <div class="value">
      <component
        :is="ConfText"
        :value="value"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import ConfText from '~/components/confs/text.vue';
import type { ComponentPropsValue } from '@/types/index.ts';
const { title, value } = defineProps({
  title: { required: true, type: String as PropType<string> },
  value: { required: true, type: Object as PropType<ComponentPropsValue> }
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
  > .name {
    @include flexCenter;
    margin-right: 1rem;
    word-break: break-all;
  }
}
</style>
