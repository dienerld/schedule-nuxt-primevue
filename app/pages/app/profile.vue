<script setup lang="ts">
import { myselfKey } from '~/modules/users/composables/useMySelf/useMySelf'

definePageMeta({
  layout: 'authenticated',
  middleware: 'auth'
})

const { user } = inject(myselfKey)!
</script>

<template>
  <div>
    profile {{ user?.name }}
  </div>
</template>
