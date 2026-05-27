<template>
  <div class="dashboard-layout">
    <Sidebar />

    <main class="main-content">
      <Topbar>
        <div class="search-bar">
          <svg
            class="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Cari Koleksi Anda..."
            v-model="searchQuery"
            @input="onSearchInput"
          />
        </div>
      </Topbar>

      <div class="content-body">
        <div class="page-header">
          <div class="header-text">
            <h1 class="page-title">Koleksi Saya</h1>
            <p class="page-subtitle">Mengkurasi esensi dari atelier digital Anda.</p>
          </div>
          <RouterLink to="/tambah-parfum" class="btn-gradient">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Parfum
          </RouterLink>
        </div>

        <div class="filter-bar">
          <div class="filter-pills">
            <button
              v-for="cat in categories"
              :key="cat.id || 'all'"
              class="pill-btn"
              :class="{ active: activeCategory === cat.id }"
              @click="activeCategory = cat.id"
            >
              {{ cat.name }}
            </button>
          </div>
          <div class="sort-dropdown">
            <span class="sort-label">Urutkan:</span>
            <select v-model="activeSort" class="sort-select-basic">
              <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="isLoading" class="loading-state" style="padding: 40px; text-align: center">
          Mempersiapkan koleksi...
        </div>

        <div
          v-else-if="collection.length === 0"
          class="empty-state"
          style="padding: 40px; text-align: center"
        >
          Koleksi Anda masih kosong. Silakan tambah parfum baru.
        </div>

        <div v-else class="collection-grid">
          <div class="perfume-card" v-for="parfum in collection" :key="parfum.id">
            <div class="card-image-wrapper">
              <img :src="parfum.image" :alt="parfum.name" class="perfume-img" />

              <button class="btn-delete-overlay" @click="promptDelete(parfum.id)">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
            <div class="card-content">
              <div class="card-top-info">
                <span class="card-brand">{{ parfum.brand }}</span>
                <div class="card-rating">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    ></polygon>
                  </svg>
                  {{ parfum.rating > 0 ? parfum.rating : '0.0' }}
                </div>
              </div>

              <h3 class="card-title">{{ parfum.name }}</h3>

              <div class="card-tags">
                <template v-if="parfum.notes && parfum.notes.length > 0">
                  <span class="tag-pill" v-for="(note, index) in parfum.notes" :key="index">
                    {{ note }}
                  </span>
                </template>
                <template v-else>
                  <span class="tag-pill" style="background-color: #f5f5f5; color: #888"
                    >Belum ada catatan</span
                  >
                </template>
              </div>

              <RouterLink :to="`/detail/${parfum.id}`" class="btn-outline-detail">
                Lihat Detail
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="pagination-section" v-if="pagination.total > 0">
          <div class="pagination-info">
            Menampilkan {{ (pagination.current_page - 1) * pagination.per_page + 1 }} hingga
            {{ Math.min(pagination.current_page * pagination.per_page, pagination.total) }} dari
            {{ pagination.total }} Koleksi
          </div>

          <div class="pagination-controls">
            <button
              class="page-nav-btn"
              @click="changePage(pagination.current_page - 1)"
              :disabled="pagination.current_page === 1"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button
              v-for="pageNumber in pagination.last_page"
              :key="pageNumber"
              class="page-num"
              :class="{ active: pagination.current_page === pageNumber }"
              @click="changePage(pageNumber)"
            >
              {{ pageNumber }}
            </button>

            <button
              class="page-nav-btn"
              @click="changePage(pagination.current_page + 1)"
              :disabled="pagination.current_page === pagination.last_page"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
        <div class="modal-card">
          <div class="modal-icon-wrapper">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="modal-icon"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path
                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              ></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </div>

          <h3 class="modal-title">Hapus dari Koleksi?</h3>
          <p class="modal-desc">
            Apakah Anda yakin ingin menghapus parfum ini?<br />
            Tindakan ini tidak dapat dibatalkan dan semua data terkait akan hilang.
          </p>

          <div class="modal-actions">
            <button class="btn-modal-cancel" @click="closeDeleteModal">BATAL</button>
            <button class="btn-modal-confirm" @click="confirmDelete">HAPUS DARI KOLEKSI</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { RouterLink, useRouter } from 'vue-router'
