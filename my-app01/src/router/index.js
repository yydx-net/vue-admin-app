import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path:'/',
    redirect:{name:'login'}
  },

  {
    path:'/login',
    name:'login',
    component:()=>import('../views/Login.vue')
  },

  {
    path: '/about:id',
    name: 'about',
    props:true,
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    children: [
      {
        path: '/user:id',
        name: 'user',
        meta:{
          title:'用户页'
        },
        component: () => import('../views/user/UserView.vue')
      }
    ]
  },

  {
    path: '/nav',
    name: 'nav',
    component: () => import('../views/home/HomeView.vue')
  },

  {
    path:'/message',
    name:'message',
    meta:{
      title:'信息详情页'
    },
    component:()=>import('../views/Message.vue')
  },
  {
    path:'/detail:id',
    name:'info',
    props:true,
    component:()=>import('../views/DetailedInformation.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
