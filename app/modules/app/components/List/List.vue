<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

</script>

<template>
  <section class="flex-1 border-primary-200 md:border-none  [&:not(:first-child)]:mt-4  [&:not(:first-child)]:border-t-2 [&:not(:first-child)]:pt-4 md:[&:not(:first-child)]:mt-0 md:[&:not(:first-child)]:pt-0">
    <h2 class="py-2 text-center text-2xl font-bold md:text-left">
      {{ props.name }}
    </h2>
    <ul class="flex flex-1 flex-col gap-4">
      <slot />
    </ul>
  </section>
</template>
