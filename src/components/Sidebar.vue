<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1 class="brand-logo">ScentVault</h1>
      <p class="brand-subtitle">ATELIER DIGITAL</p>
    </div>

    <nav class="sidebar-nav">
      <RouterLink to="/beranda" class="nav-item" :class="{ active: activeMainMenu === '/beranda' }">
        <svg
          class="nav-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="4" y="4" width="6" height="6" rx="1"></rect>
          <rect x="14" y="4" width="6" height="6" rx="1"></rect>
          <rect x="14" y="14" width="6" height="6" rx="1"></rect>
          <rect x="4" y="14" width="6" height="6" rx="1"></rect>
        </svg>
        BERANDA
      </RouterLink>

      <RouterLink to="/koleksi" class="nav-item" :class="{ active: activeMainMenu === '/koleksi' }">
        <svg
          class="nav-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="5" y="4" width="14" height="16" rx="1"></rect>
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <rect x="7" y="8" width="4" height="4"></rect>
          <rect x="7" y="16" width="4" height="4"></rect>
        </svg>
        KOLEKSI SAYA
      </RouterLink>

      <RouterLink to="/buku" class="nav-item" :class="{ active: activeMainMenu === '/buku' }">
        <svg
          class="nav-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          <line x1="14" y1="7" x2="18" y2="7"></line>
          <line x1="14" y1="11" x2="18" y2="11"></line>
          <line x1="14" y1="15" x2="18" y2="15"></line>
        </svg>
        BUKU HARIAN AROMA
      </RouterLink>

      <div class="sidebar-footer">
        <button class="btn-logout" @click="handleLogout" :disabled="isLoggingOut">
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
    // Ubah ke huruf kecil untuk mencegah error karena huruf kapital
    const path = newPath.toLowerCase()

    // 1. Rute Utama (Menyala & Menyimpan Konteks)
    const mainRoutes = ['/beranda', '/koleksi', '/buku']

    // 2. Rute Anak (Meminjam Konteks Menu Induk)
    // Menggunakan kata kunci pendek agar mencakup /edit-parfum, /tambah-parfum, dll
    const subRoutes = ['/detail', '/edit', '/tambah', '/kesesuaian']

    // 3. Rute Netral (Memaksa Sidebar Mati Total)
    const neutralRoutes = ['/profil']

    const isSubRoute = subRoutes.some((r) => path.startsWith(r))
    const isNeutralRoute = neutralRoutes.some((r) => path.startsWith(r))

    if (mainRoutes.includes(path)) {
      // KONDISI 1: Di Menu Utama -> Nyalakan & Simpan
      activeMainMenu.value = path
      localStorage.setItem('lastActiveMenu', path)
    } else if (isNeutralRoute) {
      // KONDISI 2: Di Profil -> PAKSA MATI
      activeMainMenu.value = ''
    } else if (isSubRoute) {
      // KONDISI 3: Di Detail/Edit/Tambah -> Panggil menu induk terakhir
      const savedMenu = localStorage.getItem('lastActiveMenu')
      activeMainMenu.value = savedMenu || '/beranda'
    } else {
      // KONDISI 4: Fallback aman jika masuk ke rute yang tidak dikenal
      activeMainMenu.value = ''
    }
  },
  { immediate: true },
)

// Fungsi logout
const handleLogout = async () => {
  isLoggingOut.value = true

  try {
    // Call logout endpoint di backend
    await api.post('/logout')

    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('lastActiveMenu')

    // Redirect ke login
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
    // Meskipun error, tetap clear dan redirect ke login
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('lastActiveMenu')
    router.push('/login')
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
  width: 255px;
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
