import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('../views/home/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component:()=>import('../views/register/Register.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
