import type { ComponentProps } from '@/types/index.ts';

//属性由两部分组成 样式属性 和 其他属性
/** 文本组件 的 样式props */
export const rangeStyleProps: ComponentProps = {
  ...commonStyleProps
};

/** 文本组件 的 非样式属性 */
export const rangeDomProps: ComponentProps = {
  min: { default: 0, config: { type: 'number' } },
  max: { default: 10, config: { type: 'number' } },
  step: { default: 1, config: { type: 'number' } },
  value: { default: 5, config: { type: 'number' } }
};
