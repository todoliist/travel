import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      // lazy loading, can lazy load any component
      component: () => import('@/pages/home/Home')
    },
    {
      path: '/cities',
      name: 'Cities',
      component: () => import('@/pages/cities/Cities')
    },
    {
      path: '/:city/:id',
      name: 'Detail',
      component: () => import('@/pages/detail/Detail')
    }
  ],
  // This will simply make the page scroll to top for all route navigations
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
