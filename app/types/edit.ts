import type { ComponentPublicInstance } from 'vue';

export type ComponentPropsValue =
  | { default: string; type: string }
  | string
  | number
  | boolean
  | Function
  | ComponentProps
  | null
  | undefined;
// 组件属性 类型
export interface ComponentProps {
  [key: string]: ComponentPropsValue;
}

export interface StyleProps {
  [key: string]: string;
}

// 组件 类型
export interface Component {
  showName?: string;
  componentName: string;
  instance: ComponentPublicInstance | globalThis.Component;
  domProps?: ComponentProps;
  styleProps?: ComponentProps;
}

// 更新组件事件 枚举
export enum UPDATE_COMPONENT_ENUM {
  /** 新增 */
  ADD = 1,
  /** 删除 */
  DEL = 2,
  /** 修改 */
  MOD = 4,
  /** 选中 */
  SEL = 8
}
