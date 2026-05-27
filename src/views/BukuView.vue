<template>
  <div class="dashboard-layout">
    <Sidebar />

    <main class="main-content">
      <Topbar />

      <div class="content-body">
        <div class="page-header">
          <h1 class="page-title">Buku Harian Aroma</h1>
          <p class="page-subtitle">Dokumentasikan perjalanan sensorik Anda.</p>
        </div>

        <div class="diary-grid">
          <div class="left-column">
            <div class="form-card new-entry-card">
              <div class="card-header-title">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <h3>Catatan Baru</h3>
              </div>

              <div class="input-group">
                <label>PILIH PARFUM</label>
                <div class="input-with-icon">
                  <svg class="left-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="9"></circle>
                    <circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none"></circle>
                    <circle cx="15" cy="9.5" r="1" fill="currentColor" stroke="none"></circle>
                    <path d="M8.5 14c1.5 1.5 5.5 1.5 7 0"></path>
                  </svg>
                  
                  <select class="form-control select-custom with-pad" v-model="newEntry.perfume_id">
                    <option value="" disabled>Cari koleksi...</option>
                    <option v-for="p in perfumes" :key="p.id" :value="p.id">{{ p.name }}</option>
                  </select>
                  
                  <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <div class="input-row">
                <div class="input-group">
                  <label>CUACA</label>
                  <div class="input-with-icon">
                    <svg class="left-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                    </svg>

                    <select class="form-control select-custom with-pad" v-model="newEntry.weather">
                      <option value="" disabled>Kondisi saat ini</option>
                      <option v-for="w in weathers" :key="w" :value="w">{{ w }}</option>
                    </select>

                    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                
                <div class="input-group">
                  <label>ACARA</label>
                  <div class="input-with-icon">
                    <svg class="left-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>

                    <select class="form-control select-custom with-pad" v-model="newEntry.occasion_id">
                      <option value="" disabled>Tujuan hari ini</option>
                      <option v-for="o in occasions" :key="o.id" :value="o.id">{{ o.name }}</option>
                    </select>
                    
                    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <label>CATATAN AROMA</label>
                <textarea class="form-control textarea-custom" placeholder="Tulis catatan singkat di sini..." v-model="newEntry.notes_review"></textarea>
              </div>

              <button class="btn-gradient w-100" @click="submitEntry">SIMPAN ENTRI</button>
            </div>
          </div>

          <div class="right-column">
            <div class="list-header">
              <h3>List Catatan</h3>
            </div>

            <transition-group name="fade-slide" tag="div" class="entries-list">
              <div class="entry-card" v-for="entry in displayedEntries" :key="entry.id">
                
                <div class="entry-card-top">
                  <div class="entry-title-group">
                    <h4 class="entry-perfume-name">{{ entry.perfume?.name }}</h4>
                    <span class="entry-subtitle">{{ entry.occasion?.name }} • {{ entry.weather }}</span>
                  </div>
                  <div class="entry-date-group">
                    <span class="entry-date-text">{{ formatDate(entry.created_at) }}</span>
                    <button class="btn-delete-small" @click="deleteEntry(entry.id)">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="entry-card-content">
                  <div class="entry-icon-box">
                    <svg v-if="entry.weather === 'Cerah'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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

                    <svg v-else-if="entry.weather === 'Berawan'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                      <path d="M22 12h-1"></path>
                      <path d="M19.07 4.93l-.71.71"></path>
                      <path d="M12 2v1"></path>
                      <path d="M4.93 4.93l.71.71"></path>
                    </svg>

                    <svg v-else-if="entry.weather === 'Mendung'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                    </svg>

                    <svg v-else-if="entry.weather === 'Hujan'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 13v8"></path>
                      <path d="M8 13v8"></path>
                      <path d="M12 15v8"></path>
                      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
                    </svg>

                    <svg v-else-if="entry.weather === 'Sejuk'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                    </svg>

                    <svg v-else-if="entry.weather === 'Dingin'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 12h20"></path>
                      <path d="M12 2v20"></path>
                      <path d="m20 16-4-4 4-4"></path>
                      <path d="m4 8 4 4-4 4"></path>
                      <path d="m16 4-4 4-4-4"></path>
                      <path d="m8 20 4-4 4 4"></path>
                    </svg>
                    
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </div>
                  
                  <div class="entry-quote-text">
                    "{{ entry.notes_review }}"
                  </div>
                </div>

              </div>
            </transition-group>

            <div class="list-footer-link" v-if="diaryEntries.length > 2" @click="toggleEntries">
              <span>{{ showAllEntries ? 'TUTUP CATATAN' : 'BUKA SEMUA CATATAN' }}</span>
              <svg :class="{ 'rotate-icon': showAllEntries }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import axios from 'axios'

