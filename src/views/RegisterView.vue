<template>
  <div class="auth-page">
    <main class="auth-container">
      <div class="auth-card">
        <div class="auth-image-section">
          <div class="image-overlay"></div>
          <div class="branding-content">
            <h1 class="brand-title">Atelier<br />Digital.</h1>
            <p class="brand-tagline">
              Kurasi identitas penciuman Anda dalam brankas pribadi wewangian langka dan esensi
              artisan kami.
            </p>
          </div>
        </div>

        <div class="auth-form-section">
          <div class="form-scroll-wrapper">
            <div class="form-header">
              <span class="sub-heading">KEANGGOTAAN</span>
              <h2>Buat Akun</h2>
              <p>Mulailah perjalanan Anda ke dunia wewangian mewah</p>
            </div>

            <form @submit.prevent="handleRegister" class="auth-form">
              <div class="form-group">
                <label for="name">NAMA LENGKAP</label>
                <div class="input-wrapper">
                  <svg
                    class="input-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    placeholder="Elias Vance"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="email">ALAMAT EMAIL</label>
                <div class="input-wrapper">
                  <svg
                    class="input-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    ></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    placeholder="atelier@scentvault.com"
                    required
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group half-width">
                  <label for="password">KATA SANDI</label>
                  <div class="input-wrapper">
                    <svg
                      class="input-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>

                    <input
                      :type="showPassword ? 'text' : 'password'"
                      id="password"
                      v-model="form.password"
                      placeholder="••••••••"
                      required
                    />

                    <svg
                      class="toggle-password-icon"
                      @click="showPassword = !showPassword"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        v-if="!showPassword"
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      ></path>
                      <circle v-if="!showPassword" cx="12" cy="12" r="3"></circle>
                      <path
                        v-if="showPassword"
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                      ></path>
                      <line v-if="showPassword" x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  </div>
                </div>

                <div class="form-group half-width">
                  <label for="password_confirmation">KONFIRMASI</label>
                  <div class="input-wrapper">
                    <svg
                      class="input-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <polyline points="9 12 11 14 15 10"></polyline>
                    </svg>

                    <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      id="password_confirmation"
                      v-model="form.password_confirmation"
                      placeholder="••••••••"
                      required
                    />

                    <svg
                      class="toggle-password-icon"
                      @click="showConfirmPassword = !showConfirmPassword"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        v-if="!showConfirmPassword"
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      ></path>
                      <circle v-if="!showConfirmPassword" cx="12" cy="12" r="3"></circle>
                      <path
                        v-if="showConfirmPassword"
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                      ></path>
                      <line v-if="showConfirmPassword" x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  </div>
                </div>
              </div>
              <p v-if="passwordError" class="error-text">Kata sandi tidak cocok.</p>

              <div class="form-group">
                <label for="provinsi">PROVINSI</label>
                <div class="select-wrapper">
                  <select id="provinsi" v-model="form.provinsi" class="custom-select" required>
                    <option value="" disabled selected>Pilih Provinsi</option>
                    <option v-for="prov in provinsis" :key="prov.code" :value="prov.code">
                      {{ prov.name }}
                    </option>
                  </select>
                  <svg
                    class="select-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <div class="form-group">
                <label for="kabupaten">KABUPATEN/KOTA</label>
                <div class="select-wrapper">
                  <select
                    id="kabupaten"
                    v-model="form.kabupaten"
                    class="custom-select"
                    required
                    :disabled="!form.provinsi"
                  >
                    <option value="" disabled selected>Pilih Kabupaten/Kota</option>
                    <option v-for="kab in kabupatens" :key="kab.code" :value="kab.code">
                      {{ kab.name }}
                    </option>
                  </select>
                  <svg
                    class="select-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <div class="form-group">
                <label for="kecamatan">KECAMATAN</label>
                <div class="select-wrapper">
                  <select
                    id="kecamatan"
                    v-model="form.kecamatan"
                    class="custom-select"
                    required
                    :disabled="!form.kabupaten"
                  >
                    <option value="" disabled selected>Pilih Kecamatan</option>
                    <option v-for="kec in kecamatans" :key="kec.code" :value="kec.code">
                      {{ kec.name }}
                    </option>
                  </select>
                  <svg
                    class="select-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <div class="form-group">
                <label for="Kelurahan">KELURAHAN/DESA</label>
                <div class="select-wrapper">
                  <select
                    id="kelurahan"
                    v-model="form.kelurahan"
                    class="custom-select"
                    required
                    :disabled="!form.kecamatan"
                  >
                    <option value="" disabled selected>Pilih Kelurahan/Desa</option>
                    <option v-for="kel in kelurahans" :key="kel.code" :value="kel.code">
                      {{ kel.name }}
                    </option>
                  </select>
                  <svg
                    class="select-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="form.agreeTerms" required />
                  <span class="checkmark"></span>
                  <span
                    >Saya setuju dengan <a href="#" class="inline-link">Ketentuan Layanan</a> dan
                    <a href="#" class="inline-link">Kebijakan Privasi</a>.</span
                  >
                </label>
              </div>

              <button type="submit" class="btn-submit" :disabled="isLoading || !form.agreeTerms">
                {{ isLoading ? 'MEMPROSES...' : 'Bergabung dengan Atelier' }}
              </button>
            </form>

            <p class="login-link">Sudah punya akun? <RouterLink to="/">Masuk</RouterLink></p>
          </div>
        </div>
      </div>
    </main>

    <footer class="auth-footer">
      <div class="footer-left">
        <h3 class="footer-logo">ScentVault</h3>
        <p>© 2024 SCENTVAULT. CRAFTED FOR THE DIGITAL ATELIER.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  provinsi: '',
  kabupaten: '',
  kecamatan: '',
  kelurahan: '',
  agreeTerms: false,
})

