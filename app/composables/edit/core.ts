import { type Reactive, type AsyncComponentLoader } from 'vue';
import { isNil, isObject, mapValues } from 'lodash-es';
import { type ComponentProps, type Component } from '@/types';
import { componentNameToInfoMap } from './operate/addsToCanvas';

/** 组件列表 */
export const addcomponents: Reactive<Component[]> = shallowReactive([]);
export const canvasComponents: Reactive<Component[]> = reactive([]);

/** 将组件的 props反转换成默认值props */
export function reverseComponentPropsToDTO(props: ComponentProps | null | undefined): {
  readonly [key: string]: any;
} {
  if (isNil(props)) {
    return {};
  }

  return mapValues(props, item => {
    if (isObject(item) && 'value' in item) {
      return item.value;
    }
    return item;
  });
}

/** 获取添加组件的vue */
const componentCanvasFiles = import.meta.glob('/components/edit/canvas/**/*.vue');
Object.entries(componentCanvasFiles).map(([path, component]) => {
  const tempStr: string = path.replace(/.*\/|\.vue$/g, '');

  if (!isValidComponentNameToInfoMapKey(tempStr)) return;

  const componentName: componentNameToInfoMapKey = tempStr;

  const asynComponents = defineAsyncComponent({
    loader: component as AsyncComponentLoader<globalThis.Component>
  });

  const info: Partial<Component> | undefined = componentNameToInfoMap[componentName];
  if (isNil(info)) return;

  const showName: string = info.showName ?? '';

  addcomponents.push({
    componentName,
    showName,
    instance: markRaw(asynComponents)
  });
});
