<template>
  <main class="add-user-page">
    <div class="action-bar">
      <button class="btn-back" type="button" @click="$router.back()">
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
    </div>

    <section class="page-header">
      <div>
        <h1>Tambah Pengguna</h1>
        <p>
          Daftarkan kurator atau pengelola baru ke dalam ekosistem Digital
          Atelier ScentVault.
        </p>
      </div>
    </section>

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

    <section class="form-shell">
      <form class="user-form" @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="field-group">
            <label for="fullName">Nama Lengkap</label>
            <input
              id="fullName"
              v-model="form.name"
              type="text"
              placeholder="Contoh: Jean-Claude Ellena"
            />
          </div>

          <div class="field-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="nama@scentvault.com"
            />
          </div>

          <div class="field-group">
            <label for="password">Kata Sandi</label>
            <div class="password-wrap">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
              />
              <button
                class="input-action"
                type="button"
                :aria-label="showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                @click="showPassword = !showPassword"
              >
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 3l18 18M10.6 10.6A2 2 0 0 0 13.4 13.4M9.88 5.09A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a17.34 17.34 0 0 1-4.06 4.62M6.1 6.1C3.56 7.76 2 12 2 12a17.3 17.3 0 0 0 7.9 5.9"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="field-group">
            <label for="passwordConfirm">Konfirmasi Kata Sandi</label>
            <div class="password-wrap">
              <input
                id="passwordConfirm"
                v-model="form.passwordConfirm"
                :type="showPasswordConfirm ? 'text' : 'password'"
                placeholder="••••••••"
              />
              <button
                class="input-action"
                type="button"
                :aria-label="showPasswordConfirm ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                @click="showPasswordConfirm = !showPasswordConfirm"
              >
                <svg v-if="!showPasswordConfirm" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 3l18 18M10.6 10.6A2 2 0 0 0 13.4 13.4M9.88 5.09A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a17.34 17.34 0 0 1-4.06 4.62M6.1 6.1C3.56 7.76 2 12 2 12a17.3 17.3 0 0 0 7.9 5.9"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="field-group">
            <label for="role">Pilih Peran</label>
            <div class="select-wrap">
              <select id="role" v-model="form.role">
                <option value="" disabled></option>
                <option
                  v-for="option in roleOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div class="field-group">
            <label for="provinsi">Provinsi</label>
            <div class="select-wrap">
              <select id="provinsi" v-model="form.provinsi" @change="onProvinsiChange">
                <option value="" disabled>Pilih Provinsi</option>
                <option v-for="p in provinsis" :key="p.code" :value="p.code">{{ p.name }}</option>
              </select>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>

          <div class="field-group">
            <label for="kabupaten">Kabupaten/Kota</label>
            <div class="select-wrap">
              <select
                id="kabupaten"
                v-model="form.kabupaten"
                :disabled="!form.provinsi"
                @change="onKabupatenChange"
              >
                <option value="" disabled>Pilih Kabupaten/Kota</option>
                <option v-for="k in kabupatens" :key="k.code" :value="k.code">{{ k.name }}</option>
              </select>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>

          <div class="field-group">
            <label for="kecamatan">Kecamatan</label>
            <div class="select-wrap">
              <select
                id="kecamatan"
                v-model="form.kecamatan"
                :disabled="!form.kabupaten"
                @change="onKecamatanChange"
              >
                <option value="" disabled>Pilih Kecamatan</option>
                <option v-for="c in kecamatans" :key="c.code" :value="c.code">{{ c.name }}</option>
              </select>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>

          <div class="field-group">
            <label for="kelurahan">Kelurahan/Desa</label>
            <div class="select-wrap">
              <select id="kelurahan" v-model="form.kelurahan" :disabled="!form.kecamatan">
                <option value="" disabled>Pilih Kelurahan/Desa</option>
                <option v-for="v in kelurahans" :key="v.code" :value="v.code">{{ v.name }}</option>
              </select>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </div>



        <div class="form-actions">
          <button class="btn btn-primary" type="submit">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M18 8v8M14 12h8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.5 19.5a5.5 5.5 0 0 1 11 0"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="9" cy="8" r="3.25" stroke="currentColor" stroke-width="2" />
            </svg>
            <span>Buat Pengguna</span>
          </button>
        </div>
      </form>
    </section>

    <transition name="modal-fade">
      <div
        v-if="showSuccessModal"
        class="modal-overlay"
        @click.self="closeModal"
      >
        <div class="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title">
          <div class="success-icon-wrap">
            <div class="success-icon-glow"></div>
            <div class="success-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 12.5l3.2 3.2L17.5 8.5"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <h2 id="success-title">Pengguna Berhasil Ditambahkan</h2>
          <p>
            Kredensial akses telah dikirimkan ke alamat email yang didaftarkan.
          </p>

          <div class="modal-actions">
            <button class="btn btn-primary modal-btn" type="button" @click="goToList">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Kembali ke Daftar</span>
            </button>

            <button class="btn btn-ghost modal-btn" type="button" @click="handleAddAnother">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M18 8v8M14 12h8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.5 19.5a5.5 5.5 0 0 1 11 0"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="9" cy="8" r="3.25" stroke="currentColor" stroke-width="2" />
            </svg>
              <span>Tambah Lagi</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const showSuccessModal = ref(false)
