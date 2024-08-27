<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()

</script>

<template>
  <template v-if="props.loading">
    <Skeleton height="20rem" class="mx-auto" />
  </template>
  <slot v-else />
</template>
