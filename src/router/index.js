import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    component: Index
  },

  {
    path: '/index',
    component: Index
  },

  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Login/Login')
  },

  {
    path: '/location',
    name: '地址定位',
    component: () => import('../views/Location/Location')
  },
  {
    path: '/address',
    name: '管理地址',
    component: () => import('../views/Home/Address'),
  },

  {
    path: '/home',
    name: '我的',
    component: () => import('../views/Home/Home'),
    keepAlive: true,
  },

  {
    path: '/address',
    name: '我的地址',
    component: () => import('../views/Home/Address')
  },


  {
    path: '/store',
    component: () => import('../views/Store/Store'),
    children: [
      {
        path: '',
        redirect: '/store/seller'
      },

      {
        path: 'menu',
        name: '菜单',
        component: () => import('../views/Store/Menu')
      },
      {
        path: 'comment',
        name: '评论',
        component: () => import('../views/Store/Comment')
      },

      {
        path: 'seller',
        name: '商家信息中心',
        component: () => import('../views/Store/Seller')
      },
    ]
  },



  {
    path: '/order',
    name: '我的订单',
    component: () => import('../views/Order/Order')
  },

  {
    path: '/pay',
    name: '支付',
    component: () => import('../views/Pay/Pay')
  },
]

const router = new VueRouter({
  routes
})

export default router
