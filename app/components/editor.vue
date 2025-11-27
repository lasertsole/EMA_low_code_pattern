<template>
    <div class="editor">
        <div class="adds">
            <template v-for="item in componentAdds">
                <div>{{ item }}</div>
            </template>
        </div>

        <div class="contentCanvas">
            <TransitionGroup name="fade">
                <template v-for="(item, index) in idToCurComponentPropsMap.values()" :key="item">
                    <component v-bind="transformToComponentProps(item)"></component>
                </template>
            </TransitionGroup>
        </div>

        <div class="configs">
            <TransitionGroup name="fade">
                <template v-for="(item, index) in idToCurComponentPropsMap.values()" :key="item">
                    <component @update="update">{{ item }}</component>
                </template>
            </TransitionGroup>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { KeepAlive, type Reactive } from 'vue';
import { type ComponentProps, UPDATE_COMPONENT_ENUM } from "@/types"

function update(targetId: string, updateType: UPDATE_COMPONENT_ENUM, params?: ComponentProps): void {

}
</script>

<style lang="scss" scoped>
.editor {
    @include fullInParent();
    display: flex;
    justify-content: space-between;
    align-items: center;

    >* {
        background-color: white;
    }

    >.adds {
        display: grid;
        border-radius: 1rem;
    }

    >.contentCanvas {

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
        display: flex;
        border-radius: 1rem;
        flex-direction: column;
    }
}
</style>
