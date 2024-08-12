<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
}>(), {
  name: 'Apartamento'
})

const emit = defineEmits<{
  (e: 'wants-to-signout'): void
  (e: 'wants-to-profile'): void
}>()

const firstLetter = computed(() => {
  let result = ''
  const [first, last] = props.name.trim().split(' ')
  if (first) { result = first.charAt(0).toUpperCase() }

  if (last) { result += last.charAt(0).toUpperCase() }

  return result
})

const menu = ref()
const items = ref([
  {
    items: [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        command: () => emit('wants-to-profile')
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => emit('wants-to-signout')
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
      <div class="mx-auto flex max-w-screen-xl items-center justify-center md:justify-between">
        <NuxtLink to="/" class="flex items-center">
          <Logo />
        </NuxtLink>
        <div class="hidden items-center md:flex">
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
