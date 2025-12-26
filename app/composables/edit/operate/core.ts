import { cloneDeep, isNil, isFunction, isEmpty, get } from 'lodash-es';
import {
  type ComponentProps,
  type Component,
  type ComponentPropItem,
  type Value,
  type ValueProcessor,
  UPDATE_COMPONENT_ENUM,
  isComponentPropItem,
  MOD_COMPONENT_EVENT_ENUM,
  CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM
} from '@/types';
import { componentNameToInfoMap } from './addsToCanvas';
import type { Reactive } from 'vue';

/** 添加组件到画布 */
export function addCanvasComponent(component: Component): void {
  const componentName: string = component.componentName;

  if (!isValidComponentNameToInfoMapKey(componentName)) return;

  const info: Partial<Component> | undefined = componentNameToInfoMap[componentName];

  if (isNil(info?.domProps)) return;

  // 为了修改不影响原info而克隆
  const domProps: Reactive<ComponentProps> = reactive(cloneDeep(info.domProps!));
  const styleProps: Reactive<ComponentProps> = reactive(cloneDeep(info.styleProps) ?? {});

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
  componentType: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM;
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
