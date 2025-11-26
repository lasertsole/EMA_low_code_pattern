<template>
    <div class="editor">
        <button @click="clickFunc">template</button>
        <div class="list">
            <TransitionGroup tag="ul" name="list">
                <KeepAlive>
                    <template v-for="(item, index) in numList" :key="index">
                        <li>{{ index }}</li>
                    </template>
                </KeepAlive>
            </TransitionGroup>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { KeepAlive, type Reactive } from 'vue';


const numList: Reactive<string[]> = reactive([]);

function clickFunc(): void {
    numList.push('1');
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