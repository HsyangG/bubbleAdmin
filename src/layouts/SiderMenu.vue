<template>
  <div class="sider_menu" style="width: 256px">
    <!-- <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button> -->
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path" @click="() => $router.push({ path: item.path, query: $route.query })">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{item.meta.title}}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path"/>
      </template>
    </a-menu>
  </div>
</template>

<script>
/* 
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from './SubMenu'
export default {
  components: {
    'sub-menu': SubMenu,
  },
  props: {
    theme: {
      type: String,
      default: 'light'
    }
  },
  data () {
    this.selectedKeysMap = {}
    this.openKeysMap = {}
    const menuData = this.getMenuData(this.$router.options.routes)
    return {
      collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    }
  },
  watch: {
    '$route.path': function (val) {
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    }
  },
  created () {
    this.$root.eventHub.$on('changeSiderStatus', this.changeSider)
  },
  methods: {
    getMenuData (routes = [], parentKeys = [], selectedKey) {
      const menuData = []
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys
          this.selectedKeysMap[item.path] = [selectedKey || item.path]
          // console.log(this.openKeysMap)
          const newItem = { ...item } // 不改变元数据
          delete newItem.children
          if (item.children && !item.hideChildrenInMenu) {
            // 展开parentKeys，加入item.path
            newItem.children = this.getMenuData(item.children, [...parentKeys, item.path])
            // console.log(item.children, [...parentKeys, item.path])
          } else {
            this.getMenuData(item.children, selectedKey ? parentKeys : [...parentKeys, item.path], selectedKey || item.path)
          }
          // console.log(newItem)
          menuData.push(newItem)
        } else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
          menuData.push(...this.getMenuData(item.children, [...parentKeys, item.path]))
          // console.log(...this.getMenuData(item.children, [...parentKeys, item.path]))
        }
      });
      // console.log(menuData)  
      return menuData
    },
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    changeSider (status) {
      // 解决隐藏菜单后还会显示子菜单的问题
      this.openKeys = status ? [] : this.openKeysMap[this.$route.path]
    }
  },
}
</script>
