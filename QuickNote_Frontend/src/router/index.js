import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '../stores/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        dontUseAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore();
  if (to.name == "Login" && loginStore.loggedIn){
    next({ name: 'Home' })
    return;
  }
  if (to.matched.some(record => !record.meta.dontUseAuth)) {
    if (!loginStore.loggedIn) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
