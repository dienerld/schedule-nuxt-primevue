<script setup lang="ts">
import Create from '~/modules/schedule/screens/Create/Create.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'authenticated'
})
</script>

<template>
  <Create />
</template>
