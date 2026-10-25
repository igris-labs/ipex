<script setup lang="ts">
import { Avatar } from '../ui/avatar'
import ExampleFrame from './ExampleFrame.vue'
</script>

<template>
  <ExampleFrame>
    <div class="flex flex-col items-center gap-3">
      <Avatar src="/images/avatar.jpg" alt="Portrait of a team member" text="TM" size="xl" />
      <span class="text-xs text-muted-foreground">Image</span>
    </div>
    <div class="flex flex-col items-center gap-3">
      <Avatar text="IL" alt="Igris Labs" size="xl" />
      <span class="text-xs text-muted-foreground">Initials</span>
    </div>
    <div class="flex flex-col items-center gap-3">
      <Avatar src="/images/avatar-missing.jpg" text="TM" alt="Team member" size="xl" />
      <span class="text-xs text-muted-foreground">Image unavailable</span>
    </div>
  </ExampleFrame>
</template>
