<template>
  <div class="configItem">
    <div class="name">{{ title }}</div>
    <div class="value">
      <component
        @[UPDATE_COMPONENT_ENUM.MOD]="componentChange"
        :is="ConfComponentName_To_ConfComponentInstance_Map[value.config.type]"
        :value="value.value">
      </component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { type ComponentPropItem, UPDATE_COMPONENT_ENUM } from '~/types';

function componentChange(value: unknown) {
  console.log(title);
  console.log(value);
}

const { title, value } = defineProps({
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
  > .name {
    @include flexCenter;
    margin-right: 1rem;
    word-break: break-all;
  }
}
</style>
