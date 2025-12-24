<template>
  <div
    class="configItem"
    :data-segment="segment">
    <div class="key">{{ title }}</div>
    <div class="value">
      <component
        :is="ConfComponentName_To_ConfComponentInstance_Map[value.config.type]"
        v-bind="value">
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { type ComponentPropItem } from '~/types';

const { segment, title, value } = defineProps({
  segment: { required: true, type: String },
  title: { required: true, type: String },
  value: { required: true, type: Object as PropType<ComponentPropItem> }
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