const provinsis = ref([])
const kabupatens = ref([])
const kecamatans = ref([])
const kelurahans = ref([])
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})
let toastTimeout = null

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

const roleOptions = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
]

const defaultForm = () => ({
  name: '',
  email: '',
  role: '',
  password: '',
  passwordConfirm: '',
  provinsi: '',
  kabupaten: '',
  kecamatan: '',
  kelurahan: '',
})

const form = ref(defaultForm())

const resetForm = () => {
  form.value = defaultForm()
  kabupatens.value = []
  kecamatans.value = []
  kelurahans.value = []
  showPassword.value = false
  showPasswordConfirm.value = false
}

const fetchProvinces = async () => {
  try {
    const res = await api.get('/region/provinces')
    provinsis.value = res.data
  } catch (error) {
    console.error('Gagal memuat provinsi.', error)
  }
}

const onProvinsiChange = async () => {
  form.value.kabupaten = ''
  form.value.kecamatan = ''
  form.value.kelurahan = ''
  kabupatens.value = []
  kecamatans.value = []
  kelurahans.value = []

  if (!form.value.provinsi) return

  try {
    const res = await api.get('/region/regencies', {
      params: { province_code: form.value.provinsi },
    })
    kabupatens.value = res.data
  } catch (error) {
    console.error('Gagal memuat kabupaten/kota.', error)
  }
}

const onKabupatenChange = async () => {
  form.value.kecamatan = ''
  form.value.kelurahan = ''
  kecamatans.value = []
  kelurahans.value = []

  if (!form.value.kabupaten) return

  try {
    const res = await api.get('/region/districts', {
      params: { regency_code: form.value.kabupaten },
    })
    kecamatans.value = res.data
  } catch (error) {
    console.error('Gagal memuat kecamatan.', error)
  }
}

const onKecamatanChange = async () => {
  form.value.kelurahan = ''
  kelurahans.value = []

  if (!form.value.kecamatan) return

  try {
    const res = await api.get('/region/villages', {
      params: { district_code: form.value.kecamatan },
    })
    kelurahans.value = res.data
  } catch (error) {
    console.error('Gagal memuat kelurahan/desa.', error)
  }
}

const saveUserToLocalStorage = () => {
  const existingUsers = JSON.parse(localStorage.getItem('scentvault_users') || '[]')

  const selectedRole = roleOptions.find((item) => item.value === form.value.role)

  const newUser = {
    id: Date.now(),
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    role: selectedRole ? selectedRole.label : form.value.role,
    status: 'active',
    image: '',
    image: '',
  }

  existingUsers.unshift(newUser)
  localStorage.setItem('scentvault_users', JSON.stringify(existingUsers))
}

