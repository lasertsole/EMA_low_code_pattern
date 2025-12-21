import { isNil } from 'lodash-es';
import type { ComponentPublicInstance } from 'vue';

export type DefaultValue = string | number | boolean | Function;

/** 具体属性项值类型 */
export interface ComponentPropItemValueObj {
  default: DefaultValue;
  type?: Function;
  config: { type: string };
}

/** 是否是 具体属性项值类型 的判断函数*/
export function isComponentPropItemValueObj(obj: unknown): obj is ComponentPropItemValueObj {
  return (
    typeof obj === 'object' &&
    !isNil(obj) &&
    'default' in obj &&
    'config' in obj &&
    'type' in (obj as ComponentPropItemValueObj).config
  );
}

/** 具体属性项值类型 */
export type ComponentPropItemValue = DefaultValue | ComponentPropItemValueObj;

/** 具体属性项类型守卫函数 */
export function isComponentPropItemValue(obj: unknown): obj is ComponentPropItemValue {
  return (
    typeof obj === 'object' &&
    !isNil(obj) &&
    'default' in obj &&
    'config' in obj &&
    'type' in (obj as ComponentPropItemValueObj).config
  );
}

/** 组件类型 */
export interface ComponentProps {
  [key: string]: ComponentPropItemValue;
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
