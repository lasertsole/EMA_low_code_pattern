import type { Reactive } from 'vue';

export type Value = ComponentPropItemConfigOptionObj | string | number | boolean | Function;

/** 组件名字映射 枚举值 */
export enum CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM {
  MTE = 'mte',
  TEXT = 'text',
  RANGE = 'range',
  SELECT = 'select',
  SWITCH = 'switch'
}

/** 具体属性项值 的 配置选型 的 单位 枚举值 */
export enum COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM {
  PX = 'px',
  EM = 'em',
  REM = 'rem',
  PERCENT = '%',
  DEG = 'deg',
  MS = 'ms',
  S = 's'
}

/** 具体属性项值 的 配置选型 对象类型 */
export interface ComponentPropItemConfigOptionObj {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  unit?: COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM;
  textDom?: HTMLElement;
  /** 数值校验函数 */
  vaildate?: (value: Value) => boolean;
}

/** 具体属性项值 的 配置选型 类型 */
export type ComponentPropItemConfigOption = string | ComponentPropItemConfigOptionObj;

/**
 * 值处理函数
 * @param {Component} Component 所选canvas组件
 * @param {ComponentPropItem} This 属性项自身
 * @param {Value} value 值
 * @returns {Value | undefined} 处理后的值
 */
export type ValueProcessor = ({
  selectedCanvasComponent,
  This,
  value
}: {
  selectedCanvasComponent?: Component;
  readonly This?: ComponentPropItem;
  value?: Value;
}) => Value | undefined;

/**
 * 保存前处理函数
 * @param {ComponentPropItem} This 属性项自身
 * @param {Value} value 值
 * @returns {Value | undefined} 处理后的值
 */
export type SavePreprocessor = ({
  This,
  value
}: {
  readonly This?: ComponentPropItem;
  value?: Value;
}) => Value | undefined;

/** 具体属性项值的配置项 属性 */
export interface ComponentPropItemConfig {
  /** 对应的conf组件 */
  type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM;
  /** 值处理函数 类型 */
  valueProcessor?: ValueProcessor;
  /** 保存前处理函数**/
  savePreprocessor?: SavePreprocessor;
  /** 多选配置项 如单位、演示 */
  readonly options?: ComponentPropItemConfigOption[];
}

/** 具体属性项值 类型 */
export interface ComponentPropItem {
  default: Value;
  value?: Value;
  type: Function;
  disabled: boolean;

  /** 数值校验函数
   * @param {value} 值
   * @returns {boolean} 是否通过校验
   */
  vaildate?: (value: Value) => boolean;

  /**
   * 值改变副作用函数
   * @param {Object} params - 回调参数对象
   * @param {ComponentProps} [params.globalProps] - 全局属性对象
   * @param {Value} [params.value] - 值
   * @returns {void}
   */
  valueChangeSideEffect?: ({ globalProps, value }: { globalProps?: ComponentProps; value?: Value }) => void;
  config: ComponentPropItemConfig;
}

/** 组件类型 */
export interface ComponentProps {
  [key: string]: ComponentPropItem;
}

// 组件 类型
export interface Component {
  showName?: string;
  componentName: string;
  instance: ComponentPublicInstance | globalThis.Component;
  domProps?: Reactive<ComponentProps>;
  styleProps?: Reactive<ComponentProps>;
}

// 更新组件事件 枚举
export enum UPDATE_COMPONENT_ENUM {
  /** 新增 */
  ADD = 'addComponent',
  /** 删除 */
  DEL = 'delComponent',
  /** 修改 */
  MOD = 'modComponent',
  /** 选中 */
  SEL = 'selComponent'
}

// 修改组件具体事件
export enum MOD_COMPONENT_EVENT_ENUM {
  changeValue,
  changeSelectedOption
}
