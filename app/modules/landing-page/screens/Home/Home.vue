<script setup lang="ts">
import Header from '~/modules/landing-page/components/Header/Header.vue'
import Hero from '~/modules/landing-page/components/Hero/Hero.vue'

const handleLogin = () => { }
</script>

<template>
  <MainContent>
    <template #header>
      <Header @wants-to-login="handleLogin" />
    </template>
    <template #content>
      <Hero />
    </template>
  </MainContent>
</template>
