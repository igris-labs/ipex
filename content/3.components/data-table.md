---
title: Data Table
description: Display records with sorting, filtering, selection, and pagination.
navigation:
  icon: tabler:table
---

## Demos

::component-example{name="data-table" size-options="xs,sm,md,lg,xl" default-size="md"}
::

### Usage

```vue
<script setup lang="ts">
import { DataTable } from '~/components/ui/data-table'

const data = [{ id: 'ipex', name: 'IPEX' }]
const columns = [{ accessor: 'name' as const, header: 'Project' }]
</script>

<template>
  <DataTable :data="data" :columns="columns" row-key="id" aria-label="Projects" />
</template>
```

### Sorting and selection

Click a column heading to sort. Add a selection column and bind `selection` to stable row keys. Selection remains independent of sorting and pagination.

::data-table-examples{example="selection"}
::

::example-source{file="DataTableExamples.vue"}
::

```vue
<DataTable
  v-model:selection="selectedIds"
  :data="projects"
  :columns="[
    { id: 'select', type: 'selection' },
    { accessor: 'name', header: 'Project', sortable: true },
  ]"
  row-key="id"
  selection-mode="multiple"
/>
```

### Filtering and pagination

Bind `globalFilter` to your search input. Enable `paginate` and bind the one-based page and page size. For server data, use the manual filtering and pagination props instead.

::data-table-examples{example="filtering"}
::

::example-source{file="DataTableExamples.vue"}
::

```vue
<Input v-model="search" aria-label="Search projects" />
<DataTable
  v-model:global-filter="search"
  v-model:pagination="pagination"
  :data="projects"
  :columns="columns"
  row-key="id"
  paginate
/>
```

### Expanded details

Add an expander column and `isRowExpandable` for rows with detail content. Use the `expanded` slot to render those details.

::data-table-examples{example="expansion"}
::

::example-source{file="DataTableExamples.vue"}
::

```vue
<DataTable :data="projects" :columns="columns" row-key="id" :is-row-expandable="() => true">
  <template #expanded="{ row }">Owner: {{ row.original.owner }}</template>
</DataTable>
```

### Empty, loading, and error states

Use the state picker to inspect each result. Supply an actionable error message when loading fails; distinguish it from an empty result.

::data-table-examples{example="states"}
::

::example-source{file="DataTableExamples.vue"}
::

