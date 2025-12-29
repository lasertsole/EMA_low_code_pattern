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
import { isEmpty, isEqual, isNil, merge } from 'lodash-es';

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

//合并邻近相同类型node
function mergeSiblingNode(targetNode: Node): void {
  const previousSibling: HTMLElement | null =
    !isNil(targetNode.previousSibling) && targetNode.previousSibling.nodeType === Node.ELEMENT_NODE
      ? (targetNode.previousSibling as HTMLElement)
      : null; // 获取选中dom的前邻接HTMLElement
  const nextSibling: HTMLElement | null =
    !isNil(targetNode.nextSibling) && targetNode.nextSibling.nodeType === Node.ELEMENT_NODE
      ? (targetNode.nextSibling as HTMLElement)
      : null; // 获取选中dom的后邻接HTMLElement

  if (targetNode instanceof HTMLElement) {
    if (
      !isNil(previousSibling) &&
      previousSibling.childNodes.length > 0 &&
      isEqualClass(previousSibling.classList, (targetNode as HTMLElement).classList)
    ) {
      targetNode.prepend(...Array.from(previousSibling.childNodes));
      previousSibling.remove();
    }

    if (
      !isNil(nextSibling) &&
      nextSibling.childNodes.length > 0 &&
      isEqualClass(nextSibling.classList, targetNode.classList)
    ) {
      targetNode.append(...Array.from(nextSibling.childNodes));
      nextSibling.remove();
    }
  }

  targetNode.parentNode?.normalize();
}

// 将node递归拆包
function unwrapEleNode(targetNode: HTMLElement, targetClasses?: string[]): void {
  while (!isNil(targetNode.firstChild)) {
    let node: Node = targetNode.firstChild;
    if (node.nodeType !== Node.ELEMENT_NODE && !isEmpty(targetClasses)) {
      const span: HTMLSpanElement = document.createElement('span');
      span.classList.add(...targetClasses!);
      span.appendChild(node);
      node = span;
    }
    targetNode.parentNode?.insertBefore(node, targetNode);
  }
  targetNode.remove();
}

function getSpanInRange(range: Range): void {
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
  mergeSiblingNode(span);

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
  range,
  commonAncestorContainer,
  startOffset,
  endOffset,
  className
}: {
  selection: Selection;
  startNode: Node;
  range: Range;
  commonAncestorContainer: HTMLElement;
  startOffset: number;
  endOffset: number;
  className: string;
}): void {
  let targetNode: Node | null = startNode;
  while (!isNil(targetNode.firstChild)) {
    targetNode = targetNode.firstChild;
  }

  if (
    startNode.nodeType === Node.ELEMENT_NODE ||
    endOffset - startOffset === commonAncestorContainer?.textContent?.length
  ) {
    if (commonAncestorContainer.classList.contains(className)) {
      if (commonAncestorContainer.classList.length >= 2) {
        commonAncestorContainer.classList.remove(className);
      } else {
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
      }
    } else {
      commonAncestorContainer.classList.add(className);
    }
  } else {
    if (commonAncestorContainer.classList.contains(className)) {
      if (commonAncestorContainer.classList.length >= 2) {
        /* 1. 提取选中的 HTML 内容 */
        const fragment: DocumentFragment = range.extractContents();
        /*  2. 创建包裹容器 */
        const span: HTMLSpanElement = document.createElement('span');

        /* 3. 创建新span */
        const oriClasses: string[] = Array.from(commonAncestorContainer.classList);
        const updatedClasses = oriClasses.filter(cls => cls !== className);
        span.classList.add(...updatedClasses);
        span.appendChild(fragment);

        /* 4. 在 fragment 内部的起点和终点埋下标记 */
        const startMarker = document.createElement('span');
        const endMarker = document.createElement('span');
        startMarker.style.display = 'none'; // 隐藏标记
        endMarker.style.display = 'none';
        span.prepend(startMarker);
        span.append(endMarker);

        /* 5. 在原位置插入新span */
        range.insertNode(span);

        /* 6. 清理commonAncestorContainer.parentNode内的碎片 */
        commonAncestorContainer.normalize();

        /* 7. 拆包commonAncestorContainer为单层span */
        unwrapEleNode(commonAncestorContainer, oriClasses);

        /* 8.刷新选中区域 */
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.setStartAfter(startMarker);
        newRange.setEndBefore(endMarker);
        selection.addRange(newRange);

        /* 9.最后移除标记，保持 DOM 干净 */
        startMarker.remove();
        endMarker.remove();

        /* 10. 删除旧commonAncestorContainer */
        commonAncestorContainer.remove();

        /* 11. 合并周边相同元素 */
        mergeSiblingNode(span);
      } else {
        /* 1. 提取选中的 HTML 内容 */
        const oriClasses: string[] = Array.from(commonAncestorContainer.classList);
        const fragment: DocumentFragment = range.extractContents();

        /* 2. 提取选区左侧元素并重新包装后插入 */
        const afterRange = document.createRange();
        afterRange.setStart(range.commonAncestorContainer, range.endOffset);
        afterRange.setEnd(range.commonAncestorContainer, range.commonAncestorContainer.textContent!.length);
        const afterFragment: DocumentFragment = afterRange.extractContents();
        const afterSpan: HTMLSpanElement = document.createElement('span');
        afterSpan.classList.add(...oriClasses);
        afterSpan.appendChild(afterFragment);
        afterRange.insertNode(afterSpan);

        /* 3. 插入选取元素 */
        afterRange.insertNode(fragment);

        /* 4. 提取选区右侧元素并重新包装后插入 */
        const beforeRange = document.createRange();
        beforeRange.setStart(range.commonAncestorContainer, 0);
        beforeRange.setEnd(range.commonAncestorContainer, range.startOffset);
        const beforeFragment: DocumentFragment = beforeRange.extractContents();
        const beforeSpan: HTMLSpanElement = document.createElement('span');
        beforeSpan.classList.add(...oriClasses);
        beforeSpan.appendChild(beforeFragment);
        beforeRange.insertNode(beforeSpan);

        /* 5. 拆包父元素 */
        unwrapEleNode(commonAncestorContainer);

        /* 6. 重置选取 */
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.setStartAfter(beforeSpan);
        newRange.setEndBefore(afterSpan);
        selection.addRange(newRange);

        /* 7. 去除空span */
        if ((beforeSpan.textContent?.length ?? 0) === 0) {
          beforeSpan.remove();
        }
        if ((afterSpan.textContent?.length ?? 0) === 0) {
          afterSpan.remove();
        }

        /* 8. 合并mteArea表层的碎片 */
        inputDom.value!.normalize();
      }
    } else {
    }
  }
}

// 多文本处理
function mteProcess(className: string): void {
  const selection = window.getSelection();
  if (isNil(selection)) return;

  if (selection?.rangeCount >= 1) {
    const range: Range = selection.getRangeAt(0);

    // 要处理的选取不在mteArea范围内则退出，以免影响到mteArea范围之外
    if (!inputDom.value?.contains(range.commonAncestorContainer)) return;

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
        normalizeSelectionProcess({
          range,
          selection,
          className
        });
      } else {
        wrappedSelectionProcess({
          selection,
          startNode,
          range,
          commonAncestorContainer,
          startOffset,
          endOffset,
          className
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
