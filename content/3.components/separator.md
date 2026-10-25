---
title: Separator
description: A visual or semantic divider between content sections.
navigation:
  icon: tabler:separator
---

::component-example{name="separator" variant-options="default,muted" default-variant="default"}
::

## Usage

```vue
<script setup lang="ts">
import { Separator } from '~/components/ui/separator'
</script>

<template>
  <Separator />
</template>
```

## Variants and defaults

| Prop      | Values             | Default   |
| --------- | ------------------ | --------- |
| `variant` | `default`, `muted` | `default` |

## Props

| Prop          | Type                         | Default        | Description                                          |
| ------------- | ---------------------------- | -------------- | ---------------------------------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the separator line.                     |
| `decorative`  | `boolean`                    | `false`        | When true, renders as `role="none"` (purely visual). |
| `as`          | `string`                     | `"div"`        | Root element tag.                                    |
| `ui`          | `SeparatorUi`                | —              | Classes for the root element.                        |

## Source

Copy `Separator.vue` and `index.ts` into `components/ui/separator` after [installation](/getting-started/installation).

::component-source{name="separator"}
::
