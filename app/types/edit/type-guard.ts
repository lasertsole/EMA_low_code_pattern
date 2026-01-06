import { isFunction, isNil, isNumber, isObject, isString } from 'lodash-es';
import { CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM, COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM } from './type';
import type { ComponentPropItem, ComponentPropItemConfigOptionObj } from './type';

/**
 * 具体属性项类型守卫函数
 * @param {unknown} obj - 待验证的对象
 * @returns {obj is ComponentPropItem} 如果对象是ComponentPropItem类型则返回 true，同时转换类型
 */
export function isComponentPropItem(obj: unknown): obj is ComponentPropItem {
  return (
    !isNil(obj) && isObject(obj) && 'default' in obj && 'config' in obj && 'type' in (obj as ComponentPropItem).config
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

/**
 * 验证字符串是否为 COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM 的合法键名
 * @param {string} key - 待验证的组件名称字符串
 * @returns {key is COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM} 如果是合法的键则返回 true，同时转换类型
 */
export function isValidCOMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM(
  key: string
): key is COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM {
  return Object.values(COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM).includes(
    key as COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM
  );
}

/**
 * 具体属性项类型守卫函数
 * @param {unknown} obj - 待验证的对象
 * @returns {obj is ComponentPropItemConfigOptionObj} 如果对象是ComponentPropItemConfigOptionObj类型则返回 true，同时转换类型
 */
export function isComponentPropItemConfigOptionObj(obj: unknown): obj is ComponentPropItemConfigOptionObj {
  return (
    !isNil(obj) &&
    isObject(obj) &&
    (isNil((obj as ComponentPropItemConfigOptionObj).min)
      ? true
      : isNumber((obj as ComponentPropItemConfigOptionObj).min)) &&
    (isNil((obj as ComponentPropItemConfigOptionObj).max)
      ? true
      : isNumber((obj as ComponentPropItemConfigOptionObj).max)) &&
    (isNil((obj as ComponentPropItemConfigOptionObj).step)
      ? true
      : isNumber((obj as ComponentPropItemConfigOptionObj).step)) &&
    (isNil((obj as ComponentPropItemConfigOptionObj).value)
      ? true
      : isNumber((obj as ComponentPropItemConfigOptionObj).value)) &&
    (isNil((obj as ComponentPropItemConfigOptionObj).unit)
      ? true
      : isString((obj as ComponentPropItemConfigOptionObj).unit) &&
        isValidCOMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM((obj as ComponentPropItemConfigOptionObj).unit as string)) &&
    (isNil((obj as ComponentPropItemConfigOptionObj).textDom)
      ? true
      : (obj as ComponentPropItemConfigOptionObj).textDom instanceof HTMLElement) &&
    (isNil((obj as ComponentPropItemConfigOptionObj).vaildate)
      ? true
      : isFunction((obj as ComponentPropItemConfigOptionObj).vaildate))
  );
}
