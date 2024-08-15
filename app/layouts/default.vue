<script setup lang="ts">
const { loggedIn } = useUserSession()

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
