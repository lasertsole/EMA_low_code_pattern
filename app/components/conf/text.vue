<template>
  <div class="Text">
    <textarea :style="styleProps" v-on="eventHandlers"></textarea>
  </div>
</template>

<script lang="ts" setup>
/****以下是获取默认属性****/
const {text, ...styleProps} = defineProps({
  ...transformToComponentProps({ ...textStyleProps, ...textNoStyleProps })
});
/****以上是获取默认属性****/

const emits = defineEmits<{
  (e: 'update'): void;
}>();

function handleClick(event: Event): void {
  event.stopPropagation(); // 阻止事件冒泡
}

function handleInput(event: Event): void {
  event.stopPropagation(); // 阻止事件冒泡
}

const eventHandlers: { [key: string]: (event: Event) => void } = {
  click: handleClick,
  input: handleInput,
}
</script>

<style lang="scss" scoped>
.Text {
  >textarea {
    @include fullInParent();
  }
}
</style>
