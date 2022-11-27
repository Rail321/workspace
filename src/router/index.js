import { createRouter, createWebHistory } from 'vue-router'
import PageIndex from '@/pages/Index'

const routes = [
  {
    path: '/',
    name: 'PageIndex',
    component: PageIndex
  },
  {
    path: '/form',
    name: 'PageForm',
    component: () => import( '@/pages/Form' )
  }
]

const router = createRouter( {
  history: createWebHistory( process.env.BASE_URL ),
  routes
} )

export default router
