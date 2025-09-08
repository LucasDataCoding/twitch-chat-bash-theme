import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'
import ConfigView from '@/views/ConfigView.vue'
import { nextTick } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: {
        title: 'Chat',
      },
    },
    {
      path: '/',
      name: 'home',
      component: ConfigView,
      meta: {
        title: 'Configurações',
      },
    },
  ],
})

const defaultTitle = 'Ceyra'

router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  nextTick(() => {
    document.title = [to.meta.title, defaultTitle].filter((t) => t).join(' | ')
  })
})

export default router
