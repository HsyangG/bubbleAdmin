<template>
  <li class="item">
    <input v-model="checked" type="checkbox">
    <!-- 将值传递给父组件 -->
    <slot name="item" :checked="checked"></slot>
  </li>
</template>
<script>
export default {
  data() {
    return {
      checked: false
    };
  }
};
</script>
