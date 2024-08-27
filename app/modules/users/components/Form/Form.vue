<script setup lang="ts">
export type ProfileData = {
  name: string,
  password: string,
  confirmPassword: string
}

const props = defineProps<{
  name: string,
  loading: boolean,
  resetForm?: boolean
}>()

const emit = defineEmits<{
  (e: 'update-myself', value: ProfileData): void
}>()

const profileData = ref({
  name: props.name,
  password: '',
  confirmPassword: ''
})
const enableChangePassword = ref(false)

const passwordsMatch = computed(() => {
  return profileData.value.confirmPassword.length === 0 || profileData.value.password === profileData.value.confirmPassword
})
const passwordLength = computed(() => {
  return profileData.value.password.length === 0 || profileData.value.password.length >= 6
})

function handleCancel() {
  profileData.value.password = ''
  profileData.value.confirmPassword = ''
  profileData.value.name = props.name
}

function handleUpdate() {
  emit('update-myself', profileData.value)
}

watch(() => props.resetForm, () => {
  if (props.resetForm) {
    handleCancel()
  }
})

</script>

<template>
  <div class="flex flex-col gap-2 rounded-md border p-4 shadow-md">
    <h2 class="text-2xl font-bold">
      Perfil
    </h2>

    <div class="flex flex-col gap-2">
      <label for="name">Nome</label>
      <InputText id="name" v-model="profileData.name" aria-describedby="name" />
    </div>

    <!-- divider -->
    <hr class="my-2 border-slate-950">

    <div class="flex">
      <h2 class="text-2xl font-bold">
        Acesso ao sistema
      </h2>
      <ToggleSwitch
        v-model="enableChangePassword"
        class="ml-auto"
        aria-label="Habilitar mudança de senha"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="password">Senha</label>
      <InputText
        id="password"
        v-model="profileData.password"
        :invalid="!passwordLength || !passwordsMatch"
        :disabled="!enableChangePassword"
        aria-describedby="password"
        type="password"
      />
      <small v-if="!passwordLength" id="helperText-password-length" class="text-red-500">
        Senha não contem 6 ou mais caracteres
      </small>
    </div>

    <div class="flex flex-col gap-2">
      <label for="confirmPassword">Confirmar senha</label>
      <InputText
        id="confirmPassword"
        v-model="profileData.confirmPassword"
        :disabled="!enableChangePassword"
        type="password"
        aria-describedby="confirmPassword"
      />
      <small v-if="!passwordsMatch" id="helperText-passwordConfirm" class="text-red-500">
        Senhas não conferem
      </small>
    </div>

    <!-- divider -->
    <hr class="my-2 border-slate-950">
    <div class="flex justify-end gap-2">
      <Button :disabled="props.loading" label="Cancelar" severity="danger" @click="handleCancel" />
      <Button
        :loading="props.loading"
        label="Atualizar"
        :disabled="!passwordLength || !passwordsMatch"
        @click="handleUpdate"
      />
    </div>
  </div>
</template>
