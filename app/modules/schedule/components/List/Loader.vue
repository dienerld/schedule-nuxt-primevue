<script setup lang="ts">
const props = withDefaults(defineProps<{
  items: number
}>(), {
  items: 3
})
</script>
<template>
  <li
    v-for="i in props.items"
    :key="i"
    class="flex min-w-80 flex-1 flex-col gap-1 rounded bg-surface-100 p-4"
  >
    <Skeleton width="50%" height="2rem" />
    <Skeleton width="50%" height="1.5rem" />
    <Skeleton width="50%" height="1.5rem" />
    <Skeleton width="50%" height="1.5rem" />
    <div class="mt-2 flex flex-1 gap-2">
      <Skeleton width="100%" height="2rem" />
      <Skeleton width="100%" height="2rem" />
    </div>
  </li>
</template>
