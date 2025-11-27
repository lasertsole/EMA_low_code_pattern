<template>
    <div class="root">
        <editor></editor>
    </div>
</template>

<script lang="ts" setup>
import { onErrorCaptured } from 'vue';
    
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
  logUtil.e(`${target} happened error...`, errMsg);
  toastMessage('text', errMsg, { bottom: 100 });

  // 停止错误继续向上传播
  return false;
});
/****************以上是捕获子组件树中的异常****************/
</script>

<style lang="scss" scoped>
.root {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
