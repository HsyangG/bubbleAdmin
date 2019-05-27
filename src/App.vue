<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import moment from 'moment'
export default {
  data () {
    return {
      locale: zhCN
    }
  },
  watch: {
    '$route.query.locale': function (val) {
      this.locale = val === 'enUS' ? enUS : zhCN
      // 将日历日期组件也切换成对应的语言
      moment.locale(val === 'enUS' ? 'en' : 'zh-cn')
    }
  }
}
</script>

