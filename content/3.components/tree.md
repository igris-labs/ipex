---
title: Tree
description: Browse and select items in a nested list.
navigation:
  icon: tabler:hierarchy-2
---

## Demos

::component-example{name="tree" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="soft,subtle" default-variant="soft"}
::

### Usage

```vue
<script setup lang="ts">
import { Tree } from '~/components/ui/tree'

const items = [{ id: 'projects', label: 'Projects', children: [{ id: 'ipex', label: 'IPEX' }] }]
</script>

<template>
  <Tree
    :items="items"
    item-key="id"
    label-key="label"
    children-key="children"
    aria-label="Projects"
  />
</template>
```

### Selection highlight

Use `selection-highlight` to control the width of the selected area and sliding hover:

- `full`: spans the row width, including indentation.
- `indented`: starts after the node's indentation and fills the remaining content width.
- `label`: wraps the label text.

Switch between these scopes with **Selection highlight** in the playground above. This controls appearance; `selection-mode` controls whether users can select one, multiple, or no nodes.

```vue
<Tree :items="items" item-key="id" selection-highlight="indented" />
```

### Multiple selection

Select a branch to select its descendants. A partial selection shows a dash, and check marks stay at the trailing edge. Disclosure buttons expand independently from selection.

::tree-examples{example="multiple"}
::

::example-source{file="TreeExamples.vue"}
::

```vue
<Tree
  :items="items"
  item-key="id"
  selection-mode="multiple"
  selection-propagation="both"
  :expand-on-click="false"
  v-model="selected"
/>
```

### Loading branches

Use `has-children` for a branch that has not loaded yet. Add its key to `loading-keys` during the request, then update its children. The disclosure shows progress while you load data.

::tree-examples{example="lazy"}
::

::example-source{file="TreeExamples.vue"}
::

### Large trees

This example renders a window of 1,000 files. Row height follows `size`, including touch targets. Arrow keys and typeahead keep working; Home and End move to the first and last enabled item.

::tree-examples{example="virtual"}
::

::example-source{file="TreeExamples.vue"}
::

Set `virtualize` to `true` or an options object. IPEX calculates the item height from the selected size and its 2px row spacing. Override `itemHeight` when you provide custom row geometry; it must include that spacing.

### Empty state

Use `labels.empty` for a message or the `empty` slot for custom content.

::tree-examples{example="empty"}
::

