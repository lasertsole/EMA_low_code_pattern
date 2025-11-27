<template>
    <div class="editor">
        <button @click="clickFunc">template</button>
        <div class="list">
            <TransitionGroup tag="ul" name="list">
                <template v-for="(item, index) in componentPropsList" :key="item">
                  <component @update="update"></component>
                </template>
            </TransitionGroup>
        </div>
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
/* 进入动画 */
.list-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

/* 离开动画 */
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* 激活状态 */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

/* 移动动画 - 关键！ */
.list-move {
    transition: transform 0.5s ease;
}

.list-leave-active {
    position: absolute;
}
</style>
