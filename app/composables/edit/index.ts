import { type Reactive, type AsyncComponentLoader } from 'vue';
import { cloneDeep, isNil, isObject, isFunction, mapValues, isEmpty } from 'lodash-es';
import { type ComponentProps, type Component, type ComponentPropItem } from '@/types/index';
import { componentNameToInfoMap } from './addsToCanvas';

/** 组件列表 */
export const addcomponents: Reactive<Component[]> = shallowReactive([]);
export const canvasComponents: Reactive<Component[]> = shallowReactive([]);

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
const componentCanvasFiles = import.meta.glob('/components/canvas/**/*.vue');
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
    instance: asynComponents
  });
});

/** 添加组件到画布 */
export function addCanvasComponent(component: Component): void {
  const tempStr: string = component.componentName;

  if (!isValidComponentNameToInfoMapKey(tempStr)) return;

  const componentName: componentNameToInfoMapKey = tempStr;

  const info: Partial<Component> | undefined = componentNameToInfoMap[componentName];

  if (isNil(info?.domProps)) return;

  // 为了修改不影响原info而克隆
  const domProps: ComponentProps = cloneDeep(info.domProps!);
  const styleProps: ComponentProps = cloneDeep(info.styleProps) ?? {};

  const id: ComponentPropItem = domProps.id as ComponentPropItem;

  if (!isNil(id?.default) && isFunction(id.default)) {
    domProps.id = { ...id, default: id.default() };
  }

  Object.values(domProps).map(item => {
    if (isEmpty(item.value)) {
      item.value = item.default;
    }
    return item;
  });

  Object.values(styleProps).map(item => {
    if (isEmpty(item.value)) {
      item.value = item.default;
    }
    return item;
  });

  canvasComponents.push({ domProps, styleProps, ...component });
}

/** 选中组件 */
export const selectedCanvasComponent: Ref<Component | undefined> = ref();
export function selectCanvasComponent(component: Component): void {
  selectedCanvasComponent.value = component;
}
