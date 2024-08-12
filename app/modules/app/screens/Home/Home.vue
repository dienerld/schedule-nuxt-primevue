<script setup lang="ts">
import Header from '../../components/Header/Header.vue'
import List from '../../components/List/List.vue'

const schedules = [
  { date: '2022-01-01', name: 'João', shift: 'Manha', machine: 'Maquina 1', number: 1 },
  { date: '2022-01-02', name: 'Maria', shift: 'Tarde', machine: 'Maquina 2', number: 2 },
  { date: '2022-01-03', name: 'Lucas', shift: 'Tarde', machine: 'Maquina 3', number: 3 },
  { date: '2022-01-04', name: 'Yanne', shift: 'Manha', machine: 'Maquina 4', number: 4 },
  { date: '2022-01-05', name: 'Diener ', shift: 'Tarde', machine: 'Maquina 5', number: 5 },
  { date: '2022-01-06', name: 'Karoline Dornelas', shift: 'Manha', machine: 'Maquina 6', number: 6 },
  { date: '2022-01-07', name: 'dalksdahdh kashdjas dkjha', shift: 'Tarde', machine: 'Maquina 7', number: 7 },
  { date: '2022-01-08', name: 'dasdas d', shift: 'Manha', machine: 'Maquina 8', number: 8 },
  { date: '2022-01-09', name: 'dadasdadsa', shift: 'Tarde', machine: 'Maquina 9', number: 9 },
  { date: '2022-01-10', name: 'dadasd', shift: 'Manha', machine: 'Maquina 10', number: 10 }
]

const date = ref(new Date())

const formatDate = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format

const schedulesManha = schedules.filter(schedule => schedule.shift === 'Manha')
const schedulesTarde = schedules.filter(schedule => schedule.shift === 'Tarde')
</script>

<template>
  <MainContent>
    <template #header>
      <Header />
    </template>
    <template #content>
      <header class="mb-4 flex flex-col items-center justify-between sm:mb-2 sm:flex-row">
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
      <section class="flex w-full flex-col  gap-4 rounded border bg-surface-50 p-2 shadow sm:p-4">
        <template v-for="(schedule, key) in [schedulesManha, schedulesTarde]" :key>
          <List :name="key === 0 ? 'Manha' : 'Tarde'" :values="schedule" />
        </template>
      </section>
    </template>
  </MainContent>
</template>
