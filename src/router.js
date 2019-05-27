import Vue from "vue";
import Router from "vue-router";
import NotFound from "./views/404.vue";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router);

// 要实现路由守卫，不能直接导出路由
// export default new Router({
const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user',
      redirect: '/user/login',
      hideInMenu: true, // 标志位，用于过滤不需要显示的路由
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
      children: [
        {
          path: '/user/login',
          name: 'login',
          // template 最终会将css和js转译成render函数
          // component: {render: h => h('router-view')},
          component: () =>
          // webpack打包的时候，文件会按照设置的名来分类打包
            import(/* webpackChunkName: "user" */ "./views/user/login")
        },
        {
          path: '/user/register',
          name: 'register',
          component: () =>
          // webpack打包的时候，文件会按照设置的名来分类打包
            import(/* webpackChunkName: "user" */ "./views/user/register")
        }
      ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        // dashboard
        {
          path: '/',
          redirect: '/dashboard/analysis'
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          // component: () => import(/* webpackChunkName: 'dashboard' */ './views/Dashboard/Analysis')
          component: { render: h => h('router-view') },
          meta: { title: '仪表盘', icon: 'dashboard', keepAlive: true },
          children: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              component: () => import(/* webpackChunkName: 'dashboard' */ './views/Dashboard/Analysis'),
              meta: { title: '分析页', keepAlive: false },
            }
          ]
        },
        // form
        {
          path:'/form',
          name: 'form',
          component: { render: h => h('router-view') },
          meta: { title: '表单', icon: 'form', keepAlive: true },
          children: [
            {
              path: '/form/basic_form',
              name: 'basic_name',
              component: () => import(/* webpackChunkName: 'forms' */ './views/forms/basicForm'),
              meta: { title: '基础表单', keepAlive: false },
            },
            {
              path: '/form/step_form',
              name: 'step_form',
              hideChildrenInMenu: true, // 是否隐藏子菜单
              component: () => import(/* webpackChunkName: 'forms' */ './views/forms/stepForm/index'),
              meta: { title: '分步表单', keepAlive: false },
              children: [
                {
                  path: '/form/step_form',
                  redirect: '/form/step_form/info'
                },
                {
                  path: '/form/step_form/info',
                  name: 'step_form_info',
                  component: () => import(/* webpackChunkName: 'forms' */ './views/forms/stepForm/step1'),
                },
                {
                  path: '/form/step_form/confirm',
                  name: 'step_form_confirm',
                  component: () => import(/* webpackChunkName: 'forms' */ './views/forms/stepForm/step2')
                },
                {
                  path: '/form/step_form/result',
                  name: 'step_form_result',
                  component: () => import(/* webpackChunkName: 'forms' */ './views/forms/stepForm/step3')
                }
              ]
            }
          ]
        },
        // 添加管理员
        {
          path: '/admin',
          name: 'admin',
          redirect: '/admin/user',
          component: { render: h => h('router-view') },
          meta: { title: '账户管理', icon: 'user', keepAlive: true },
          children: [
            {
              path: '/admin/user',
              name: 'admin_user',
              component: () => import(/* webpackChunkName: 'admin' */'@/views/admin/user'),
              meta: { title: '用户列表', keepAlive: false }
            }
          ]
        },
      ]
    },
    {
      path: '*',
      name: '404',
      hideInMenu: true,
      component: NotFound
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});

// 路由守卫的具体实现
router.beforeEach((to, from, next) => {
  // 开始加载动画
  // 当path发生变化的时候才开始加载动画
  if (to.path !== from.path) {
    NProgress.start()
  }
  next()
})
router.afterEach(() => {
  // 结束加载动画
  NProgress.done()
})

export default router