const handleSubmit = async () => {
  if (
    !form.value.name.trim() ||
    !form.value.email.trim() ||
    !form.value.role ||
    !form.value.password.trim() ||
    !form.value.passwordConfirm.trim() ||
    form.value.password !== form.value.passwordConfirm
  ) {
    if (form.value.password !== form.value.passwordConfirm) {
      showToast('Kata sandi dan konfirmasi kata sandi tidak cocok.', 'error')
    } else {
      showToast('Mohon lengkapi semua field terlebih dahulu.', 'error')
    }
    return
  }

  try {
    await api.post('/admin/users', {
      name: form.value.name.trim(),
      email: form.value.email.trim(),
      password: form.value.password.trim(),
      password_confirmation: form.value.passwordConfirm.trim(),
      role: form.value.role,
      region_code: form.value.kelurahan || null,
    })
    showSuccessModal.value = true
  } catch (error) {
    if(error.response && error.response.data && error.response.data.message) {
      showToast(error.response.data.message, 'error')
    } else {
      showToast('Gagal menambahkan pengguna.', 'error')
    }
  }
}

const handleCancel = () => {
  resetForm()
}

const closeModal = () => {
  showSuccessModal.value = false
}

const handleAddAnother = () => {
  closeModal()
  resetForm()
}

const goToList = () => {
  closeModal()
  router.push('/manajemen-pengguna')
}

onMounted(() => {
  fetchProvinces()
})

onBeforeUnmount(() => {
  if (toastTimeout) clearTimeout(toastTimeout)
})
</script>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

.add-user-page {
  --bg: #f7f5f1;
  --panel: #fbfaf8;
  --panel-line: rgba(125, 87, 49, 0.08);
  --title: #8a6035;
  --body: #736b65;
  --label: #9b918a;
  --field-bg: #efefeb;
  --field-text: #5d554f;
  --field-placeholder: #b0a9a2;
  --primary: #8b6138;
  --primary-dark: #7d5731;
  --primary-soft: #e9bf84;
  --white: #ffffff;
  --success: #4caf62;
  --success-soft: #e7f7eb;

  width: 100%;
  padding: 20px 50px 50px;
  box-sizing: border-box;
  background: transparent;
}

