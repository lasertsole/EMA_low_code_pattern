import { COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM, type ComponentPropItemConfigOption } from '@/types';

/** 组件属性项配置项单位枚举对象 */
export const componentPropItemConfigOptionUnit_To_obj_map: {
  [key in COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM]: ComponentPropItemConfigOption;
} = {
  [COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]: {
    min: 0,
    max: window?.screen?.width ?? Number.MAX_SAFE_INTEGER,
    step: 1,
    value: 0,
    unit: COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX
  },
  [COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]: {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    unit: COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT
  },
  [COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]: {
    min: 0,
    max: (window?.screen?.width ?? Number.MAX_SAFE_INTEGER) / 16,
    step: 1,
    value: 0,
    unit: COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM
  },
  [COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]: {
    min: 0,
    max: (window?.screen?.width ?? Number.MAX_SAFE_INTEGER) / 16,
    step: 1,
    value: 0,
    unit: COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM
  },
  [COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.DEG]: {
    min: -360,
    max: 360,
    step: 1,
    value: 0,
    unit: COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.DEG
  },
  [COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.MS]: {
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    value: 0,
    unit: COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.MS
  },
  [COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.S]: {
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    value: 0,
    unit: COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.S
  }
};
