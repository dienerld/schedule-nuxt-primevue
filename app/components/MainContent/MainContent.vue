<template>
  <div class="flex size-full flex-col">
    <slot name="header" class="flex-1" />
    <div class="size-full flex-1 bg-surface-50">
      <div class="mx-auto size-full max-w-screen-xl p-5">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
