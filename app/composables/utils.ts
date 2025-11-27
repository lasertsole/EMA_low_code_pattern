import { h, render } from "vue";

//如果当前环境不是客户端，则返回
if(!import.meta.client) {};

const topLayerDom: HTMLElement|null = document.getElementById("topLayer");
const messageVNode = () => {

  return h('div', {});
};

render(messageVNode, topLayerDom);
