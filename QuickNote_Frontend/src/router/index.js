import { createRouter, createWebHistory } from 'vue-router'
import { useLoginStore } from '../stores/login'
import { ref } from 'vue'

// Import views
import PublicView from '@/views/PublicView.vue'
import PrivateView from '@/views/PrivateView.vue'
import NoteView from '@/views/NoteView.vue'
import NewNote from '@/views/NewNote.vue'
import AdminView from '@/views/AdminView.vue'
import LoginView from '@/views/LoginView.vue'
import PageNotFound from '@/views/PageNotFound.vue'

// Global variable for animation
window.changePage = ref(false)

const router = createRouter({
  //History for browser
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Public',
      component: PublicView
    },
    {
      path: '/private',
      name: 'Private',
      component: PrivateView
    },
    {
      path: '/note/:id',
      name: 'Note',
      component: NoteView,
      props: true
    },
    {
      path: '/new_note',
      name: 'New Note',
      component: NewNote,
      props: true
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        //Disable need for authentication to view this page
        dontUseAuth: true
      }
    },
    {
      //Dispaly this page when no page was found
      path: '/:pathMatch(.*)*',
      name: '404',
      component: PageNotFound
    }
  ]
})

//Code to run for each switch from page to next
router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore()
  //Login page case if already logged ( switch to home )
  if (to.name == 'Login' && loginStore.loggedIn) {
    next({ name: 'Public' })
    return
  }
  //For pages that use authentication
  if (to.matched.some((record) => !record.meta.dontUseAuth)) {
    //If logged in go to selected page
    if (!loginStore.loggedIn) {
      next({ name: 'Login' })
    } else {
      //Global for switch page animation , turn off animation after 500 ms and switch page
      window.changePage.value = true
      setTimeout(() => {
        next(), (window.changePage.value = false)
      }, 500)
    }
  } else {
    //For pages without auth
    next()
  }
})

export default router
