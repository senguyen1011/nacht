import { createRouter, createWebHistory } from 'vue-router'
import ChordView from '@/views/ChordView.vue'

const routes = [
  {
    path: '/',
    name: 'Chords',
    component: ChordView,
    icon: 'chord',
  },
  {
    path: '/',
    name: 'Scales',
    component: ChordView,
    icon: 'scale',
  },
  {
    path: '/',
    name: 'Progressions',
    component: ChordView,
    icon: 'progression',
  },
  {
    path: '/',
    name: 'Quiz',
    component: ChordView,
    icon: 'helpCircle',
  },
  {
    path: '/',
    name: 'Settings',
    component: ChordView,
    icon: 'settings',
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.map((route) => ({
    path: route.path,
    name: route.name,
    component: route.component,
  }))
})

export default router
export { routes }
