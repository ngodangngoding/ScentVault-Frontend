<template>
  <div v-if="isAdminLayout" class="app-layout">
    <Sidebaradmin />

    <div class="main-shell">
  <TopbarAdmin
    profile-name="Profil Admin"
    profile-role="Admin Utama"
    profile-avatar="https://i.pravatar.cc/120?img=12"
    profile-route="/profil-admin"
    :placeholder="topbarPlaceholder"
    :showSearch="shouldShowSearch"
    :search="globalSearch"
    @update:search="globalSearch = $event"
  />

  <main class="main-content">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</div>
</div>

  <router-view v-else />
</template>

<script setup>
import { computed, ref, provide, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Sidebaradmin from './Sidebaradmin.vue'
import TopbarAdmin from './TopbarAdmin.vue'

const route = useRoute()
const globalSearch = ref('')
provide('globalSearch', globalSearch)

const isAdminLayout = computed(() => route.meta.layout === 'admin')
const topbarPlaceholder = computed(() => {
  return route.meta.topbarPlaceholder || 'Cari data...'
})
const shouldShowSearch = computed(() => {
  return route.name === 'ManajemenPengguna'
})

watch(
  () => route.name,
  (routeName) => {
    if (routeName !== 'ManajemenPengguna') {
      globalSearch.value = ''
    }
  },
  { immediate: true }
)

watch(
  isAdminLayout,
  (active) => {
    document.body.classList.toggle('admin-layout-active', active)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  document.body.classList.remove('admin-layout-active')
})
</script>

<style scoped>
.app-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--app-bg);
}

.main-shell {
  flex: 1;
  min-width: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--app-bg);
}

.main-content {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--app-bg);
}
</style>
