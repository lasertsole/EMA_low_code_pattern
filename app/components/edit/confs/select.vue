<template>
  <div class="root">
    <select
      v-if="!isEmpty(options)"
      v-model="value">
      <template
        v-for="item in options"
        :key="item">
        <option>
          {{ item }}
        </option>
      </template>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { type ComponentPropItemConfig } from '~/types';
import { isEmpty } from 'lodash-es';

const value = defineModel('value', {
  type: String,
  required: true
});

const attrs: ComponentPropItemConfig | undefined = useAttrs()?.config as ComponentPropItemConfig | undefined;
const options: string[] = (attrs?.options ?? []) as string[];

watch(value, newVal => {
  console.log(newVal);
});
</script>

<style lang="scss" scoped>
.root {
  @include fullHeight;
  display: flex;
  align-items: center;
}
</style>
