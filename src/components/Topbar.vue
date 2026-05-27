<template>
  <header class="top-header">
    <div class="header-left">
      <slot></slot>
    </div>

    <div class="header-actions">
      <div class="profile-section" @click="$router.push(profileRoute)">
        <div class="profile-text">
          <span class="profile-name">{{ profileName }}</span>
          <span v-if="profileRole" class="profile-role">{{ profileRole }}</span>
        </div>

        <img :src="profileAvatar" :alt="profileName" class="profile-avatar" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import defaultAvatar from '@/assets/profil.jpg' // Pastikan file ini ada di folder assets

defineProps({
  profileRole: { type: String, default: '' },
  profileRoute: { type: String, default: '/profil' },
})

// Pemicu reaktivitas manual
const userUpdateTrigger = ref(0)

const getUserFromStorage = () => {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

const currentUser = computed(() => {
  userUpdateTrigger.value // Membaca trigger agar computed ini terikat pada perubahan
  return getUserFromStorage()
})

const profileName = computed(() => {
  return currentUser.value?.name ? currentUser.value.name.toUpperCase() : 'PENGGUNA'
})

const profileAvatar = computed(() => {
  const user = currentUser.value
  // Gunakan field 'photo' sesuai database dan berikan timestamp untuk anti-cache
  if (user && user.photo) {
    return `http://localhost:8000/storage/${user.photo}?t=${new Date().getTime()}`
  }
  return defaultAvatar
})

// Logika sinkronisasi instan
const refreshUserData = () => {
  userUpdateTrigger.value++
}

onMounted(() => {
  window.addEventListener('user-data-updated', refreshUserData)
})

onUnmounted(() => {
  window.removeEventListener('user-data-updated', refreshUserData)
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
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
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
</style>