import api from '../services/api' // Pastikan path ini sesuai dengan letak file api.js Anda
import defaultParfumImg from '@/assets/upload-parfum.jpeg'

// Data Filter & Sort
const categories = ref([{ id: null, name: 'Semua' }])
const activeCategory = ref(null)

const sortOptions = [
  { label: 'Terbaru', value: 'newest' },
  { label: 'Terlama', value: 'oldest' },
]
const activeSort = ref('newest')

// =========================================
// FITUR PENCARIAN (DEBOUNCE)
// =========================================
const searchQuery = ref('')
let searchTimeout = null

// Fungsi ini akan dieksekusi setiap kali user mengetik
const onSearchInput = () => {
  // Hapus hitungan mundur sebelumnya jika user masih mengetik
  if (searchTimeout) clearTimeout(searchTimeout)

  // Buat hitungan mundur baru (500 milidetik / 0.5 detik)
  searchTimeout = setTimeout(() => {
    fetchCollection(1) // Panggil ulang API dan kembali ke halaman 1
  }, 500)
}

// State Koleksi & Paginasi
const collection = ref([])
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 6, // Ubah ke 6 agar sesuai dengan grid desain baru Anda
  total: 0,
})

const isLoading = ref(true)

// Helper format URL gambar
const formatImageUrl = (path) => {
  if (!path) return defaultParfumImg;
  let relativePath = path;
  if (path.includes('/storage/')) {
    relativePath = path.split('/storage/')[1];
  }
  if (relativePath.startsWith('http')) return relativePath; // url web
  const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return `http://127.0.0.1:8000/storage${cleanPath}`;
};

// Fungsi Utama Penarik Data
const fetchCollection = async (page = 1) => {
  isLoading.value = true
  try {
    const params = {
      page: page,
      sort: activeSort.value,
      per_page: 6,
    }

    // Jika ada kategori yang dipilih
    if (activeCategory.value) {
      params.category_id = activeCategory.value
    }

    // PERBAIKAN: Jika ada kata kunci di kotak pencarian, masukkan ke parameter
    if (searchQuery.value) {
      params.search = searchQuery.value // Asumsi API Laravel Anda menerima parameter '?search='
    }

    // Mengambil data dari endpoint khusus halaman koleksi Anda
    const response = await api.get('/pages/perfume-collection', { params })
    const data = response.data.data

    // 1. Mapping Kategori Dinamis
    const fetchedCategories = data.categories || []
    categories.value = [{ id: null, name: 'Semua' }, ...fetchedCategories]

    // 2. Mapping Parfum untuk Desain Kartu Baru
    collection.value = data.perfumes.data.map((p) => ({
      id: p.id,
      brand: p.brand_name || p.brand?.name || 'PRIVATE BLEND', // Menyesuaikan desain Brand kecil di atas
      name: p.name,
      rating: p.star_rating || 0,
      notes: p.notes ? p.notes.map((n) => n.name) : [], // Mengambil array nama bahan (notes)
      // Penanganan gambar yang lebih aman
      image: formatImageUrl(p.image_url),
    }))

    // 3. Update Status Paginasi
    pagination.value = data.perfumes.pagination
  } catch (error) {
    console.error('Failed to fetch collection', error)
  } finally {
    isLoading.value = false
  }
}

// Reaktivitas: Otomatis memanggil API saat filter/sort berubah
watch(activeCategory, () => fetchCollection(1))
watch(activeSort, () => fetchCollection(1))

onMounted(() => fetchCollection(1))

