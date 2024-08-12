<script setup lang="ts">
import type { Schedule } from '~/entities/schedule'

const props = defineProps<{
  value: Schedule
}>()
</script>

<template>
  <li class="min-w-80 flex-1 rounded bg-surface-100 p-4">
    <h3 class="p-0 text-xl font-bold">
      Nome: {{ props.value.number }} - {{ props.value.name }}
    </h3>
    <p>Data: {{ props.value.date }}</p>
    <p>Turno: {{ props.value.shift }}</p>
    <p>Maquina: {{ props.value.machine }}</p>
  </li>
</template>
