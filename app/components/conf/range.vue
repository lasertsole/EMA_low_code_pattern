<template>
  <div class=wrapper>
    <input type="range" :min="min" :max="max" :step="step" v-model="value">
  </div>
</template>

<script lang='ts' setup>
import { type ModelRef } from "vue"

const {min, max, step, ...props} = defineProps({
  ...transformToComponentProps({ ...rangeStyleProps, ...rangeNoStyleProps })
});

const value:Ref<number> = ref(props.value);
</script>

<style lang='scss' scoped>
.wrapper {
  input {
    @include fullInParent();
  }
}
</style>
