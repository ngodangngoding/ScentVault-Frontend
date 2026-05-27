<template>
  <section class="user-detail-page">
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

    <div class="user-card">
      <header class="profile-header">
        <div class="profile-info">
          <div class="avatar-wrap">
            <img
              v-if="avatarSrc"
              :src="avatarSrc"
              :alt="form.name || 'User avatar'"
              class="avatar-image"
            />
            <div v-else class="avatar-fallback">
              {{ initials }}
            </div>
          </div>

          <div class="profile-meta">
            <div class="name-row">
              <h1 class="user-name">{{ form.name }}</h1>
            </div>
            <p class="user-role">{{ form.role }}</p>
          </div>
        </div>

        <div class="header-actions">
          <button type="button" class="btn-action btn-edit" @click="toggleEdit()">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="action-icon"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            {{ isEditing ? 'MODE LIHAT' : 'EDIT PROFIL' }}
          </button>

          <button type="button" class="btn-action btn-delete" @click="handleDelete">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="action-icon"
            >
              <polyline points="3 6 5 6 21 6" />
              <path
                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
            HAPUS
          </button>
        </div>
      </header>

      <div class="form-grid">
        <div class="field">
          <label class="field-label">Nama Lengkap</label>
          <input
            v-if="isEditing"
            v-model="form.name"
            class="input-field"
            type="text"
            placeholder="Masukkan nama lengkap"
          />
          <div v-else class="field-display">{{ form.name || '-' }}</div>
        </div>

        <div class="field">
          <label class="field-label">Tanggal Bergabung</label>

          <input
            v-if="isEditing"
            v-model="form.joinedAt"
            class="input-field"
            type="date"
          />

          <div v-else class="field-display">{{ joinedAtDisplay || '-' }}</div>
        </div>

        <div class="field">
          <label class="field-label">Alamat Email</label>
          <input
            v-if="isEditing"
            v-model="form.email"
            class="input-field"
            type="email"
            placeholder="Masukkan email"
          />
          <div v-else class="field-display">{{ form.email || '-' }}</div>
        </div>

        <div class="field">
          <label class="field-label">ID Pengguna</label>
          <div v-if="isEditing" class="input-with-action">
            <input
              class="input-field has-action"
              type="text"
              :value="form.userId"
              readonly
            />

            <button
              type="button"
              class="icon-action-btn"
              :title="copied ? 'Tersalin' : 'Salin ID'"
              @click="copyUserId"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M9 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9Zm-4 6V6a2 2 0 0 1 2-2h8v2H7v9H5Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div v-else class="field-display">{{ form.userId || '-' }}</div>
          <span v-if="isEditing && copied" class="helper-text">ID berhasil disalin</span>
        </div>

        <div class="field">
          <label class="field-label">Peran</label>
          <div v-if="isEditing" class="select-wrap">
            <select
              v-model="form.role"
              class="input-field select-field"
            >
              <option
                v-for="role in availableRoles"
                :key="role"
                :value="role"
              >
                {{ role }}
              </option>
            </select>

            <span class="select-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M7 10l5 5 5-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
          <div v-else class="field-display">{{ form.role || '-' }}</div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="field full-width">
        <label class="field-label">Filosofi Kurasi</label>
        <textarea
          v-if="isEditing"
          v-model="form.philosophy"
          class="textarea-field"
          placeholder="Tuliskan filosofi kurasi"
          rows="6"
        />
        <div v-else class="field-display field-display-multiline">
          {{ form.philosophy || '-' }}
        </div>
      </div>

      <div v-if="isEditing" class="form-actions">
        <button type="button" class="btn-outline-cancel" @click="handleCancel">
          Batal
        </button>
        <button type="button" class="btn-gradient" @click="openSaveModal">
          Simpan Perubahan
        </button>
      </div>
    </div>

    <transition name="modal-fade">
      <div
        v-if="saveModal.open"
        class="modal-overlay"
        @click.self="closeSaveModal"
      >
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="save-modal-title">
          <div class="success-icon-wrapper">
            <div class="success-icon-inner">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          <h2 id="save-modal-title" class="modal-title">Yakin Ingin Simpan<br />Perubahan?</h2>
          <p class="modal-desc">
            Data pengguna yang telah diperbarui akan langsung tersimpan dan digunakan di sistem.
          </p>

          <div class="modal-actions-vertical">
            <button
              class="btn-gradient w-100"
              type="button"
              :disabled="saveModal.loading"
              @click="handleSave"
            >
              {{ saveModal.loading ? 'MENYIMPAN...' : 'IYA' }}
            </button>
            <button
              class="btn-outline-brown w-100"
              type="button"
              :disabled="saveModal.loading"
              @click="closeSaveModal"
            >
              TIDAK
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  },
  mode: {
    type: String,
    default: ''
  },
  roles: {
    type: Array,
    default: () => ([
      'User',
      'Admin',
      'Operator'
    ])
  }
})

