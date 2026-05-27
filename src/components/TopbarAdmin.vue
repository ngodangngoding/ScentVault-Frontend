<template>
  <header class="top-header">
    <div class="header-left">
      <div v-if="showSearch" class="search-bar">
        <svg
          class="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          :value="search"
          type="text"
          :placeholder="placeholder"
          @input="handleSearchInput"
        />
      </div>
      <slot></slot>
    </div>

    <div class="header-actions">
      <div class="profile-section" @click="$router.push(profileRoute)">
        <div class="profile-text">
          <span class="profile-name">{{ resolvedProfileName }}</span>
          <span v-if="resolvedProfileRole" class="profile-role">{{ resolvedProfileRole }}</span>
        </div>

        <img
          :src="resolvedProfileAvatar"
          :alt="resolvedProfileName"
          class="profile-avatar"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import defaultAvatar from '@/assets/profil.jpg'

const props = defineProps({
  profileName: {
    type: String,
    default: 'ELENA VANCE',
  },
  profileRole: {
    type: String,
    default: '',
  },
  profileAvatar: {
    type: String,
    default:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
  },
  profileRoute: {
    type: String,
    default: '/profil',
  },
  placeholder: {
    type: String,
    default: 'Cari data...'
  },
  showSearch: {
    type: Boolean,
    default: false
  },
  search: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:search'])

const userUpdateTrigger = ref(0)

const handleSearchInput = (event) => {
  emit('update:search', event.target.value)
}

const getUserFromStorage = () => {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

const currentUser = computed(() => {
  userUpdateTrigger.value
  return getUserFromStorage()
})

const formatRole = (role) => {
  const roleMap = {
    admin: 'Admin',
    user: 'User',
    system_admin: 'Admin'
  }

  return roleMap[role] || role || ''
}

const resolvedProfileName = computed(() => {
  const storedName = currentUser.value?.name
  return storedName ? storedName.toUpperCase() : props.profileName
})

const resolvedProfileRole = computed(() => {
  const storedRole = formatRole(currentUser.value?.role)
  return storedRole || props.profileRole
})

const resolvedProfileAvatar = computed(() => {
  const photo = currentUser.value?.photo
  if (photo) {
    return `http://localhost:8000/storage/${photo}?t=${Date.now()}`
  }

  return props.profileAvatar || defaultAvatar
})

const refreshUserData = () => {
  userUpdateTrigger.value += 1
}

onMounted(() => {
  window.addEventListener('user-data-updated', refreshUserData)
  window.addEventListener('storage', refreshUserData)
})

onUnmounted(() => {
  window.removeEventListener('user-data-updated', refreshUserData)
  window.removeEventListener('storage', refreshUserData)
})
</script>

<style scoped>
.top-header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  background-color: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.header-left {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 20px;
  width: min(448px, 100%);
}

.search-icon {
  width: 16px;
  height: 16px;
  color: #888;
  margin-right: 10px;
  flex-shrink: 0;
}

.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.85rem;
  width: 100%;
  color: #333;
}

.search-bar input::placeholder {
  color: #888;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.profile-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.1;
}

.profile-name {
  font-size: 0.7rem;
  font-weight: 800;
  color: #000000;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.profile-role {
  font-size: 0.58rem;
  font-weight: 700;
  color: #7b7b7b;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 3px;
}

.profile-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .top-header {
    padding: 0 20px;
    gap: 16px;
  }

  .search-bar {
    width: 100%;
  }
}
</style>
