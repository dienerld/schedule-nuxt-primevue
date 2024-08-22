<script setup lang="ts">
export type SigninData = {
  number: number | undefined
  password: string
}
const emit = defineEmits<{
  (e: 'wants-to-signin-with-phone', data: SigninData): void
}>()

const props = defineProps<{
  loading?: boolean
}>()

const signinData = reactive<SigninData>({
  number: undefined,
  password: ''
})

const handleSignin = () => {
  emit('wants-to-signin-with-phone', signinData)
}

</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2 rounded bg-surface-50 p-6">
    <section class="flex flex-col items-center gap-4 rounded-lg border border-surface-200 p-6 shadow-lg">
      <header class="flex flex-col items-center gap-2">
        <Logo class="text-3xl" />
        <h2 class="text-2xl font-medium text-primary-600">
          Entrar
        </h2>
      </header>

      <form class="flex flex-col gap-2" autocomplete="on" @submit.prevent="handleSignin">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-home" />
          </InputGroupAddon>
          <InputNumber v-model="signinData.number" allow-empty placeholder="Apartamento" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-eye" />
          </InputGroupAddon>
          <InputText v-model="signinData.password" placeholder="Senha" type="password" />
        </InputGroup>

        <Button label="Entrar" type="submit" :loading="props.loading" />
      </form>
    </section>
  </div>
</template>
