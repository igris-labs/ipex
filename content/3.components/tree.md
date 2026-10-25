---
title: Tree
description: Accessible hierarchical navigation and selection with lazy loading, propagation, typeahead, and virtualization.
navigation:
  icon: tabler:hierarchy-2
---

::component-example{name="tree" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

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

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Models

| Model              | Type                           | Default           | Description                                                    |
| ------------------ | ------------------------------ | ----------------- | -------------------------------------------------------------- |
| `v-model`          | `TreeKey \| TreeKey[] \| null` | `null`            | Selected key in single mode or selected keys in multiple mode. |
| `v-model:expanded` | `TreeKey[]`                    | `defaultExpanded` | Expanded branch keys.                                          |

## Props

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
| `selectionHighlight`   | `"full" \| "indented" \| "label"`    | `"indented"`        | Visual boundary used by `ui.selection`; ARIA selection remains on the complete item.          |
| `selectOnFocus`        | `boolean`                            | `false`             | Selects a node when roving focus reaches it.                                                  |
| `expandOnClick`        | `boolean`                            | `true`              | Toggles a branch when its non-interactive row content is clicked. Toggle buttons always work. |
| `disabled`             | `boolean`                            | `false`             | Disables the tree.                                                                            |
| `readOnly`             | `boolean`                            | `false`             | Blocks selection changes while preserving navigation and expansion.                           |
| `typeahead`            | `boolean`                            | `true`              | Enables printable-character navigation.                                                       |
| `transition`           | `boolean`                            | `true`              | Enables built-in branch row motion. Ignored during virtualization.                            |
| `indent`               | `number`                             | `16`                | Indentation in pixels for each nested level.                                                  |
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

## Slots

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

## Emits

| Event              | Payload            | Description                                                                            |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------- |
| `selection-change` | `(value, details)` | Fired before selection updates.                                                        |
| `expanded-change`  | `(keys, details)`  | Fired before expansion updates. `details.expanded` reports the requested branch state. |
| `focus-change`     | `(key, details)`   | Fired before the roving focus key changes.                                             |
| `activate`         | `(item, details)`  | Fired on row click, touch, or `Enter`.                                                 |

Event `details` include `key`, `item`, `reason`, the original `event` when available, and `cancel()`. Calling `cancel()` in a change event prevents its model update.

## Keyboard

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

## Source

Copy `Tree.vue` and `index.ts` into `components/ui/tree` after [installation](/getting-started/installation).

::component-source{name="tree"}
::
