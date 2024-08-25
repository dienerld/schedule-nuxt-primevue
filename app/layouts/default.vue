<script setup lang="ts">
import { useSession } from '~/modules/auth/composables/useSession'

const { loggedIn } = useSession()

watchEffect(() => {
  if (loggedIn.value) {
    navigateTo('/app')
  }
})
</script>

<template>
  <div class="flex size-full flex-col items-center">
    <slot />
  </div>
</template>
