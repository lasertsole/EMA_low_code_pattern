<template>
  <div class="editor">
    <div class="adds">
        <template v-for="component in componentAdds" :key="component">
          <component :is="component"></component>
        </template>
    </div>

    <div class="contentCanvas">
        <TransitionGroup name="fade">
            <template v-for="(item, index) in idToCurComponentPropsMap.values()" :key="item">
                <!-- <component v-bind="transformToComponentProps(item)"></component> -->
            </template>
        </TransitionGroup>
    </div>

    <div class="configs">
        <TransitionGroup name="fade">
            <template v-for="component in componentConfigs" :key="component">
                <component :is="component"></component>
            </template>
        </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onErrorCaptured } from 'vue';

import { type ComponentProps, UPDATE_COMPONENT_ENUM } from "@/types"

function update(targetId: string, updateType: UPDATE_COMPONENT_ENUM, params?: ComponentProps): void {

}


/****************以下是捕获子组件树中的异常****************/
onErrorCaptured((err: unknown, instance: ComponentPublicInstance | null) => {

  // 停止错误继续向上传播
  return false;
});
/****************以上是捕获子组件树中的异常****************/
</script>

<style lang="scss" scoped>
.editor {
    @include fullInParent();
    display: flex;
    justify-content: space-between;
    align-items: center;

    >* {
        height: 100%;
        background-color: white;
    }

    >.adds {
        display: grid;
        border-radius: 1rem;
        flex-grow: 1;
    }

    >.contentCanvas {
        flex-grow: 2;

        >.fade-enter-active,
        >.fade-leave-active {
            will-change: opacity;
            transition-property: opacity;
            transition-duration: 0.3s;
            transition-timing-function: ease;
        }

        >.fade-enter-from,
        >.fade-leave-to {
            opacity: 0;
        }

        >.fade-enter-to,
        >.fade-leave-from {
            opacity: 1;
            height: auto;
        }
    }

    >.configs {
        flex-grow: 1;
        display: flex;
        border-radius: 1rem;
        flex-direction: column;
    }
}
</style>
