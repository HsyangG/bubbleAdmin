import Vue from "vue";
import Antd from 'ant-design-vue';
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import 'ant-design-vue/dist/antd.less';
// import { Button } from 'ant-design-vue';
// 挂载权限控制组件到全局
import Authorized from '@/components/Authorized'

Vue.config.productionTip = false;

Vue.use(Antd);
// Vue.use(Button);
Vue.component('Authorized', Authorized)
// Vue.use(form)

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue() // 使用集中的事件处理器，一劳永逸的在任何组件调用事件发射，接收方法
  }
}).$mount("#app");
