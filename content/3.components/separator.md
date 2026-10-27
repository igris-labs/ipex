---
title: Separator
description: Separate related groups of content.
navigation:
  icon: tabler:separator
---

## Demos

::component-example{name="separator" variant-options="default,muted" default-variant="default"}
::

### Usage

```vue
<script setup lang="ts">
import { Separator } from '~/components/ui/separator'
</script>

<template>
  <Separator />
</template>
```

For a vertical separator, give its flex container a defined height, such as `h-16`. Horizontal separators fill the available width.

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Separator.vue` and `index.ts` into `app/components/ui/separator/`.

::component-source{name="separator"}
::

## API

### Variants and defaults

| Prop      | Values             | Default   |
| --------- | ------------------ | --------- |
| `variant` | `default`, `muted` | `default` |

### Props

| Prop          | Type                         | Default        | Description                                          |
| ------------- | ---------------------------- | -------------- | ---------------------------------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the separator line.                     |
| `decorative`  | `boolean`                    | `false`        | When true, renders as `role="none"` (purely visual). |
| `as`          | `string`                     | `"div"`        | Root element tag.                                    |
| `ui`          | `SeparatorUi`                | —              | Classes for the root element.                        |
