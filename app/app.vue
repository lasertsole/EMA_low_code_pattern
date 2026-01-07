<template>
  <div class="app">
    <div id="topLayer"></div>
    <div id="contentLayer">
      <NuxtLayout>
        <NuxtPage keepalive />
      </NuxtLayout>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  position: relative;

  @include fullViewWindow;
  #topLayer {
    position: absolute;
    top: 0px;
    left: 0px;
    @include fullInParent;
    z-index: 2;
    background-color: transparent !important;
    pointer-events: none;
  }

  #contentLayer {
    position: relative;
    @include fullInParent;
    z-index: 1;

    .page-enter-active,
    .page-leave-active {
      transition: all 0.4s;
    }

    .page-enter-from,
    .page-leave-to {
      opacity: 0;
      filter: blur(1rem);
    }
  }
}
</style>