const diaryEntries = ref([])
const perfumes = ref([])
const occasions = ref([
  { id: 1, name: 'Santai / Kasual' },
  { id: 2, name: 'Bekerja / Kantor' },
  { id: 3, name: 'Kencan / Romantis' },
  { id: 4, name: 'Pesta / Malam Hari' },
  { id: 5, name: 'Olahraga / Outdoor' }
])

const weathers = ['Cerah', 'Berawan', 'Mendung', 'Hujan', 'Sejuk', 'Dingin']

const newEntry = ref({
  perfume_id: '',
  weather: '',
  occasion_id: '',
  notes_review: ''
})

const fetchScentLogs = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await axios.get('http://localhost:8000/api/scentLog', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.data?.success) {
      diaryEntries.value = res.data.data
    }
  } catch (error) {
    console.error('Gagal mengambil daftar buku harian:', error)
  }
}

const fetchPerfumes = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await axios.get('http://localhost:8000/api/perfumes', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.data?.data) {
      perfumes.value = res.data.data
    }
  } catch (error) {
    console.error('Gagal mengambil daftar parfum:', error)
  }
}

onMounted(() => {
  fetchScentLogs()
  fetchPerfumes()
})

const submitEntry = async () => {
  if (!newEntry.value.notes_review.trim() || !newEntry.value.perfume_id || !newEntry.value.occasion_id) {
    alert("Silakan isi semua pilihan!")
    return
  }

  try {
    const token = localStorage.getItem('token')
    const payload = {
      perfume_id: newEntry.value.perfume_id,
      occasion_id: newEntry.value.occasion_id,
      weather: newEntry.value.weather,
      notes_review: newEntry.value.notes_review
    }
    
    // Asumsi occasion_id belum ada seedernya, jika API error 422 'exists:occasions,id', backend perlu occassion logic.
    // Tapi kita kirim sesuai request. 

    const res = await axios.post('http://localhost:8000/api/scentLog', payload, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (res.data?.success) {
      diaryEntries.value.unshift(res.data.data)
      newEntry.value.perfume_id = ''
      newEntry.value.occasion_id = ''
      newEntry.value.notes_review = ''
      newEntry.value.weather = '' 
    }
  } catch (error) {
    console.error('Gagal menyimpan entry:', error)
    if(error.response?.data?.message) {
      alert("Error: " + error.response.data.message)
    }
  }
}

const deleteEntry = async (id) => {
  if (!confirm('Hapus catatan aroma ini?')) return
  try {
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:8000/api/scentLog/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    diaryEntries.value = diaryEntries.value.filter(e => e.id !== id)
  } catch (error) {
    console.error('Gagal menghapus entry:', error)
  }
}

const showAllEntries = ref(false)

const displayedEntries = computed(() => {
  return showAllEntries.value ? diaryEntries.value : diaryEntries.value.slice(0, 2)
})

const toggleEntries = () => {
  showAllEntries.value = !showAllEntries.value
}

const formatDate = (dateString) => {
  if(!dateString) return ''
  const d = new Date(dateString)
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const getIconType = (weather) => {
  const isCloudy = ['Berawan', 'Mendung', 'Hujan'].includes(weather)
  return isCloudy ? 'cloud' : 'moon'
}
</script>

<style scoped>
/* =========================================
   Layout Dasar & Header (Konsisten)
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

/* =========================================
   JUDUL HALAMAN
   ========================================= */
.page-header {
  margin-bottom: 40px;
}
.page-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #7d5731;
  line-height: 1.1;
  margin-bottom: 10px;
}
.page-subtitle {
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
}

/* =========================================
   GRID BUKU HARIAN (1 : 1.8)
   ========================================= */
.diary-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr; /* Sesuai proporsi desain Figma */
  gap: 40px;
  align-items: start;
}

