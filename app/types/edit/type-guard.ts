import { isNil } from 'lodash-es';
import { CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM } from './type';
import type { ComponentPropItem } from './type';

/** 是否是 具体属性项值类型 的判断函数*/
export function isComponentPropItemObj(obj: unknown): obj is ComponentPropItem {
  return (
    typeof obj === 'object' &&
    !isNil(obj) &&
    'default' in obj &&
    'config' in obj &&
    'type' in (obj as ComponentPropItem).config
  );
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

/**
 * 验证字符串是否为 CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM 的合法键名
 * @param {string} key - 待验证的组件名称字符串
 * @returns {key is CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM} 如果是合法的键则返回 true，同时转换类型
 */
export function isValidCONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM(
  key: string
): key is CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM {
  return Object.values(CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM).includes(key as CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM);
}
