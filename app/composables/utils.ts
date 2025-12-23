import { h, render } from 'vue';

//如果当前环境不是客户端，则返回
if (import.meta.client) {
  const topLayerDom: HTMLElement | null = document.getElementById('topLayer');

  // 确保找到了目标 DOM 元素
  if (topLayerDom) {
    const messageVNode = h('div', { class: 'message-container' }, 'Hello Async Message');

    // 正确调用 render 函数：第一个参数是 VNode 实例（调用函数获取），第二个参数是容器
    render(messageVNode, topLayerDom);
  } else {
    console.error("无法找到 ID 为 'topLayer' 的 DOM 元素。");
  }
}
