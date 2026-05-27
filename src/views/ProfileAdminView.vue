<template>
  <div class="content-body">
    <div class="page-header">
      <h1 class="page-title">Profil Admin</h1>
    </div>

    <transition name="toast-fade">
      <div
        v-if="toast.show"
        class="toast-notification"
        :class="toast.type"
        role="status"
        aria-live="polite"
      >
        <span class="toast-icon" aria-hidden="true">
          <svg v-if="toast.type === 'success'" viewBox="0 0 24 24" fill="none">
            <path d="M7 12.5l3.2 3.2L17.5 8.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none">
            <path d="M12 8v5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
            <circle cx="12" cy="16.5" r="1" fill="currentColor" />
          </svg>
        </span>
        <p>{{ toast.message }}</p>
      </div>
    </transition>

    <div class="profile-hero-card">
      <div class="hero-avatar-wrapper">
        <img :src="adminProfile.photoUrl" alt="Foto Profil" class="hero-avatar" />
      </div>

      <div class="hero-info">
        <h1 class="hero-name">{{ adminProfile.fullName || 'Admin' }}</h1>
        <div class="hero-actions">
          <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            accept="image/*"
            style="display: none"
          />
          <button class="btn-gradient" @click="triggerFileInput">Edit Foto</button>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card" v-for="stat in adminStats" :key="stat.key">
        <div class="stat-icon">
          <svg v-if="stat.key === 'users'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </div>
        <h2 class="stat-number">{{ stat.value }}</h2>
        <p class="stat-label">{{ stat.label }}</p>
      </div>
    </div>

    <div class="settings-card">
      <h3 class="settings-title">Pengaturan Akun</h3>

      <div class="settings-grid">
        <div class="input-group">
          <label>NAMA LENGKAP</label>
          <input type="text" class="form-control" v-model="adminProfile.fullName" />
        </div>

        <div class="input-group">
          <label>EMAIL</label>
          <input type="email" class="form-control" v-model="adminProfile.email" />
        </div>

        <div class="input-group">
          <label>KATA SANDI SAAT INI</label>
          <div class="password-wrapper">
            <svg class="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <input :type="showCurrentPassword ? 'text' : 'password'" class="form-control input-password" v-model="adminProfile.currentPassword" placeholder="••••••••" />
          </div>
        </div>

        <div class="input-group">
          <label>UBAH KATA SANDI</label>
          <div class="password-wrapper">
            <svg class="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <input :type="showPassword ? 'text' : 'password'" class="form-control input-password" v-model="adminProfile.password" placeholder="••••••••" />
            <button class="btn-toggle-password" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            </button>
          </div>
        </div>

        <div class="input-group">
          <label>KONFIRMASI KATA SANDI</label>
          <div class="password-wrapper">
            <svg class="icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
            <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control input-password" v-model="adminProfile.passwordConfirm" placeholder="••••••••" />
            <button class="btn-toggle-password" @click="showConfirmPassword = !showConfirmPassword">
              <svg v-if="!showConfirmPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            </button>
          </div>
        </div>

        <div class="input-group">
          <label>PROVINSI</label>
          <div class="select-wrapper">
            <select class="custom-select" v-model="selectedProvinsi" @change="onProvinsiChange">
              <option value="" disabled>Pilih Provinsi</option>
              <option v-for="p in provinsis" :key="p.code" :value="p.code">{{ p.name }}</option>
            </select>
            <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        <div class="input-group">
          <label>KABUPATEN/KOTA</label>
          <div class="select-wrapper">
            <select class="custom-select" v-model="selectedKabupaten" @change="onKabupatenChange" :disabled="!selectedProvinsi">
              <option value="" disabled>Pilih Kabupaten/Kota</option>
              <option v-for="k in kabupatens" :key="k.code" :value="k.code">{{ k.name }}</option>
            </select>
            <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        <div class="input-group">
          <label>KECAMATAN</label>
          <div class="select-wrapper">
            <select class="custom-select" v-model="selectedKecamatan" @change="onKecamatanChange" :disabled="!selectedKabupaten">
              <option value="" disabled>Pilih Kecamatan</option>
              <option v-for="c in kecamatans" :key="c.code" :value="c.code">{{ c.name }}</option>
            </select>
            <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        <div class="input-group">
          <label>KELURAHAN/DESA</label>
          <div class="select-wrapper">
            <select class="custom-select" v-model="adminProfile.kelurahan" :disabled="!selectedKecamatan">
              <option value="" disabled>Pilih Kelurahan/Desa</option>
              <option v-for="v in kelurahans" :key="v.code" :value="v.code">{{ v.name }}</option>
            </select>
            <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn-outline-cancel" @click="$router.back()">Batal</button>
        <button class="btn-gradient" @click="promptSave">Simpan Perubahan</button>
      </div>
    </div>

    <!-- Save Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <div class="success-icon-wrapper">
          <div class="success-icon-inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        </div>

        <h3 class="modal-title">Yakin Ingin Simpan<br />Perubahan?</h3>

        <div class="modal-actions-vertical">
          <button class="btn-gradient w-100" @click="confirmSave">IYA</button>
          <button class="btn-outline-brown w-100" @click="closeModal">TIDAK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onBeforeUnmount, onMounted } from 'vue'
