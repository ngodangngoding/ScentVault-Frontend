<template>
  <div class="dashboard-layout">
    <Sidebar />

    <main class="main-content">
     <Topbar />

      <div class="content-body">
        <section class="welcome-section">
          <h2>Selamat datang kembali, {{ user.name || 'Kurator' }}</h2>
          <p>Atelier digital Anda telah dikurasi dan siap untuk pilihan hari ini.</p>
        </section>

        <section class="stats-grid">
          <div class="stat-card">
            <div class="stat-header">
              <svg
                class="stat-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7D5731"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 3l1.5 4.5L15 9l-4.5 1.5L9 15l-1.5-4.5L3 9l4.5-1.5L9 3z"></path>
                <path d="M18 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"></path>
                <path d="M17 2l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5z"></path>
              </svg>
              <span class="stat-badge">INVENTARIS</span>
            </div>
            <h3 class="stat-number">{{ summary.total_perfumes }}</h3>
            <p class="stat-label">Total Parfum</p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <svg
                class="stat-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7D5731"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span class="stat-badge">ARSIP</span>
            </div>
            <h3 class="stat-number">{{ summary.total_scent_logs }}</h3>
            <p class="stat-label">Catatan Harian</p>
          </div>
        </section>

        <div class="split-section">
          <section class="recommendation-area">
            <h3 class="section-title">Rekomendasi Hari Ini</h3>
            <div class="recom-card" v-if="recommendation">
              <div class="recom-image">
              <img :src="getImageUrl(recommendation.image_url || recommendation.image)" :alt="recommendation.name" />
            </div>
              <div class="recom-content">
                <h4 class="perfume-name">{{ recommendation.name }}</h4>
                <div class="tags">
                  <span class="tag" v-for="(note, idx) in recommendation.notes" :key="idx">{{ note.name || note }}</span>
                </div>
                <p class="perfume-desc">
                  {{ recommendation.description || 'Pilihan sempurna untuk hari ini.' }}
                </p>
                <button class="btn-detail" @click="goDetail(recommendation.perfume_id || recommendation.id)">LIHAT DETAIL</button>
              </div>
            </div>
            <div v-else class="empty-state">
              Belum ada rekomendasi parfum untuk Anda saat ini.
            </div>
          </section>

          <section class="journal-area">
            <h3 class="section-title">Buku Harian Terbaru</h3>
            
            <div class="entries-list">
              <div class="entry-card" v-for="entry in recentJournals" :key="entry.id">
                
                <div class="entry-card-top">
                  <div class="entry-title-group">
                    <h4 class="entry-perfume-name">{{ entry.title || 'Parfum' }}</h4>
                    <span class="entry-subtitle">{{ entry.occasion?.name || 'OCCASION' }} • {{ (entry.weather || 'CERAH').toUpperCase() }}</span>
                  </div>
                  <div class="entry-date-group">
                    <span class="entry-date-text">{{ new Date(entry.input_date).toLocaleDateString() }}</span>
                  </div>
                </div>

                <div class="entry-card-content">
                  <div class="entry-icon-box">
                    <svg v-if="entry.weather?.toLowerCase() === 'cerah'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    <svg v-else-if="entry.weather?.toLowerCase() === 'malam' || entry.weather?.toLowerCase() === 'sejuk'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                    </svg>
                  </div>
                  <div class="entry-quote-text">
                    "{{ entry.notes_review }}"
                  </div>
                </div>

              </div>
              
              <div v-if="recentJournals.length === 0" class="empty-state">
                Belum ada catatan buku harian.
              </div>
            </div>

            <div class="list-footer-link" @click="$router.push('/buku')">
              <span>BUKA SEMUA CATATAN</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import defaultImg from '@/assets/upload-parfum.JPEG'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

const summary = ref({
  total_perfumes: 0,
  total_scent_logs: 0
})

const recommendation = ref(null)
const recentJournals = ref([])
const isLoading = ref(true)

