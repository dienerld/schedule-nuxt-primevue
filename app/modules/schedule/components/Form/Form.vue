<script setup lang="ts">
import type { Shift } from '~/entities/shift'

export type CreateSchedule = {
  date: Date
  shift: string
  machineId: number
}
type ContentProps<T> = {
  loading: boolean,
  value:T[],
}

const props = withDefaults(defineProps<{
  modelValue?: CreateSchedule
  loading?: boolean
  shifts: ContentProps<Shift>,
  machines: ContentProps<{ id: number, name: string }>,
}>(), {
  loading: false,
  shifts: () => ({ value: [], loading: false }),
  machines: () => ({ value: [], loading: false }),
  modelValue: () => ({ date: new Date(), shift: '', machineId: 0 })
})

const emit = defineEmits<{
  (e: 'wants-create-schedule'): void
  (e: 'update:modelValue', value: Date): void
}>()

const data = useVModel(props, 'modelValue', emit)

</script>

<template>
  <section class="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-4 rounded-lg bg-white px-2 py-4 sm:px-4">
    <header class="w-full">
      <h2 class="self-start text-xl font-bold">
        Novo Agendamento
      </h2>
    </header>
    <form class="flex w-full flex-col gap-2" autocomplete="on" @submit.prevent="emit('wants-create-schedule')">
      <DatePicker
        v-model="data.date"
        placeholder="Data"
        date-format="dd/mm/yy"
        :min-date="new Date()"
      />
      <Select
        v-model="data.shift"
        :options="props.shifts.value"
        :loading="props.shifts.loading"
        :option-label="op=> `${op.name} - Disponível: ${op.available}`"
        :disabled="!data.date"
        option-value="id"
        placeholder="Selecione o Turno"
        empty-message="Nenhum Turno Disponível"
        class="w-full"
      />
      <Select
        v-model="data.machineId"
        :loading="props.machines.loading"
        :options="props.machines.value"
        :disabled="!data.date || !data.shift"
        option-label="name"
        option-value="id"
        placeholder="Selecione a Máquina"
        empty-message="Nenhuma Máquina Disponível"
        class="w-full"
      />

      <Button
        label="Entrar"
        type="submit"
        :loading="props.loading"
        :disabled="!data.date || !data.shift || !data.machineId"
      />
    </form>
  </section>
</template>
