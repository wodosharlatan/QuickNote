import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '../stores/login'
import { ref } from 'vue'

window.changePage = ref(false);

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
      path: '/note/:id',
      name: 'Note',
      component: import('../views/NoteView.vue'),
      props: true
      
    },
    {
      path: '/new_note',
      name: 'New Note',
      component: import('../views/NewNote.vue'),
      props: true
      
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
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: import('../views/PageNotFound.vue')
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
      window.changePage.value = true;
      setTimeout(() => {next(),window.changePage.value = false;},500);
    }
  } else {
    next()
  }
})

export default router
