import { type ComponentProps, CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM } from '@/types';
import { isNumber } from 'lodash-es';

//属性由两部分组成 样式属性 和 其他属性
/** 文本组件 的 样式props */
export const rangeStyleProps: ComponentProps = {
  ...commonStyleProps
};

/** 文本组件 的 非样式属性 */
export const rangeDomProps: ComponentProps = {
  ...commonDomProps,
  min: {
    default: 0,
    type: Number,
    disabled: false,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.NUMBER },
    // 校验函数，如果min大于max，则校验失败
    vaildate({ globalProps, newVal }) {
      if (isNumber(newVal) && isNumber(globalProps?.['max']?.value) && newVal > globalProps['max'].value) {
        return false;
      }

      return true;
    },
    // 副作用函数,如果min大于value，则value=min
    valueChangeSideEffect({ globalProps, newVal }) {
      if (!isNumber(newVal)) return;

      // 改变value
      if (isNumber(globalProps?.['value']?.value) && newVal > globalProps['value'].value) {
        globalProps['value'].value = newVal;
      }

      // 改变step
      if (
        isNumber(globalProps?.['step']?.value) &&
        isNumber(globalProps?.['max']?.value) &&
        globalProps['step'].value > globalProps['max'].value - newVal &&
        globalProps['max'].value - newVal >= 1
      ) {
        globalProps['step'].value = globalProps['max'].value - newVal;
      }
    }
  },
  max: {
    default: 10,
    type: Number,
    disabled: false,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.NUMBER },
    // 校验函数，如果min大于max，则校验失败
    vaildate({ globalProps, newVal }) {
      if (isNumber(newVal) && isNumber(globalProps?.['min']?.value) && newVal < globalProps['min'].value) {
        return false;
      }

      return true;
    },
    // 副作用函数,如果min大于value，则value=min
    valueChangeSideEffect({ globalProps, newVal }) {
      if (!isNumber(newVal)) return;

      // 改变value
      if (isNumber(globalProps?.['value']?.value) && newVal < globalProps['value'].value) {
        globalProps['value'].value = newVal;
      }

      // 改变step
      if (
        isNumber(globalProps?.['step']?.value) &&
        isNumber(globalProps?.['min']?.value) &&
        globalProps['step'].value > newVal - globalProps['min'].value &&
        newVal - globalProps['min'].value >= 1
      ) {
        globalProps['step'].value = newVal - globalProps['min'].value;
      }
    }
  },
  step: {
    default: 1,
    type: Number,
    disabled: false,
    vaildate({ globalProps, newVal }) {
      if (!isNumber(newVal)) return false;

      if (
        newVal < 1 ||
        (isNumber(globalProps?.['min']?.value) &&
          isNumber(globalProps?.['max']?.value) &&
          newVal > globalProps['max'].value - globalProps['min'].value)
      ) {
        return false;
      }

      return true;
    },
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.NUMBER }
  },
  value: {
    default: 5,
    type: Number,
    disabled: false,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.NUMBER },
    vaildate({ globalProps, newVal }) {
      if (!isNumber(newVal)) return false;

      if (isNumber(globalProps?.['min']?.value) && newVal < globalProps['min'].value) {
        return false;
      }

      if (isNumber(globalProps?.['max']?.value) && newVal > globalProps['max'].value) {
        return false;
      }

      return true;
    }
  }
};
