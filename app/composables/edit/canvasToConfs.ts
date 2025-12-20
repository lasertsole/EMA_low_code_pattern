import { CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM, isValidCONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM } from '~/types/edit';
import { type AsyncComponentLoader } from 'vue';

/** 配置组件实例映射表 */
export const ConfComponentNameToConfComponentInstanceMap: {
  [key in CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM]?: Component;
} = {};
/** 获取添加组件的vue */
const componentCanvasFiles = import.meta.glob('/components/confs/**/*.vue');
Object.entries(componentCanvasFiles).map(([path, component]) => {
  const tempStr: string = path.replace(/.*\/|\.vue$/g, '');

  if (!isValidCONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM(tempStr)) return;

  const componentName: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM = tempStr;

  const asynComponents = defineAsyncComponent({
    loader: component as AsyncComponentLoader<globalThis.Component>
  });

  ConfComponentNameToConfComponentInstanceMap[componentName] = asynComponents;
});
