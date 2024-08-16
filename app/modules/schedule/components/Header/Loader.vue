<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <header v-if="props.loading" class="w-full shadow">
    <nav class="bg-white px-4 py-2.5 lg:px-6">
      <div class="mx-auto flex max-w-screen-xl items-center justify-between">
        <div class="flex items-center">
          <nuxt-link to="/app">
            <Logo />
          </nuxt-link>
        </div>

        <div class="flex items-center gap-2">
          <!-- <Skeleton width="7rem" height="2rem" /> -->
          <Skeleton shape="circle" size="2rem" />
        </div>
      </div>
    </nav>
  </header>

  <slot v-else />
</template>
