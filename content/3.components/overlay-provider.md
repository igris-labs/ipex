---
title: Overlay Provider
description: Open and manage dialogs and other overlays from code.
navigation:
  icon: tabler:layers-intersect
---

## Demos

::component-example{name="overlay-provider"}
::

### Usage

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

### Programmatic behavior

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

## Installation

Complete the [shared installation](/getting-started/installation). Copy `OverlayProvider.vue` and `index.ts` into `app/components/ui/overlay-provider/`.

::component-source{name="overlay-provider"}
::

## API

### Composable

Import `useOverlay` from `akaza-ui` or the local overlay-provider folder. Call `create(Component, options)` to create an overlay instance. Set initial component props with `options.props` and choose whether to dispose it with `options.destroyOnClose`.

| Method         | Description                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------- |
| `open(props)`  | Mount and open the component with props for this opening. Returns a handle with a `result` Promise. |
| `patch(props)` | Update props on the mounted component.                                                              |
| `close()`      | Close the component and resolve the pending result.                                                 |
| `unmount()`    | Remove the instance when its owner no longer needs it.                                              |

The provider has no visual variants. Configure appearance and behavior on the dialog, drawer, or other component you open.

### Slots

Use the default slot for application content. Mount one `OverlayProvider` per application. Use the overlay component's props to configure each dialog, drawer, or popover.
