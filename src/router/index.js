import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    redirect: '/peliculas'
  },
  {
    path: '/peliculas',
    name: 'all-movies',
    component: () => import(/* webpackChunkName: "all-movies" */'../views/peliculas/Peliculas.vue'),
  },
  {
    name: 'populares',
    path: '/peliculas/populares',
    component: () => import(/* webpackChunkName: "populares" */'../views/peliculas/Popular.vue')
  },
  {
    name: 'top-rated',
    path: '/peliculas/top-rated',
    component: () => import(/* webpackChunkName: "top-rated" */'../views/peliculas/TopRated.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    redirect: '/peliculas'
  },
  {
    path: '/peliculas/:id',
    name: 'SelectedMovie',
    component: () => import(/* webpackChunkName: "selected-movie" */'../views/peliculas/SelectedMovie.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
