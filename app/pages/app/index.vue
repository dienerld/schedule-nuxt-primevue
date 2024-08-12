<script setup lang="ts">
import Home from '~/modules/app/screens/Home/Home.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'authenticated'
})

</script>

<template>
  <Home />
</template>
