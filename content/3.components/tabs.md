---
title: Tabs
description: A set of layered sections of content, one visible at a time.
navigation:
  icon: tabler:folder
---

::component-example{name="tabs" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="line,soft" default-variant="soft"}
::

## Usage

```vue
<script setup lang="ts">
import { Tabs } from '~/components/ui/tabs'

const items = [
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
]
</script>

<template>
  <Tabs :items="items">
    <template #panel-overview>Project overview.</template>
    <template #panel-activity>Recent activity.</template>
  </Tabs>
</template>
```

The default soft variant uses inset segmented pills with a sliding selection background. Items and the indicator follow the control radius for the selected size; the container adds 4px to that radius. At sm, the inner radius is 6px and the outer radius is 10px. The surface stays flat, without a resting shadow. The line variant uses a sliding underline. Both respect reduced-motion preferences.

Panels share one grid area by default, reserving room for the tallest retained panel and switching content with a 60ms fade-out followed by a 140ms, 4px slide-fade. Only one panel is painted at a time, so text does not overlap during the transition. Inactive panels stay hidden from interaction. If you enable `unmountOnHide`, use `ui.panels` to reserve any minimum height your layout needs.

## Variants and defaults

| Prop      | Values                       | Default |
| --------- | ---------------------------- | ------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |
| `variant` | `soft`, `line`               | `soft`  |

## Props

| Prop             | Type                         | Default        | Description                                                             |
| ---------------- | ---------------------------- | -------------- | ----------------------------------------------------------------------- |
| `items`          | `TabsItem[]`                 | —              | **Required.** List of tab items.                                        |
| `modelValue`     | `string`                     | `""`           | Currently active tab value.                                             |
| `orientation`    | `"horizontal" \| "vertical"` | `"horizontal"` | Tab list direction.                                                     |
| `activationMode` | `"automatic" \| "manual"`    | `"automatic"`  | `automatic`: arrow keys activate. `manual`: arrow keys move focus only. |
| `unmountOnHide`  | `boolean`                    | `false`        | Use `v-if` instead of `v-show` for inactive panels.                     |
| `ariaLabel`      | `string`                     | —              | `aria-label` for the tab list.                                          |
| `labelKey`       | `string`                     | `"label"`      | Property to use as label when items are objects.                        |
| `ui`             | `TabsUi`                     | —              | CSS class overrides.                                                    |

## Slots

| Slot            | Scoped props                 | Description                                              |
| --------------- | ---------------------------- | -------------------------------------------------------- |
| `tab`           | `{ item, isActive, select }` | Each tab button. Defaults to rendering the item's label. |
| `panel-{value}` | `{ item, isActive }`         | Content panel for the tab with the matching `value`.     |

## Emits

| Event          | Payload                    | Description                      |
| -------------- | -------------------------- | -------------------------------- |
| `value-change` | `[value: string, details]` | Fired when selected tab changes. |

## Keyboard

| Key                        | Behavior                                                           |
| -------------------------- | ------------------------------------------------------------------ |
| `ArrowLeft` / `ArrowRight` | Moves through enabled horizontal tabs and loops.                   |
| `ArrowUp` / `ArrowDown`    | Moves through enabled vertical tabs and loops.                     |
| `Home` / `End`             | Focuses first or last enabled tab.                                 |
| `Enter` / `Space`          | Activates focused tab. Required in manual activation mode.         |
| `Tab`                      | Moves from active tab into active panel or next focusable control. |

Automatic mode activates during arrow movement. Manual mode moves focus only until activation.

## Source

Copy `Tabs.vue` and `index.ts` into `components/ui/tabs` after [installation](/getting-started/installation).

::component-source{name="tabs"}
::
