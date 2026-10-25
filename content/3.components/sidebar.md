---
title: Sidebar
description: Responsive application sidebar with desktop collapse, resizing, and mobile dialog behavior.
navigation:
  icon: tabler:layout-sidebar
---

::component-example{name="sidebar" variant-options="default,muted" default-variant="default"}
::

## Usage

```vue
<script setup lang="ts">
import { Sidebar } from '~/components/ui/sidebar'
</script>

<template>
  <Sidebar :default-size="240">
    <template #header>Workspace</template>
    <p>Navigation goes here.</p>
  </Sidebar>
</template>
```

## Variants and defaults

| Prop      | Values             | Default   |
| --------- | ------------------ | --------- |
| `variant` | `default`, `muted` | `default` |

## Models

| Model               | Type      | Default            | Description                                                    |
| ------------------- | --------- | ------------------ | -------------------------------------------------------------- |
| `v-model:open`      | `boolean` | `defaultOpen`      | Mobile dialog visibility.                                      |
| `v-model:collapsed` | `boolean` | `defaultCollapsed` | Desktop collapse state. Ignored when `collapsible` is `false`. |
| `v-model:size`      | `number`  | `defaultSize`      | Expanded desktop width in pixels.                              |

## Props

| Prop                   | Type                             | Default                | Description                                                   |
| ---------------------- | -------------------------------- | ---------------------- | ------------------------------------------------------------- |
| `as`                   | `Component \| string`            | `"aside"`              | Desktop panel element.                                        |
| `side`                 | `"left" \| "right"`              | `"left"`               | Sidebar edge.                                                 |
| `collapsible`          | `false \| "icon" \| "offcanvas"` | `false`                | Desktop collapse behavior.                                    |
| `defaultOpen`          | `boolean`                        | `false`                | Initial uncontrolled mobile visibility.                       |
| `defaultCollapsed`     | `boolean`                        | `false`                | Initial uncontrolled desktop collapse state.                  |
| `defaultSize`          | `number`                         | `256`                  | Initial expanded width in pixels.                             |
| `minSize`              | `number`                         | `192`                  | Minimum resized width.                                        |
| `maxSize`              | `number`                         | `480`                  | Maximum resized width.                                        |
| `collapsedSize`        | `number`                         | `48`                   | Width in icon collapse mode.                                  |
| `mobileSize`           | `number`                         | `288`                  | Mobile drawer width.                                          |
| `resizeStep`           | `number`                         | `8`                    | Keyboard resize amount in pixels. Shift multiplies it by ten. |
| `resizable`            | `boolean`                        | `false`                | Render the accessible resize separator.                       |
| `transition`           | `boolean`                        | `true`                 | Enable desktop width and off-canvas transitions.              |
| `mobile`               | `boolean`                        | media query            | Force mobile or desktop rendering.                            |
| `breakpoint`           | `string`                         | `"(max-width: 767px)"` | Media query used when `mobile` is omitted.                    |
| `closeOnBackdropClick` | `boolean`                        | `true`                 | Close the mobile dialog on backdrop interaction.              |
| `closeOnNavigate`      | `boolean`                        | `true`                 | Close mobile mode after activating a same-window link.        |
| `swipeToClose`         | `boolean`                        | `true`                 | Enable directional mobile swipe dismissal.                    |
| `teleport`             | `string \| false`                | `"body"`               | Mobile drawer Teleport target.                                |
| `keyboardShortcut`     | `string \| false`                | `false`                | Command/Ctrl shortcut key for responsive toggle.              |
| `ariaLabel`            | `string`                         | `"Sidebar"`            | Desktop landmark and mobile dialog accessible name.           |
| `resizeAriaLabel`      | `string`                         | `"Resize sidebar"`     | Resize separator accessible name.                             |
| `ui`                   | `SidebarUi`                      | —                      | Classes for named structural parts.                           |

## Slots

| Slot            | Scoped props       | Description                                    |
| --------------- | ------------------ | ---------------------------------------------- |
| `header`        | `SidebarSlotProps` | Fixed header region.                           |
| `default`       | `SidebarSlotProps` | Scrollable body region.                        |
| `footer`        | `SidebarSlotProps` | Fixed footer region.                           |
| `resize-handle` | `SidebarSlotProps` | Content inside the generated separator handle. |

`SidebarSlotProps` exposes `open`, `collapsed`, `isMobile`, `state`, `size`, `openMobile`, `closeMobile`, `toggleMobile`, `expand`, `collapse`, `toggleCollapsed`, `toggle`, and `resetSize`. On mobile, `collapsed` is always `false`.

## Emits

| Event              | Payload                | Description                                                                         |
| ------------------ | ---------------------- | ----------------------------------------------------------------------------------- |
| `open-change`      | `[open, details]`      | Cancelable mobile visibility change.                                                |
| `collapsed-change` | `[collapsed, details]` | Cancelable desktop collapse change.                                                 |
| `size-change`      | `[size, details]`      | Cancelable pointer, keyboard, or reset size change. Details include `previousSize`. |

## Exposed methods

| Method                  | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| `open` / `openMobile`   | Open mobile visibility. `open` is a concise alias.                      |
| `close` / `closeMobile` | Close mobile visibility. `close` is a concise alias.                    |
| `toggleMobile`          | Toggle mobile visibility regardless of responsive state.                |
| `toggle`                | Toggle mobile visibility or desktop collapse based on responsive state. |
| `expand` / `collapse`   | Change desktop collapse state.                                          |
| `toggleCollapsed`       | Toggle desktop collapse state.                                          |
| `resetSize`             | Restore `defaultSize`.                                                  |

## Exposed values

| Value            | Type           | Description                                                 |
| ---------------- | -------------- | ----------------------------------------------------------- |
| `openValue`      | `boolean`      | Current mobile visibility.                                  |
| `collapsedValue` | `boolean`      | Current desktop collapse value.                             |
| `sizeValue`      | `number`       | Current expanded width in pixels.                           |
| `isMobile`       | `boolean`      | Current responsive mode.                                    |
| `state`          | `SidebarState` | Current `open`, `closed`, `expanded`, or `collapsed` state. |

Prefer `useSidebar(sidebarRef)` when consuming these values outside the component.

## Keyboard

| Key                                          | Behavior                                                            |
| -------------------------------------------- | ------------------------------------------------------------------- |
| `Arrow Left` / `Arrow Right`                 | Resize by `resizeStep`; direction follows sidebar placement.        |
| `Shift + Arrow Left` / `Shift + Arrow Right` | Resize by ten times `resizeStep`.                                   |
| `Home` / `End`                               | Resize to minimum or maximum width.                                 |
| `Escape`                                     | Close mobile mode and restore focus.                                |
| `Tab` / `Shift + Tab`                        | Remain inside the open mobile dialog.                               |
| `Command/Ctrl + configured key`              | Toggle current responsive state when `keyboardShortcut` is enabled. |

Pointer, pen, and touch input can resize the desktop separator. Mobile mode supports backdrop and swipe dismissal. Desktop mode remains non-modal and never traps focus.

## Source

Copy `Sidebar.vue` and `index.ts` into `components/ui/sidebar` after [installation](/getting-started/installation).

::component-source{name="sidebar"}
::
