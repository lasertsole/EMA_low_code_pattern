import type { ComponentProps } from "@/types/index.ts";

//属性由两部分组成 样式属性 和 其他属性
// 文本组件 的 样式props
export const rangeStyleProps:ComponentProps = {
    ...commonStyleProps,
}

// 文本组件 的 非样式属性
export const rangeNoStyleProps:ComponentProps = {
    min: {default: 0},
    max: {default: 10},
    step: {default: 1},
    value: {default: 5},
}