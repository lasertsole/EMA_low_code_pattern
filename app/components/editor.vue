<template>
<div class="editor">
    <div class="componentList"></div>
    <div class="contentCanvas">
        <TransitionGroup name="fade">
            <template v-for="(item, index) in componentPropsMap.values()" :key="item">
              <component @update="update"></component>
            </template>
        </TransitionGroup>
    </div>
    <div class="configBoard"></div>
</div>
</template>

<script lang="ts" setup>
import { KeepAlive, type Reactive } from 'vue';
import { type ComponentProps, UPDATE_COMPONENT_ENUM } from "@/types/index.ts"


const numList: Reactive<string[]> = reactive([]);

function update(targetId:string, updateType: UPDATE_COMPONENT_ENUM, params?: ComponentProps): void {

}
</script>

<style lang="scss" scoped>
.editor{
    @include fullInParent();
    display: flex;
    justify-content: space-between;
    align-items: center;

    >.componentList{
        display: grid;
    }

    >.contentCanvas{
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

    >.configBoard{
        display:flex;
        flex-direction: column;
    }
}
</style>
