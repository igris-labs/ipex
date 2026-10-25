<script setup lang="ts">
import { provideToastManager } from 'akaza-ui'
provideToastManager()
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout><NuxtPage /></NuxtLayout>
</template>
