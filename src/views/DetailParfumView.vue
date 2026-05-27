<template>
  <div class="dashboard-layout">
    <Sidebar />

    <main class="main-content">
      <Topbar />

      <div class="content-body">
        <div class="action-bar">
          <button class="btn-back" @click="$router.back()">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          <div class="action-buttons">
            <button class="btn-action btn-edit" @click="$router.push(`/edit-parfum/${perfumeId}`)">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="action-icon"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              UBAH
            </button>

            <button class="btn-action btn-delete" @click="showDeleteModal = true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="action-icon"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              HAPUS
            </button>
          </div>
        </div>

        <div class="product-layout" v-if="perfume">
          <div class="product-gallery-side">
            <div class="main-image">
              <img :src="getImageUrl(perfume.image_url)" :alt="perfume.name" />
            </div>

            <div class="check-btn-wrapper">
              <button class="btn-gradient" @click="$router.push(`/kesesuaian?id=${perfumeId}`)">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9 3l1.5 4.5L15 9l-4.5 1.5L9 15l-1.5-4.5L3 9l4.5-1.5L9 3z"></path>
                  <path d="M18 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"></path>
                </svg>
                CEK KESESUAIAN AROMA
              </button>
            </div>
          </div>

          <div class="product-info-side">
            <span class="brand-name">{{ perfume.brand?.name || perfume.brand }}</span>
            <h2 class="product-title">{{ perfume.name }}</h2>

            <div class="rating-row">
              <div class="stars">
                <svg
                  v-for="i in Math.floor(perfume.star_rating || 0)"
                  :key="i"
                  class="star-icon full"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  ></path>
                </svg>
                <svg
                  v-if="perfume.star_rating % 1 !== 0"
                  class="star-icon half"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  ></path>
                </svg>
              </div>
              <span class="date-added">Ditambahkan pada {{ formatDate(perfume?.created_at) }}</span>
            </div>

            <p class="description">
              {{ perfume.description }}
            </p>

            <h3 class="section-heading">Piramida Olfaktori</h3>
            <div class="olfactory-grid">
              <div class="olfactory-col">
                <h4>AROMA PUNCAK</h4>
                <div class="notes-stack">
                  <span
                    class="note-pill"
                    v-for="note in perfume.notes?.filter((n) => n.type === 'top') || []"
                    :key="`top-${note.id || note.name}`"
                    >{{ note.name }}</span
                  >
                </div>
              </div>
              <div class="olfactory-col">
                <h4>AROMA INTI</h4>
                <div class="notes-stack">
                  <span
                    class="note-pill"
                    v-for="note in perfume.notes?.filter((n) => n.type === 'middle') || []"
                    :key="`mid-${note.id || note.name}`"
                    >{{ note.name }}</span
                  >
                </div>
              </div>
              <div class="olfactory-col">
                <h4>AROMA DASAR</h4>
                <div class="notes-stack">
                  <span
                    class="note-pill"
                    v-for="note in perfume.notes?.filter((n) => n.type === 'base') || []"
                    :key="`base-${note.id || note.name}`"
                    >{{ note.name }}</span
                  >
                </div>
              </div>
            </div>
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
import { ref, onMounted } from 'vue'
import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'

import defaultImg from '@/assets/upload-parfum.jpeg'

const router = useRouter()
const route = useRoute()

const perfumeId = route.params.id

const perfume = ref(null)
const loading = ref(true)

const fetchPerfume = async () => {
  try {
    const res = await api.get(`/perfumes/${perfumeId}`)
    perfume.value = res.data.data
  } catch (err) {
    console.error('Failed fetching perfume detail', err)
    alert('Data parfum tidak ditemukan.')
    router.push('/koleksi')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (perfumeId) fetchPerfume()
})

// ==========================================
// FUNGSI LOGIKA GAMBAR DINAMIS (ANTI-CACHE)
// ==========================================
const getImageUrl = (path) => {
  if (!path) return defaultImg

  const timestamp = new Date().getTime()
  
  // Ambil hanya nama direktori setelah "storage/" untuk mengabaikan localhost tanpa port dari backend
  let relativePath = path
  if (path.includes('/storage/')) {
    relativePath = path.split('/storage/')[1]
  }

  // Jika ini adalah link internet eksternal murni
  if (relativePath.startsWith('http')) {
    return relativePath.includes('?') ? `${relativePath}&t=${timestamp}` : `${relativePath}?t=${timestamp}`
  }

  // Gunakan baseUrl yang fix dan ditambahkan cap waktu
  const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  return `http://127.0.0.1:8000/storage${cleanPath}?t=${timestamp}`
}
const formatDate = (dateString) => {
  if (!dateString) return ''
  const d = new Date(dateString)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}

// =========================================
// STATE UNTUK MENGONTROL MODAL HAPUS
// =========================================
const showDeleteModal = ref(false)

