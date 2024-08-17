<script setup lang="ts">
import * as luxon from 'luxon'

luxon.Settings.defaultLocale = 'pt-BR'
luxon.Settings.defaultZone = 'America/Sao_Paulo'

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