import api from '@/services/api'
import defaultAvatar from '@/assets/profil.jpg'

const defaultProfile = {
  fullName: 'Brando',
  email: 'Elenavance@gmail.com',
  role: 'admin',
  currentPassword: '',
  password: '',
  passwordConfirm: '',
  provinsi: '',
  kabupaten: '',
  kecamatan: '',
  kelurahan: '',
  photoUrl: defaultAvatar
}

const originalProfile = { ...defaultProfile }
const adminProfile = reactive({ ...defaultProfile })

const showModal = ref(false)
const showCurrentPassword = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})
let toastTimeout = null

const closeModal = () => {
  showModal.value = false
}

const showToast = (message, type = 'success') => {
  toast.value = {
    show: true,
    message,
    type
  }

  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const provinsis = ref([])
const kabupatens = ref([])
const kecamatans = ref([])
const kelurahans = ref([])

const selectedProvinsi = ref('')
const selectedKabupaten = ref('')
const selectedKecamatan = ref('')

const fileInput = ref(null)
const selectedImageFile = ref(null)

const triggerFileInput = () => {
  if (fileInput.value) fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  selectedImageFile.value = file
  adminProfile.photoUrl = URL.createObjectURL(file)
}

const fetchProvinces = async () => {
  try {
    const res = await api.get('/region/provinces')
    provinsis.value = res.data
  } catch (e) {
    console.error('Gagal memuat provinsi', e)
  }
}

const onProvinsiChange = async () => {
  selectedKabupaten.value = ''
  selectedKecamatan.value = ''
  adminProfile.kelurahan = ''
  kabupatens.value = []
  kecamatans.value = []
  kelurahans.value = []

  if (!selectedProvinsi.value) return
  try {
    const res = await api.get('/region/regencies', {
      params: { province_code: selectedProvinsi.value },
    })
    kabupatens.value = res.data
  } catch (e) {
    console.error(e)
  }
}

const onKabupatenChange = async () => {
  selectedKecamatan.value = ''
  adminProfile.kelurahan = ''
  kecamatans.value = []
  kelurahans.value = []

  if (!selectedKabupaten.value) return
  try {
    const res = await api.get('/region/districts', {
      params: { regency_code: selectedKabupaten.value },
    })
    kecamatans.value = res.data
  } catch (e) {
    console.error(e)
  }
}

const onKecamatanChange = async () => {
  adminProfile.kelurahan = ''
  kelurahans.value = []

  if (!selectedKecamatan.value) return
  try {
    const res = await api.get('/region/villages', {
      params: { district_code: selectedKecamatan.value },
    })
    kelurahans.value = res.data
  } catch (e) {
    console.error(e)
  }
}

const adminStats = ref([
  { key: 'users', value: 0, label: 'TOTAL PENGGUNA' },
  { key: 'rules', value: 0, label: 'ATURAN TERKONFIGURASI' },
])

const fetchStats = async () => {
  try {
    const usersRes = await api.get('/admin/users', { params: { per_page: 1 } })
    if (usersRes.data?.data?.pagination?.total !== undefined) {
      adminStats.value[0].value = usersRes.data.data.pagination.total
    }
  } catch (err) {
    console.error('Gagal memuat statistik pengguna', err)
  }

  try {
    const rulesRes = await api.get('/admin/rule-configs')
    if (Array.isArray(rulesRes.data?.data)) {
      adminStats.value[1].value = rulesRes.data.data.length
    } else if (Array.isArray(rulesRes.data)) {
      adminStats.value[1].value = rulesRes.data.length
    }
  } catch (err) {
    console.error('Gagal memuat statistik aturan', err)
  }
}

const getAdminId = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.id
}