const isLoading = ref(false)
const errorMessage = ref('')

// UNTUK FITUR MATA (EYE ICON)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Data Asli untuk Lokasi
const provinsis = ref([])
const kabupatens = ref([])
const kecamatans = ref([])
const kelurahans = ref([])

// Logika reaktif untuk mengecek kecocokan kata sandi
const passwordError = computed(() => {
  if (form.password_confirmation && form.password !== form.password_confirmation) {
    return true
  }
  return false
})

const fetchProvinces = async () => {
  try {
    const res = await api.get('/region/provinces')
    provinsis.value = res.data
  } catch (error) {
    console.error('Failed to fetch provinces', error)
  }
}

const fetchRegencies = async (provinceCode) => {
  try {
    const res = await api.get(`/region/regencies?province_code=${provinceCode}`)
    kabupatens.value = res.data
  } catch (error) {
    console.error('Failed to fetch regencies', error)
  }
}

const fetchDistricts = async (regencyCode) => {
  try {
    const res = await api.get(`/region/districts?regency_code=${regencyCode}`)
    kecamatans.value = res.data
  } catch (error) {
    console.error('Failed to fetch districts', error)
  }
}

const fetchVillages = async (districtCode) => {
  try {
    const res = await api.get(`/region/villages?district_code=${districtCode}`)
    kelurahans.value = res.data
  } catch (error) {
    console.error('Failed to fetch villages', error)
  }
}

watch(
  () => form.provinsi,
  (newCode) => {
    form.kabupaten = ''
    kabupatens.value = []
    if (newCode) fetchRegencies(newCode)
  },
)

watch(
  () => form.kabupaten,
  (newCode) => {
    form.kecamatan = ''
    kecamatans.value = []
    if (newCode) fetchDistricts(newCode)
  },
)

watch(
  () => form.kecamatan,
  (newCode) => {
    form.kelurahan = ''
    kelurahans.value = []
    if (newCode) fetchVillages(newCode)
  },
)

onMounted(() => {
  fetchProvinces()
})

const handleRegister = async () => {
  if (passwordError.value) {
    alert('Mohon pastikan konfirmasi kata sandi Anda sama.')
    return
  }

  if (!form.kelurahan) {
    alert('Harap pilih Kelurahan/Desa.')
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
      region_code: form.kelurahan,
    }

    const response = await api.post('/register', payload)

    if (response.data) {
      alert('Registrasi Berhasil! Silakan login dengan akun Anda.')
      router.push('/')
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message
      alert(errorMessage.value)
    } else {
      alert('Gagal melakukan pendaftaran. Periksa koneksi Anda.')
    }
    console.error('Register error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* =========================================
   Layout Utama & Header
   ========================================= */
.auth-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: #f8f7f5; /* Warna latar sedikit cream sesuai desain */
}

.auth-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px 20px 20px;
  height: calc(100% - 130px); /* Memperhitungkan tinggi header & footer */
}

/* =========================================
   Kartu Registrasi
   ========================================= */
.auth-card {
  display: flex;
  width: 100%;
  max-width: 1050px;
  height: 100%; /* Mengisi sisa ruang */
  max-height: 850px;
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
}

/* --- Kolom Kiri --- */
.auth-image-section {
  flex: 1;
  position: relative;
  background-image: url('@/assets/register-bg.jpeg');
  background-size: cover;
  background-position: center;
  background-color: #c0b2a3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 50px 40px;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(162, 142, 122, 0.8) 0%, rgba(162, 142, 122, 0) 100%);
  pointer-events: none;
}

