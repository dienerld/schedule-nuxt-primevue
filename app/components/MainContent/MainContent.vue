<script setup lang="ts">
const props = defineProps<{
  innerScroll?: boolean
}>()
</script>

<template>
  <div class="flex size-full min-w-96 flex-col">
    <slot name="header" class="flex-1" />
    <div class="h-max w-full flex-1 bg-surface-50" :class="{ 'overflow-auto': props.innerScroll }">
      <div class="mx-auto size-full max-w-screen-xl p-1 sm:p-4 lg:p-6">
        <slot name="content" />
      </div>
    </div>
    <!-- footer -->
    <!-- footer default -->
    <footer class=" flex w-full bg-slate-200">
      <slot name="footer" />
    </footer>
  </div>
</template>
