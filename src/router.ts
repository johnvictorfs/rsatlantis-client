import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'
import api from '@/api'

Vue.use(Router)

const redirectLogout = (to: any, from: any, next: any) => {
  store.dispatch('logout').then(() => next({ name: 'home' }))
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Homepage.vue')
    },
    {
      path: '/entrar',
      name: 'login',
      component: () => import('./views/auth/Login.vue')
    },
    {
      path: '/sair',
      name: 'logout',
      beforeEnter: redirectLogout
    },
    {
      path: '/registrar',
      name: 'register',
      component: () => import('./views/auth/Register.vue')
    },
    {
      path: '/rankings',
      name: 'hiscores',
      component: () => import('./views/Hiscores.vue')
    },
    {
      path: '/guias',
      name: 'guides.list',
      component: () => import('./views/guides/GuideList.vue')
    },
    {
      path: '/guias/novo',
      name: 'guides.new',
      meta: { auth: true },
      component: () => import('./views/guides/NewGuide.vue')
    },
    {
      path: '/guias/atl/:slug',
      name: 'guides.detail',
      props: true,
      component: () => import('./views/guides/GuideView.vue')
    },
    {
      path: '/clan/list',
      name: 'clan-list',
      component: () => import('./views/ClanList.vue')
    },
    {
      path: '/amigo_secreto/inscritos',
      name: 'amigo-secreto-users',
      component: () => import('./components/discord/AmigoSecretoUsers.vue')
    },
    {
      path: '/404',
      alias: '*',
      name: 'notfound',
      component: () => import('./views/NotFound.vue')
    },
    {
      path: '*',
      redirect: { name: 'notfound' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.auth)
  const requiresAdmin = to.matched.some(route => route.meta.admin)
  const requiresSuperUser = to.matched.some(route => route.meta.superUser)

  if (to.query.code && to.query.state) {
    api.discord.discordOauthUser(to.query.code as string).then(user => {
      console.log(user)

      Vue.toasted.global.success('Você entrou na sua conta com Sucesso!')
    }).catch(() => {
      Vue.toasted.global.error('Houve um erro ao tentar entrar na sua conta')
      localStorage.removeItem('TOKEN')
    })
  }

  // Redirects user to login page if the page they are trying to access requires authentication, and they
  // are not logged in
  if (!store.getters.isAuthenticated && requiresAuth) {
    Vue.toasted.global.error('Você precisa estar conectado para fazer isso')
    next('/entrar/' + `?next=${to.path}`)
  } else if ((!store.getters.isAdmin && requiresAdmin) || (!store.getters.isSuperUser && requiresSuperUser)) {
    // Redirects User to hompage if page requires Admin or Superuser and he isn't
    Vue.toasted.global.error('Você não tem permissões para fazer isso')
    next('/')
  }

  next()
})

export default router
