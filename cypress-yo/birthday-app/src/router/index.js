import Vue from 'vue'
import VueRouter from 'vue-router'

import Level1 from '../views/level1.vue'
import Level2 from '../views/level2.vue'
import Level3 from '../views/level3.vue'
import Welcome from '../views/welcome.vue'
import Congratulation from '../views/congratulation.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/level-1',
    name: 'Level1',
    component: Level1
  },
  {
    path: '/level-2',
    name: 'Level2',
    component: Level2
  },
  {
    path: '/level-3',
    name: 'Level3',
    component: Level3
  },
  {
    path: '/congratulation',
    name: 'Congratulation',
    component: Congratulation
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log('before each')
  const foundIndex = store.state.levels.findIndex(element => element === false)
  const foundRoute = routes[foundIndex-1]
  
  if (to.name === foundRoute.name) {
    next()
  } else {
    next({ name: foundRoute.name }) 
  }
})

export default router
