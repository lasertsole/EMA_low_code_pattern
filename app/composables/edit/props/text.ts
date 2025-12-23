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
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: ['left', 'center', 'right']
    }
  },
  color: {
    default: '#000',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.TEXT,
      options: ['initial', 'red', 'yellow', 'blue', 'green', 'pink']
    }
  },
  textDecoration: {
    default: 'none',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.SELECT,
      options: ['none', 'underline', 'overline', 'line-through', 'initial', 'inherit']
    }
  },
  fontFamily: {
    default: 'initial',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.SELECT,
      options: ['initial', 'Arial', 'sans-serif', 'serif', 'monospace']
    }
  },
  fontSize: {
    default: 'initial',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'initial',
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  fontWeight: {
    default: 'initial',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'initial',
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  lineHeight: {
    default: 'initial',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'initial',
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  letterSpacing: {
    default: 'initial',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'initial',
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  textIndent: {
    default: 'initial',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'initial',
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  textOverflow: {
    default: 'initial',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.SELECT,
      options: ['initial', 'clip', 'ellipsis', 'initial', 'none']
    }
  }
};

/** 文本组件 的 非样式属性 */
export const textDomProps: ComponentProps = {
  ...commonDomProps,
  value: {
    default: '',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.MTE
    }
  },
  readonly: {
    default: false,
    type: Boolean,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.TEXT }
  },
  placeholder: {
    default: '请输入内容',
    type: String,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.TEXT }
  }
};
