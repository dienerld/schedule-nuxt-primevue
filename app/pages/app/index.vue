<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'authenticated'
})

const { user, clear } = useUserSession()
</script>

<template>
  <div>
    <p>user: {{ user }}</p>
    <Button label="Logout" @click="clear" />
  </div>
</template>