const closeDeleteModal = () => {
  showDeleteModal.value = false
}

const confirmDelete = async () => {
  try {
    await api.delete(`/perfumes/${perfumeId}`)
    showDeleteModal.value = false
    router.push('/koleksi')
  } catch (err) {
    console.error('Failed to delete perfume', err)
    alert('Gagal menghapus parfum.')
    showDeleteModal.value = false
  }
}
</script>
<style scoped>
/* =========================================
   Layout Utama
   ========================================= */
.dashboard-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* =========================================
   Kanvas Utama (Header & Scroll)
   ========================================= */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.icon-btn:hover {
  background-color: #f0f0f0;
  color: #986d4d;
}
.icon-btn svg {
  width: 20px;
  height: 20px;
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

/* =========================================
   Action Bar (Back, Ubah, Hapus)
   ========================================= */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.btn-back {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #7d5731;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s;
}
.btn-back:hover {
  transform: scale(1.05);
}
.btn-back svg {
  width: 18px;
  height: 18px;
}
.action-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-action {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.action-icon {
  width: 16px;
  height: 16px;
}

.btn-edit {
  background-color: transparent;
  border-color: #b0b3ae5d;
  color: #7d5731;
}
.btn-edit:hover {
  background-color: #f9fafb;
  border-color: #7d5731;
  color: #7d5731;
}
.btn-edit .action-icon {
  stroke: #7d5731;
}

.btn-delete {
  background-color: transparent;
  border-color: rgba(230, 174, 174, 0.4);
  color: #a73b21;
}
.btn-delete:hover {
  background-color: #f9fafb;
  border-color: #b91c1c;
  color: #b91c1c;
}

.btn-delete .action-icon {
  stroke: #991b1b;
}
.btn-delete:hover .action-icon {
  stroke: #b91c1c;
}

/* =========================================
   GAYA MODAL (POP-UP HAPUS)
   ========================================= */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); /* Layar redup */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Pastikan selalu berada di paling atas */
}

.modal-card {
  background-color: #ffffff;
  width: 450px; /* Lebar card sesuai desain */
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  animation: modalFadeIn 0.3s ease; /* Efek transisi halus */
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
  background-color: #fcdccf; /* Latar merah muda */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px auto;
}

.modal-icon {
  width: 28px;
  height: 28px;
  stroke: #b24b30; /* Merah karat untuk ikon */
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
  flex: 1; /* Membuat kedua tombol sama panjang */
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
  background-color: #a73b21; /* Warna merah/cokelat sesuai desain */
  border: 1px solid #a73b21;
  color: #ffffff;
}
.btn-modal-confirm:hover {
  background-color: #8c3a24;
}

/* =========================================
Product Layout (Kiri: Gambar, Kanan: Info)
========================================= */
.product-layout {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr; /* Proporsi Kiri & Kanan */
  gap: 50px;
  margin-bottom: 60px;
}

/* --- KIRI: Galeri --- */
.main-image {
  width: 100%;
  aspect-ratio: 4/5;
  background-color: #111;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 15px;
}
.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.check-btn-wrapper {
  display: flex;
  justify-content: center;
}
.btn-gradient {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #7d5731 0%, #fac898 100%);
  border: none;
  border-radius: 30px;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.8rem;
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

/* --- KANAN: Informasi --- */
.brand-name {
  display: block;
  font-size: 0.75rem;
  font-weight: 800;
  color: #7d5731;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
}
.product-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #303330;
  line-height: 1.1;
  margin-bottom: 15px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}
.stars {
  display: flex;
  gap: 2px;
  color: #7d5731;
}
.star-icon {
  width: 18px;
  height: 18px;
}
.star-icon.half {
  opacity: 0.4;
} /* Simulasi simpel untuk bintang setengah */
.date-added {
  font-size: 0.8rem;
  color: #5d605c;
  font-weight: 600;
}

.description {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #5d605c;
  text-align: justify;
  margin-bottom: 35px;
}

/* Piramida Olfaktori */
.section-heading {
  font-size: 1.1rem;
  font-weight: 800;
  color: #303330;
  margin-bottom: 20px;
}

.olfactory-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}
.olfactory-col {
  background-color: #f4f4f0;
  border-radius: 12px;
  padding: 24px;
  border-left: 5px solid #6f4c26;
}

.olfactory-col h4 {
  font-size: 0.65rem;
  font-weight: 700;
  color: #888;
  letter-spacing: 1px;
  margin-bottom: 15px;
  text-transform: uppercase;
}
.notes-stack {
  display: flex;
  flex-direction: column;
  gap: 9px;
  align-items: flex-start;
}
.note-pill {
  background-color: #ffffff;
  border: none;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #444;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.01);
}

/* Responsif */
@media (max-width: 1100px) {
  .product-layout {
    grid-template-columns: 1fr;
  }
}
</style>
