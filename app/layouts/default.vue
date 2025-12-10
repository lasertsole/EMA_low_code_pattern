<template>
    <div class="layout" ref="layout">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import {isEmpty } from "lodash-es"
import { onErrorCaptured } from 'vue';
    
const route = useRoute()

useHead({
    meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }],
});

/****************以下是捕获子组件树中的异常****************/
onErrorCaptured((err: unknown, instance: ComponentPublicInstance | null) => {
  let errMsg: string = '';
  let target: string = '';
  if (err instanceof Error) {
    errMsg = err.message;
  } else if (typeof err === 'string') {
    errMsg = err;
  } else {
    errMsg = JSON.stringify(err);
  }

  if (!isEmpty(instance?.$options?.name)) {
    target = instance!.$options!.name!;
  } else {
    target = 'something';
  }
  // console.error(`${target} happened error...`, errMsg);
  // toastMessage('text', errMsg, { bottom: 100 });

  // 停止错误继续向上传播
  return false;
});
/****************以上是捕获子组件树中的异常****************/
</script>

<style lang="scss" scoped>
.layout {
    @include fullViewWindow;
}
</style>
