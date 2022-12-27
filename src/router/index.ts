import { createRouter, createWebHistory } from "vue-router";
import { routes } from './route' 
import { ElMessage } from 'element-plus'

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => {
        left: 0 
        top: 0
    }
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if(to.name !== 'login' && token == null) {
        
        ElMessage.error("登录信息已过期, 请重新登录!")
        setTimeout(() => {
            router.push('/login')
        }, 1000);
    } else {
        next()
    }
})
export default router