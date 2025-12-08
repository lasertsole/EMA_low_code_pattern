<template>
    <div ref="editor" contenteditable="true" class="editor" placeholder="placeholder" @input.stop="update"></div>
</template>

<script lang="ts" setup>
import { type Ref, ref } from 'vue';
import { isEmpty, isNil } from 'lodash-es';

const content: Ref<string> = ref('');
const editor: Ref<HTMLElement | null> = useTemplateRef('editor');
const width: Ref<string> = ref("300px");
const height: Ref<string> = ref("300px");
const lineHeight: Ref<string> = ref("initial");

onMounted(() => {
    if (isNil(editor.value)) return;
    editor.value.style.lineHeight = height.value;
});

function update(event: InputEvent): void {
    const target = event.target as HTMLInputElement;

    if (event.inputType === "deleteContentBackward" && (target.innerHTML === "<br>" || isEmpty(target.innerHTML))) {
        target.textContent = "";
        content.value = "";
        target.style.lineHeight = "0";
        target.style.lineHeight = height.value;
    } else if (isEmpty(target.innerHTML)) {
        target.textContent = "";
        content.value = "";
    } else {
        content.value = target.innerHTML;
        target.style.lineHeight = lineHeight.value;
    };
}

</script>

<style lang="scss" scoped>
.editor {
    margin: auto auto;
    width: v-bind(width);
    height: v-bind(height);
    outline: none;
    border: 1px solid #00a8e9;
    display: flex;
    align-items: center;

    &:empty:before {
        content: attr(placeholder);
        color: gray;
    }
}
</style>