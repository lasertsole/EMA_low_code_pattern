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
import { cloneDeep, isEmpty, isNil } from 'lodash-es';

// domProps 和 styleProps分离
const { value } = defineProps(
  textDomProps as {
    readonly [x: string]: any;
  }
);

const styleProps = useAttrs()?.styleProps as StyleValue;

const modelValue = ref(isNil(value.default) ? value : value.default);

// 判断是否为html元素节点
function isElementNode(node: Node): boolean {
  if (!isNil(node) && node.nodeType === Node.ELEMENT_NODE) {
    return true;
  }
  return false;
}

// 判断是否为 富文本编辑区 的 根节点
function isMteRoot(node: Node): boolean {
  if (isElementNode(node) && (node as HTMLElement).hasAttribute('mteAreaRoot')) {
    return true;
  }

  return false;
}

// 判断是否为 包装节点
function isTextWrapper(node: Node): boolean {
  if (
    isElementNode(node) &&
    (node as HTMLElement).tagName === 'SPAN' &&
    !(node as HTMLElement).hasAttribute('mteAreaRoot')
  ) {
    return true;
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
function isEqualClassList(classA: DOMTokenList | null | undefined, classB: DOMTokenList | null | undefined): boolean {
  if (isNil(classA) || isNil(classB)) return false;
  const setA = new Set(classA);
  const setB = new Set(classB);

  return setA.size === setB.size && [...setA].every(v => setB.has(v));
}

/**
 * 改变类列表
 * @param oriClassList 原类列表
 * @param targetClassName 目标类
 * @returns 改变后类列表
 */
function changeClass(oriClassList: string[], targetClassName: string): string[] {
  const tarClassList: string[] = cloneDeep(oriClassList);
  // 如果存在目标元素则删除，否则添加
  const index = tarClassList.indexOf(targetClassName);
  if (index >= 0) {
    tarClassList.splice(index, 1);
  } else {
    tarClassList.push(targetClassName);
  }

  return tarClassList;
}

/**
 * 合并邻近相同类型node
 * @param targetNode 目标元素
 * @returns 原target元素在新元素中的范围
 */
function mergeSiblingNode(targetNode: Node): Range {
  const previousSibling: HTMLElement | null =
    !isNil(targetNode.previousSibling) && targetNode.previousSibling.nodeType === Node.ELEMENT_NODE
      ? (targetNode.previousSibling as HTMLElement)
      : null; // 获取选中dom的前邻接HTMLElement

  const nextSibling: HTMLElement | null =
    !isNil(targetNode.nextSibling) && targetNode.nextSibling.nodeType === Node.ELEMENT_NODE
      ? (targetNode.nextSibling as HTMLElement)
      : null; // 获取选中dom的后邻接HTMLElement

  const range: Range = new Range();
  range.setStartBefore(targetNode);
  range.setEndAfter(targetNode);

  if (targetNode instanceof HTMLElement) {
    if (!isNil(previousSibling) && previousSibling.childNodes.length === 0) {
      previousSibling.remove();
    } else if (!isNil(previousSibling) && isEqualClassList(previousSibling.classList, targetNode.classList)) {
      // 插入起始标记
      const startMarker: HTMLSpanElement = document.createElement('span');
      startMarker.style.display = 'none';
      targetNode.prepend(startMarker);

      targetNode.normalize();

      // 合并相同classList节点
      targetNode.prepend(previousSibling!.firstChild!);
      previousSibling.remove();

      // 重置range起始位置
      range.setStartBefore(startMarker);

      // 去除标记
      startMarker.remove();

      targetNode.normalize();
    }

    if (!isNil(nextSibling) && nextSibling.childNodes.length === 0) {
      nextSibling.remove();
    } else if (!isNil(nextSibling) && isEqualClassList(nextSibling.classList, targetNode.classList)) {
      // 插入起始标记
      const endMarker: HTMLSpanElement = document.createElement('span');
      endMarker.style.display = 'none';
      targetNode.append(endMarker);

      targetNode.normalize();

      // 合并相同classList节点
      targetNode.append(nextSibling!.firstChild!);
      nextSibling.remove();

      // 重置range起始位置
      range.setEndAfter(endMarker);

      // 去除标记
      endMarker.remove();

      targetNode.normalize();
    }
  }

  targetNode.parentNode?.normalize();

  return range;
}

// 将node递归拆包
function unwrapEleNode(targetNode: HTMLElement): void {
  if (isMteRoot(targetNode)) return;

  while (!isNil(targetNode.firstChild)) {
    let node: Node = targetNode.firstChild;
    targetNode.parentNode?.insertBefore(node, targetNode);
  }
  targetNode.remove();
}

// 多文本处理
function mteProcess(className: string): void {
  const selection = window.getSelection();
  if (isNil(selection)) return;

  if (selection?.rangeCount >= 1) {
    const range: Range = selection.getRangeAt(0);
    // 如果是折叠状态，则直接跳过处理
    if (range.collapsed === true) return;

    const fragment: DocumentFragment = range.extractContents();

    //清除fragment内部碎片
    fragment.normalize();

    //得到父html节点
    const parentNode: HTMLElement | null = fromNodeGetNearestContainerNode(range.commonAncestorContainer);

    // 如果fragment内无要处理的节点，则直接跳过处理
    if (fragment.childNodes.length <= 0) {
      return;
    } else if (fragment.childNodes.length === 1) {
      if (isNil(parentNode)) return;

      if (isTextWrapper(parentNode)) {
        const oriClassList: string[] = Array.from(parentNode.classList);
        const tarClassList: string[] = changeClass(oriClassList, className);

        // 如果class数组为空，则不用span包装元素，否则需要span包装元素
        let targetNode: Node;
        if (isEmpty(tarClassList)) {
          targetNode = fragment.firstChild!;
        } else {
          const span: HTMLSpanElement = document.createElement('span');
          span.classList.add(...tarClassList);
          span.appendChild(fragment);
          targetNode = span;
        }

        const afterRange = document.createRange();
        afterRange.setStart(range.commonAncestorContainer, range.endOffset);
        afterRange.setEnd(range.commonAncestorContainer, range.commonAncestorContainer.textContent!.length);
        if (!afterRange.collapsed) {
          const afterFragment: DocumentFragment = afterRange.extractContents();
          const afterSpan: HTMLSpanElement = document.createElement('span');
          afterSpan.classList.add(...oriClassList);
          afterSpan.appendChild(afterFragment);
          afterRange.insertNode(afterSpan);
        }

        afterRange.insertNode(targetNode);

        const beforeRange = document.createRange();
        beforeRange.setStart(range.commonAncestorContainer, 0);
        beforeRange.setEnd(range.commonAncestorContainer, range.startOffset);
        if (!beforeRange.collapsed) {
          const beforeFragment: DocumentFragment = beforeRange.extractContents();
          const beforeSpan: HTMLSpanElement = document.createElement('span');
          beforeSpan.classList.add(...oriClassList);
          beforeSpan.appendChild(beforeFragment);
          afterRange.insertNode(beforeSpan);
        }

        parentNode.normalize();

        // 清空所有选取
        selection.removeAllRanges();

        // 拆包父节点
        unwrapEleNode(parentNode);

        // 合并邻近节点
        const newRange = mergeSiblingNode(targetNode);

        selection.addRange(newRange);

        parentNode.normalize();
      } else {
        let targetNode: Node = fragment.firstChild!;

        if (isElementNode(targetNode)) {
          if ((targetNode as HTMLElement).classList.contains(className)) {
            (targetNode as HTMLElement).classList.remove(className);
          } else {
            (targetNode as HTMLElement).classList.add(className);
          }

          if ((targetNode as HTMLElement).classList.length === 0) {
            targetNode = targetNode.firstChild!;
          }
        } else {
          const span: HTMLSpanElement = document.createElement('span');
          span.appendChild(targetNode);
          span.classList.add(className);
          targetNode = span;
        }

        // 将目标节点插回原处
        range.insertNode(targetNode);

        // 如果目标节点是span包装节点，则父节点清空碎片。反之，如果目标节点是文本节点，则保留碎片，碎片位置用于给range定位
        if (isTextWrapper(targetNode)) {
          parentNode.normalize();
        }

        // 合并邻近节点
        const newRange = mergeSiblingNode(targetNode);

        // 更新选区
        selection.removeAllRanges();
        selection.addRange(newRange);

        parentNode.normalize();
      }
    } else {
      const newFragment = new DocumentFragment();
      const childNodes: ChildNode[] = Array.from(fragment.childNodes);
      let newChildNodes: Node[];

      // 如果所有子节点都有className，则都去除类型，否则都添加类型
      if (
        childNodes.every(item => {
          return (item as HTMLElement)?.classList?.contains(className) ?? false;
        })
      ) {
        newChildNodes = childNodes.map(item => {
          let target: Node = item;
          (target as HTMLElement).classList.remove(className);
          if ((target as HTMLElement).classList.length === 0) {
            target = target.firstChild!;
          }
          return target;
        });
      } else {
        newChildNodes = childNodes.map(item => {
          if (isElementNode(item)) {
            (item as HTMLElement).classList.add(className);
          } else {
            const span: HTMLSpanElement = document.createElement('span');
            span.classList.add(className);
            span.appendChild(item);
            item = span;
          }
          return item;
        });
      }

      // newChildNodes内的同class的Node进行合并
      for (let i: number = newChildNodes.length - 2; i >= 0; i--) {
        const currentNode: Node = newChildNodes[i]!;

        const nextSiblingNode: Node = newChildNodes[i + 1]!;
        if (
          !isNil(nextSiblingNode?.firstChild) &&
          isElementNode(nextSiblingNode) &&
          isEqualClassList((nextSiblingNode as HTMLElement).classList, (currentNode as HTMLElement).classList)
        ) {
          currentNode.appendChild(nextSiblingNode.firstChild);
          currentNode.normalize();
          newChildNodes.splice(i + 1, 1);
        }
      }

      // 将结果导回range
      newFragment.append(...newChildNodes);
      range.insertNode(newFragment);

      // 清理并合并两头node
      const firstChild: Node = newChildNodes[0]!;
      const lastChild: Node = newChildNodes[newChildNodes.length - 1]!;
      const previousSibling: ChildNode | null = firstChild.previousSibling;
      const nextSibling: ChildNode | null = lastChild.nextSibling;

      const retainRangeStart: (targetNode: HTMLElement) => void = (targetNode: HTMLElement) => {
        if (!isNil(targetNode)) {
          // 如果node内容为空则删除node
          if (isNil(targetNode.textContent?.length) || targetNode.textContent.length === 0) {
            targetNode.remove();
          } else if (
            isElementNode(targetNode) &&
            isElementNode(firstChild) &&
            isEqualClassList((targetNode as HTMLElement).classList, (firstChild as HTMLElement).classList)
          ) {
            // 插入起始标记
            const startMarker: HTMLSpanElement = document.createElement('span');
            startMarker.style.display = 'none';
            (firstChild as HTMLElement).prepend(startMarker);

            // 合并相同classList节点
            (firstChild as HTMLElement).prepend(targetNode!.firstChild!);
            targetNode.remove();

            // 重置range起始位置
            range.setStartBefore(startMarker);

            // 去除标记
            startMarker.remove();
          }
        }
      };

      const retainRangeEnd: (targetNode: HTMLElement) => void = (targetNode: HTMLElement) => {
        if (!isNil(targetNode)) {
          // 如果node内容为空则删除node
          if (isNil(targetNode.textContent?.length) || targetNode.textContent.length === 0) {
            targetNode.remove();
          } else if (
            isElementNode(targetNode) &&
            isElementNode(lastChild) &&
            isEqualClassList((targetNode as HTMLElement).classList, (lastChild as HTMLElement).classList)
          ) {
            // 插入起始标记
            const endMarker: HTMLSpanElement = document.createElement('span');
            endMarker.style.display = 'none';
            (lastChild as HTMLElement).append(endMarker);

            // 合并相同classList节点
            (lastChild as HTMLElement).append(targetNode!.firstChild!);
            targetNode.remove();

            // 重置range起始位置
            range.setEndAfter(endMarker);

            // 去除标记
            endMarker.remove();
          }
        }
      };

      retainRangeStart(previousSibling as HTMLElement);
      retainRangeStart(firstChild.previousSibling as HTMLElement);
      retainRangeEnd(nextSibling as HTMLElement);
      retainRangeEnd(lastChild.nextSibling as HTMLElement);

      // 清理碎片
      parentNode!.normalize();
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
      mteProcess('underline');
    }
  },
  {
    name: '高亮',
    process: () => {
      mteProcess('hignlight');
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

      &.underline {
        text-decoration: underline;
      }

      &.hignlight {
        background-color: yellow;
      }
    }
  }
}
</style>
