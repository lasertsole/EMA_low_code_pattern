import { CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM, isValidCONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM } from '~/types/edit';
import { type AsyncComponentLoader } from 'vue';

/** 配置组件实例映射表 */
export const ConfComponentName_To_ConfComponentInstance_Map: {
  [key in CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM]?: Component;
} = {};
/** 获取添加组件的vue */
const componentCanvasFiles = import.meta.glob('/components/edit/confs/**/*.vue');
Object.entries(componentCanvasFiles).forEach(([path, component]) => {
  const tempStr: string = path.replace(/.*\/|\.vue$/g, '');

  if (!isValidCONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM(tempStr)) return;

  const componentName: CONSTRUCT_TO_CONF_COMPONENT_NAME_ENUM = tempStr;
  const asynComponents = defineAsyncComponent({
    loader: component as AsyncComponentLoader<globalThis.Component>
  });

  ConfComponentName_To_ConfComponentInstance_Map[componentName] = asynComponents;
});
