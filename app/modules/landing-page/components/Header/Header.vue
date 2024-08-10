<script setup lang="ts">

</script>

<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 py-2.5 lg:px-6">
      <div class="mx-auto flex max-w-screen-xl items-center justify-center md:justify-between">
        <NuxtLink to="/" class="flex items-center">
          <Logo />
        </NuxtLink>
        <div class="hidden items-center md:flex">
          <Button
            label="Entrar"
            icon-pos="right"
            icon="pi pi-sign-in"
          />
        </div>
      </div>
    </nav>
  </header>
</template>
