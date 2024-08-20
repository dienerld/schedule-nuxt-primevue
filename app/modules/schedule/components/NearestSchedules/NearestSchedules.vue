<script setup lang="ts">
import Loader from './Loader.vue'

const props = defineProps<{
  older?: Schedule | null,
  newer?: Schedule | null,
  loading: boolean
}>()

</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h3 class="text-xl font-semibold">
      Meus Agendamentos
    </h3>
    <Loader v-if="props.loading" />
    <template v-if="!props.loading">
      <ul class="flex flex-col items-center justify-center">
        <li>Último: {{ props.older?.day ? formatDate(props.older?.day) : 'Nenhum' }}</li>
        <li>Próximo: {{ props.newer?.day ? formatDate(props.newer?.day) : 'Nenhum' }}</li>
      </ul>
    </template>
  </div>
</template>
