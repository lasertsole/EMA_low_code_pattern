import { type ComponentProps, CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM } from '@/types';

//属性由两部分组成 样式属性 和 其他属性
/** 文本组件 的 样式props */
export const rangeStyleProps: ComponentProps = {
  ...commonStyleProps
};

/** 文本组件 的 非样式属性 */
export const rangeDomProps: ComponentProps = {
  min: {
    default: 0,
    type: Number,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE }
  },
  max: {
    default: 10,
    type: Number,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE }
  },
  step: {
    default: 1,
    type: Number,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE }
  },
  value: {
    default: 5,
    type: Number,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE }
  }
};
