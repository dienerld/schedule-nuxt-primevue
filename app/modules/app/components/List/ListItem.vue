<script setup lang="ts">
import type { Schedule } from '~/entities/schedule'

const props = defineProps<{
  value: Schedule
}>()

const emit = defineEmits<{
  (e: 'self-delete', value: Schedule): void
  (e: 'wants-to-edit', value: Schedule): void
}>()

</script>

<template>
  <li class="flex min-w-80 flex-1 flex-col rounded bg-surface-100 p-4">
    <h3 class="p-0 text-xl font-bold">
      Nome: {{ props.value.number }} - {{ props.value.name }}
    </h3>
    <p>Data: {{ props.value.date }}</p>
    <p>Turno: {{ props.value.shift }}</p>
    <p>Máquina: {{ props.value.machine }}</p>
    <div class="mt-2 flex flex-1 gap-2">
      <Button
        label="Editar"
        icon="pi pi-pencil"
        severity="warn"
        size="small"
        icon-pos="right"
        class="w-full"
        @click="emit('wants-to-edit', props.value)"
      />
      <Button
        label="Excluir"
        icon="pi pi-trash"
        severity="danger"
        size="small"
        icon-pos="right"
        class="w-full"
        @click="emit('self-delete', props.value)"
      />
    </div>
  </li>
</template>
