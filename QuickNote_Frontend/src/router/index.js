import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '../stores/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Public',
      component: import('../views/PublicView.vue')
    },
    {
      path: '/private',
      name: 'Private',
      component: import('../views/PrivateView.vue')
    },
    {
      path: '/note',
      name: 'Note',
      component: import('../views/NoteView.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: import('../views/AdminView.vue')
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
  const loginStore = useLoginStore()
  if (to.name == 'Login' && loginStore.loggedIn) {
    next({ name: 'Public' })
    return
  }
  if (to.matched.some((record) => !record.meta.dontUseAuth)) {
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
