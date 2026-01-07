<template>
  <div class="root">
    <template
      v-for="(item, index) in orilist"
      :key="item">
      <div class="row">
        <input
          class="key"
          type="text"
          v-model="item.key"
          placeholder="key" />
        <input
          class="password"
          type="text"
          v-model="item.value"
          placeholder="value" />

        <div
          class="addAboveRow"
          v-show="canAddRow"
          @click.stop="addAboveRow(index)">
          +
        </div>
        <div
          class="addBelowRow"
          v-show="canAddRow"
          @click.stop="addBelowRow(index)">
          +
        </div>
        <div
          class="delete"
          v-show="showDeleted"
          @click.stop="deleteRow(index)">
          <img src="@/assets/img/text_clear_btn_blue.svg" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { isEmpty } from 'lodash-es';
import type { PropType, Reactive } from 'vue';
import { type ComponentPropItemConfigOptionObj } from '~/types';

const value = defineModel('value', {
  type: Array as PropType<ComponentPropItemConfigOptionObj[]>,
  required: true
});

// 本组件的原始UI列表
const orilist: Reactive<ComponentPropItemConfigOptionObj[]> = reactive(
  isEmpty(value.value) ? [{ key: '', value: '' }] : value.value
);

// 只有列表元素数量大于1，才能添加新行
const showDeleted: ComputedRef<boolean> = computed(() => {
  return orilist.length > 1;
});

// 将所有有效行 组成 有效列表
const avaliableList: ComputedRef<ComponentPropItemConfigOptionObj[]> = computed(() => {
  return orilist.filter(item => {
    return !isEmpty(item.key) && !isEmpty(item.value);
  });
});

// 当 有效列表 更新时，更新value
watch(
  avaliableList,
  newVal => {
    value.value = newVal;
  },
  { deep: true }
);

// 只有列表所有的键值都非空，才能添加新行
const canAddRow: ComputedRef<boolean> = computed(() => {
  return avaliableList.value.length === orilist.length;
});

// 在当前行上方添加新行
function addAboveRow(index: number): void {
  const keyValuePair: ComponentPropItemConfigOptionObj = { key: '', value: '' };
  orilist.splice(index, 0, keyValuePair);
}

// 在当前行下方添加新行
function addBelowRow(index: number): void {
  const keyValuePair: ComponentPropItemConfigOptionObj = { key: '', value: '' };
  orilist.splice(index + 1, 0, keyValuePair);
}

// 删除当前行
function deleteRow(index: number): void {
  orilist.splice(index, 1);
}
</script>

<style lang="scss" scoped>
.root {
  @include fullHeight;
  display: grid;
  grid-template-columns: 45% 45% 10%;
  row-gap: 1em;

  $color: var(--theme-color);
  > .row {
    border-radius: 0.5rem;
    position: relative;
    display: grid;
    grid-column: span 3;
    grid-template-columns: subgrid;
    border: 2px solid transparent;
    transition-property: border-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    padding: 0.25em;
    justify-items: flex-end;

    .addAboveRow,
    .addBelowRow {
      @include flexCenter;
      position: absolute;
      width: 1rem;
      aspect-ratio: 1 / 1;
      background-color: rgb(10, 89, 247);
      color: white;
      border-radius: 50%;
      overflow: hidden;
      visibility: hidden;
      opacity: 0;
      transition-property: opacity;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      left: 50%;
    }

    .addAboveRow {
      top: 0px;
      transform: translateY(-50%) translateX(-50%);
    }

    .addBelowRow {
      bottom: 0px;
      transform: translateY(50%) translateX(-50%);
    }

    > input {
      @include fixedWidth(80%);
      margin-left: 1em;
      text-indent: 0.25em;
      outline: none;
    }

    > .delete {
      position: absolute;
      right: 0.25rem;
      top: 50%;
      transform: translateY(-50%);
      color: white;
      width: 1.25rem;
      @include flexCenter;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      overflow: hidden;
      visibility: hidden;
      opacity: 0;
      transition-property: opacity;
      transition-duration: 0.3s;
      transition-timing-function: ease;

      > img {
        @include fullInParent;
      }
    }

    &:hover {
      border-color: $color;

      .addAboveRow,
      .addBelowRow {
        visibility: initial;
        opacity: 1;
      }
      > .delete {
        visibility: initial;
        opacity: 1;
      }
    }
  }
}
</style>
