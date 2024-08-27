<script setup lang="ts">
import Form, { type ProfileData } from '~/modules/users/components/Form/Form.vue'
import FormLoader from '~/modules/users/components/Form/Loader.vue'
import { myselfKey } from '../composables/useMySelf/useMySelf'
const { loading, user, update: updateMyself } = inject(myselfKey)!

const loadingUpdate = ref(false)
const resetForm = ref(false)
const updateStatus = ref({
  show: false,
  severity: 'success',
  message: 'Atualizado com sucesso'
})

async function handleUpdate(profileData: ProfileData) {
  try {
    resetForm.value = false
    loadingUpdate.value = true
    await $fetch('/api/users/myself', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    })
    loadingUpdate.value = false
    await updateMyself()
    resetForm.value = true
    updateStatus.value = {
      show: true,
      severity: 'success',
      message: 'Atualizado com sucesso'
    }
  } catch (error) {
    console.log('error', error)
    loadingUpdate.value = false
    updateStatus.value = {
      show: true,
      severity: 'error',
      message: 'Erro ao atualizar o perfil'
    }
  } finally {
    setTimeout(() => {
      updateStatus.value = {
        show: false,
        severity: 'success',
        message: 'Atualizado com sucesso'
      }
    }, 4000)
  }
}

</script>

<template>
  <div class="my-4 min-h-10">
    <Message v-if="updateStatus.show" :severity="updateStatus.severity" class="mb-2">
      {{ updateStatus.message }}
    </Message>
  </div>
  <FormLoader :loading="loading">
    <Form
      :name="user!.name"
      :loading="loadingUpdate"
      :reset-form
      @update-myself="handleUpdate"
    />
  </FormLoader>
</template>
