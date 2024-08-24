<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'

const props = withDefaults(defineProps<{
  name: string
}>(), {
  name: 'Apartamento'
})

const emit = defineEmits<{
  (e: 'logout'): void
  (e: 'wants-to-profile'): void
}>()

const firstLetter = computed(() => props.name.charAt(0))

const menu = ref()
const items = ref<MenuItem[]>([
  {
    items: [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        command: () => emit('wants-to-profile'),
        disabled: true
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => emit('logout')
      }
    ]
  }
])

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}
</script>

<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 py-2.5 lg:px-6">
      <div class="mx-auto flex max-w-screen-xl items-center  justify-between">
        <NuxtLink to="/app" class="flex items-center">
          <Logo />
        </NuxtLink>
        <div class="flex items-center">
          <Button
            type="button"
            aria-label="Menu"
            aria-haspopup="true"
            rounded
            aria-controls="overlay_menu"
            @click="toggle"
          >
            {{ firstLetter }}
          </Button>
          <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
        </div>
      </div>
    </nav>
  </header>
</template>
