import { cloneDeep, isNil, isFunction, isEmpty, get } from 'lodash-es';
import {
  type ComponentProps,
  type Component,
  type ComponentPropItem,
  type Value,
  UPDATE_COMPONENT_ENUM,
  isComponentPropItem,
  type ValueProcessor,
  MOD_COMPONENT_EVENT_ENUM
} from '@/types';
import { componentNameToInfoMap } from './addsToCanvas';

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

export function changeCanvasComponents({
  type,
  key,
  event,
  value
}: {
  type: UPDATE_COMPONENT_ENUM;
  key?: string;
  event?: MOD_COMPONENT_EVENT_ENUM;
  value?: Value;
}): void {
  switch (type) {
    case UPDATE_COMPONENT_ENUM.MOD: {
      const targetObj: ComponentPropItem = get(selectedCanvasComponent.value, key!) as ComponentPropItem;
      if (isEmpty(key) || isNil(selectedCanvasComponent.value) || isNil(targetObj) || !isComponentPropItem(targetObj))
        return;

      switch (event) {
        case MOD_COMPONENT_EVENT_ENUM.changeValue: {
          //执行值处理函数
          const valueProcessor: ValueProcessor | undefined = targetObj!.config?.valueProcessor;
          if (isNil(valueProcessor)) {
            targetObj.value = value;
          } else {
            targetObj.value = valueProcessor({
              selectedCanvasComponent: selectedCanvasComponent.value,
              This: targetObj,
              value
            });
          }
          break;
        }
        default: {
          targetObj.value = value;
        }
      }
      break;
    }
  }
}
