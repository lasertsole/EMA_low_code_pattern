<template>
    <div class="layout" ref="layout">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()

useHead({
    meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }],
})
</script>

<style lang="scss" scoped>
.layout {
    @include fullViewWindow;
}
</style>