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

## Programmatic behavior

Configure the component passed to `useOverlay`, rather than putting dialog behavior on the provider. The preview exposes title, description, fullscreen, backdrop dismissal, transition duration, and instance disposal. The provider can also wrap application content through its default slot.

```ts
const dialog = useOverlay().create(Dialog, {
  props: {
    title: 'Review changes',
    closeOnBackdropClick: false,
    duration: 180,
    width: 'sm',
  },
  destroyOnClose: true,
})

const { result } = dialog.open({ description: 'Check the changes before continuing.' })
dialog.patch({ title: 'Updated review', fullscreen: true })
dialog.close()
await result
dialog.unmount()
```

`open(props)` applies props for that opening, `patch(props)` updates a mounted instance, and `close()` resolves its pending result. Use `destroyOnClose: false` when you want to retain the instance between openings; call `unmount()` when its owner is finished with it.

## Source

Copy `OverlayProvider.vue` and `index.ts` into `components/ui/overlay-provider` after [installation](/getting-started/installation).

::component-source{name="overlay-provider"}
::
