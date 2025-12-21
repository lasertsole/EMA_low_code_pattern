import type { ComponentProps } from '@/types/index.ts';

//属性由两部分组成 样式属性 和 其他属性
/** 文本组件 的 样式props */
export const textStyleProps: ComponentProps = {
  ...commonStyleProps,
  // text
  textAlign: { default: 'left', config: { type: 'select' } },
  color: { default: '#000', config: { type: 'text' } },
  textDecoration: { default: 'none', config: { type: 'select' } },
  fontFamily: { default: 'initial', config: { type: 'select' } },
  fontSize: { default: 'initial', config: { type: 'range' } },
  fontWeight: { default: 'initial', config: { type: 'range' } },
  lineHeight: { default: 'initial', config: { type: 'range' } },
  letterSpacing: { default: 'initial', config: { type: 'range' } },
  textIndent: { default: 'initial', config: { type: 'range' } },
  textOverflow: { default: 'initial', config: { type: 'select' } }
};

/** 文本组件 的 非样式属性 */
export const textDomProps: ComponentProps = {
  ...commonDomProps,
  value: { default: '', config: { type: 'MTE' } },
  readonly: { default: false, config: { type: 'MTE' } },
  placeholder: { default: '请输入内容', config: { type: 'MTE' } }
};
