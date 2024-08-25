<script setup lang="ts">
import Header from '~/modules/auth/components/Header/Header.vue'
import HeaderLoader from '~/modules/auth/components/Header/Loader.vue'
import { useSession } from '~/modules/auth/composables/useSession'
import { useMySelf } from '~/modules/users/composables/useMySelf/useMySelf'

const router = useRouter()
const { loggedIn, logout } = useSession()
const { loading, user } = useMySelf()

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/')
  }
})

</script>

<template>
  <MainContent>
    <template #header>
      <HeaderLoader :loading="loading">
        <Header :name="user?.name" @logout="logout" @wants-to-profile="router.push('/app/profile')" />
      </HeaderLoader>
    </template>

    <template #content>
      <Splash :loading="loading">
        <slot />
      </Splash>
    </template>
  </MainContent>
</template>
