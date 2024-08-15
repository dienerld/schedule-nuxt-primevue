<script setup lang="ts">
import Header from '~/modules/app/components/Header/Header.vue'
import HeaderLoader from '~/modules/app/components/Header/Loader.vue'
import { useMySelf } from '~/modules/users/composables/useMySelf/useMySelf'

const { loggedIn } = useUserSession()
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
        <Header :name="user?.name" />
      </HeaderLoader>
    </template>

    <template #content>
      <Splash :loading="loading">
        <slot />
      </Splash>
    </template>
  </MainContent>
</template>
