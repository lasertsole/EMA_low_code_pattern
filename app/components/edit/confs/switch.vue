<template>
  <div
    class="root"
    tabindex="-1">
    <div
      class="switch"
      :class="{ active: value }"
      @click.stop="switchChange">
      <div class="button"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type ModelRef } from 'vue';

const value: ModelRef<boolean> = defineModel('value', {
  type: Boolean,
  required: true
});

function switchChange(): void {
  value.value = !value.value;
}
</script>

<style lang="scss" scoped>
@use 'sass:math' as math;
$switchSize: 3rem;
$animationTime: 0.2s;
.root {
  @include fullHeight;
  display: flex;
  align-items: center;

  > .switch {
    display: flex;
    height: math.div($switchSize, 2);
    width: $switchSize;
    transition: background-color $animationTime ease-out;
    background-color: rgba(3, 26, 77, 0.24);
    border-radius: calc(infinity * 1px);
    align-items: center;

    > .button {
      height: 80%;
      aspect-ratio: 1 / 1;
      background-color: white;
      border-radius: calc(infinity * 1px);
      margin: math.div($switchSize, 15);
      transition: transform $animationTime ease-out;
    }

    &.active {
      background-color: #0a59f7;
      > .button {
        transform: translateX(#{math.div($switchSize, 2)});
      }
    }
  }
}
</style>
