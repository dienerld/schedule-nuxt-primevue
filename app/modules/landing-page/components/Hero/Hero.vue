<script setup lang="ts">
const emit = defineEmits<{
  (e: 'wants-to-login'): void
}>()

</script>

<template>
  <section class="flex size-full flex-1 flex-col items-center justify-center">
    <h1 class="mb-4 text-balance text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
      Facilite Seu Dia com o Agendamento da Lavanderia
    </h1>
    <p class="mb-4 max-w-3xl text-balance text-center text-xl text-primary-400 lg:text-2xl">
      Nosso aplicativo permite que você reserve máquinas de lavar de maneira simples e rápida, garantindo que você tenha sempre uma máquina disponível quando precisar.
    </p>
    <p class="mb-8 max-w-3xl text-balance text-center text-xl text-primary-700 lg:text-2xl">
      Agende Sua Lavagem Agora e Descomplique Seu Dia a Dia!
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