const emit = defineEmits([
  'save',
  'cancel',
  'delete',
  'copy-id',
  'edit-mode-change'
])

const route = useRoute()
const defaultUsers = [
  {
    id: 1,
    name: 'Clara Amandine',
    email: 'clara.a@scentvault.com',
    role: 'User',
    status: 'active',
    image: 'https://i.pravatar.cc/120?img=32',
    joinedAt: '2023-01-12',
    philosophy: ''
  },
  {
    id: 2,
    name: 'Julian Sterling',
    email: 'sterling.j@scentvault.com',
    role: 'Admin',
    status: 'active',
    image: 'https://i.pravatar.cc/120?img=12',
    joinedAt: '2023-01-12',
    philosophy: '“Setiap wewangian adalah narasi cair yang belum selesai...”'
  },
  {
    id: 3,
    name: 'Elara Vance',
    email: 'evance@scentvault.com',
    role: 'User',
    status: 'inactive',
    image: 'https://i.pravatar.cc/120?img=47',
    joinedAt: '2023-01-12',
    philosophy: ''
  },
  {
    id: 4,
    name: 'Marcus Thorne',
    email: 'm.thorne@scentvault.com',
    role: 'User',
    status: 'active',
    image: 'https://i.pravatar.cc/120?img=14',
    joinedAt: '2023-01-12',
    philosophy: ''
  },
  {
    id: 5,
    name: 'Sophia Lazar',
    email: 's.lazar@scentvault.com',
    role: 'User',
    status: 'active',
    image: 'https://i.pravatar.cc/120?img=48',
    joinedAt: '2023-01-12',
    philosophy: ''
  },
  {
    id: 6,
    name: 'Noah Bellamy',
    email: 'n.bellamy@scentvault.com',
    role: 'Admin',
    status: 'active',
    image: 'https://i.pravatar.cc/120?img=19',
    joinedAt: '2023-01-12',
    philosophy: ''
  },
  {
    id: 7,
    name: 'Isla Moreau',
    email: 'imoreau@scentvault.com',
    role: 'User',
    status: 'inactive',
    image: 'https://i.pravatar.cc/120?img=25',
    joinedAt: '2023-01-12',
    philosophy: ''
  },
  {
    id: 8,
    name: 'Theo Arden',
    email: 'theo.arden@scentvault.com',
    role: 'User',
    status: 'active',
    image: 'https://i.pravatar.cc/120?img=67',
    joinedAt: '2023-01-12',
    philosophy: ''
  },
  {
    id: 9,
    name: 'Aurora Flint',
    email: 'aurora.f@scentvault.com',
    role: 'User',
    status: 'active',
    image: 'https://i.pravatar.cc/120?img=44',
    joinedAt: '2023-01-12',
    philosophy: ''
  },
  {
    id: 10,
    name: 'Elias Hart',
    email: 'elias.h@scentvault.com',
    role: 'Admin',
    status: 'inactive',
    image: 'https://i.pravatar.cc/120?img=60',
    joinedAt: '2023-01-12',
    philosophy: ''
  },
  {
    id: 11,
    name: 'Luna Cervantes',
    email: 'l.cervantes@scentvault.com',
    role: 'User',
    status: 'active',
    image: 'https://i.pravatar.cc/120?img=39',
    joinedAt: '2023-01-12',
    philosophy: ''
  },
  {
    id: 12,
    name: 'Milo Vesper',
    email: 'mvesper@scentvault.com',
    role: 'User',
    status: 'active',
    image: 'https://i.pravatar.cc/120?img=15',
    joinedAt: '2023-01-12',
    philosophy: ''
  },
  {
    id: 13,
    name: 'Freya Solene',
    email: 'freya.s@scentvault.com',
    role: 'User',
    status: 'inactive',
    image: 'https://i.pravatar.cc/120?img=50',
    joinedAt: '2023-01-12',
    philosophy: ''
  }
]

