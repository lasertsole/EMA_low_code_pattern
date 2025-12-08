import type { ComponentProps } from "@/types/index.ts";

//属性由两部分组成 样式属性 和 其他属性
// 文本组件 的 样式props
export const textStyleProps:ComponentProps = {
    ...commonStyleProps,
    // text
    textAlign: {default: 'left'},
    color:  {default: '#000'},
    textDecoration: {default: 'none'},
    fontFamily: {default: 'initial'},
    fontSize: {default: 'initial'},
    fontWeight: {default: 'initial'},
    lineHeight: {default: 'initial'},
    letterSpacing: {default: 'initial'},
    textIndent: {default: 'initial'},
    textOverflow: {default: 'initial'},
}

// 文本组件 的 非样式属性
export const textNoStyleProps:ComponentProps = {
    text: '正文内容',
}