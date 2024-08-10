<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { loggedIn } = useUserSession()

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/')
  }
})

</script>

<template>
  <slot />
</template>
