import {
  CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM,
  COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM,
  type ComponentProps
} from '@/types';
import { v4 as uuidv4 } from 'uuid';

/** 通用样式props */
export const commonStyleProps: ComponentProps = {
  // size
  height: {
    default: 'auto',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  width: {
    default: 'auto',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  maxHeight: {
    default: 'auto',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  maxWidth: {
    default: 'auto',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  minHeight: {
    default: 'auto',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  minWidth: {
    default: 'auto',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        'auto',
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },

  // position
  position: {
    default: 'static',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.SELECT,
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky']
    }
  },
  top: {
    default: '0px',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  right: {
    default: '0px',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  bottom: {
    default: '0px',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  left: {
    default: '0px',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },

  // border
  border: {
    default: '0px',
    type: String,
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
  borderRadius: {
    default: '0px',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.RANGE,
      options: [
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PX],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.PERCENT],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.EM],
        componentPropItemConfigOptionUnit_To_obj_map[COMPONENT_PROP_ITEM_CONFIG_OPTION_UNIT_EUM.REM]
      ]
    }
  },
  borderTop: {
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
  borderRight: {
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
  borderBottom: {
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
  borderLeft: {
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
  borderColor: {
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
  borderWidth: {
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

  // shadow and opacity
  boxShadow: {
    default: 'initial',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.TEXT
    }
  },
  opacity: {
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

  // geometric
  backgroundColor: {
    default: 'initial',
    type: String,
    config: {
      type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.TEXT,
      options: ['initial', 'red', 'yellow', 'blue', 'green', 'pink']
    }
  },
  overflow: {
    default: 'visible',
    type: String,
    config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.SELECT, options: ['visible', 'hidden'] }
  }
};

/** 通用非样式props */
export const commonDomProps: ComponentProps = {
  //id
  id: { default: () => uuidv4(), type: String, config: { type: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM.TEXT } }
};
