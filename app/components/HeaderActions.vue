<script setup lang="ts">
import ColorModeButton from './ColorModeButton.vue'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
</script>

<template>
  <div class="flex shrink-0 items-center gap-1">
    <Separator orientation="vertical" class="mx-2 data-[akaza-orientation=vertical]:h-5" />
    <Button
      as="a"
      href="https://github.com/igris-labs/ipex"
      variant="ghost"
      size="md"
      shape="icon"
      aria-label="GitHub repository"
    >
      <Icon name="tabler:brand-github" class="size-4" aria-hidden="true" />
    </Button>
    <ColorModeButton />
  </div>
</template>
