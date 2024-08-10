<script setup lang="ts">
type SigninData = {
  phone: string
  password: string
}
const emit = defineEmits<{
  (e: 'wants-to-signin', data: SigninData): void
}>()

const props = defineProps<{
  loading?: boolean
}>()

const signinData = reactive<SigninData>({
  phone: '',
  password: ''
})

const handleSignin = () => {
  emit('wants-to-signin', signinData)
}

</script>

<template>
  <div class="relative flex h-full flex-col items-center justify-center gap-2 rounded bg-surface-50 p-6">
    <section class="flex flex-col items-center gap-4 rounded-lg border border-surface-200 p-6 shadow-lg">
      <header class="flex flex-col items-center gap-2">
        <Logo class="text-3xl" />
        <h2 class="text-2xl font-medium text-primary-600">
          Entrar
        </h2>
      </header>

      <form class="flex flex-col gap-2" autocomplete="on" @submit.prevent="handleSignin">
        <div class="flex-auto">
          <label for="phone" class="mb-1 block font-bold">Phone</label>
          <InputMask id="phone" v-model="signinData.phone" mask="(99) 99999-9999" placeholder="(99) 91234-5678" fluid />
        </div>

        <div class="flex-auto">
          <label for="password" class="mb-1 block font-bold">Password</label>
          <InputText id="password" v-model="signinData.password" type="password" placeholder="Password" fluid />
        </div>

        <Button label="Entrar" type="submit" :loading="props.loading" />
      </form>
    </section>
  </div>
</template>
