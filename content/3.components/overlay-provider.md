---
title: Overlay Provider
description: Programmatic overlay mounting with useOverlay.
navigation:
  icon: tabler:layers-intersect
---

::component-example{name="overlay-provider"}
::

## Usage

```vue
<script setup lang="ts">
import { OverlayProvider } from '~/components/ui/overlay-provider'
import { useOverlay } from 'akaza-ui'
import { Dialog } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'

const dialog = useOverlay().create(Dialog, { props: { title: 'Project details' } })
</script>

<template>
  <OverlayProvider />
  <Button @click="dialog.open()">Open dialog</Button>
</template>
```

This provider adds no visible container. Overlay components own their IPEX recipes, so the provider needs no visual variants or size configuration. Mount one provider in the application.

## Source

Copy `OverlayProvider.vue` and `index.ts` into `components/ui/overlay-provider` after [installation](/getting-started/installation).

::component-source{name="overlay-provider"}
::
