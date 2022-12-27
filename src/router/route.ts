import { RouteRecordRaw } from "vue-router"

export const routes: RouteRecordRaw[] = [
   {
        path: "/",
        name: 'home',
        component: () => import('../views/HomePage/index.vue'),
   },
   {
        path: "/login",
        name: 'login',
        component: () => import('../views/LoginPage/index.vue'),
   }
]
