<template>
  <section class="content-body">
    <div class="page-shell">
      <header class="welcome-section">
        <h1>Konfigurasi Aturan</h1>
        <p>
          Modulasi parameter lingkungan untuk menjaga integritas koleksi wewangian di
          Digital Atelier. Pastikan setiap variabel sesuai dengan standar kurasi
          ScentVault.
        </p>
      </header>

      <div class="stats-grid">
        <form class="stat-card" @submit.prevent="saveTemperatureSettings">
          <div class="stat-header">
            <div class="stat-icon config-icon temperature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14 14.76V3.5a2 2 0 1 0-4 0v11.26a4 4 0 1 0 4 0Z" />
              </svg>
            </div>

            <div class="config-card-title">
              <h2>Konfigurasi Suhu</h2>
              <p class="stat-badge">TEMPERATURE CONTROL</p>
            </div>
          </div>

          <div
            v-for="range in temperatureRanges"
            :key="range.key"
            class="field-group"
          >
            <label :for="`${range.key}-min`">{{ range.label }}</label>

            <div class="range-inputs">
              <input
                :id="`${range.key}-min`"
                v-model.number="range.min"
                class="field-input"
                type="number"
                min="0"
                max="100"
                step="1"
                placeholder="Min"
              />
              <input
                :id="`${range.key}-max`"
                v-model.number="range.max"
                class="field-input"
                type="number"
                min="0"
                max="100"
                step="1"
                placeholder="Max"
              />
            </div>
          </div>

          <button class="btn btn-solid" type="submit">Simpan Perubahan</button>
        </form>

        <form class="stat-card" @submit.prevent="saveTimeSettings">
          <div class="stat-header">
            <div class="stat-icon config-icon time-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>

            <div class="config-card-title">
              <h2>Interval Waktu</h2>
              <p class="stat-badge">TIME CYCLES</p>
            </div>
          </div>

          <div class="schedule-list">
            <div
              v-for="cycle in timeCycles"
              :key="cycle.key"
              class="schedule-row"
            >
              <div class="schedule-label">
                <div class="cycle-icon">
                  <svg
                    v-if="cycle.key === 'pagi'"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>

                  <svg
                    v-else-if="cycle.key === 'siang'"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v3" />
                    <path d="M12 19v3" />
                    <path d="M4.22 4.22l2.12 2.12" />
                    <path d="M17.66 17.66l2.12 2.12" />
                    <path d="M2 12h3" />
                    <path d="M19 12h3" />
                    <path d="M4.22 19.78l2.12-2.12" />
                    <path d="M17.66 6.34l2.12-2.12" />
                  </svg>

                  <svg
                    v-else
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </div>

                <span>{{ cycle.label }}</span>
              </div>

              <div class="time-inputs">
                <input
                  v-model="cycle.start"
                  class="time-input"
                  type="time"
                />
                <span class="time-separator">sampai</span>
                <input
                  v-model="cycle.end"
                  class="time-input"
                  type="time"
                />
              </div>
            </div>
          </div>

          <button class="btn btn-outline" type="submit">
            Simpan Konfigurasi Waktu
          </button>
        </form>
      </div>

      <section class="split-section info-banner">
        <div class="banner-copy">
          <h2>Preservasi Wewangian Adalah Seni yang Terukur</h2>
          <p>
            ScentVault menggunakan algoritma presisi untuk memastikan setiap botol
            parfum disimpan dalam kondisi atmosfer yang optimal. Konfigurasi yang Anda
            tetapkan di sini akan membantu sinkronisasi mikroklimat pada setiap unit
            atelier.
          </p>

          <div class="badge-group">
            <span class="info-badge">Atmosfer Terkendali</span>
            <span class="info-badge">Presisi Mikroklimat</span>
          </div>
        </div>

        <div class="banner-visual" aria-hidden="true">
          <div class="perfume-placeholder">
            <img :src="imgKonfigurasi" alt="Ilustrasi Konfigurasi" class="perfume-image-asset" />
          </div>
        </div>
      </section>
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
  </section>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import api from '@/services/api'
import imgKonfigurasi from '@/assets/parfum-konfigurasi.png'

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

const temperatureRanges = ref([])
const timeCycles = ref([])

const fetchConfigs = async () => {
  try {
    const res = await api.get('/admin/rule-configs')
    const configs = res.data.data
    temperatureRanges.value = configs
      .filter(c => c.type === 'temperature')
      .map(c => ({ id: c.id, key: c.label, label: `Rentang ${c.label} (°C)`, min: c.min_value, max: c.max_value }))
    timeCycles.value = configs
      .filter(c => c.type === 'time')
      .map(c => ({
        id: c.id,
        key: c.label,
        label: c.label.charAt(0).toUpperCase() + c.label.slice(1),
        start: String(c.min_value).padStart(2, '0') + ':00',
        end: String(c.max_value).padStart(2, '0') + ':00'
      }))
  } catch (err) {
    console.error(err)
    showToast('Gagal memuat konfigurasi aturan.', 'error')
  }
}

onMounted(() => {
  fetchConfigs()
})

const saveTemperatureSettings = async () => {
  try {
    for (const range of temperatureRanges.value) {
      await api.put(`/admin/rule-configs/${range.id}`, {
        type: 'temperature',
        label: range.key,
        min_value: range.min,
        max_value: range.max
      })
    }
    showToast('Perubahan suhu berhasil disimpan.')
  } catch(err) {
    console.error(err)
    showToast('Gagal menyimpan perubahan suhu.', 'error')
  }
}

