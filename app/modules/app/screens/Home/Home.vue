<script setup lang="ts">
import type { Schedule } from '~/entities/schedule'
import Header from '../../components/Header/Header.vue'
import List from '../../components/List/List.vue'
import ListItem from '../../components/List/ListItem.vue'

const schedules: Schedule[] = [
  { id: 1, date: '2022-01-01', name: 'João', shift: 'Manha', machine: 1, number: 1 },
  { id: 6, date: '2022-01-06', name: 'Karoline Dornelas', shift: 'Manha', machine: 2, number: 6 },
  { id: 8, date: '2022-01-08', name: 'dasdas d', shift: 'Manha', machine: 3, number: 8 },
  { id: 4, date: '2022-01-04', name: 'Yanne', shift: 'Manha', machine: 4, number: 4 },
  { id: 10, date: '2022-01-10', name: 'dadasd', shift: 'Manha', machine: 5, number: 10 },
  { id: 7, date: '2022-01-07', name: 'dalksdahdh kashdjas dkjha', shift: 'Tarde', machine: 1, number: 7 },
  { id: 2, date: '2022-01-02', name: 'Maria', shift: 'Tarde', machine: 2, number: 2 },
  { id: 3, date: '2022-01-03', name: 'Lucas', shift: 'Tarde', machine: 3, number: 3 },
  { id: 9, date: '2022-01-09', name: 'dadasdadsa', shift: 'Tarde', machine: 4, number: 9 },
  { id: 5, date: '2022-01-05', name: 'Diener ', shift: 'Tarde', machine: 5, number: 5 }
]
const router = useRouter()
const visible = ref(false)
const schedule = ref<Schedule | null>(null)
const date = ref(new Date())

const formatDate = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format

const schedulesManha = schedules.filter(schedule => schedule.shift === 'Manha')
const schedulesTarde = schedules.filter(schedule => schedule.shift === 'Tarde')

function onEdit(value: Schedule) {
  router.push(`/app/schedule/${value.id}`)
}

function onSelfDelete(value: Schedule) {
  visible.value = true
  schedule.value = value
}

function applyDelete() {
  visible.value = false
}

function cancelDelete() {
  visible.value = false
  schedule.value = null
}
</script>

<template>
  <MainContent>
    <template #header>
      <Header name="Diener Dornelas" />
    </template>
    <template #content>
      <header class="mb-4 flex flex-col items-center justify-between sm:mb-2 md:flex-row">
        <h1 class="mb-4 text-center text-4xl font-bold sm:text-left">
          Agendamentos
        </h1>

        <div class="flex items-center gap-2">
          <!-- btn back -->
          <Button
            aria-label="Anterior"
            outlined
            icon="pi pi-arrow-left"
            @click="() => date = new Date(date.setDate(date.getDate() - 1))"
          />
          <!-- btn today -->
          <Button aria-label="Data escolhida" text :label="formatDate(date)" disabled />
          <!-- btn next -->
          <Button
            aria-label="Proximo"
            outlined
            icon="pi pi-arrow-right"
            @click="() => date = new Date(date.setDate(date.getDate() + 1))"
          />
        </div>
      </header>
      <section class="flex w-full flex-col gap-4 rounded border bg-surface-50 p-2 shadow sm:p-4 md:flex-row">
        <List v-for="(scheduleShift, key) in [schedulesManha, schedulesTarde]" :key :name="key === 0 ? 'Manha' : 'Tarde'">
          <ListItem
            v-for="(sch) in scheduleShift"
            :key="sch.id"
            :value="sch"
            @self-delete="onSelfDelete"
            @wants-to-edit="onEdit"
          />
          <template v-if="scheduleShift.length === 0">
            <p class="mt-2 text-center text-xl font-semibold">
              Nenhum agendamento para o turno da {{ key === 0 ? 'manha' : 'tarde' }}
            </p>
          </template>
        </List>
      </section>
    </template>
  </MainContent>
  <Dialog
    v-model:visible="visible"
    modal
    header="Confirmar Exclusão"
    :style="{ width: '25rem' }"
    :close-button-props="{ class: 'hidden' }"
  >
    <div v-if="schedule" class="flex flex-col gap-4">
      <p>
        Deseja excluir o agendamento do dia <b>{{ formatDate(new Date(schedule.date)) }}</b>,
        lavadora <b>{{ schedule.machine }}</b> no turno da <b>{{ schedule.shift }}</b>?
      </p>

      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="cancelDelete" />
        <Button type="button" label="Excluir" severity="danger" @click="applyDelete" />
      </div>
    </div>
  </Dialog>
</template>
