<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1 class="brand-logo">ScentVault</h1>
      <p class="brand-subtitle">ADMIN ATELIER</p>
    </div>

    <nav class="sidebar-nav">
      <RouterLink
        to="/konfigurasi-aturan"
        class="nav-item"
        :class="{ active: activeMainMenu === '/konfigurasi-aturan' }"
      >
        <svg
          class="nav-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33
               1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51
               1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82
               1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1
               1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33
               h0A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51
               1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82
               V9c0 .66.26 1.3.73 1.77.47.47 1.11.73 1.77.73a2 2 0 1 1 0 4h-.09
               a1.65 1.65 0 0 0-1.51 1z"
          ></path>
        </svg>
        Konfigurasi Aturan
      </RouterLink>

      <RouterLink
        to="/manajemen-pengguna"
        class="nav-item"
        :class="{ active: activeMainMenu === '/manajemen-pengguna' }"
      >
        <svg
          class="nav-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        Manajemen Pengguna
      </RouterLink>

      <RouterLink
        to="/integrasi-data"
        class="nav-item"
        :class="{ active: activeMainMenu === '/integrasi-data' }"
      >
        <svg
          class="nav-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"></path>
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"></path>
        </svg>
        Integrasi Data
      </RouterLink>

      <div class="sidebar-footer">
        <button class="btn-logout" type="button" @click="handleLogout" :disabled="isLoggingOut">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          {{ isLoggingOut ? 'MEMPROSES...' : 'Keluar' }}
        </button>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const activeMainMenu = ref('')
const isLoggingOut = ref(false)

watch(
  () => route.path,
  (newPath) => {
    const path = newPath.toLowerCase()

    const mainRoutes = [
      '/konfigurasi-aturan',
      '/manajemen-pengguna',
      '/integrasi-data',
    ]

    const subRoutes = ['/detail', '/edit', '/tambah', '/kesesuaian']
    const neutralRoutes = ['/profil']

    const matchedMainRoute = mainRoutes.find(
      (r) => path === r || path.startsWith(`${r}/`)
    )

    const isSubRoute = subRoutes.some((r) => path.startsWith(r))
    const isNeutralRoute = neutralRoutes.some((r) => path.startsWith(r))

    if (matchedMainRoute) {
      activeMainMenu.value = matchedMainRoute
      localStorage.setItem('lastActiveMenu', matchedMainRoute)
    } else if (isNeutralRoute) {
      activeMainMenu.value = ''
    } else if (isSubRoute) {
      const savedMenu = localStorage.getItem('lastActiveMenu')
      activeMainMenu.value = mainRoutes.includes(savedMenu || '')
        ? savedMenu
        : '/konfigurasi-aturan'
    } else {
      activeMainMenu.value = ''
    }
  },
  { immediate: true },
)

const clearAuthState = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('lastActiveMenu')
}

const handleLogout = async () => {
  isLoggingOut.value = true

  try {
    await api.post('/logout')
    clearAuthState()
    router.push('/')
  } catch (error) {
    console.error('Logout admin error:', error)
    clearAuthState()
    router.push('/')
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<style scoped>
/* =========================================
   Sidebar Kiri (CSS Ekstrak dari Beranda)
   ========================================= */
.sidebar {
  width: 260px;
  background-color: #eeeeea;
  border-right: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  padding: 40px 0 20px 0;
  z-index: 10;
  height: 100vh;
  flex-shrink: 0;
}

.sidebar-header {
  padding: 0 30px 40px 30px;
}

.brand-logo {
  font-size: 1.6rem;
  font-weight: 800;
  color: #7d5731;
  line-height: 1.1;
  margin-bottom: 5px;
}

.brand-subtitle {
  font-size: 0.65rem;
  font-weight: 700;
  color: #78716c;
  letter-spacing: 1px;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 13px 14px;
  color: #78716c;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
  border-radius: 8px;
  border-right: 5px solid transparent;
}

.nav-item:hover {
  background-color: #e5e2dc;
  color: #271c1c;
}

/* CLASS ACTIVE SEKARANG DIKENDALIKAN MURNI OLEH LOGIKA KITA */
.nav-item.active {
  background-color: #f7f7f7;
  color: #7d5731;
  font-weight: 800;
  border-right-color: #7d5731;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.nav-icon {
  width: 20px;
  height: 20px;
  margin-right: 15px;
}

.sidebar-footer {
  margin-top: auto;
  padding: 0 5px 0 5px;
}

.btn-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background-color: #a73b21;
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(176, 74, 46, 0.25);
  transition: background-color 0.2s;
}

.btn-logout:hover {
  background-color: #8c3720;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(176, 74, 46, 0.35);
}

.btn-logout svg {
  width: 18px;
  height: 18px;
}
</style>
