---
title: Pagination
description: Accessible page navigation with ranges, ellipses, boundary controls, and optional links.
navigation:
  icon: tabler:arrows-horizontal
---

::component-example{name="pagination" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { Pagination } from '~/components/ui/pagination'
</script>

<template>
  <Pagination :total="100" :items-per-page="10" />
</template>
```

## Selection and movement

Page numbers use equal-width controls and tabular numerals. A separate selection marker stays in place when the visible range shifts; the numbered controls slide to their new positions over 180ms. Reduced motion updates the range immediately.

Previous, next, first, and last controls use chevrons with accessible labels. Custom slots can replace those icons. Larger ranges scroll within their container instead of clipping controls. DataTable uses this same styled pagination and inherits the table size.

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Active-page variants

Choose `soft` (default), `solid`, `subtle`, or `outline` with `variant`. Each uses the same marker and number movement; the selected page changes its fill, border, and foreground together. Use the preview's variant selector to compare them.

```vue
<Pagination v-model="page" :total="100" variant="solid" />
<Pagination v-model="page" :total="100" variant="outline" />
```

## Props

| Prop               | Type                                         | Default        | Description                                           |
| ------------------ | -------------------------------------------- | -------------- | ----------------------------------------------------- |
| `variant`          | `"soft" \| "solid" \| "subtle" \| "outline"` | `"soft"`       | Appearance of the active page marker and label.       |
| `total`            | `number`                                     | `0`            | Total number of data items.                           |
| `itemsPerPage`     | `number`                                     | `10`           | Data items represented by each page.                  |
| `siblingCount`     | `number`                                     | `2`            | Visible page numbers on each side of current page.    |
| `showEdges`        | `boolean`                                    | `false`        | Always includes first/last page numbers and ellipses. |
| `showFirstLast`    | `boolean`                                    | `false`        | Renders explicit first/last controls.                 |
| `showPreviousNext` | `boolean`                                    | `true`         | Renders previous/next controls.                       |
| `disabled`         | `boolean`                                    | `false`        | Disables all pagination controls.                     |
| `ariaLabel`        | `string`                                     | `"Pagination"` | Accessible navigation label.                          |
| `getPageHref`      | `(page) => string \| undefined`              | —              | Renders controls as anchors when an href is returned. |
| `ui`               | `PaginationUi`                               | —              | Classes for structural parts.                         |

## Slots

| Slot       | Props                                    | Description                      |
| ---------- | ---------------------------------------- | -------------------------------- |
| `first`    | `disabled`                               | First-page control content.      |
| `previous` | `disabled`                               | Previous-page control content.   |
| `page`     | `page`, `isActive`                       | Numbered page content.           |
| `ellipsis` | `side`                                   | Start/end ellipsis content.      |
| `next`     | `disabled`                               | Next-page control content.       |
| `last`     | `disabled`                               | Last-page control content.       |
| `state`    | `page`, `pageCount`, `items`, `goToPage` | Optional state-driven custom UI. |

## Emits

| Event               | Payload           | Description                                               |
| ------------------- | ----------------- | --------------------------------------------------------- |
| `update:modelValue` | `page`            | Fired after an accepted page change.                      |
| `value-change`      | `(page, details)` | Fired before page change. `details.cancel()` prevents it. |

## Keyboard

Pagination uses native buttons or links. Tab moves through enabled controls; Enter and Space activate buttons, and Enter activates links. Boundary controls are disabled and removed from the tab order when they cannot move further.

## Source

Copy `Pagination.vue` and `index.ts` into `components/ui/pagination` after [installation](/getting-started/installation).

::component-source{name="pagination"}
::
