<template>
  <div
    class="root"
    tabindex="-1">
    <div class="operation">
      <template
        v-for="item in operationOptions"
        :key="item">
        <div
          class="option"
          @click.stop="item.process">
          {{ item.name }}
        </div>
      </template>
    </div>
    <div
      mteAreaRoot
      ref="inputDom"
      class="mteArea"
      @input.stop="inputFunc($event)"
      contenteditable="true"
      :readonly="readonly"
      :style="styleProps">
      {{ '0123456789' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type ShallowRef, type StyleValue } from 'vue';
import { isEmpty, isEqual, isNil } from 'lodash-es';

// domProps 和 styleProps分离
const { value } = defineProps(
  textDomProps as {
    readonly [x: string]: any;
  }
);

const styleProps = useAttrs()?.styleProps as StyleValue;

const modelValue = ref(isNil(value.default) ? value : value.default);

//判断是否为 富文本编辑区 的 根节点
function isMteRoot(node: Node | null | undefined): boolean {
  if (!isNil(node) && node.nodeType === Node.ELEMENT_NODE) {
    if ((node as HTMLElement).hasAttribute('mteAreaRoot')) {
      return true;
    }
  }

  return false;
}

//获取包含node的最近ELEMENT_NODE元素
function fromNodeGetNearestContainerNode(node: Node): HTMLElement | null {
  if (node.nodeType === Node.TEXT_NODE && !isNil(node.parentNode)) {
    node = node.parentNode;
  }

  if (node.parentNode instanceof HTMLElement) {
    return node as HTMLElement;
  } else {
    return null;
  }
}

//判断两个classList是否相等
function isEqualClass(classA: DOMTokenList | null | undefined, classB: DOMTokenList | null | undefined): boolean {
  if (isNil(classA) || isNil(classB)) return false;
  const setA = new Set(classA);
  const setB = new Set(classB);

  return setA.size === setB.size && [...setA].every(v => setB.has(v));
}

function getSpanInRange(range: Range) {
  const startNode = range.startContainer;
  const endNode = range.endContainer;
  const commonAncestorContainer = range.commonAncestorContainer;
  const startOffset = range.startOffset;
  const endOffset = range.endOffset;

  console.log(range);

  console.log(startNode);
  console.log(endNode);
  console.log('commonAncestorContainerNode: ' + fromNodeGetNearestContainerNode(commonAncestorContainer));
  console.log('startOffset: ' + startOffset);
  console.log('endOffset: ' + endOffset);
  console.log('endOffset - startOffset: ' + (endOffset - startOffset));
  console.log('commonAncestorContainer.textContent?.length: ' + commonAncestorContainer.textContent?.length);
  console.log('isEqual(startNode, endNode): ' + isEqual(startNode, endNode));
}

function normalizeSelectionProcess({
  range,
  selection,
  className
}: {
  range: Range;
  selection: Selection;
  className: string;
}): void {
  /* 1. 提取选中的 HTML 内容 */
  const fragment: DocumentFragment = range.extractContents();

  /*  2. 创建包裹容器 */
  const span: HTMLSpanElement = document.createElement('span');
  span.classList.add(className);
  span.appendChild(fragment);

  /* 3. 在原位置插入加粗后的内容 */
  range.insertNode(span);

  /* 4. 合并前后类型相同的元素 */
  // 在 fragment 内部的起点和终点埋下标记
  const startMarker = document.createElement('span');
  const endMarker = document.createElement('span');
  startMarker.style.display = 'none'; // 隐藏标记
  endMarker.style.display = 'none';
  // 将标记放入 span 的首尾
  span.prepend(startMarker);
  span.append(endMarker);

  span.parentElement?.normalize(); //清理因range.extractContents产生的前后#text
  const previousSibling: HTMLElement | null =
    !isNil(span.previousSibling) && span.previousSibling.nodeType === Node.ELEMENT_NODE
      ? (span.previousSibling as HTMLElement)
      : null; // 获取选中dom的前邻接HTMLElement
  const nextSibling: HTMLElement | null =
    !isNil(span.nextSibling) && span.nextSibling.nodeType === Node.ELEMENT_NODE
      ? (span.nextSibling as HTMLElement)
      : null; // 获取选中dom的后邻接HTMLElement

  if (
    !isNil(previousSibling) &&
    previousSibling.childNodes.length > 0 &&
    isEqualClass(previousSibling.classList, span.classList)
  ) {
    span.prepend(...Array.from(previousSibling.childNodes));
    previousSibling.remove();
  }

  if (!isNil(nextSibling) && nextSibling.childNodes.length > 0 && isEqualClass(nextSibling.classList, span.classList)) {
    span.append(...Array.from(nextSibling.childNodes));
    nextSibling.remove();
  }

  /* 5. 刷新选取 */
  selection.removeAllRanges();
  const newRange = document.createRange();
  newRange.setStartAfter(startMarker);
  newRange.setEndBefore(endMarker);

  selection.addRange(newRange);

  // 最后移除标记，保持 DOM 干净
  startMarker.remove();
  endMarker.remove();

  /* 6. 合并span内部的碎片 */
  span.normalize();

  /* 7. 合并mteArea表层的碎片 */
  inputDom.value!.normalize();
}

function wrappedSelectionProcess({
  selection,
  startNode,
  endNode,
  commonAncestorContainer,
  startOffset,
  endOffset
}: {
  selection: Selection;
  startNode: Node;
  endNode: Node;
  commonAncestorContainer: HTMLElement;
  startOffset: number;
  endOffset: number;
}): void {
  let targetNode: Node | null = startNode;
  while (!isNil(targetNode.firstChild)) {
    targetNode = targetNode.firstChild;
  }

  if (
    startNode.nodeType === Node.ELEMENT_NODE ||
    endOffset - startOffset === commonAncestorContainer?.textContent?.length
  ) {
    // if (commonAncestorContainer.classList.contains(className)) {
    //   if (commonAncestorContainer.classList.length >= 2) {
    //     commonAncestorContainer.classList.remove(className);
    //   } else {
    //   }
    // } else {
    //   commonAncestorContainer.classList.add(className);
    // }
    /* 1.在目标节点前后插入标记 */
    const startMarker = document.createElement('span');
    const endMarker = document.createElement('span');
    startMarker.style.display = 'none'; // 隐藏标记
    endMarker.style.display = 'none';

    commonAncestorContainer.parentNode?.insertBefore(startMarker, commonAncestorContainer);
    commonAncestorContainer.parentNode?.insertBefore(endMarker, commonAncestorContainer.nextSibling);

    /* 2.替换目标节点 为 目标节点的内部节点 */
    const textContent = commonAncestorContainer.textContent ?? '';
    const textNode = document.createTextNode(textContent);
    commonAncestorContainer.replaceWith(textNode);

    /* 3.删除目标节点 */
    commonAncestorContainer.remove();

    /* 4.刷新选中区域 */
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(startMarker);
    newRange.setEndBefore(endMarker);
    selection.addRange(newRange);

    /* 5.最后移除标记，保持 DOM 干净 */
    startMarker.remove();
    endMarker.remove();

    /* 6. 合并mteArea表层的碎片 */
    inputDom.value!.normalize();
  } else {
    console.log('13');
  }
}

function normalizeSelectionReverse({
  range,
  selection,
  className
}: {
  range: Range;
  selection: Selection;
  className: string;
}): void {}

// 多文本处理
function mteProcess(className: string): void {
  const selection = window.getSelection();
  if (isNil(selection)) return;

  if (selection?.rangeCount >= 1) {
    const range: Range = selection.getRangeAt(0);

    const commonAncestorContainer: HTMLElement = fromNodeGetNearestContainerNode(range.commonAncestorContainer)!;

    let startNode: Node = range.startContainer;
    let endNode: Node = range.endContainer;
    let startOffset: number = range.startOffset;
    let endOffset: number = range.endOffset;

    // 如果选区开头在mteArea根节点，则将选区开头向下降级
    if (isMteRoot(startNode) && startOffset === 0) {
      startNode = startNode.firstChild!;
      startOffset = 0;
    }

    // 如果选区结尾在mteArea根节点，则将选区结尾向下降级
    if (isMteRoot(endNode) && endOffset === 1) {
      endNode = endNode.lastChild!;
      if (endNode.nodeType === Node.TEXT_NODE) {
        endOffset = endNode.textContent!.length ?? 1;
      } else {
        endOffset = 1;
      }
    }

    if (isEqual(startNode, endNode)) {
      if (isMteRoot(commonAncestorContainer)) {
        normalizeSelectionProcess({ range, selection, className });
      } else {
        wrappedSelectionProcess({
          selection,
          startNode,
          endNode,
          commonAncestorContainer,
          startOffset,
          endOffset
        });
      }
    } else {
      if (isMteRoot(commonAncestorContainer)) {
      } else {
      }
    }
  }
}

const operationOptions: { name: string; process: () => void }[] = reactive([
  {
    name: '加粗',
    process: () => {
      mteProcess('strong');
    }
  },
  {
    name: '斜体',
    process: () => {
      mteProcess('italic');
    }
  },
  {
    name: '下划线',
    process: () => {
      const selection = window.getSelection();
      if (isNil(selection)) return;
      if (selection?.rangeCount >= 1) {
        for (let i = 0; i < selection.rangeCount; i++) {
          const range: Range = selection.getRangeAt(i);
          getSpanInRange(range);
        }
      }
    }
  }
]);

// 输入回调函数
function inputFunc(event: Event): void {
  if (!(event instanceof InputEvent)) {
    return;
  }

  const target = event.target as HTMLInputElement;

  if (event.inputType === 'deleteContentBackward' && (target.innerHTML === '<br>' || isEmpty(target.innerHTML))) {
    target.textContent = '';
    modelValue.value = '';
  } else if (isEmpty(target.innerHTML)) {
    target.textContent = '';
    modelValue.value = '';
  } else {
    modelValue.value = target.innerHTML;
  }
}

const inputDom: ShallowRef<HTMLElement | null> = useTemplateRef('inputDom');
</script>

<style lang="scss" scoped>
$clearIconSize: 20px;
$textContainerPadding: 0.3rem;
.root {
  > .operation {
    display: flex;
    gap: 1rem;
    > .option {
      border: 1px solid blue;
      user-select: none;
    }
  }

  > .mteArea {
    position: relative;
    min-height: 3rem;
    transition-property: background-color, border-color;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    padding-left: $textContainerPadding;
    padding-right: calc($clearIconSize + $textContainerPadding);
    padding-top: $textContainerPadding;
    padding-bottom: $textContainerPadding;
    outline: none;
    word-break: break-all;

    > :deep(span) {
      &.strong {
        font-weight: bold;
      }

      &.italic {
        font-style: italic;
      }
    }
  }
}
</style>
