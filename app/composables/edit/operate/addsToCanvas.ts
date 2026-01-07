/**组件名字映射 */
export const componentNameToInfoMap = {
  text: {
    showName: '文本',
    domProps: textDomProps,
    styleProps: textStyleProps
  },
  mte: {
    showName: '富文本',
    domProps: textDomProps,
    styleProps: textStyleProps
  },
  range: {
    showName: '滑块',
    domProps: rangeDomProps,
    styleProps: rangeStyleProps
  },
  select: {
    showName: '下拉选项',
    domProps: selectDomProps,
    styleProps: selectStyleProps
  }
};

/**componentNameToInfoMap 的键 */
export type componentNameToInfoMapKey = keyof typeof componentNameToInfoMap;
/**componentNameToInfoMap 的值 */
export type componentNameToInfoMapValue = (typeof componentNameToInfoMap)[keyof typeof componentNameToInfoMap];

/**
 * 验证字符串是否为 componentNameToInfoMap 的合法键名
 * @param {string} key - 待验证的组件名称字符串
 * @returns {key is componentNameToInfoMapKey} 如果是合法的键则返回 true，同时转换类型
 */
export function isValidComponentNameToInfoMapKey(key: string): key is componentNameToInfoMapKey {
  return key in componentNameToInfoMap;
}
