export type DefaultValue = string | number | boolean | Function;

/** 具体属性项值类型 */
export interface ComponentPropItemObj {
  default: DefaultValue;
  type?: Function;
  config: { type: string };
}

/** 具体属性项值类型 */
export type ComponentPropItem = DefaultValue | ComponentPropItemObj;

/** 组件类型 */
export interface ComponentProps {
  [key: string]: ComponentPropItem;
}

// 组件 类型
export interface Component {
  showName?: string;
  componentName: string;
  instance: ComponentPublicInstance | globalThis.Component;
  domProps?: ComponentProps;
  styleProps?: ComponentProps;
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

/** 组件名字映射 */
export enum CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM {
  MTE = 'mte',
  string = 'text'
}