const loadProfile = async () => {
  const adminId = getAdminId()
  if (!adminId) return

  try {
    const res = await api.get(`/admin/users/${adminId}`)
    const admin = res.data.data
    adminProfile.fullName = admin.name
    adminProfile.email = admin.email
    adminProfile.role = admin.role || 'admin'
    
    // Stats for admin are fetched separately
    fetchStats()
    
    if (admin.photo) {
      adminProfile.photoUrl = `http://localhost:8000/storage/${admin.photo}?t=${new Date().getTime()}`
    } else {
      adminProfile.photoUrl = defaultAvatar
    }
    
    localStorage.setItem('user', JSON.stringify(admin))
    window.dispatchEvent(new Event('user-data-updated'))

    const village = admin.region
    const district = village?.parent || null
    const regency = district?.parent || null
    const province = regency?.parent || null

    if (province) {
      selectedProvinsi.value = province.code
      const resKab = await api.get('/region/regencies', {
        params: { province_code: province.code },
      })
      kabupatens.value = resKab.data
    }
    if (regency) {
      selectedKabupaten.value = regency.code
      const resKec = await api.get('/region/districts', { params: { regency_code: regency.code } })
      kecamatans.value = resKec.data
    }
    if (district) {
      selectedKecamatan.value = district.code
      const resKel = await api.get('/region/villages', { params: { district_code: district.code } })
      kelurahans.value = resKel.data
    }
    if (village) {
      adminProfile.kelurahan = village.code
    }
    
    Object.assign(originalProfile, adminProfile)
  } catch(err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchProvinces()
  loadProfile()
})

const promptSave = () => {
  showModal.value = true
}

