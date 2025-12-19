import type { ComponentProps } from '@/types/index.ts';
import { v4 as uuidv4 } from 'uuid';

/** 通用样式props */
export const commonStyleProps: ComponentProps = {
  // size
  height: { default: 'auto', configType: 'number' },
  width: { default: 'auto', configType: 'number' },
  maxHeight: { default: 'auto', configType: 'number' },
  maxWidth: { default: 'auto', configType: 'number' },
  minHeight: { default: 'auto', configType: 'number' },
  minWidth: { default: 'auto', configType: 'number' },

  // position
  position: { default: 'static' },
  top: { default: '0px' },
  right: { default: '0px' },
  bottom: { default: '0px' },
  left: { default: '0px' },

  // border
  border: { default: '0px' },
  borderRadius: { default: '0px' },
  borderTop: { default: 'initial' },
  borderRight: { default: 'initial' },
  borderBottom: { default: 'initial' },
  borderLeft: { default: 'initial' },
  borderColor: { default: 'initial' },
  borderWidth: { default: 'initial' },

  // shadow and opacity
  boxShadow: { default: 'initial' },
  opacity: { default: 'initial' },

  // geometric
  backgroundColor: { default: 'initial' },
  overflow: { default: 'visible' }
};

/** 通用非样式props */
export const commonDomProps: ComponentProps = {
  //id
  id: { default: () => uuidv4(), type: String }
};
