<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
    v-if="navLayout == 'left'"
      collapsible
      :trigger="null"
      :theme="navTheme"
      v-model="collapsed"
      width="256px"
      >
        <!-- <div class="logo">Ant Design Vue Pro</div> -->
        <div class="logo">
          <!-- <svg-icon icon-class="logo"></svg-icon> -->
          气泡后台
        </div>
        <SiderMenu :theme="navTheme"></SiderMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0;margin-bottom: 20px;">
          <a-icon 
            class="trigger" 
            :type="collapsed ? 'menu-unfold' : 'menu-fold'" 
            @click="handleChange"></a-icon>
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <Setting></Setting>
    </Authorized>
  </div>
</template>
<script>
import Header from '@/layouts/Header'
import SiderMenu from '@/layouts/SiderMenu'
import Footer from '@/layouts/Footer'
import Setting from '@/components/setting/setting'
export default {
  components: {
    Header,
    SiderMenu,
    Footer,
    Setting,
  },
  data() {
    return {
      collapsed: false,
    }
  },
  // 将配置信息返回给basicLayout，可以使用computed属性
  computed: {
    navTheme () {
      return this.$route.query.navTheme || 'light'
    },
    navLayout () {
      return this.$route.query.navLayout || 'left'
    },
  },
  methods: {
    handleChange () {
      this.collapsed = !this.collapsed
      this.$root.eventHub.$emit('changeSiderStatus', this.collapsed)
    },
    offEventHubListener () {
      this.$root.eventHub.$off('changeSiderStatus')
    }
  },
  beforeDestroy () {
    /**
     * 在目标组件销毁之前需要解绑事件监听
     * 否则会触发多次
     * 因为组件销毁时 this.$root.eventHub 不会销毁
     * 所有的监听事件会叠加
     */
    this.offEventHubListener()
  }
}
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
.trigger{
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover{
  background: #eee;
}
.logo{
  display: flex;
  height: 64px;
  font-size: 18px;
  text-align: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #1890ff;
  font-weight: 700;
}
/* 当主题为dark时，logo里面的字体颜色开始切换为白色 */
.nav-theme-dark >>> .logo{
  color: #fff;
}
</style>