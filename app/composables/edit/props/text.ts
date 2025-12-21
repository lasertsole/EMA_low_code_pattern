import {
  type ComponentProps,
  CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM,
  COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM
} from '@/types';

//属性由两部分组成 样式属性 和 其他属性
/** 文本组件 的 样式props */
export const textStyleProps: ComponentProps = {
  ...commonStyleProps,
  // text
  textAlign: {
    default: 'left',
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  color: { default: '#000', config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.TEXT } },
  textDecoration: {
    default: 'none',
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.SELECT,
      options: ['none', 'underline', 'overline', 'line-through', 'initial', 'inherit']
    }
  },
  fontFamily: {
    default: 'initial',
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.SELECT,
      options: ['Arial', 'sans-serif', 'serif', 'monospace']
    }
  },
  fontSize: {
    default: 'initial',
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  fontWeight: {
    default: 'initial',
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  lineHeight: {
    default: 'initial',
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  letterSpacing: {
    default: 'initial',
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  textIndent: {
    default: 'initial',
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  textOverflow: {
    default: 'initial',
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.SELECT, options: ['clip', 'ellipsis', 'initial', 'none'] }
  }
};

/** 文本组件 的 非样式属性 */
export const textDomProps: ComponentProps = {
  ...commonDomProps,
  value: { default: '', config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.MTE } },
  readonly: { default: false, config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.MTE } },
  placeholder: { default: '请输入内容', config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.MTE } }
};
