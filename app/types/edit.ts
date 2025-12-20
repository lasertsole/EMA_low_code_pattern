import { isNil } from 'lodash-es';
import type { ComponentPublicInstance } from 'vue';

/** 具体属性项类型 */
export interface ComponentPropItem {
  default: string | number | boolean | Function;
  type?: Function;
  config: { type: string };
}

/** 具体属性项类型守卫函数 */
export function isComponentPropItem(obj: unknown): obj is ComponentPropItem {
  return (
    typeof obj === 'object' &&
    !isNil(obj) &&
    'default' in obj &&
    'config' in obj &&
    'type' in (obj as ComponentPropItem).config
  );
}

/** 组件属性值类型 */
export type ComponentPropsValue =
  | { default: string; type: string }
  | string
  | number
  | boolean
  | Function
  | ComponentPropItem
  | null
  | undefined;

/** 组件类型 */
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

/** 组件名字映射 */
export enum CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM {
  MTE = 'mte',
  string = 'text'
}

/**
 * 验证字符串是否为 CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM 的合法键名
 * @param {string} key - 待验证的组件名称字符串
 * @returns {key is CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM} 如果是合法的键则返回 true，同时转换类型
 */
export function isValidCONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM(
  key: string
): key is CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM {
  return key in CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM;
}