```vue
<DataTable :data="projects" :columns="columns" row-key="id" :loading="pending" :error="error" />
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `DataTable.vue` and `index.ts` into `app/components/ui/data-table/`. Also copy the required components: [Pagination](/components/pagination).

::component-source{name="data-table"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `md`    |

### Models

| Model                      | Type                                 | Default                     | Description                  |
| -------------------------- | ------------------------------------ | --------------------------- | ---------------------------- |
| `v-model:selection`        | `rowKey \| rowKey[] \| null`         | `null`                      | Selected stable row keys.    |
| `v-model:sorting`          | `DataTableSorting[]`                 | `[]`                        | Ordered sort descriptors.    |
| `v-model:filters`          | `Record<string, unknown>`            | `{}`                        | Per-column filter values.    |
| `v-model:globalFilter`     | `string`                             | `""`                        | Global search text.          |
| `v-model:pagination`       | `{ page, pageSize }`                 | `{ page: 1, pageSize: 10 }` | One-based page state.        |
| `v-model:expanded`         | `rowKey[]`                           | `[]`                        | Expanded row keys.           |
| `v-model:columnVisibility` | `Record<string, boolean>`            | `{}`                        | Column visibility overrides. |
| `v-model:columnOrder`      | `string[]`                           | `[]`                        | Leaf column order.           |
| `v-model:columnSizing`     | `Record<string, number>`             | `{}`                        | Column widths in pixels.     |
| `v-model:columnPinning`    | `{ start: string[], end: string[] }` | empty sides                 | Pinned leaf columns.         |
| `v-model:rowOrder`         | `rowKey[]`                           | `[]`                        | User-controlled row order.   |

### Props

| Prop                | Type                                          | Default                     | Description                                            |
| ------------------- | --------------------------------------------- | --------------------------- | ------------------------------------------------------ |
| `data`              | `readonly T[]`                                | required                    | Rows supplied to the table.                            |
| `columns`           | `readonly DataTableColumn<T>[]`               | required                    | Typed column definitions.                              |
| `rowKey`            | `keyof T \| (row, index) => string \| number` | required                    | Stable row identity.                                   |
| `caption`           | `string`                                      | —                           | Native table caption text.                             |
| `ariaLabel`         | `string`                                      | —                           | Accessible table label when no caption is used.        |
| `ariaLabelledby`    | `string`                                      | —                           | ID of an external table label.                         |
| `ariaDescribedby`   | `string`                                      | —                           | IDs describing the table.                              |
| `loading`           | `boolean`                                     | `false`                     | Renders loading state and `aria-busy`.                 |
| `error`             | `boolean \| string \| Error`                  | `false`                     | Renders error state.                                   |
| `emptyLabel`        | `string`                                      | `"No results."`             | Default empty-state text.                              |
| `errorLabel`        | `string`                                      | `"Unable to load results."` | Default non-Error message.                             |
| `sortingMode`       | `"single" \| "multiple"`                      | `"single"`                  | Number of retained sort descriptors.                   |
| `manualSorting`     | `boolean`                                     | `false`                     | Disables client sorting.                               |
| `manualFiltering`   | `boolean`                                     | `false`                     | Disables client filtering.                             |
| `paginate`          | `boolean`                                     | `false`                     | Enables client pagination.                             |
| `manualPagination`  | `boolean`                                     | `false`                     | Treats supplied data as an API page.                   |
| `rowCount`          | `number`                                      | —                           | Total server row count for manual pagination.          |
| `showPagination`    | `boolean`                                     | `true`                      | Shows built-in or slotted pagination.                  |
| `selectionMode`     | `"none" \| "single" \| "multiple"`            | `"none"`                    | Selection behavior.                                    |
| `selectionBehavior` | `"control" \| "row"`                          | `"control"`                 | Whether non-interactive row clicks select.             |
| `selectAllScope`    | `"page" \| "filtered"`                        | `"page"`                    | Rows affected by select all.                           |
| `isRowSelectable`   | `(row) => boolean`                            | all rows                    | Disables selection per row.                            |
| `isRowExpandable`   | `(row) => boolean`                            | rows with children          | Enables detail expansion per row.                      |
| `getSubRows`        | `(row) => readonly T[]`                       | —                           | Returns hierarchical child rows.                       |
| `columnResize`      | `boolean \| DataTableColumnResizeOptions`     | `false`                     | Enables pointer/touch/keyboard resizing.               |
| `columnReorder`     | `boolean`                                     | `false`                     | Enables pointer/touch/keyboard column reorder handles. |
| `rowReorder`        | `boolean`                                     | `false`                     | Enables pointer/touch/keyboard row reorder handles.    |
| `stickyHeader`      | `boolean`                                     | `false`                     | Keeps headers at the viewport top.                     |
| `dir`               | `"ltr" \| "rtl"`                              | `"ltr"`                     | Logical direction for sizing and pinning.              |
| `labels`            | `DataTableLabels`                             | English labels              | Accessible control and state labels.                   |
| `rowAttrs`          | `HTMLAttributes \| (row) => HTMLAttributes`   | —                           | Native attributes/classes for every row.               |
| `ui`                | `DataTableUi`                                 | —                           | Classes for structural parts.                          |

### Slots

| Slot                    | Props                                                              | Description                      |
| ----------------------- | ------------------------------------------------------------------ | -------------------------------- |
| `toolbar`               | `table`                                                            | Controls above the viewport.     |
| `caption`               | —                                                                  | Native caption content.          |
| `[column.id]-header`    | header context                                                     | Specific header renderer.        |
| `header`                | header context                                                     | Generic header renderer.         |
| `sort-indicator`        | `column`, `sorted`                                                 | Sort direction content.          |
| `[column.id]-cell`      | cell context                                                       | Specific cell renderer.          |
| `cell`                  | cell context                                                       | Generic cell renderer.           |
| `expanded`              | `row`, `table`                                                     | Detail row content.              |
| `[column.id]-footer`    | `column`, `table`                                                  | Specific footer content.         |
| `footer`                | `column`, `table`                                                  | Generic footer content.          |
| `pagination`            | `table`, `page`, `pageSize`, `pageCount`, `setPage`, `setPageSize` | Replaces default paginator.      |
| `loading`               | `table`                                                            | Loading row content.             |
| `error`                 | `error`, `table`                                                   | Error row content.               |
| `empty`                 | `table`                                                            | Empty row content.               |
| `expansion-trigger`     | `row`                                                              | Expand/collapse control content. |
| `reorder-handle`        | `row`                                                              | Row drag handle content.         |
| `column-reorder-handle` | `column`                                                           | Column drag handle content.      |
| `resize-handle`         | `column`                                                           | Resize handle content.           |

### Events

Every model emits its `update:*` event after an accepted change. The paired `*-change` event fires first with `(value, details)`; `details.cancel()` prevents the model update.

| Event                      | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| `selection-change`         | Selection changed.                                          |
| `sorting-change`           | Sort descriptors changed.                                   |
| `filters-change`           | Column filters changed.                                     |
| `global-filter-change`     | Global filter changed.                                      |
| `pagination-change`        | Page or page size changed.                                  |
| `expanded-change`          | Expanded row keys changed.                                  |
| `column-visibility-change` | Visibility map changed.                                     |
| `column-order-change`      | Leaf column order changed.                                  |
| `column-sizing-change`     | Width map changed.                                          |
| `column-pinning-change`    | Pin sides changed.                                          |
| `row-order-change`         | Row order changed.                                          |
| `reset-change`             | Atomic reset requested. Canceling it preserves every model. |
| `row-click`                | Native row click with row and cancelable details.           |
| `row-contextmenu`          | Native row context-menu event with row details.             |
| `cell-click`               | Native cell click with cell context and details.            |

### Keyboard

| Control               | Key                        | Behavior                                          |
| --------------------- | -------------------------- | ------------------------------------------------- |
| sort header           | `Enter` / `Space`          | Cycles sort direction through its native button.  |
| selection control     | `Space`                    | Selects a row or the configured select-all scope. |
| expansion control     | `Enter` / `Space`          | Opens or closes row details/children.             |
| resize separator      | `ArrowLeft` / `ArrowRight` | Changes width by `keyboardStep`, respecting RTL.  |
| resize separator      | `Home`                     | Restores the definition width or 150px.           |
| column reorder handle | `ArrowLeft` / `ArrowRight` | Moves the column one visible position.            |
| row reorder handle    | `ArrowUp` / `ArrowDown`    | Moves the row one visible position.               |
| pagination            | `Tab`, `Enter`, `Space`    | Uses native Pagination button/link behavior.      |

Pointer dragging and touch Pointer Events use the same resize and reorder actions. The table does not add spreadsheet-style arrow navigation to ordinary data cells; native table reading and normal document tab order remain intact.
