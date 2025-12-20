import type { ComponentProps } from '@/types/index.ts';
import { v4 as uuidv4 } from 'uuid';

/** 通用样式props */
export const commonStyleProps: ComponentProps = {
  // size
  height: { default: 'auto', config: { type: 'number' } },
  width: { default: 'auto', config: { type: 'number' } },
  maxHeight: { default: 'auto', config: { type: 'number' } },
  maxWidth: { default: 'auto', config: { type: 'number' } },
  minHeight: { default: 'auto', config: { type: 'number' } },
  minWidth: { default: 'auto', config: { type: 'number' } },

  // position
  position: { default: 'static', config: { type: 'select' } },
  top: { default: '0px', config: { type: 'range' } },
  right: { default: '0px', config: { type: 'range' } },
  bottom: { default: '0px', config: { type: 'range' } },
  left: { default: '0px', config: { type: 'range' } },

  // border
  border: { default: '0px', config: { type: 'range' } },
  borderRadius: { default: '0px', config: { type: 'range' } },
  borderTop: { default: 'initial', config: { type: 'range' } },
  borderRight: { default: 'initial', config: { type: 'range' } },
  borderBottom: { default: 'initial', config: { type: 'range' } },
  borderLeft: { default: 'initial', config: { type: 'range' } },
  borderColor: { default: 'initial', config: { type: 'text' } },
  borderWidth: { default: 'initial', config: { type: 'text' } },

  // shadow and opacity
  boxShadow: { default: 'initial', config: { type: 'text' } },
  opacity: { default: 'initial', config: { type: 'range' } },

  // geometric
  backgroundColor: { default: 'initial', config: { type: 'text' } },
  overflow: { default: 'visible', config: { type: 'select' } }
};

/** 通用非样式props */
export const commonDomProps: ComponentProps = {
  //id
  id: { default: () => uuidv4(), type: String, config: { type: 'text' } }
};
