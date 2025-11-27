import { type ComponentPublicInstance } from 'vue';

// 组件属性 类型
export interface ComponentProps{
    [key: string]: string | number | boolean | null | undefined | ComponentProps;
}

// 组件 类型
export interface Component {
    name: string;
    instance: ComponentPublicInstance;
}

// 更新组件事件 枚举
export enum UPDATE_COMPONENT_ENUM {
  /** 新增 */
  ADD = 1,
  /** 删除 */
  DEL = 2,
  /** 修改 */
  MOD = 4,
  /** 选中 */
  SEL = 8
}
