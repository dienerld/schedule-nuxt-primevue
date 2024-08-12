<template>
  <div class="flex size-full  min-w-96 flex-col">
    <slot name="header" class="flex-1" />
    <div class="size-full flex-1 bg-surface-50">
      <div class="mx-auto size-full max-w-screen-xl overflow-auto p-1 sm:p-4 lg:p-6">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