const saveTimeSettings = async () => {
  try {
    for (const cycle of timeCycles.value) {
      const minVal = parseInt(cycle.start.split(':')[0])
      const maxVal = parseInt(cycle.end.split(':')[0])
      await api.put(`/admin/rule-configs/${cycle.id}`, {
        type: 'time',
        label: cycle.key,
        min_value: minVal,
        max_value: maxVal
      })
    }
    showToast('Konfigurasi waktu berhasil diperbarui.')
  } catch(err) {
    console.error(err)
    showToast('Gagal memperbarui konfigurasi waktu.', 'error')
  }
}

onBeforeUnmount(() => {
  if (toastTimeout) clearTimeout(toastTimeout)
})
</script>

<style scoped>
.content-body {
  width: 100%;
  flex: 1;
  padding: 20px 50px 50px 50px;
  box-sizing: border-box;
  background: transparent;
}

.page-shell {
  max-width: 1180px;
  margin: 0 auto;
}

.welcome-section {
  margin-bottom: 30px;
}

.welcome-section h1 {
  margin: 0 0 10px;
  font-size: 35.2px;
  line-height: 1.1;
  color: #7d5731;
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
}

.welcome-section p {
  margin: 0;
  max-width: 760px;
  font-size: 0.98rem;
  line-height: 1.75;
  color: #736b65;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 28px;
}

.stat-card {
  margin: 0;
  background: #fbfaf8;
  border: 1px solid rgba(125, 87, 49, 0.08);
  border-radius: 26px;
  padding: 28px;
  box-shadow: 0 12px 35px rgba(59, 42, 31, 0.07);
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.stat-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: #7d5731;
  flex-shrink: 0;
}

.config-icon {
  display: grid;
  place-items: center;
}

.temperature-icon {
  background: #f3ddd2;
}

.time-icon {
  background: #ece2b8;
}

.stat-icon svg,
.cycle-icon svg {
  width: 22px;
  height: 22px;
}

.config-card-title h2 {
  margin: 0;
  font-size: 1.18rem;
  color: #30241f;
  font-weight: 800;
}

.config-card-title .stat-badge {
  margin: 4px 0 0;
  color: #a29b94;
  font-size: 0.72rem;
  letter-spacing: 1.5px;
  font-weight: 700;
}

.stat-badge {
  display: inline-flex;
  align-items: center;
}

.field-group + .field-group {
  margin-top: 18px;
}

.field-group label {
  display: block;
  margin-bottom: 10px;
  font-size: 0.76rem;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #91867c;
  font-weight: 700;
}

.range-inputs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.field-input,
.time-input {
  border: none;
  outline: none;
  color: #43312a;
  font-size: 0.95rem;
  font-weight: 600;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.field-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  box-sizing: border-box;
  border-radius: 12px;
  background: #efefeb;
}

.time-input {
  width: 110px;
  height: 40px;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #ffffff;
  text-align: center;
}

.field-input:focus,
.time-input:focus {
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(125, 87, 49, 0.12);
}

.field-input::-webkit-outer-spin-button,
.field-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.field-input[type='number'] {
  -moz-appearance: textfield;
}

.time-input::-webkit-calendar-picker-indicator {
  opacity: 0.6;
  cursor: pointer;
}

.btn {
  width: 100%;
  height: 54px;
  margin-top: 26px;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-solid {
  background: transparent;
  border: 1.5px solid rgba(125, 87, 49, 0.6);
  color: #7d5731;
  box-shadow: none;
}

.btn-outline {
  background: transparent;
  border: 1.5px solid rgba(125, 87, 49, 0.6);
  color: #7d5731;
}

.btn-solid:hover,
.btn-outline:hover {
  border-color: transparent;
  color: #ffffff;
  background: linear-gradient(90deg, #8b6138 0%, #e9bf84 100%);
  box-shadow: 0 10px 24px rgba(125, 87, 49, 0.24);
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.schedule-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f3f1ec;
}

.schedule-label {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 120px;
  color: #3b2b25;
  font-weight: 700;
}

.cycle-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff;
  color: #987347;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.time-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.time-separator {
  font-size: 0.78rem;
  color: #958d86;
  font-weight: 600;
}

.split-section {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(240px, 0.85fr);
  gap: 24px;
}

.info-banner {
  align-items: center;
  background: #f0eeea;
  border: 1px solid rgba(125, 87, 49, 0.08);
  border-radius: 28px;
  padding: 32px 28px;
  box-shadow: 0 12px 28px rgba(59, 42, 31, 0.05);
}

.banner-copy h2 {
  margin: 0 0 14px;
  max-width: 560px;
  font-size: clamp(1.8rem, 3vw, 2.35rem);
  line-height: 1.12;
  color: #8a6035;
  font-weight: 800;
}

.banner-copy p {
  margin: 0 0 20px;
  max-width: 600px;
  font-size: 0.95rem;
  line-height: 1.8;
  color: #756d67;
}

.badge-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.info-badge {
  display: inline-flex;
  align-items: center;
  padding: 9px 14px;
  border-radius: 999px;
  background: #f2d6cb;
  color: #8f6140;
  font-size: 0.73rem;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.banner-visual {
  display: flex;
  justify-content: flex-end;
}

.perfume-placeholder {
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1.1 / 1;
  border-radius: 24px;
  background-color: #111; 
  box-shadow: 0 18px 36px rgba(17, 19, 34, 0.28);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.perfume-image-asset {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1100px) {
  .stats-grid,
  .split-section {
    grid-template-columns: 1fr;
  }

  .banner-visual {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .content-body {
    /* Padding handled globally */
  }

  .range-inputs {
    grid-template-columns: 1fr;
  }

  .schedule-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .time-inputs {
    width: 100%;
    justify-content: flex-start;
  }

  .time-input {
    width: 100%;
    max-width: 160px;
  }
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

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -8px);
}
</style>
