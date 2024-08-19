<script setup lang="ts">
import type { Shift } from '~/entities/shift'
import Form, { type CreateSchedule } from '~/modules/schedule/components/Form/Form.vue'

const loading = ref(false)
const error = ref<string | null>(null)
const data = ref<CreateSchedule>({
  date: new Date(),
  shift: '',
  machineId: 0
})

const { data: shifts, status: statusShift, refresh: refreshShift } = await useFetch<Shift[]>('/api/shifts', {
  query: { data },
  watch: false,
  onRequest({ options }) {
    options.query = {
      date: options.query!.data?.date.getTime()
    }
  }
})

const { data: machines, status: statusMachines, refresh: refreshMachines } = await useFetch('/api/machines', {
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

const handleCreateSchedule = () => {
  loading.value = true
  $fetch('/api/schedules', {
    method: 'POST',
    body: {
      machine: data.value.machineId,
      day: data.value.date.getTime(),
      shift: data.value.shift
    }
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
      <Message v-if="error" severity="error">
        {{ error }}
      </Message>
      <Form
        v-model="data"
        :loading
        :machines="{ value: machines || [], loading: statusMachines === 'pending' }"
        :shifts="{ value: shifts || [], loading: statusShift === 'pending' }"
        @wants-create-schedule="handleCreateSchedule"
      />
    </template>
  </MainContent>
</template>
