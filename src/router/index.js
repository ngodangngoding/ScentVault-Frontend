import { createRouter, createWebHistory } from 'vue-router'
import api from '@/services/api'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import BerandaView from '../views/BerandaView.vue'
import DetailParfumView from '../views/DetailParfumView.vue'
import KoleksiView from '../views/KoleksiView.vue'
import TambahParfumView from '../views/TambahParfumView.vue'
import BukuView from '../views/BukuView.vue'
import EditParfumView from '../views/EditParfumView.vue'
import KesesuianView from '../views/KesesuaianView.vue'
import ProfilView from '../views/ProfilView.vue'
import KonfigurasiAturan from '../views/KonfigurasiAturan.vue'
import ProfileAdminView from '../views/ProfileAdminView.vue'
import ManajemenPengguna from '../views/ManajemenPengguna.vue'
import TambahPengguna from '../views/TambahPengguna.vue'
import UserDetail from '../views/UserDetail.vue'
import IntegrasiData from '../views/IntegrasiData.vue'

const clearAuthState = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('lastActiveMenu')
}

const getStoredUser = () => {
  const userStr = localStorage.getItem('user')

  if (!userStr || userStr === 'undefined' || userStr === 'null') {
    return null
  }

  try {
    return JSON.parse(userStr)
  } catch {
    clearAuthState()
    return null
  }
}

let authCheckPromise = null
let lastVerifiedUserId = null
let lastVerifiedRole = null
let lastVerifiedAt = 0

const verifyStoredSession = async (user) => {
  const now = Date.now()
  const cacheWindowMs = 10 * 1000

  if (
    user?.id &&
    user.id === lastVerifiedUserId &&
    user.role === lastVerifiedRole &&
    now - lastVerifiedAt < cacheWindowMs
  ) {
    return true
  }

  if (!authCheckPromise) {
    authCheckPromise = (async () => {
      if (user?.role === 'admin') {
        await api.get(`/admin/users/${user.id}`)
      } else {
        await api.get('/me')
      }

      lastVerifiedUserId = user?.id ?? null
      lastVerifiedRole = user?.role ?? null
      lastVerifiedAt = Date.now()
      return true
    })().finally(() => {
      authCheckPromise = null
    })
  }

  return authCheckPromise
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guestOnly: true },
    },
    {
      path: '/beranda',
      name: 'beranda',
      component: BerandaView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailParfumView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/koleksi',
      name: 'koleksi',
      component: KoleksiView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/tambah-parfum',
      name: 'tambah-parfum',
      component: TambahParfumView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/buku',
      name: 'buku',
      component: BukuView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/edit-parfum/:id',
      name: 'edit-parfum',
      component: EditParfumView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/kesesuaian',
      name: 'kesesuaian',
      component: KesesuianView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilView,
      meta: { requiresAuth: true, requiresUser: true },
    },
    {
      path: '/konfigurasi-aturan',
      name: 'KonfigurasiAturan',
      component: KonfigurasiAturan,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        layout: 'admin',
        topbarPlaceholder: 'Cari konfigurasi aturan...'
      },
    },
    {
      path: '/manajemen-pengguna',
      name: 'ManajemenPengguna',
      component: ManajemenPengguna,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        layout: 'admin',
        topbarPlaceholder: 'Cari pengguna...'
      },
    },
    {
      path: '/tambah-pengguna',
      name: 'TambahPengguna',
      component: TambahPengguna,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        layout: 'admin',
        topbarPlaceholder: 'Cari pengguna...'
      },
    },
    {
      path: '/integrasi-data',
      name: 'IntegrasiData',
      component: IntegrasiData,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        layout: 'admin',
        topbarPlaceholder: 'Cari integrasi...'
      },
    },
    {
      path: '/manajemen-pengguna/detail/:id',
      name: 'UserDetail',
      component: UserDetail,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        layout: 'admin',
        topbarPlaceholder: 'Cari pengguna...'
      },
    },
    {
      path: '/manajemen-pengguna/edit/:id',
      name: 'UserEdit',
      component: UserDetail,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        layout: 'admin',
        topbarPlaceholder: 'Cari pengguna...'
      },
    },
    {
      path: '/profil-admin',
      name: 'ProfileAdminView',
      component: ProfileAdminView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        layout: 'admin',
        topbarPlaceholder: 'Cari profil admin...'
      },
    },
    // Catch-all route for undefined paths
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        const token = localStorage.getItem('token')
        const user = getStoredUser()

        if (!token || token === 'null' || token === 'undefined') {
          return '/'
        }

        return user?.role === 'admin' ? '/integrasi-data' : '/beranda'
      }
    }
  ],
})

router.beforeEach(async (to) => {
  const token = localStorage.getItem('token')
  const user = getStoredUser()
  // Check if token exists and is not null/undefined string
  const isAuthenticated = token && token !== 'null' && token !== 'undefined'

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.requiresAuth && isAuthenticated && !user) {
    clearAuthState()
    return { name: 'login' }
  }

  if (to.meta.requiresAuth && isAuthenticated && user) {
    try {
      await verifyStoredSession(user)
    } catch {
      clearAuthState()
      return { name: 'login' }
    }
  }

  if (to.meta.guestOnly && isAuthenticated) {
    if (user.role === 'admin') {
      return { path: '/integrasi-data' }
    }
    return { path: '/beranda' }
  }

  if (to.meta.requiresUser && user.role !== 'user') {
    clearAuthState()
    return { name: 'login' }
  }

  if (to.meta.requiresAdmin && user.role !== 'admin') {
    clearAuthState()
    return { name: 'login' }
  }
})

export default router