// Fungsi Navigasi Halaman
const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    fetchCollection(page)
  }
}

// =========================================
// STATE & LOGIKA MODAL HAPUS
// =========================================
const showDeleteModal = ref(false)
const selectedPerfumeId = ref(null)

// 1. Membuka Modal dan Menyimpan ID
const promptDelete = (id) => {
  selectedPerfumeId.value = id
  showDeleteModal.value = true
}

// 2. Menutup Modal
const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedPerfumeId.value = null
}

// 3. Mengeksekusi Penghapusan ke API
const confirmDelete = async () => {
  if (!selectedPerfumeId.value) return

  try {
    await api.delete(`/perfumes/${selectedPerfumeId.value}`)

    // Refresh data koleksi di halaman yang sama
    fetchCollection(pagination.value.current_page)

    // Tutup modal dan bersihkan ID
    showDeleteModal.value = false
    selectedPerfumeId.value = null
  } catch (e) {
    alert('Gagal menghapus parfum. Silakan coba lagi.')
    console.error(e)
    showDeleteModal.value = false
  }
}
</script>

<style scoped>
/* =========================================
   Layout Dasar (Konsisten)
   ========================================= */
.dashboard-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.content-body {
  flex: 1;
  padding: 20px 50px 50px 50px;
  overflow-y: auto;
}
.content-body::-webkit-scrollbar {
  width: 8px;
}
.content-body::-webkit-scrollbar-thumb {
  background-color: #e0e0e0;
  border-radius: 4px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 20px;
  width: 448px;
}
.search-icon {
  width: 16px;
  height: 16px;
  color: #888;
  margin-right: 10px;
}
.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.85rem;
  width: 100%;
  color: #333;
}

/* =========================================
   JUDUL HALAMAN & TOMBOL TAMBAH
   ========================================= */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
}
.page-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #7d5731;
  line-height: 1.1;
  margin-bottom: 5px;
}
.page-subtitle {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}
.btn-gradient {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #7d5731 0%, #fac898 100%);
  border: none;
  border-radius: 30px;
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(125, 87, 49, 0.25);
  transition: transform 0.2s;
}
.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(125, 87, 49, 0.35);
}
.btn-gradient svg {
  width: 18px;
  height: 18px;
}

/* =========================================
   BAR FILTER & URUTAN
   ========================================= */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.filter-pills {
  display: flex;
  gap: 5px;
  background-color: #eeeeea;
  padding: 5px;
  border-radius: 30px;
}
.pill-btn {
  background: transparent;
  border: none;
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #5d605c;
  cursor: pointer;
  transition: all 0.2s;
}
.pill-btn.active {
  background-color: #ffffff;
  font-weight: 600;
  color: #7d5731;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.sort-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
}
.sort-label {
  font-size: 0.8rem;
  color: #888;
  font-weight: 600;
}

.sort-select-basic {
  background: transparent;
  border: none;
  font-size: 0.8rem;
  font-weight: 700;
  color: #7d5731; /* Warna cokelat sesuai desain inline */
  cursor: pointer;
  outline: none;
  font-family: inherit;
  padding: 0;
}

.sort-select-basic option {
  color: #333;
  font-weight: normal;
}

.sort-btn svg {
  width: 14px;
  height: 14px;
  stroke-width: 3px;
}
.sort-btn svg.rotate {
  transform: rotate(180deg);
}

.sort-menu-item:hover {
  background-color: #f5f5f5;
}
.sort-menu-item.active {
  background-color: #eee;
  font-weight: 600;
}

/* =========================================
   GRID KARTU PARFUM
   ========================================= */
.collection-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}
.perfume-card {
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
}
.perfume-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
}

/* =========================================
   ISI KARTU PARFUM (RATING & TAGS)
   ========================================= */