const users = ref([])

function loadUsers() {
  const savedUsers = JSON.parse(localStorage.getItem('scentvault_users') || '[]')
  users.value = [...savedUsers, ...defaultUsers]
}

const emptyUser = {
  id: '',
  name: '',
  joinedAt: '',
  email: '',
  userId: '',
  role: '',
  philosophy: '',
  status: 'aktif',
  avatar: ''
}

const monthMap = {
  januari: '01',
  january: '01',
  februari: '02',
  february: '02',
  maret: '03',
  march: '03',
  april: '04',
  mei: '05',
  may: '05',
  juni: '06',
  june: '06',
  juli: '07',
  july: '07',
  agustus: '08',
  august: '08',
  september: '09',
  oktober: '10',
  october: '10',
  november: '11',
  desember: '12',
  december: '12'
}

function pad(value) {
  return String(value).padStart(2, '0')
}

function toISODate(value) {
  if (!value) return ''

  const raw = String(value).trim()

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw
  }

  const numericMatch = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/)
  if (numericMatch) {
    const [, day, month, year] = numericMatch
    return `${year}-${pad(month)}-${pad(day)}`
  }

  const namedMonthMatch = raw.match(/^(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})$/)
  if (namedMonthMatch) {
    const [, day, monthName, year] = namedMonthMatch
    const month = monthMap[monthName.toLowerCase()]
    if (month) {
      return `${year}-${month}-${pad(day)}`
    }
  }

  const parsed = new Date(raw)
  if (!Number.isNaN(parsed.getTime())) {
    return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`
  }

  return ''
}

function formatDateId(value) {
  const iso = toISODate(value)

  if (!iso) return value || '-'

  const [year, month, day] = iso.split('-').map(Number)

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(year, month - 1, day))
}

function normalizeString(value, fallback = '') {
  if (value === null || value === undefined) return fallback
  return String(value)
}

function getUserPhotoUrl(path) {
  const normalizedPath = normalizeString(path).trim()
  if (!normalizedPath) return ''

  if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
    return normalizedPath
  }

  const cleanPath = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath
  return `http://localhost:8000/storage/${cleanPath}?t=${Date.now()}`
}

function normalizeRoleValue(value) {
  if (value && typeof value === 'object') {
    return normalizeRoleValue(
      value.name ??
      value.label ??
      value.role ??
      value.value ??
      ''
    )
  }

  const normalized = normalizeString(value).trim().toLowerCase()
  const roleMap = {
    admin: 'Admin',
    user: 'User',
    kurator: 'User',
    curator: 'User',
    operator: 'Operator',
    system_admin: 'Admin'
  }

  return roleMap[normalized] || normalizeString(value, 'User')
}

function extractRoleValue(user) {
  return (
    user?.role?.name ??
    user?.role?.label ??
    user?.role?.role ??
    user?.role?.value ??
    user?.role ??
    user?.role_name ??
    user?.roleLabel ??
    user?.user_role ??
    user?.userType ??
    user?.user_type ??
    user?.type ??
    user?.roles?.[0]?.name ??
    user?.roles?.[0] ??
    ''
  )
}

