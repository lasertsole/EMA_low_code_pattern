<template>
  <div class=wrapper>
    <input type="range" :min="min" :max="max" :step="step" v-model="value">
  </div>
</template>

<script lang='ts' setup>
import { type Ref, ref } from "vue"

const props = defineProps({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  step: { type: Number, required: true },
  value: { type: Number, required: false, default: 0 }
});
</script>

<style lang='scss' scoped>
.wrapper {
  input {
    @include fullInParent();
  }
}
</style>
