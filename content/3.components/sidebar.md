---
title: Sidebar
description: Responsive application sidebar with desktop collapse, resizing, and mobile dialog behavior.
navigation:
  icon: tabler:layout-sidebar
---

::component-example{name="sidebar" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="soft,subtle,default,muted" default-variant="soft"}
::

## Usage

The `soft` design is the sidebar used in these docs. Pass an items array; Sidebar composes Akaza's responsive panel and vertical navigation. Use labels to group links, and add children for expandable navigation. Rows use the docs' active fill and sliding hover effect.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Sidebar, type SidebarItem } from '~/components/ui/sidebar'

const current = ref('/projects')
const items: SidebarItem[] = [
  { type: 'label', label: 'Workspace' },
  { label: 'Projects', href: '/projects' },
  { label: 'Activity', href: '/activity' },
  { type: 'label', label: 'Settings' },
  { label: 'Profile', href: '/settings/profile' },
]
</script>

<template>
  <Sidebar v-model="current" :items="items" variant="soft" aria-label="Workspace">
    <template #header>Workspace</template>
    <template #footer>Igris Labs</template>
  </Sidebar>
</template>
```

Use `to` for router destinations and `href` for anchors. Set `as` to your link component when needed, for example NuxtLink. `type: 'label'` creates a category heading, `type: 'separator'` adds a divider, and `children` creates expandable navigation. Labels and separators cannot be selected. Pass Vue components as icons, or use `#item-leading` to render icon names from your own data.

At the default `sm` size, rows are 30px tall on 34px spacing with 8px corners, a neutral active fill, and the shared sliding hover effect. The navigation header appears in the mobile panel. `#header` and `#footer` receive the sidebar controller actions, including `closeMobile`. Providing the default slot replaces generated navigation with your own body.

Set `navigation-label` when the navigation landmark needs a different name from the sidebar. Override navigation styles through `ui.navigation`; component defaults still come from `ui.config.ts`.

## Designs

Use `design="standard"` for the existing row highlight or `design="line"` for a vertical selection marker. The line design keeps rows unfilled and moves a 1.5px marker beside the current item. Markers sit 6px inside each row end. Hover changes text emphasis without moving the selection marker; collapsed group labels never receive a marker. Nested links keep the same indentation and sizing.

```vue
<Sidebar design="line" variant="soft" item-size="sm" :items="items" v-model="current" />
```

Switch designs without changing items, models, slots, or the mobile controller. Set `components.sidebar.design` in `ui.config.ts` to change the default.

`design="rail"` adds a faint track through each group’s children, like the table of contents. Tracks stop at category labels and group gaps. A lighter marker follows hover or keyboard focus while the active marker stays on the selected item. Collapsible group labels use a light hover fill instead of a rail.

## Grouping modes

The default `mode="ungrouped"` renders category labels above their items. Use `mode="grouped"` to turn each root category label and its following items into a collapsible group. Pass the same items array for either mode. Existing nested children stay inside their category.

Groups start expanded. Set `defaultExpanded: false` on a label to start its group closed, and give labels stable, unique `value` fields, especially when their text repeats. Groups retain their open state when you switch modes. Links before the first category stay at the root.

```vue
<Sidebar design="rail" mode="grouped" variant="soft" :items="items" v-model="current" />
```

## Variants and defaults

| Prop      | Values                               | Default     |
| --------- | ------------------------------------ | ----------- |
| `mode`    | `ungrouped`, `grouped`               | `ungrouped` |
| `design`  | `standard`, `line`, `rail`           | `standard`  |
| `variant` | `default`, `muted`, `soft`, `subtle` | `default`   |

In the `standard` design, `soft` uses a neutral active fill and `subtle` adds a light inset border. The `line` and `rail` designs use their selection markers without either row treatment. These docs use `standard` with `soft`.

Use `item-size` to scale navigation rows. Set `components.sidebar.itemSize` in `ui.config.ts` for a component default; it falls back to `defaults.size`. Akaza's numeric `v-model:size` controls sidebar width.

| Item size | Row height | Row spacing | Text | Icon | Radius | Horizontal padding |
| --------- | ---------- | ----------- | ---- | ---- | ------ | ------------------ |
| `xs`      | 26px       | 30px        | 12px | 12px | 5px    | 8px                |
| `sm`      | 30px       | 34px        | 13px | 14px | 8px    | 10px               |
| `md`      | 34px       | 38px        | 14px | 16px | 10px   | 12px               |
| `lg`      | 38px       | 42px        | 14px | 18px | 12px   | 14px               |
| `xl`      | 42px       | 46px        | 16px | 20px | 14px   | 16px               |

Group headings use 8/12/16/20/24px top gaps for `xs`/`sm`/`md`/`lg`/`xl`. Child rows keep indentation without guide lines.

## Models

| Model               | Type             | Default            | Description                                                             |
| ------------------- | ---------------- | ------------------ | ----------------------------------------------------------------------- |
| `v-model`           | `string \| null` | —                  | Selected navigation item value; falls back to its destination or label. |
| `v-model:open`      | `boolean`        | `defaultOpen`      | Mobile dialog visibility.                                               |
| `v-model:collapsed` | `boolean`        | `defaultCollapsed` | Desktop collapse state. Ignored when `collapsible` is `false`.          |
| `v-model:size`      | `number`         | `defaultSize`      | Expanded desktop width in pixels.                                       |

## Navigation props

| Prop              | Type                         | Default                     | Description                                              |
| ----------------- | ---------------------------- | --------------------------- | -------------------------------------------------------- |
| `itemSize`        | `xs`, `sm`, `md`, `lg`, `xl` | `sm`                        | Row size; also scales text, padding, icons, and corners. |
| `items`           | `SidebarItem[]`              | —                           | Labels, links, separators, and nested children.          |
| `navigationLabel` | `string`                     | `ariaLabel` or `Navigation` | Accessible name for generated navigation.                |

Navigation forwards the cancelable `select(item, details)` and `value-change(value, details)` events. Canceling selection preserves the current item. For router-driven sidebars, pass the current route as `model-value`.

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

For generated navigation, use `#item-leading`, `#item-label`, or `#item-trailing` to customize rows. Each receives Akaza's `NavigationMenuSlotProps`, including `item`, `isActive`, `isOpen`, `depth`, `collapsed`, and `toggle`.

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

Copy `Sidebar.vue` and `index.ts` into `components/ui/sidebar` after [installation](/getting-started/installation). Also copy [Navigation Menu](/components/navigation-menu), which Sidebar uses to render `items`.

::component-source{name="sidebar"}
::
