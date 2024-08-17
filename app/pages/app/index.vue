<script setup lang="ts">
import Home from '~/modules/schedule/screens/List/List.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'authenticated'
})

</script>

<template>
  <Home />
</template>
