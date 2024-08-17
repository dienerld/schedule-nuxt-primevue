<script setup lang="ts">
import type { Shift } from '~/entities/shift'
import Form, { type CreateSchedule } from '~/modules/schedule/components/Form/Form.vue'

const loading = ref(false)
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

const handleCreateSchedule = () => {
  loading.value = true
}

watch(() => data.value.date, () => {
  refreshShift()
})

</script>

<template>
  <MainContent>
    <template #header>
      <NuxtLink to="/app" class="flex items-center">
        <Button icon="pi pi-arrow-left" class="mr-2" label="Voltar" text />
      </NuxtLink>
    </template>

    <template #content>
      <p v-if="loading">
        Loading
      </p>
      <Form
        v-else
        v-model="data"
        :loading
        :machines="{ value: [], loading: false }"
        :shifts="{ value: shifts || [], loading: statusShift === 'pending' }"
        @wants-create-schedule="handleCreateSchedule"
      />
    </template>
  </MainContent>
</template>
