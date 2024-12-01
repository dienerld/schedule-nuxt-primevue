<script setup lang="ts">
import type { Shift } from '~/entities/shift'
import Form, { type CreateSchedule } from '~/modules/schedule/components/Form/Form.vue'
import NearestSchedules from '~/modules/schedule/components/NearestSchedules/NearestSchedules.vue'

const loading = ref(false)
const error = ref<string | null>(null)
const data = ref<CreateSchedule>({
  date: new Date(),
  shift: '',
  machineId: 0
})

const { data: shifts, status: statusShift, refresh: refreshShift } = useFetch<Shift[]>('/api/shifts', {
  query: { data },
  watch: false,
  onRequest({ options }) {
    options.query = {
      date: options.query!.data?.date.getTime()
    }
  }
})

const { data: machines, status: statusMachines, refresh: refreshMachines } = useFetch('/api/machines', {
  query: { data },
  immediate: false,
  watch: false,
  onRequest({ options }) {
    options.query = {}

    if (data.value.date) {
      options.query.date = data.value.date.getTime().toString()
    }

    if (data.value.shift) {
      options.query.shift = data.value.shift
    }
  }
})

const { data: nearestSchedule, status: statusNearest, refresh: refreshNearest } = useFetch<{
  older: Schedule | null,
  newer: Schedule | null
}>('/api/schedules/nearest')

const handleCreateSchedule = () => {
  loading.value = true
  $fetch('/api/schedules', {
    method: 'POST',
    body: {
      machine: data.value.machineId,
      day: data.value.date.getTime(),
      shift: data.value.shift
    }
  }).then(() => {
    machines.value = machines.value?.filter(m => m.id !== data.value.machineId)
    if (data.value.shift) {
      shifts.value = shifts.value?.map((s) => {
        if (s.id === data.value.shift) {
          s.available = s.available - 1
        }
        return s
      })
    }

    refreshNearest()
    data.value.date = new Date()
    data.value.shift = ''
    data.value.machineId = 0
  }).catch((e) => {
    if (e.data) {
      error.value = e.data.message
      return
    }
    error.value = 'Ocorreu um erro inesperado'
  }).finally(() => { loading.value = false })
}

watch(() => data.value.date, () => {
  refreshShift()
  data.value.shift = ''
  data.value.machineId = 0
})

watch(() => data.value.shift, () => {
  data.value.machineId = 0
  if (data.value.shift) {
    refreshMachines()
  }
})

watch(data.value, () => {
  if (error.value) {
    error.value = null
  }
})

</script>

<template>
  <MainContent>
    <template #header>
      <NuxtLink to="/app" class="flex w-min items-center">
        <Button icon="pi pi-arrow-left" class="mr-2" label="Voltar" text />
      </NuxtLink>
    </template>

    <template #content>
      <div class="flex min-h-10 items-center justify-center">
        <Message v-if="error" severity="error">
          {{ error }}
        </Message>
      </div>
      <NearestSchedules
        :older="nearestSchedule?.older"
        :newer="nearestSchedule?.newer"
        :loading="statusNearest === 'pending'"
      />

      <Form
        v-model="data"
        :loading
        :machines="{ value: machines || [], loading: statusMachines === 'pending' }"
        :shifts="{ value: shifts || [], loading: statusShift === 'pending' }"
        class="mt-4"
        @wants-create-schedule="handleCreateSchedule"
      />
    </template>
  </MainContent>
</template>
