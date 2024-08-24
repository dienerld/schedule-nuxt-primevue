<script setup lang="ts">
import { formatDate } from '~/utils/format-date'
import type { Schedule } from '~/entities/schedule'
import { myselfKey } from '~/modules/users/composables/useMySelf/useMySelf'
import { useAdapter } from '~/modules/schedule/composables/useAdapter'

import ListItem from './components/List/ListItem.vue'
import List from './components/List/List.vue'
import ListLoader from './components/List/Loader.vue'
import Header from './components/Header/Header.vue'

type ResponseApi = {
  morning: Schedule[],
  afternoon: Schedule[]
}

const { adapterDisplayName } = useAdapter()
const router = useRouter()
const visible = ref(false)
const schedule = ref<Schedule | null>(null)
const routeDate = useRouteQuery('date', Date.now(), { transform: Number })
const date = ref(new Date(routeDate.value))
const { user } = inject(myselfKey)!

const { data: schedules, status, refresh } = useFetch<ResponseApi>('/api/schedules', {
  query: {
    date
  },
  onRequest({ options }) {
    options.query = {
      date: date.value.getTime()
    }
  }
})

function onEdit(value: Schedule) {
  router.push(`/app/schedule/${value.id}`)
}

function onSelfDelete(value: Schedule) {
  visible.value = true
  schedule.value = value
}

function applyDelete() {
  visible.value = false
  $fetch<{success: boolean}>(`/api/schedules/${schedule.value?.id}`, { method: 'DELETE' })
    .then(() => {
      refresh()
      schedule.value = null
    })
    .catch(() => {
      schedule.value = null
    })
}

function cancelDelete() {
  visible.value = false
  schedule.value = null
}

watch(date, () => {
  routeDate.value = date.value.getTime()
})

</script>

<template>
  <Header v-model="date" />
  <section class="flex w-full flex-col gap-4 rounded border bg-surface-50 p-2 shadow sm:p-4 md:flex-row">
    <template v-if="status === 'pending'">
      <List v-for="key in 2" :key :name="key === 0 ? 'Manha' : 'Tarde'">
        <ListLoader :items="3" />
      </List>
    </template>
    <List
      v-for="(scheduleShift, key) in [schedules?.morning, schedules?.afternoon]"
      v-else
      :key
      :name="key === 0 ? 'Manha' : 'Tarde'"
    >
      <ListItem
        v-for="sch in scheduleShift"
        :key="sch.id"
        :value="sch"
        :is-mine="sch.user.id === user?.id"
        @self-delete="onSelfDelete"
        @wants-to-edit="onEdit"
      />
      <template v-if="Object.keys(schedules || {}).length === 0">
        <p class="mt-2 text-center text-xl font-semibold">
          Nenhum agendamento para o turno da
          {{ key === 0 ? "manha" : "tarde" }}
        </p>
      </template>
    </List>
  </section>
  <Dialog
    v-model:visible="visible"
    modal
    header="Confirmar Exclusão"
    :style="{ width: '25rem' }"
    :close-button-props="{ class: 'hidden' }"
  >
    <div v-if="schedule" class="flex flex-col gap-4">
      <p>
        Deseja excluir o agendamento do dia
        <b>{{ formatDate(new Date(schedule.day)) }}</b>, lavadora <b>{{ schedule.machine }}</b> no turno da
        <b>{{ adapterDisplayName(schedule.shift) }}</b>?
      </p>

      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="cancelDelete" />
        <Button type="button" label="Excluir" severity="danger" @click="applyDelete" />
      </div>
    </div>
  </Dialog>
</template>