const initialMode = computed(() => {
  if (props.mode) return String(props.mode).toLowerCase() === 'edit'
  return route.name === 'UserEdit'
})

const isEditing = ref(initialMode.value)
const copied = ref(false)
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})
const saveModal = ref({
  open: false,
  loading: false
})
let toastTimeout = null

const form = reactive({
  ...emptyUser
})

function showToast(message, type = 'success') {
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

const selectedUser = computed(() => {
  const routeId = Number(route.params.id)
  if (!routeId) return null

  return users.value.find((item) => Number(item.id) === routeId) || null
})

function mapUserToForm(user) {
  if (!user) {
    Object.assign(form, { ...emptyUser })
    return
  }

  const resolvedRole = normalizeRoleValue(extractRoleValue(user) || 'User')

  Object.assign(form, {
    id: user.id ?? '',
    name: normalizeString(user.name),
    joinedAt: toISODate(
      user.created_at ||
      user.createdAt ||
      user.joined_at ||
      user.joinedAt ||
      '2023-01-12'
    ),
    email: normalizeString(user.email),
    userId: normalizeString(
      user.user_id ||
      user.userId ||
      user.uuid ||
      `UID-${String(user.id).padStart(5, '0')}-ATELIER`
    ),
    role: resolvedRole,
    philosophy: normalizeString(user.philosophy || user.bio || user.description),
    status: normalizeString(user.status || user.is_active || 'aktif'),
    avatar: getUserPhotoUrl(user.photo || user.image || user.avatar)
  })
}

function getCachedSelectedUser(userId) {
  try {
    const raw = sessionStorage.getItem(`selected-user-${userId}`)
    if (raw) return JSON.parse(raw)
  } catch {
    // no-op, fallback to localStorage below
  }

  try {
    const raw = localStorage.getItem(`selected-user-${userId}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

async function loadData() {
  const routeId = Number(route.params.id)
  if (!routeId) return

  const cachedUser = getCachedSelectedUser(routeId)
  if (cachedUser) {
    users.value = [cachedUser]
    mapUserToForm(cachedUser)
  }

  try {
    const res = await api.get(`/admin/users/${routeId}`)
    const apiUser =
      res.data?.data?.user ||
      res.data?.data ||
      res.data?.user ||
      res.data ||
      {}

    const mergedUser = {
      ...cachedUser,
      ...apiUser,
      role: extractRoleValue(apiUser) || extractRoleValue(cachedUser) || 'User'
    }

    users.value = [mergedUser]
    mapUserToForm(mergedUser)
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  loadData()
})

watch(
  () => route.params.id,
  () => {
    loadData()
  }
)

watch(
  selectedUser,
  (user) => {
    mapUserToForm(user)
  },
  { immediate: true }
)

watch(initialMode, (value) => {
  isEditing.value = value
})

const avatarSrc = computed(() => form.avatar || '')

const initials = computed(() => {
  return (form.name || 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0]?.toUpperCase() || '')
    .join('')
})

const statusLabel = computed(() => {
  return String(form.status || 'aktif').toUpperCase()
})

const statusClass = computed(() => {
  const value = String(form.status || '').toLowerCase()
  return ['aktif', 'active'].includes(value) ? 'is-active' : 'is-inactive'
})

const joinedAtDisplay = computed(() => formatDateId(form.joinedAt))
const availableRoles = computed(() => {
  const normalizedRoles = props.roles.map((role) => normalizeRoleValue(role))
  const currentRole = normalizeRoleValue(form.role)

  return currentRole && !normalizedRoles.includes(currentRole)
    ? [...normalizedRoles, currentRole]
    : normalizedRoles
})

function toggleEdit(forceValue) {
  const nextValue =
    typeof forceValue === 'boolean' ? forceValue : !isEditing.value

  if (isEditing.value && !nextValue) {
    mapUserToForm(selectedUser.value)
  }

  isEditing.value = nextValue
  emit('edit-mode-change', nextValue)
}

function openSaveModal() {
  saveModal.value.open = true
}

function closeSaveModal() {
  if (saveModal.value.loading) return
  saveModal.value = {
    open: false,
    loading: false
  }
}

async function handleSave() {
  const payload = {
    ...form,
    joinedAt: toISODate(form.joinedAt)
  }

  saveModal.value.loading = true

  try {
    await api.patch(`/admin/users/${form.id}`, {
      name: payload.name,
      email: payload.email,
      role: payload.role.toLowerCase()
    })
    closeSaveModal()
    isEditing.value = false
    emit('edit-mode-change', false)
    loadData()
    showToast('Perubahan pengguna berhasil disimpan.')
  } catch(error) {
    console.error(error)
    saveModal.value.loading = false
    showToast(error.response?.data?.message || 'Gagal menyimpan perubahan pengguna.', 'error')
  }
}

function handleCancel() {
  if (isEditing.value) {
    mapUserToForm(selectedUser.value)
    toggleEdit(false)
    return
  }

  emit('cancel')
}

async function handleDelete() {
  if(confirm('Hapus pengguna ini?')) {
    try {
      await api.delete(`/admin/users/${form.id}`)
      showToast('Pengguna berhasil dihapus.')
      emit('delete', { ...form })
    } catch(err) {
      console.error(err)
      showToast(err.response?.data?.message || 'Gagal menghapus pengguna.', 'error')
    }
  }
}

let copyTimeout = null

async function copyUserId() {
  const value = form.userId || ''
  if (!value) return

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
    } else {
      const temp = document.createElement('textarea')
      temp.value = value
      temp.setAttribute('readonly', '')
      temp.style.position = 'absolute'
      temp.style.left = '-9999px'
      document.body.appendChild(temp)
      temp.select()
      document.execCommand('copy')
      document.body.removeChild(temp)
    }

    copied.value = true
    emit('copy-id', value)

    if (copyTimeout) clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch (error) {
    console.error('Gagal menyalin ID pengguna:', error)
  }
}

onBeforeUnmount(() => {
  if (copyTimeout) clearTimeout(copyTimeout)
  if (toastTimeout) clearTimeout(toastTimeout)
})
</script>

<style scoped>
.user-detail-page {
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
  max-width: 1120px;
  margin: 0 auto 30px;
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

.user-card {
  max-width: 1120px;
  margin: 0 auto;
  padding: 36px;
  background: var(--card, #fbfaf8);
  border-radius: 28px;
  box-shadow: 0 18px 50px rgba(25, 18, 12, 0.06);
  border: 1px solid rgba(139, 97, 56, 0.06);
}

.profile-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 0;
}

.avatar-wrap {
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.avatar-image,
.avatar-fallback {
  width: 100%;
  height: 100%;
  display: block;
}

.avatar-image {
  object-fit: cover;
}

.avatar-fallback {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--primary-soft, #e9bf84), var(--primary, #8b6138));
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.profile-meta {
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.user-name {
  margin: 0 0 10px;
  font-size: 35.2px;
  line-height: 1.1;
  font-weight: 700;
  color: #7d5731;
  font-family: 'Manrope', sans-serif;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.status-badge.is-active {
  color: #27965a;
  background: rgba(39, 150, 90, 0.12);
}

.status-badge.is-inactive {
  color: #9b6a1d;
  background: rgba(233, 191, 132, 0.22);
}

.user-role {
  margin: 0;
  font-size: 1rem;
  color: var(--text, #736b65);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.btn-action,
.icon-action-btn {
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: 0.2s ease;
  font: inherit;
}

.btn-action {
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border: 1px solid transparent;
  display: inline-flex;
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

.action-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.btn-edit .action-icon {
  stroke: #7d5731;
}

.btn-delete .action-icon {
  stroke: #991b1b;
}

.btn-delete:hover .action-icon {
  stroke: #b91c1c;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px 28px;
}

.field {
  min-width: 0;
}

.full-width {
  width: 100%;
}

.field-label {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(115, 107, 101, 0.8);
}

.input-field,
.textarea-field,
.field-display {
  width: 100%;
  border: 1px solid transparent;
  border-radius: 14px;
  background: var(--bg, #f7f5f1);
  color: #3a332f;
  font: inherit;
  transition: 0.2s ease;
  box-sizing: border-box;
}

.input-field {
  min-height: 54px;
  padding: 0 16px;
}

.textarea-field {
  min-height: 140px;
  padding: 16px;
  resize: vertical;
  line-height: 1.7;
}

.field-display {
  min-height: 54px;
  padding: 16px;
  display: flex;
  align-items: center;
  line-height: 1.6;
  cursor: default;
}

.field-display-multiline {
  min-height: 140px;
  align-items: flex-start;
  white-space: pre-wrap;
}

.input-field::placeholder,
.textarea-field::placeholder {
  color: rgba(115, 107, 101, 0.55);
}

.input-field:focus,
.textarea-field:focus,
.select-field:focus {
  border-color: rgba(139, 97, 56, 0.24);
  box-shadow: 0 0 0 4px rgba(139, 97, 56, 0.08);
  background: #fff;
}

.input-field[readonly],
.textarea-field[readonly] {
  cursor: default;
}

.select-wrap,
.input-with-action {
  position: relative;
}

.select-field {
  appearance: none;
  padding-right: 46px;
}

.select-field:disabled {
  opacity: 1;
  color: #3a332f;
  -webkit-text-fill-color: #3a332f;
  cursor: default;
}

.select-icon {
  position: absolute;
  top: 50%;
  right: 16px;
  width: 18px;
  height: 18px;
  color: var(--text, #736b65);
  transform: translateY(-50%);
  pointer-events: none;
}

.select-icon svg {
  width: 100%;
  height: 100%;
  display: block;
}

.has-action {
  padding-right: 52px;
}

.icon-action-btn {
  position: absolute;
  top: 50%;
  right: 12px;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: var(--text, #736b65);
  background: transparent;
  transform: translateY(-50%);
}

.icon-action-btn:hover {
  color: var(--primary, #8b6138);
  background: rgba(139, 97, 56, 0.08);
}

.icon-action-btn svg {
  width: 18px;
  height: 18px;
  display: block;
}

.helper-text {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.82rem;
  color: #27965a;
}

.divider {
  height: 1px;
  margin: 30px 0;
  background: rgba(139, 97, 56, 0.1);
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
  padding: 13px 35px;
  background: linear-gradient(135deg, #7d5731 0%, #fac898 100%);
  border: none;
  border-radius: 30px;
  color: #ffffff;
  font-weight: 500;
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
  background-color: #ffffff;
  width: min(100%, 400px);
  padding: 40px 30px;
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
  margin: 0 0 12px;
}

.modal-desc {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.6;
  margin: 0 0 30px;
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

.btn-outline-brown:disabled,
.btn-gradient:disabled {
  opacity: 0.7;
  cursor: wait;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.24s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
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

@media (max-width: 900px) {
  .user-detail-page {
    padding: 20px;
  }

  .user-card {
    padding: 24px;
    border-radius: 24px;
  }

  .profile-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    justify-content: flex-start;
  }

  .user-name {
    font-size: 1.7rem;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .profile-info {
    align-items: flex-start;
  }

  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-outline-cancel,
  .btn-gradient {
    width: 100%;
  }

  .modal-card {
    width: min(100%, 360px);
    padding: 32px 22px;
  }
}

@media (max-width: 520px) {
  .user-detail-page {
    /* Padding handled globally */
  }

  .user-card {
    padding: 18px;
    border-radius: 20px;
  }

  .profile-info {
    flex-direction: column;
  }

  .avatar-wrap {
    width: 78px;
    height: 78px;
  }

  .user-name {
    font-size: 1.4rem;
  }

  .header-actions {
    width: 100%;
  }

  .btn-action {
    width: 100%;
    justify-content: center;
  }
}
</style>
