import {
  CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM,
  COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM,
  type ComponentProps
} from '@/types';
import { isEmpty, isNil } from 'lodash-es';
import { cloneDeep } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';

/** 通用样式props */
export const commonStyleProps: ComponentProps = {
  // size
  height: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },
  width: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },
  maxHeight: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },
  maxWidth: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },
  minHeight: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },
  minWidth: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },

  // position
  position: {
    default: '',
    type: String,
    disabled: false,
    valueChangeSideEffect({ globalProps, newVal }) {
      const disabled: boolean = newVal === 'static';
      if (!isNil(globalProps?.['top']?.disabled)) {
        globalProps['top'].disabled = disabled;
      }
      if (!isNil(globalProps?.['right']?.disabled)) {
        globalProps['right'].disabled = disabled;
      }
      if (!isNil(globalProps?.['bottom']?.disabled)) {
        globalProps['bottom'].disabled = disabled;
      }
      if (!isNil(globalProps?.['left']?.disabled)) {
        globalProps['left'].disabled = disabled;
      }
    },
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.SELECT,
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky']
    }
  },
  top: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },
  right: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },
  bottom: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },
  left: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },

  // border
  borderRadius: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },
  borderStyle: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.SELECT,
      options: ['solid', 'dashed', 'dotted']
    }
  },
  borderColor: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'initial',
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },
  borderWidth: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'initial',
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },

  // shadow and opacity
  boxShadow: {
    default: '',
    disabled: false,
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.TEXT
    }
  },
  opacity: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'initial',
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM]),
        cloneDeep(componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM])
      ]
    }
  },

  // geometric
  backgroundColor: {
    default: '',
    type: String,
    disabled: false,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.TEXT,
      options: ['initial', 'red', 'yellow', 'blue', 'green', 'pink']
    }
  },
  overflow: {
    default: '',
    type: String,
    disabled: false,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.SELECT, options: ['visible', 'hidden'] }
  }
};

// 初始化commonStyleProps
for (const value of Object.values(commonStyleProps)) {
  if (isEmpty(value.default) && !isEmpty(value.config.options)) {
    value.default = value.config.options![0]!;
  }
}

/** 通用非样式props */
export const commonDomProps: ComponentProps = {
  //id
  id: {
    default: () => uuidv4(),
    type: String,
    disabled: false,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.TEXT }
  }
};
