<template>
  <select class="fontSelect">
    <!-- <option
      v-for="fontFamily in fontFamilyList"
      :key="fontFamily"
      :style="`font-family: ${fontFamily}`">
      {{ fontFamily }}
    </option> -->
  </select>
</template>

<script lang="ts" setup>
// import type { PropType } from 'vue';

// const props = defineProps({
//   fontFamilyList: Array as PropType<string[]>
// });
</script>

<style lang="scss" scoped>
#mySelect {
  /* 基础样式 */
  width: 200px;
  padding: 10px 15px;
  font-size: 16px;
  line-height: 1.5;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* 圆角 */
  color: #333;
  background-color: #f9f9f9;

  /* 鼠标悬停时的样式变化 */
  cursor: pointer;
}

/* 选项的背景色和文本颜色 */
#mySelect option {
  background-color: white;
  color: #333;
}

/* 聚焦（点击）时的样式，提供用户反馈 */
#mySelect:focus {
  border-color: #007bff;
  outline: none;
  /* 移除浏览器默认的蓝色轮廓 */
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
