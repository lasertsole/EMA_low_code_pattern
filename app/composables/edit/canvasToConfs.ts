import { isNil } from 'lodash-es';
import { type AsyncComponentLoader } from 'vue';

/** 组件名字映射 */
export const ConstructToConfComponentNameMap = {
  mte: 'mte',
  string: 'text'
};

/** ConstructToConfComponentNameMap 的键 */
export type ConstructToConfComponentNameMappKey = keyof typeof ConstructToConfComponentNameMap;
/** ConstructToConfComponentNameMap 的值 */
export type ConstructToConfComponentNameMapValue =
  (typeof ConstructToConfComponentNameMap)[keyof typeof ConstructToConfComponentNameMap];

/**
 * 验证字符串是否为 ConstructToConfComponentNameMap 的合法键名
 * @param {string} key - 待验证的组件名称字符串
 * @returns {key is ConstructToConfComponentNameMap} 如果是合法的键则返回 true，同时转换类型
 */
export function isValidConstructToConfComponentNameMap(key: string): key is ConstructToConfComponentNameMappKey {
  return key in ConstructToConfComponentNameMap;
}

export const ConfComponentNameToConfComponentInstanceMap: { [key in ConstructToConfComponentNameMapValue]: Component } =
  {};
/** 获取添加组件的vue */
const componentCanvasFiles = import.meta.glob('/components/confs/**/*.vue');
Object.entries(componentCanvasFiles).map(([path, component]) => {
  const tempStr: string = path.replace(/.*\/|\.vue$/g, '');

  if (!isValidConstructToConfComponentNameMap(tempStr)) return;

  const componentName: ConstructToConfComponentNameMappKey = tempStr;

  const asynComponents = defineAsyncComponent({
    loader: component as AsyncComponentLoader<globalThis.Component>
  });

  ConfComponentNameToConfComponentInstanceMap[componentName] = asynComponents;
});