/* =========================================
   KOLOM KIRI: FORM CATATAN BARU
   ========================================= */

.left-column {
  position: sticky;
  top: 10px; /* Jarak aman dari atap layar saat mulai menempel */
  z-index: 10; /* Memastikan form selalu berada di atas jika ada elemen yang tumpang tindih */
}

.form-card {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 35px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}
.card-header-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}
.card-header-title svg {
  width: 20px;
  height: 20px;
  stroke: #7d5731;
}
.card-header-title h3 {
  font-size: 1.2rem;
  font-weight: 800;
  color: #1a1a1a;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 25px;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 25px;
}
.input-row .input-group {
  margin-bottom: 0;
}

.input-group label {
  font-size: 0.65rem;
  font-weight: 800;
  color: #888;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Input dengan Ikon di dalam */
.input-with-icon {
  position: relative;
  width: 100%;
}
.left-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  stroke: #888;
  pointer-events: none;
}
.form-control {
  background-color: #f4f4f0;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 14px 18px;
  font-family: inherit;
  font-size: 0.85rem;
  color: #303330;
  transition: all 0.2s;
  width: 100%;
}
.form-control.with-pad {
  padding-left: 42px;
} /* Padding extra untuk ikon kiri */
.form-control:focus {
  border-color: #7d5731;
  outline: none;
  background-color: #ffffff;
}

.select-custom {
  appearance: none;
  cursor: pointer;
}
.chevron {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  stroke: #888;
  pointer-events: none;
}

.textarea-custom {
  resize: none;
  height: 140px;
  line-height: 1.6;
  padding: 18px;
  font-style: italic;
}

.btn-gradient.w-100 {
  width: 100%;
  padding: 14px 0;
  justify-content: center;
  background: linear-gradient(135deg, #7d5731 0%, #fac898 100%);
  border: none;
  border-radius: 30px;
  color: #ffffff;
  font-weight: 500;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: transform 0.2s;
}
.btn-gradient.w-100:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(125, 87, 49, 0.35);
}

/* =========================================
   KOLOM KANAN: LIST CATATAN
   ========================================= */
.list-header {
  margin-bottom: 25px;
}
.list-header h3 {
  font-size: 1.2rem;
  font-weight: 800;
  color: #333;
}

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

/* Bagian Atas Kartu (Judul & Tanggal) */
.entry-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-left: 50px; /* Menyelaraskan teks dengan quote di bawahnya */
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
.btn-delete-small {
  background: none;
  border: none;
  color: #c0c0c0;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}
.btn-delete-small:hover {
  color: #d32f2f;
}
.btn-delete-small svg {
  width: 14px;
  height: 14px;
}

/* Bagian Bawah Kartu (Ikon & Quote) */
.entry-card-content {
  display: flex;
  gap: 15px;
  align-items: stretch; /* Memastikan garis vertikal menyesuaikan tinggi teks */
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
  border-left: 2px solid #eaddd5; /* Garis vertikal estetis */
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

/* Animasi Putar untuk Ikon Panah View More */
.list-footer-link svg.rotate-icon {
  transform: rotate(180deg);
}

/* =========================================
   ANIMASI TRANSISI LIST (VIEW MORE)
   ========================================= */
/* Durasi dan jenis transisi */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* State awal saat masuk, dan state akhir saat keluar */
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px); /* Muncul dari sedikit di atas / hilang ke atas */
}

/* Memastikan elemen yang bergeser posisinya juga dianimasikan dengan mulus */
.fade-slide-move {
  transition: transform 0.5s ease;
}

/* Responsif */
@media (max-width: 1100px) {
  .diary-grid {
    grid-template-columns: 1fr;
  }
  .entry-card-top {
    padding-left: 0; /* Menghilangkan indentasi di layar kecil */
  }
}
</style>
