// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path:"Animation",
        name:"Animation",
        component:()=>import("@/views/Animation.vue")
      },
      {
        path:"Avatars",
        name:"Avatars",
        component:()=>import("@/views/MakeAvatar.vue")
      },
      {
        path:"Transcript",
        name:"Transcript",
        component:()=>import("@/views/Transcript.vue")
      }
      
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
