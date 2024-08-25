<script setup lang="ts">
import Profile from '~/modules/users/screens/profile.vue'
definePageMeta({
  layout: 'authenticated',
  middleware: 'auth'
})

</script>

<template>
  <Profile />
</template>