.toast-notification {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 90;
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

.action-bar {
  display: flex;
  justify-content: flex-start;
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

.page-header {
  margin-bottom: 42px;
}

.page-header h1 {
  margin: 0 0 10px;
  color: #7d5731;
  font-family: 'Manrope', sans-serif;
  font-size: 35.2px;
  line-height: 1.02;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.page-header p {
  max-width: 620px;
  margin: 0;
  color: var(--body);
  font-size: 1rem;
  line-height: 1.72;
}

.form-shell {
  max-width: 980px;
}

.user-form {
  padding: 38px 40px 44px;
  border-radius: 28px;
  background: var(--panel);
  border: 1px solid var(--panel-line);
  box-shadow: 0 20px 40px rgba(77, 57, 34, 0.035);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 30px 40px;
}

.field-group label {
  display: inline-block;
  margin-bottom: 12px;
  color: var(--label);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.field-group input,
.field-group select {
  width: 100%;
  height: 56px;
  border: 1px solid transparent;
  outline: none;
  border-radius: 14px;
  background: var(--field-bg);
  color: var(--field-text);
  font-size: 1rem;
  padding: 0 20px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  -webkit-text-fill-color: var(--field-text);
}

.field-group input::placeholder {
  color: var(--field-placeholder);
}

.field-group input:focus,
.field-group select:focus {
  border-color: rgba(139, 97, 56, 0.22);
  box-shadow: 0 0 0 4px rgba(139, 97, 56, 0.08);
  background: #f2f1ed;
  color: var(--field-text);
  -webkit-text-fill-color: var(--field-text);
}

.field-group input:-webkit-autofill,
.field-group input:-webkit-autofill:hover,
.field-group input:-webkit-autofill:focus,
.field-group input:-webkit-autofill:active {
  -webkit-text-fill-color: var(--field-text);
  -webkit-box-shadow: 0 0 0 1000px var(--field-bg) inset;
  transition: background-color 9999s ease-in-out 0s;
}

.select-wrap,
.password-wrap {
  position: relative;
}

.select-wrap select {
  appearance: none;
  padding-right: 54px;
  cursor: pointer;
}

.field-group select option {
  background: #ffffff;
  color: var(--field-text);
}

.select-wrap svg,
.input-action svg,
.btn svg,
.success-icon svg {
  width: 18px;
  height: 18px;
}

.select-wrap svg {
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translateY(-50%);
  color: #82776d;
  pointer-events: none;
}

.password-wrap input {
  padding-right: 52px;
  letter-spacing: 0.12em;
}

.input-action {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #86796d;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.status-panel {
  margin-top: 34px;
  padding: 22px 22px 22px 24px;
  border-radius: 16px;
  background: #f3f1ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.status-copy h3 {
  margin: 0 0 4px;
  color: #37332f;
  font-size: 1.18rem;
  font-weight: 800;
}

.status-copy p {
  margin: 0;
  color: var(--body);
  font-size: 0.96rem;
}

.status-toggle-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-toggle {
  position: relative;
  width: 46px;
  height: 26px;
  border: 0;
  border-radius: 999px;
  background: #d7d2cb;
  padding: 3px;
  cursor: pointer;
  transition: background 0.18s ease;
}

.status-toggle.active {
  background: var(--primary);
}

.toggle-thumb {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--white);
  transform: translateX(0);
  transition: transform 0.18s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.status-toggle.active .toggle-thumb {
  transform: translateX(20px);
}

.toggle-label {
  min-width: 68px;
  color: var(--primary);
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 18px;
  margin-top: 40px;
}

.btn {
  height: 45px;
  padding: 0 28px;
  border-radius: 999px;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  color: #fff;
  background: linear-gradient(90deg, #8b6138 0%, #e9bf84 100%);
  box-shadow: 0 14px 28px rgba(139, 97, 56, 0.18);
}

.btn-ghost {
  color: #4a433d;
  background: #efefea;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(24, 18, 14, 0.42);
  backdrop-filter: blur(6px);
}

.success-modal {
  width: min(100%, 462px);
  padding: 42px 36px 34px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 26px 60px rgba(41, 31, 21, 0.16);
  text-align: center;
}

.success-icon-wrap {
  position: relative;
  width: 72px;
  height: 72px;
  margin: 0 auto 16px;
}

.success-icon-glow {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(101, 214, 122, 0.24) 0%, rgba(101, 214, 122, 0) 72%);
}

.success-icon {
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--success);
  border: 3px solid currentColor;
  background: var(--success-soft);
}

.success-modal h2 {
  margin: 0 0 12px;
  color: #2f2c29;
  font-size: clamp(1.8rem, 2vw, 2.25rem);
  line-height: 1.02;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.success-modal p {
  max-width: 300px;
  margin: 0 auto;
  color: #7a726b;
  font-size: 0.98rem;
  line-height: 1.65;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}

.modal-btn {
  min-width: 152px;
  padding-inline: 18px;
  font-size: 0.86rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .success-modal,
.modal-fade-leave-to .success-modal {
  transform: translateY(10px) scale(0.98);
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

@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .status-panel {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .add-user-page {
    padding: 20px;
  }

  .user-form {
    padding: 26px 20px 28px;
    border-radius: 22px;
  }

  .form-actions,
  .modal-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn,
  .modal-btn {
    width: 100%;
  }

  .success-modal {
    padding: 34px 22px 24px;
    border-radius: 24px;
  }
}
</style>
