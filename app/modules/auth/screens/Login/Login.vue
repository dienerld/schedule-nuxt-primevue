<script setup lang="ts">
import Form, { type SigninData } from '~/modules/auth/components/Form/Form.vue'
import Header from '~/modules/auth/components/Header/Header.vue'

const router = useRouter()
const { fetch } = useUserSession()
const loading = ref(false)
const hasError = ref(false)

const handlePhoneLogin = async(data: SigninData) => {
  loading.value = true
  await $fetch('/api/auth/signin', {
    method: 'POST',
    body: data,
    onResponse: async() => {
      loading.value = false
      await fetch()
      router.push('/app')
    },
    onResponseError: () => {
      loading.value = false
      hasError.value = true
    }
  })
}

watch(hasError, () => {
  if (hasError.value) {
    setTimeout(() => {
      hasError.value = false
    }, 3000)
  }
})
</script>

<template>
  <Header />
  <section class="flex size-full flex-col items-center justify-center bg-surface-50">
    <div class="min-h-12">
      <Message v-if="hasError" severity="error">
        Usuário ou senha inválidos
      </Message>
    </div>
    <Form :loading @wants-to-signin-with-phone="handlePhoneLogin" />
  </section>
</template>
