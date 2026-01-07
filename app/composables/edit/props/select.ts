import { type ComponentProps, CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM } from '@/types';

/** 文本组件 的 样式props */
export const selectStyleProps: ComponentProps = {
  ...commonStyleProps
};

export const selectDomProps: ComponentProps = {
  ...commonDomProps,
  options: {
    default: [],
    type: Array,
    disabled: false,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.KEYVALUELIST }
  }
};
