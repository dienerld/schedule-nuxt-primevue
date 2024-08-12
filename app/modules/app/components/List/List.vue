<script setup lang="ts">
import type { Schedule } from '~/entities/schedule'
import ListItem from './ListItem.vue'

const props = defineProps<{
  name: string
  values: Schedule[]
}>()
</script>

<template>
  <h2 class="text-2xl font-bold">
    {{ props.name }}
  </h2>
  <ul class="flex flex-wrap gap-4">
    <ListItem
      v-for="(schedule, key) in props.values"
      :key
      :value="schedule"
    />
  </ul>
</template>
