<script setup lang="ts">
import PhoneLogin from '~/modules/auth/components/PhoneLogin/PhoneLogin.vue'
const loading = ref(false)

const handleSignin = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

</script>

<template>
  <section class="flex size-full flex-col items-center justify-center gap-5 bg-surface-50">
    <PhoneLogin :loading @wants-to-signin="handleSignin" />
  </section>
</template>