::example-source{file="TreeExamples.vue"}
::

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Tree.vue` and `index.ts` into `app/components/ui/tree/`.

::component-source{name="tree"}
::

## API

### Variants and defaults

| Prop      | Values                       | Default |
| --------- | ---------------------------- | ------- |
| `variant` | `soft`, `subtle`             | `soft`  |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

`soft` uses the same neutral selection fill as the sidebar. `subtle` adds an inset border. Tree selection defaults to the full row; choose `indented` or `label` when the selected area should follow the hierarchy more closely. Focus rings appear for keyboard navigation. Hover moves between nodes with a sliding highlight that follows the same boundary.

Row height, disclosure target, icons, text, padding, and corners scale together. Branches and leaves at the same depth share one label column. Default indent steps are 12/16/20/24/28px for xs/sm/md/lg/xl; an explicit `indent` overrides them.

### Models

| Model              | Type                           | Default           | Description                                                    |
| ------------------ | ------------------------------ | ----------------- | -------------------------------------------------------------- |
| `v-model`          | `TreeKey \| TreeKey[] \| null` | `null`            | Selected key in single mode or selected keys in multiple mode. |
| `v-model:expanded` | `TreeKey[]`                    | `defaultExpanded` | Expanded branch keys.                                          |

### Props

| Prop                   | Type                                 | Default             | Description                                                                                   |
| ---------------------- | ------------------------------------ | ------------------- | --------------------------------------------------------------------------------------------- |
| `items`                | `readonly T[]`                       | required            | Nested tree data.                                                                             |
| `itemKey`              | `keyof T \| (item) => TreeKey`       | required            | Stable, globally unique item key.                                                             |
| `labelKey`             | `keyof T \| (item) => unknown`       | `"label"`           | Label accessor.                                                                               |
| `childrenKey`          | `keyof T \| (item) => T[]`           | `"children"`        | Child collection accessor.                                                                    |
| `disabledKey`          | `keyof T \| (item) => unknown`       | `"disabled"`        | Disabled state accessor.                                                                      |
| `selectableKey`        | `keyof T \| (item) => unknown`       | `"selectable"`      | Selectable state accessor.                                                                    |
| `defaultExpandedKey`   | `keyof T \| (item) => unknown`       | `"defaultExpanded"` | Initial expansion accessor.                                                                   |
| `slotKey`              | `keyof T \| (item) => unknown`       | `"slot"`            | Dynamic item slot accessor.                                                                   |
| `textValue`            | `(item: T) => string`                | label text          | Text used by typeahead.                                                                       |
| `hasChildren`          | `(item: T) => boolean`               | -                   | Marks a branch before its children are loaded.                                                |
| `defaultValue`         | `TreeSelection`                      | `null`              | Initial uncontrolled selection.                                                               |
| `defaultExpanded`      | `TreeKey[]`                          | item defaults       | Initial uncontrolled expansion.                                                               |
| `loadingKeys`          | `readonly TreeKey[]`                 | `[]`                | Branches currently loading children.                                                          |
| `selectionMode`        | `"none" \| "single" \| "multiple"`   | `"single"`          | Selection mode.                                                                               |
| `selectionBehavior`    | `"replace" \| "toggle"`              | `"toggle"`          | Multiple-selection behavior without a modifier key.                                           |
| `selectionPropagation` | `"none" \| "up" \| "down" \| "both"` | `"none"`            | Branch selection propagation.                                                                 |
| `selectionHighlight`   | `"full" \| "indented" \| "label"`    | `"full"`            | Visual boundary used by `ui.selection`; ARIA selection remains on the complete item.          |
| `selectOnFocus`        | `boolean`                            | `false`             | Selects a node when roving focus reaches it.                                                  |
| `expandOnClick`        | `boolean`                            | `true`              | Toggles a branch when its non-interactive row content is clicked. Toggle buttons always work. |
| `disabled`             | `boolean`                            | `false`             | Disables the tree.                                                                            |
| `readOnly`             | `boolean`                            | `false`             | Blocks selection changes while preserving navigation and expansion.                           |
| `typeahead`            | `boolean`                            | `true`              | Enables printable-character navigation.                                                       |
| `transition`           | `boolean`                            | `true`              | Enables built-in branch row motion. Ignored during virtualization.                            |
| `indent`               | `number`                             | size-dependent      | Indentation in pixels for each nested level.                                                  |
| `orientation`          | `"vertical" \| "horizontal"`         | `"vertical"`        | Navigation orientation.                                                                       |
| `dir`                  | `"ltr" \| "rtl"`                     | `"ltr"`             | Text direction and horizontal Arrow behavior.                                                 |
| `virtualize`           | `boolean \| TreeVirtualOptions`      | `false`             | Enables fixed-height row virtualization.                                                      |
| `ariaLabel`            | `string`                             | `"Tree"`            | Accessible tree label.                                                                        |
| `ariaLabelledby`       | `string`                             | -                   | Id of an accessible label.                                                                    |
| `ariaDescribedby`      | `string`                             | -                   | Id of supporting text.                                                                        |
| `labels`               | `TreeLabels<T>`                      | -                   | Expand, collapse, loading, and empty labels.                                                  |
| `as`                   | `string \| Component`                | `"div"`             | Root element or component.                                                                    |
| `ui`                   | `TreeUi`                             | -                   | Classes for structural parts.                                                                 |

`TreeVirtualOptions` accepts `height`, `itemHeight`, and `overscan` numbers.

### Slots

| Slot          | Props                                            | Description                                             |
| ------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `item`        | `item`, `node`, `actions`, `toggleProps`, `tree` | Replaces generated content inside every row.            |
| `item-[name]` | same as `item`                                   | Content replacement selected by an item's `slot` value. |
| `toggle`      | `item`, `node`, `actions`, `toggleProps`, `tree` | Toggle content inside the generated button.             |
| `indicator`   | `item`, `node`, `actions`, `toggleProps`, `tree` | Selection indicator.                                    |
| `icon`        | `item`, `node`, `actions`, `toggleProps`, `tree` | Item icon.                                              |
| `label`       | `item`, `node`, `actions`, `toggleProps`, `tree` | Item content. May contain a title and supporting text.  |
| `trailing`    | `item`, `node`, `actions`, `toggleProps`, `tree` | Trailing content or controls.                           |
| `loading`     | `item`, `node`, `actions`, `toggleProps`, `tree` | Expanded lazy-branch loading content.                   |
| `empty`       | `tree`                                           | Empty state.                                            |

`node` exposes key, parent, depth, sibling position, label, and branch, expansion, selection, indeterminate, focus, disabled, selectable, and loading state.

### Events

| Event              | Payload            | Description                                                                            |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------- |
| `selection-change` | `(value, details)` | Fired before selection updates.                                                        |
| `expanded-change`  | `(keys, details)`  | Fired before expansion updates. `details.expanded` reports the requested branch state. |
| `focus-change`     | `(key, details)`   | Fired before the roving focus key changes.                                             |
| `activate`         | `(item, details)`  | Fired on row click, touch, or `Enter`.                                                 |

Event `details` include `key`, `item`, `reason`, the original `event` when available, and `cancel()`. Calling `cancel()` in a change event prevents its model update.

### Keyboard

| Key                                        | Behavior                                                                                |
| ------------------------------------------ | --------------------------------------------------------------------------------------- |
| `ArrowDown` / `ArrowUp`                    | Move through visible items in a vertical tree.                                          |
| `ArrowRight`                               | Expand a collapsed branch, then move to its first child. In RTL, `ArrowLeft` does this. |
| `ArrowLeft`                                | Collapse an expanded branch, then move to its parent. In RTL, `ArrowRight` does this.   |
| `Home` / `End`                             | Move to the first/last enabled visible item.                                            |
| `*`                                        | Expand all enabled branches at the current level.                                       |
| `Space`                                    | Select or toggle the focused item.                                                      |
| `Enter`                                    | Select and activate the focused item.                                                   |
| `Shift` + movement Arrow or `Home` / `End` | Extend a multiple-selection range from its anchor.                                      |
| `Ctrl+A` / `Cmd+A`                         | Select all enabled items in multiple mode.                                              |
| printable characters                       | Move to the next visible label matching the typed prefix.                               |

Horizontal orientation maps movement to Left/Right and expansion to Down/Up. One visible enabled item participates in the page tab order.

In multiple mode, `Shift` + click selects the visible range from the last selection anchor. `Ctrl` / `Cmd` + `Shift` + click adds that range to the current selection.
