<template>
  <div class="header">
    <a-dropdown>
      <!-- <a class="ant-dropdown-link" href="#">
        Hover me <a-icon type="down" />
      </a> -->
      <a-icon type="global"></a-icon>
      <a-menu slot="overlay" @click="localeChange" :selectedKeys="locale">
        <a-menu-item key="zhCN">
          <!-- <a href="javascript:;">1st menu item</a> -->
          中文
        </a-menu-item>
        <a-menu-item key="enUS">
          <!-- <a href="javascript:;">2nd menu item</a> -->
          English
        </a-menu-item>
        <!-- <a-menu-item>
          <a href="javascript:;">3rd menu item</a>
        </a-menu-item> -->
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    locale() {
      return [this.$route.query.locale] || ['zhCN']
    }
  },
  methods: {
    localeChange ({key}) {
      // 将选中的结果保存到$route.query中
      this.$router.push({query: {...this.$route.query, locale: key}})
    }
  }
}
</script>

<style scoped>
.header{
  float: right;
  margin-right: 30px;
}
</style>
