import { type Reactive, type AsyncComponentLoader } from 'vue';
import { cloneDeep, isNil, isObject, isFunction, mapValues, isEmpty, get } from 'lodash-es';
import {
  type ComponentProps,
  type Component,
  type ComponentPropItem,
  type Value,
  UPDATE_COMPONENT_ENUM,
  isComponentPropItem
} from '@/types';
import { componentNameToInfoMap } from './addsToCanvas';

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
      if (isNil(item.config?.valueProcessor)) {
        item.value = item.default;
      } else {
        item.value = item.config.valueProcessor({
          selectedCanvasComponent: selectedCanvasComponent.value,
          This: item,
          value: item.default
        });
      }
    }
    return item;
  });

  Object.values(styleProps).map(item => {
    if (isEmpty(item.value)) {
      if (isNil(item.config?.valueProcessor)) {
        item.value = item.default;
      } else {
        item.value = item.config.valueProcessor({
          selectedCanvasComponent: selectedCanvasComponent.value,
          This: item,
          value: item.default
        });
      }
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

export function changeCanvasComponents(type: UPDATE_COMPONENT_ENUM, key?: string, value?: Value): void {
  switch (type) {
    case UPDATE_COMPONENT_ENUM.MOD: {
      const targetObj: ComponentPropItem = get(selectedCanvasComponent.value, key!) as ComponentPropItem;
      if (isEmpty(key) || isNil(selectedCanvasComponent.value) || isNil(targetObj) || !isComponentPropItem(targetObj))
        return;

      //执行值处理函数
      if (isNil(targetObj!.config?.valueProcessor)) {
        targetObj.value = value;
      } else {
        targetObj.value = targetObj.config.valueProcessor({
          selectedCanvasComponent: selectedCanvasComponent.value,
          This: targetObj,
          value
        });
      }

      break;
    }
  }
}
