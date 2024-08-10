<script setup lang="ts">
const emit = defineEmits<{
  (e: 'wants-to-login'): void
}>()

</script>

<template>
  <section class="flex size-full flex-1 flex-col items-center justify-center">
    <h1 class="mb-4 text-balance text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
      Never Forget Your Laundry Again
    </h1>
    <p class="mb-8 max-w-3xl text-balance text-center text-xl text-primary-400 lg:text-2xl">
      Our laundry schedule app helps you stay on top of your laundry with automated reminders, tracking, and optimization.
    </p>
    <div class="flex flex-col items-center justify-center">
      <Button
        label="Entrar"
        icon-pos="right"
        icon="pi pi-sign-in"
        @click="emit('wants-to-login')"
      />
    </div>
  </section>
</template>
