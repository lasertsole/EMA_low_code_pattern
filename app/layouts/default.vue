<template>
    <div class="layout" ref="layout">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.layout {
    @include fullViewWindow;
}
</style>