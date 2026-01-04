<template>
  <div class="editor">
    <div class="adds">
      <div class="title">{{ '组件添加' }}</div>
      <div class="list">
        <template
          v-for="item in addcomponents"
          :key="item.componentName">
          <div
            @click.stop="addCanvasComponent(item)"
            class="component">
            {{ item.showName }}
          </div>
        </template>
      </div>
    </div>

    <div class="canvas">
      <div class="title">{{ '画布' }}</div>
      <div
        class="list"
        ref="canvasList">
        <TransitionGroup name="fade">
          <template
            v-for="component in canvasComponents"
            :key="(component.domProps?.id ?? '') as string">
            <EditCanvasWrapper
              :class="{ selected: toRaw(component) === toRaw(selectedCanvasComponent) }"
              @click.stop="selectCanvasComponent(component)">
              <template #default="slotProps">
                <component
                  :is="component.instance"
                  :wrapper="slotProps.wrapper"
                  :styleProps="component.styleProps"
                  :domProps="component.domProps"></component>
              </template>
            </EditCanvasWrapper>
          </template>
        </TransitionGroup>
      </div>
    </div>

    <div class="configs">
      <div class="title">{{ '属性栏' }}</div>
      <div
        class="list"
        v-if="!isEmpty(selectedCanvasComponent?.domProps?.id?.default)">
        <div
          class="sub-configs"
          v-if="!isNil(selectedCanvasComponent?.domProps)">
          <div class="title">{{ '元素属性' }}</div>
          <div class="list">
            <template
              v-for="item in Object.entries(selectedCanvasComponent.domProps)"
              :key="selectedCanvasComponent.domProps.id!.default + item[0]">
              <EditConfigItem
                :title="item[0]"
                :value="item[1] as ComponentPropItem">
              </EditConfigItem>
            </template>
          </div>
        </div>
        <div
          class="sub-configs"
          v-if="!isNil(selectedCanvasComponent?.styleProps)">
          <div class="title">{{ '样式属性' }}</div>
          <div class="list">
            <template
              v-for="item in Object.entries(selectedCanvasComponent.styleProps)"
              :key="selectedCanvasComponent.domProps!.id!.default + item[0]">
              <EditConfigItem
                :title="item[0]"
                :value="item[1] as ComponentPropItem">
              </EditConfigItem>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isEmpty, isNil } from 'lodash-es';
import type { ShallowRef } from 'vue';
import { type ComponentPropItem } from '~/types';

//将canvasList挂载到全局canvasListDom上
const canvasList: ShallowRef = useTemplateRef('canvasList');
onMounted(() => {
  canvasListDom.value = canvasList.value;
});
</script>

<style lang="scss" scoped>
.editor {
  @include fullInParent();
  display: flex;
  justify-content: space-between;
  align-items: center;

  > * {
    height: 100%;
    background-color: white;

    > .title {
      display: grid;
      grid-column: 1 / -1;
      height: fit-content;
      justify-content: center;
      align-items: center;
      height: 50px;
      flex-shrink: 0;
    }
  }

  .list {
    overflow-y: auto;
  }

  > .adds {
    @include fixedWidth(25%);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    grid-auto-rows: max-content;

    > .title {
      background-color: #ffa0a0;
    }

    > .list {
      display: grid;
      grid-column: 1/-1;
      grid-template-columns: subgrid;

      > .component {
        width: auto;
        aspect-ratio: 1 / 1;
        @include flexCenter;
        border: 1px solid var(--theme-color);
        color: var(--theme-color);
        border-radius: 1rem;
        cursor: pointer;
      }
    }
  }

  > .canvas {
    @include fixedWidth(50%);
    display: flex;
    flex-direction: column;

    > .title {
      background-color: #fff5a0;
    }

    > .list {
      flex-grow: 1;
      width: 100%;
      overflow: auto;

      > .fade-enter-active,
      > .fade-leave-active {
        will-change: opacity;
        transition-property: opacity;
        transition-duration: 0.3s;
        transition-timing-function: ease;
      }

      > .fade-enter-from,
      > .fade-leave-to {
        opacity: 0;
      }

      > .fade-enter-to,
      > .fade-leave-from {
        opacity: 1;
        height: auto;
      }
    }
  }

  > .configs {
    @include fixedWidth(25%);
    display: flex;
    border-radius: 1rem;
    flex-direction: column;

    > .title {
      background-color: #a0ffff;
    }
    > .list {
      position: relative;
      overflow-y: auto;
      > .sub-configs {
        display: flex;
        flex-direction: column;
        &:not(:first-of-type) {
          margin-top: 1rem;
        }

        > .title {
          @include flexCenter;
          padding: 0.5rem;
        }

        > .list {
          display: grid;
          grid-template-columns: minmax(3rem, 1fr) 3fr;

          > .configItem {
            &:not(:first-of-type) {
              margin-top: 1rem;
            }
            display: grid;
            grid-template-columns: subgrid;
            grid-column: span 2;
            > .name {
              @include flexCenter;
              margin-right: 1rem;
              word-break: break-all;
            }
          }
        }
      }
    }
  }
}
</style>
