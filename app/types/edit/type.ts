export type Value = string | number | boolean | Function;

/** 组件名字映射 枚举值 */
export enum CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM {
  MTE = 'mte',
  TEXT = 'text',
  RANGE = 'range',
  SELECT = 'select'
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

/** 具体属性项值 的 配置选型 类型 */
export interface ComponentPropItemConfigOption {
  min?: number;
  max?: number;
  unit?: COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM;
  textDom?: HTMLElement;
  vaildate?: (value: Value) => boolean;
}

/** 具体属性项值的配置项 属性 */
export interface ComponentPropItemConfig {
  /** 对应的conf组件 */
  type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM;
  /**
   * 值处理函数
   * @param Component 所选canvas组件
   * @param This 属性项自身
   * @param value 值
   * @returns 处理后的值
   */
  valueProcessor?: ({
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
   * @param This 属性项自身
   * @param value 值
   * @returns 处理后的值
   */
  savePreprocessor?: ({ This, value }: { readonly This?: ComponentPropItem; value?: Value }) => Value | undefined;
  /** 多选配置项 如单位、演示 */
  readonly options?: (string | ComponentPropItemConfigOption)[];
  /** 已选配置项 */
  selectedOption?: string | ComponentPropItemConfigOption;
  /**
   * 后置选项选择处理函数
   * @param This 属性项自身
   * @param selectedOption 已选配置项的值
   */
  optionSelectedPostprocessor?: ({
    This,
    selectedOption
  }: {
    This?: ComponentPropItem;
    selectedOption: string | ComponentPropItemConfigOption;
  }) => void;
}

/** 具体属性项值 类型 */
export interface ComponentPropItem {
  default: Value;
  value?: Value;
  type: Function;
  /** 数值校验函数 */
  vaildate?: (value: Value) => boolean;
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
  domProps?: ComponentProps;
  styleProps?: ComponentProps;
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