const confirmSave = async () => {
  const adminId = getAdminId()
  if (!adminId) return

  try {
    const formData = new FormData()
    formData.append('_method', 'PATCH')
    formData.append('name', adminProfile.fullName)
    formData.append('email', adminProfile.email)

    if (adminProfile.password) {
      if (adminProfile.password !== adminProfile.passwordConfirm) {
        showModal.value = false
        showToast('Kata sandi tidak cocok.', 'error')
        return
      }
      formData.append('password', adminProfile.password)
      formData.append('password_confirmation', adminProfile.passwordConfirm)
    }

    if (adminProfile.kelurahan) {
      formData.append('region_code', adminProfile.kelurahan)
    }

    if (selectedImageFile.value) {
      formData.append('photo', selectedImageFile.value)
    }

    await api.post(`/admin/users/${adminId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    selectedImageFile.value = null
    await loadProfile()

    showToast('Perubahan profil berhasil disimpan.')
    showModal.value = false
  } catch(err) {
    console.error(err)
    showToast(err.response?.data?.message || 'Gagal menyimpan perubahan.', 'error')
    showModal.value = false
  }
}

const saveAdminProfile = confirmSave

onBeforeUnmount(() => {
  if (toastTimeout) clearTimeout(toastTimeout)
})
</script>

<style scoped>
.content-body {
  flex: 1;
  padding: 10px 50px 50px 50px;
  overflow-y: auto;
}
.toast-notification {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 260px;
  max-width: min(90vw, 360px);
  padding: 12px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(125, 87, 49, 0.12);
  box-shadow: 0 18px 34px rgba(41, 31, 21, 0.14);
  backdrop-filter: blur(8px);
}

.toast-notification.success {
  color: #2f7f46;
}

.toast-notification.error {
  color: #b84536;
}

.toast-icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.toast-notification.success .toast-icon {
  background: #e7f7eb;
}

.toast-notification.error .toast-icon {
  background: #fdeaea;
}

.toast-icon svg {
  width: 16px;
  height: 16px;
}

.toast-notification p {
  margin: 0;
  color: #3f3833;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
}

.content-body::-webkit-scrollbar {
  width: 8px;
}
.content-body::-webkit-scrollbar-thumb {
  border-radius: 4px;
}

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

.profile-hero-card {
  background: linear-gradient(135deg, #f4f4f0 0%, #fdfdfd 100%);
  border-radius: 24px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 35px;
  margin-bottom: 30px;
}
.hero-avatar-wrapper {
  width: 140px;
  height: 140px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}
.hero-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.hero-name {
  font-size: 2.5rem;
  font-weight: 800;
  color: #7d5731;
  margin-bottom: 40px;
  letter-spacing: -0.5px;
  line-height: 1;
}
.hero-actions {
  display: flex;
  gap: 15px;
}
.hero-actions .btn-gradient {
  padding: 8px 24px;
  font-size: 0.8rem;
  border-radius: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 30px;
}
.stat-card {
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
}
.stat-icon {
  margin-bottom: 20px;
}
.stat-icon svg {
  width: 28px;
  height: 28px;
  stroke: #7d5731;
}
.stat-number {
  font-size: 2.8rem;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 8px;
}
.stat-label {
  font-size: 0.7rem;
  font-weight: 800;
  color: #a0a0a0;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.settings-card {
  background-color: #f4f4f0;
  border-radius: 24px;
  padding: 40px;
}
.settings-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 30px;
}

.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  row-gap: 5px;
  margin-bottom: 25px;
}

.input-group {
  margin-bottom: 25px;
}
.input-group label {
  display: block;
  font-size: 0.65rem;
  font-weight: 800;
  color: #888;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.form-control {
  background-color: #ffffff;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 16px 20px;
  font-family: inherit;
  font-size: 0.95rem;
  color: #333;
  width: 100%;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.01);
}
.form-control:focus {
  border-color: #7d5731;
  outline: none;
}

.select-wrapper {
  position: relative;
  width: 100%;
}
.custom-select {
  padding: 16px 40px 16px 20px;
  background-color: #ffffff;
  border: 1px solid transparent;
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.95rem;
  color: #333;
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.01);
  outline: none;
}
.custom-select:focus {
  border-color: #7d5731;
}
.select-arrow {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #888;
  pointer-events: none;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.input-password {
  padding-left: 50px;
  padding-right: 50px;
}
.icon-left {
  position: absolute;
  left: 20px;
  width: 18px;
  height: 18px;
  stroke: #a0a0a0;
  pointer-events: none;
}
.btn-toggle-password {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-toggle-password svg {
  width: 18px;
  height: 18px;
  stroke: #a0a0a0;
  transition: stroke 0.2s;
}
.btn-toggle-password:hover svg {
  stroke: #7d5731;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-top: 40px;
}

.btn-outline-cancel {
  background-color: transparent;
  border: 1px solid #d1d5db;
  border-radius: 30px;
  padding: 12px 35px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #7d5731;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-outline-cancel:hover {
  background-color: #f3f4f6;
  color: #333;
}

.btn-gradient {
  padding: 14px 30px;
  background: linear-gradient(135deg, #7d5731 0%, #fac898 100%);
  border: none;
  border-radius: 30px;
  color: #ffffff;
  font-weight: 400;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(125, 87, 49, 0.25);
  transition: transform 0.2s;
}
.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(125, 87, 49, 0.35);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(24, 18, 14, 0.42);
  backdrop-filter: blur(6px);
}

.modal-card {
  width: 350px;
  padding: 32px 28px 28px;
  border-radius: 30px;
  background: linear-gradient(180deg, #f8f4ef 0%, #fbfaf8 100%);
  box-shadow: 0 24px 70px rgba(25, 18, 12, 0.28);
  text-align: center;
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

.success-icon-wrapper {
  width: 70px;
  height: 70px;
  background-color: #f4f4f0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 25px auto;
}

.success-icon-inner {
  width: 36px;
  height: 36px;
  background-color: #7d5731;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.success-icon-inner svg {
  width: 18px;
  height: 18px;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #7d5731;
  line-height: 1.3;
  margin-bottom: 30px;
}

.modal-actions-vertical {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.w-100 {
  width: 100%;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 14px 0;
}

.btn-outline-brown {
  background-color: transparent;
  border: 1px solid #e5e5e5;
  border-radius: 30px;
  color: #7d5731;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-outline-brown:hover {
  border-color: #7d5731;
  background-color: #fafafa;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -8px);
}

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .settings-grid {
    grid-template-columns: 1fr;
  }
  .profile-hero-card {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  .hero-meta,
  .hero-actions {
    justify-content: center;
  }
}
</style>
