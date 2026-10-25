---
title: App Layout
description: Header, content, sidebars, and footer in one application shell.
navigation:
  icon: tabler:layout
---

::component-example{name="app-layout"}
::

## Usage

```vue
<script setup lang="ts">
import { AppLayout } from '~/components/ui/app-layout'
</script>

<template>
  <AppLayout sticky-header>
    <template #header>IPEX workspace</template>
    <p class="p-4">Current task</p>
  </AppLayout>
</template>
```

## Workspace layout

AppLayout has IPEX styling for the header, footer, side regions, and skip link. Use the left slot for navigation. Set `viewport` to `false` when a parent supplies the height, as these embedded previews do.

::layout-examples{example="workspace"}
::

```vue
<AppLayout :viewport="false" scroll="page">
  <template #header>Workspace</template>
  <template #left><ProjectNavigation /></template>
  <ProjectList />
  <template #footer>2 projects</template>
</AppLayout>
```

## Inspector layout

Add a right region for details that belong beside the current task. The `layout` prop controls which regions the header and footer span.

::layout-examples{example="inspector"}
::

```vue
<AppLayout :layout="{ header: 'full', footer: 'content' }">
  <template #left><ProjectNavigation /></template>
  <ProjectList />
  <template #right><ProjectDetails /></template>
</AppLayout>
```

## Props

| Prop           | Type                  | Default             | Description                                                                               |
| -------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------------------- |
| `as`           | `string \| Component` | `"div"`             | Outer root element.                                                                       |
| `mainAs`       | `string \| Component` | `"main"`            | Content element; use a native tag for the exposed focus helper.                           |
| `layout`       | `AppLayoutConfig`     | See below           | Region span and side placement. Partial objects keep defaults for omitted keys.           |
| `scroll`       | `"content" \| "page"` | `"content"`         | Independent main scrolling or document flow.                                              |
| `viewport`     | `boolean`             | `true`              | Dynamic viewport height in content mode; minimum viewport height in page mode.            |
| `stickyHeader` | `boolean`             | `false`             | Sticky header in page mode.                                                               |
| `stickyFooter` | `boolean`             | `false`             | Sticky footer in page mode.                                                               |
| `stickySides`  | `boolean`             | `false`             | Sticky inline sides in page mode.                                                         |
| `stickyLeft`   | `boolean`             | `stickySides`       | Override stickiness for the inline left side in page mode. Explicit `false` disables it.  |
| `stickyRight`  | `boolean`             | `stickySides`       | Override stickiness for the inline right side in page mode. Explicit `false` disables it. |
| `safeArea`     | `boolean`             | `true`              | Outer device safe-area padding. Consumer padding utilities can override it.               |
| `mainId`       | `string`              | Generated           | Main ID and skip-link target. Keep explicit IDs unique.                                   |
| `mainLabel`    | `string`              | -                   | Accessible name on content element.                                                       |
| `skipLink`     | `boolean`             | `true`              | Render the keyboard skip link.                                                            |
| `skipLabel`    | `string`              | `"Skip to content"` | Skip-link text, including localization.                                                   |
| `ui`           | `AppLayoutUi`         | -                   | Classes for generated parts.                                                              |

## Slots

All five slots receive `mainId: string`, resolved `layout: Required<AppLayoutConfig>`, and `scroll: AppLayoutScroll`. Slots supply content inside generated region wrappers. Omitted region slots produce no wrappers. Slot-owned controls retain their own event handlers and accessibility.

## Source

Copy `AppLayout.vue` and `index.ts` into `components/ui/app-layout` after [installation](/getting-started/installation).

::component-source{name="app-layout"}
::
