<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'authenticated'
})
const { params } = useRoute()
</script>

<template>
  <div>
    {{ params.id }}
  </div>
</template>