.branding-content {
  position: relative;
  z-index: 2;
  color: white;
}

.brand-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 15px;
  color: #ffffff;
}

.brand-tagline {
  font-size: 0.95rem;
  line-height: 1.6;
  font-weight: 500;
  opacity: 0.9;
}

/* --- Kolom Kanan --- */
.auth-form-section {
  flex: 1.1; /* Sedikit lebih lebar dari gambar */
  background-color: #ffffff;
  position: relative;
}

.form-scroll-wrapper {
  padding: 40px 60px;
  height: 100%;
  overflow-y: auto; /* Kunci rahasia agar bisa di-scroll internal */
  scrollbar-width: thin;
}

/* Scrollbar kustom agar terlihat bersih */
.form-scroll-wrapper::-webkit-scrollbar {
  width: 6px;
}
.form-scroll-wrapper::-webkit-scrollbar-thumb {
  background-color: #e0e0e0;
  border-radius: 10px;
}

.sub-heading {
  font-size: 0.7rem;
  font-weight: 700;
  color: #986d4d;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.form-header h2 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-top: 5px;
  margin-bottom: 5px;
}

.form-header p {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 25px;
}

/* =========================================
   Elemen Formulir
   ========================================= */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 0.7rem;
  font-weight: 800;
  color: #555;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.form-row {
  display: flex;
  gap: 15px;
}
.half-width {
  flex: 1;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.input-icon {
  position: absolute;
  left: 14px;
  width: 16px;
  height: 16px;
  color: #a0a0a0;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 40px 12px 40px;
  background-color: #eeede8; /* Warna keabuan khas desain */
  border: 1px solid transparent;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.85rem;
  color: #333;
  transition: all 0.2s ease;
  outline: none;
}
.input-wrapper input:focus {
  background-color: #ffffff;
  border-color: #986d4d;
}

.toggle-password-icon {
  position: absolute;
  right: 14px;
  width: 18px;
  height: 18px;
  color: #a0a0a0;
  cursor: pointer;
  transition: color 0.2s;
}
.toggle-password-icon:hover {
  color: #986d4d;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.custom-select {
  width: 100%;
  padding: 14px 40px 14px 20px;
  background-color: #efefef;
  border: 1px solid transparent;
  border-radius: 14px;
  font-family: inherit;
  font-size: 0.85rem;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.custom-select:focus {
  background-color: #ffffff;
  border-color: #b08d70;
  box-shadow: 0 0 0 3px rgba(176, 141, 112, 0.1);
}

.custom-select:invalid {
  color: #0000000;
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #666;
  pointer-events: none;
}

/* Custom Checkbox */
.checkbox-group {
  margin-top: 15px;
  margin-bottom: 25px;
}
.checkbox-label {
  display: flex;
  align-items: flex-start;
  font-size: 0.75rem !important;
  color: #666 !important;
  cursor: pointer;
  line-height: 1.4;
}
.checkbox-label input {
  display: none;
}
.checkmark {
  min-width: 16px;
  height: 16px;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
  margin-right: 10px;
  margin-top: 2px;
  display: inline-block;
  position: relative;
}
.checkbox-label input:checked ~ .checkmark {
  background-color: #986d4d;
  border-color: #986d4d;
}
.checkbox-label input:checked ~ .checkmark::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 3px;
  height: 7px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.inline-link {
  color: #986d4d;
  text-decoration: none;
  font-weight: 600;
}

/* Tombol Submit */
.btn-submit {
  width: 100%;
  padding: 14px;
  background: linear-gradient(to right, #8b6042 0%, #e0bd9e 100%);
  border: none;
  border-radius: 30px; /* Bentuk pil sesuai desain */
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    transform 0.1s,
    box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(152, 109, 77, 0.2);
}
.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(152, 109, 77, 0.4);
}
.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 4px 15px rgba(152, 109, 77, 0.2);
}

.login-link {
  text-align: center;
  margin-top: 15px;
  font-size: 0.85rem;
  color: #666;
}
.login-link a {
  color: #986d4d;
  font-weight: 700;
  text-decoration: none;
}
.error-text {
  color: #e74c3c;
  font-size: 0.75rem;
  margin-top: -10px;
  margin-bottom: 10px;
}

/* =========================================
   Footer
   ========================================= */
.auth-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  border-top: 1px solid #e8e8e8;
  color: #888;
  background-color: transparent;
}

.footer-left .footer-logo {
  font-size: 1.1rem;
  font-weight: 800;
  color: #986d4d;
  margin-bottom: 4px;
}

.footer-left p {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin: 0;
}
</style>
