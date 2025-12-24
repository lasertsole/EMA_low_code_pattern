import { MOD_COMPONENT_EVENT_ENUM, UPDATE_COMPONENT_ENUM } from '~/types';

//发送事件
export function sendUpdateEvent({
  emitDom,
  value,
  event = MOD_COMPONENT_EVENT_ENUM.changeValue
}: {
  emitDom: HTMLElement;
  value?: unknown;
  attr?: string;
  event?: MOD_COMPONENT_EVENT_ENUM;
}): void {
  emitDom.dispatchEvent(
    new CustomEvent('componentChange', {
      bubbles: true,
      cancelable: true,
      detail: {
        type: UPDATE_COMPONENT_ENUM.MOD,
        event,
        value: value
      }
    })
  );
}