const getImageUrl = (path) => {
  if (!path) return defaultImg

  const timestamp = new Date().getTime()
  
  // Ambil hanya nama direktori setelah "storage/"
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

const fetchHomeData = async () => {
  try {
    const response = await api.get('/pages/home')
    const resData = response.data.data
    summary.value = resData.summary
    recommendation.value = resData.today_recommendation?.perfume || null
    
    // Fetch semua parfum untuk mengambil image_url tanpa mengubah backend
    if (recommendation.value) {
      try {
        const resPerfumes = await api.get('/perfumes')
        const perfumeList = resPerfumes.data.data || resPerfumes.data
        const recomId = recommendation.value.perfume_id || recommendation.value.id
        
        const matchedPerfume = perfumeList.find(p => p.id === recomId)
        
        if (matchedPerfume && (matchedPerfume.image_url || matchedPerfume.image)) {
          // Inject properti image_url sehingga UI bisa membacanya
          recommendation.value.image_url = matchedPerfume.image_url || matchedPerfume.image
        }
      } catch (imgError) {
        console.error('Gagal mengambil gambar rekomendasi:', imgError)
      }
    }

    recentJournals.value = (resData.scent_logs || []).slice(0, 3)
    
  } catch (error) {
    console.error('Gagal mengambil data beranda:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchHomeData()
})

const goDetail = (id) => {
  router.push(`/detail/${id}`)
}
</script>

<style scoped>
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

/* --- Area Scrollable & Konten Bawah Tetap Sama --- */
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
.section-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 20px;
}
.welcome-section {
  margin-bottom: 30px;
}
.welcome-section h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #7d5731;
  margin-bottom: 5px;
  letter-spacing: -0.5px;
}
.welcome-section p {
  font-size: 0.9rem;
  color: #5d605c;
  font-weight: 500;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}
.stat-card {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}
.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.stat-icon {
  width: 22px;
  height: 22px;
}
.stat-badge {
  background-color: #f5f5f5;
  color: #a0a0a0;
  font-size: 0.6rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 12px;
  letter-spacing: 0.5px;
}
.stat-number {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 5px;
}
.stat-label {
  font-size: 0.8rem;
  color: #888;
  font-weight: 600;
}
.split-section {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}
.recom-card {
  display: flex;
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  height: 320px;
}
.recom-image {
  flex: 1;
}
.recom-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.recom-content {
  flex: 1.2;
  padding: 35px 40px;;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.brand-name {
  font-size: 0.65rem;
  font-weight: 800;
  color: #7d5731;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.perfume-name {
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.1;
  margin-bottom: 15px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}
.tag {
  font-size: 0.7rem;
  font-weight: 400;
  color: #634d43;
  background-color: #fcdccf;
  padding: 4px 10px;
  border-radius: 12px;
}
.perfume-desc {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
}
.btn-detail {
  align-self: flex-start;
  margin-top: auto; 
  padding: 10px 20px;
  background: linear-gradient(135deg, #7d5731 0%, #fac898 100%);
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(152, 109, 77, 0.2);
  transition: transform 0.2s;
}
.btn-detail:hover {
  transform: translateY(-2px);
}
/* =========================================
   LIST CATATAN (Gaya Baru)
   ========================================= */
.entries-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.entry-card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s;
}
.entry-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
}

.entry-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-left: 50px;
}

.entry-title-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.entry-perfume-name {
  font-size: 1rem;
  font-weight: 800;
  color: #333;
}
.entry-subtitle {
  font-size: 0.6rem;
  color: #a0a0a0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.entry-date-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}
.entry-date-text {
  font-size: 0.65rem;
  color: #b0b0b0;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.entry-card-content {
  display: flex;
  gap: 15px;
  align-items: stretch;
}

.entry-icon-box {
  width: 35px;
  height: 35px;
  border-radius: 8px;
  background-color: #f4f4f0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.entry-icon-box svg {
  width: 16px;
  height: 16px;
  stroke: #888;
}

.entry-quote-text {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.7;
  border-left: 2px solid #eaddd5;
  padding-left: 15px;
}

/* Link Footer */
.list-footer-link {
  text-align: center;
  margin-top: 35px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.list-footer-link span {
  font-size: 0.7rem;
  font-weight: 700;
  color: #b0b0b0;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: color 0.2s;
}
.list-footer-link svg {
  width: 14px;
  height: 14px;
  stroke: #b0b0b0;
  transition: stroke 0.2s;
}
.list-footer-link:hover span, 
.list-footer-link:hover svg {
  color: #7d5731;
  stroke: #7d5731;
}

@media (max-width: 1100px) {
  .entry-card-top {
    padding-left: 0; 
  }
}
</style>
