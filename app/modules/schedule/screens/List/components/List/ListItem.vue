<script setup lang="ts">
import type { Schedule } from '~/entities/schedule'

const currentDate = useLuxon()

const props = defineProps<{
  value: Schedule
  'isMine': boolean,
}>()

const emit = defineEmits<{
  (e: 'self-delete', value: Schedule): void
  (e: 'wants-to-edit', value: Schedule): void
}>()

function translateShift(shift: 'morning' | 'afternoon'): string {
  return shift === 'morning' ? 'Manha' : 'Tarde'
}

function formatDate(timestamp: number): string {
  return useLuxon(timestamp).toFormat('dd/MM/yyyy')
}

</script>

<template>
  <li class="flex min-w-80 flex-1 flex-col rounded bg-surface-100 p-4">
    <h3 class="p-0 text-xl font-bold">
      Nome: {{ props.value.user.number }} - {{ props.value.user.name }}
    </h3>
    <p>Data: {{ formatDate(props.value.day) }}</p>
    <p>Turno: {{ translateShift(props.value.shift) }}</p>
    <p>Máquina: {{ props.value.machine }}</p>
    <div v-if="props.isMine" class="mt-2 flex flex-1 gap-2">
      <Button
        label="Editar"
        icon="pi pi-pencil"
        severity="warn"
        size="small"
        icon-pos="right"
        class="w-full"
        :disabled="currentDate.toMillis() > props.value.day || true"
        @click="emit('wants-to-edit', props.value)"
      />
      <Button
        label="Excluir"
        icon="pi pi-trash"
        severity="danger"
        size="small"
        icon-pos="right"
        class="w-full"
        :disabled="currentDate.toMillis() > props.value.day"
        @click="emit('self-delete', props.value)"
      />
    </div>
  </li>
</template>