.card-content {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* Format Baris Atas (Brand & Rating) */
.card-top-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.card-brand {
  font-size: 0.65rem;
  font-weight: 800;
  color: #7d5731;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.card-rating {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
  font-weight: 800;
  color: #333;
}
.card-rating svg {
  width: 14px;
  height: 14px;
  color: #7d5731; /* Bintang warna cokelat */
}

/* Format Judul Parfum */
.card-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #271c1c;
  margin-bottom: 15px;
  line-height: 1.2;
}

/* Wadah untuk Tags Notes */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 25px;
  flex: 1; /* Mendorong tombol Detail ke bawah secara rata */
  align-content: flex-start;
}

/* Desain Tag Kotak (Pill) */
.tag-pill {
  background-color: #fdf5f1; /* Warna krem/peach lembut sesuai gambar */
  color: #8b6042; /* Cokelat sedikit bata */
  font-size: 0.65rem;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Tombol Detail */
.btn-outline-detail {
  display: block;
  text-align: center;
  text-decoration: none;
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #7d5731;
  transition: all 0.2s;
  margin-top: auto;
}
.btn-outline-detail:hover {
  border-color: #7d5731;
  color: #7d5731;
  background-color: transparent;
}
/* =========================================
   GAMBAR KARTU PARFUM
   ========================================= */
.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  background-color: #f8efe6; /* Warna latar belakang netral jika gambar gagal dimuat */
  overflow: hidden;
}

.perfume-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.perfume-card:hover .perfume-img {
  transform: scale(1.05); /* Efek zoom halus saat kartu di-hover */
}

/* Tombol Hapus (Opsional jika Anda ingin mengaktifkannya lagi nanti) */
.btn-delete-overlay {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: all 0.2s;
}
.btn-delete-overlay:hover {
  background-color: #fee2e2;
}
.btn-delete-overlay svg {
  width: 16px;
  height: 16px;
  stroke: #666;
}
.btn-delete-overlay:hover svg {
  stroke: #dc2626;
}
/* Konten Bawah Kartu */
.card-content {
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-top-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.card-brand {
  font-size: 0.65rem;
  font-weight: 700;
  color: #888;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.card-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 800;
  color: #333;
}
.card-rating svg {
  width: 14px;
  height: 14px;
  color: #7d5731;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 15px;
  line-height: 1.2;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 25px;
  flex: 1;
}
.tag-pill {
  background-color: #fcdccf;
  color: #634d43;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-outline-detail {
  display: block;
  text-align: center;
  text-decoration: none;
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #7d5731;
  transition: all 0.2s;
}
.btn-outline-detail:hover {
  border-color: #7d5731;
  color: #7d5731;
  background-color: transparent;
}

/* =========================================
   PAGINASI
   ========================================= */
.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #e5e5e5;
}
.pagination-info {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}
.pagination-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.page-num,
.page-nav-btn {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: 700;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.page-num:hover,
.page-nav-btn:hover {
  background-color: #e5e5e5;
}
.page-num.active {
  background-color: #7d5731;
  color: #ffffff;
}
.page-nav-btn svg {
  width: 16px;
  height: 16px;
}

/* =========================================
   GAYA MODAL KONFIRMASI (SAMA DENGAN PAGE DETAIL)
   ========================================= */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background-color: #ffffff;
  width: 450px;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-icon-wrapper {
  width: 64px;
  height: 64px;
  background-color: #fcdccf;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px auto;
}

.modal-icon {
  width: 28px;
  height: 28px;
  stroke: #b24b30;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 15px;
}

.modal-desc {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-modal-cancel,
.btn-modal-confirm {
  flex: 1;
  padding: 14px 0;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-modal-cancel {
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  color: #6b7280;
}
.btn-modal-cancel:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.btn-modal-confirm {
  background-color: #a73b21;
  border: 1px solid #a73b21;
  color: #ffffff;
}
.btn-modal-confirm:hover {
  background-color: #8c3a24;
}
/* Responsif Dasar */
@media (max-width: 1100px) {
  .collection-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
