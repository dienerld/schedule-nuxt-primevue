<script setup lang="ts">
const props = defineProps<{
  modelValue: Date
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void
}>()
const data = useVModel(props, 'modelValue', emit)

const router = useRouter()

const formatDate = Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format

</script>

<template>
  <header class="mb-4 flex flex-col items-center justify-between sm:mb-2 md:flex-row">
    <h1 class="mb-4 text-center text-4xl font-bold sm:text-left">
      Agendamentos
    </h1>

    <div class="flex w-full flex-1 flex-col items-center justify-between gap-2 sm:flex-row sm:justify-between  md:justify-end">
      <Button
        label="Novo agendamento"
        icon="pi pi-plus"
        class="w-min text-nowrap"
        @click="router.push('/app/schedule/new')"
      />

      <div class="flex flex-1 items-center justify-center gap-2 sm:grow-0">
        <!-- btn back -->
        <Button
          aria-label="Anterior"
          outlined
          icon="pi pi-arrow-left"
          @click="data = new Date(data.setDate(data.getDate() - 1))"
        />
        <!-- btn today -->
        <Button aria-label="Data escolhida" text :label="formatDate(data)" disabled />
        <!-- btn next -->
        <Button
          aria-label="Proximo"
          outlined
          icon="pi pi-arrow-right"
          @click="data = new Date(data.setDate(data.getDate() + 1))"
        />
      </div>
    </div>
  </header>
</template>
