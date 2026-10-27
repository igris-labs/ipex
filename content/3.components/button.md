---
title: Button
description: Trigger an action or navigate to another page.
navigation:
  icon: tabler:hand-click
---

## Demos

::button-examples
::

::example-source{file="ButtonExamples.vue"}
::

### Usage

Import Button from its local folder after [installation](#installation).

```vue
<script setup lang="ts">
import { Button } from '~/components/ui/button'
</script>

<template>
  <Button @click="createProject">Create project</Button>
</template>
```

### Variants

Choose `solid`, `soft`, `subtle`, `outline`, `ghost`, or `link`. Primary and accent solid buttons use the tactile material. Secondary and semantic solid buttons use flat fills.

::button-examples{example="variants"}
::

::example-source{file="ButtonExamples.vue"}
::

```vue
<Button variant="outline">Review changes</Button>
```

### Colors

Choose primary, secondary, accent, info, success, warning, or destructive. Accent defaults to blue and remains separate from primary and secondary. Soft, subtle, outline, and ghost use matching emphasis text, tints, and borders as defined in [Action colors](/design-system/color#action-colors). Use the preview controls to inspect each color with each variant.

::button-examples{example="colors"}
::

::example-source{file="ButtonExamples.vue"}
::

```vue
<Button color="destructive" variant="soft">Delete draft</Button>
```

### Sizes

Each size changes the control geometry, typography, padding, radius, icon size, and gap. Values below use a 16px browser root and the default 10px radius token. The shared [geometry profiles](/design-system/typography-and-density#geometry-profiles) define the control scale.

On coarse-pointer devices, buttons have a 44px minimum height and width for touch interaction.

::button-examples{example="sizes"}
::

::example-source{file="ButtonExamples.vue"}
::

| Size | Height | Padding X / Y | Text / line height | Radius | Icon | Gap  |
| ---- | ------ | ------------- | ------------------ | ------ | ---- | ---- |
| xs   | 24px   | 8px / 2px     | 12px / 16px        | 5px    | 12px | 4px  |
| sm   | 28px   | 10px / 4px    | 13px / 16px        | 6px    | 14px | 4px  |
| md   | 32px   | 12px / 4px    | 14px / 20px        | 8px    | 16px | 6px  |
| lg   | 36px   | 14px / 6px    | 14px / 20px        | 10px   | 18px | 8px  |
| xl   | 40px   | 16px / 6px    | 16px / 24px        | 12px   | 20px | 10px |

### Icon buttons

Use `shape="icon"` with any size. The width matches the height and horizontal padding becomes zero. Give the button an accessible name with `aria-label`.

::button-examples{example="icons"}
::

::example-source{file="ButtonExamples.vue"}
::

### Disabled and loading

Use `disabled` to block an action and `loading` to control a pending state. With `loading-auto`, return a Promise from the click handler. Akaza blocks duplicate activation until that Promise settles.

The default loading slot keeps the label's width and overlays the spinner. Provide `#loading` to replace the indicator. This demo waits one second; it does not send data.

::button-examples{example="states"}
::

::example-source{file="ButtonExamples.vue"}
::

```vue
<Button loading-auto @click="saveChanges">Save changes</Button>
```

### Overrides

Use `class` for the root and `ui` for `root`, `content`, `spinner`, or `loadingText`. Consumer classes take priority through `cn`.

::button-examples{example="overrides"}
::

::example-source{file="ButtonExamples.vue"}
::

### Links

Pass `as="a"` and `href` to use Akaza's alternate root. For Nuxt routing, pass the resolved NuxtLink component through `as`. Akaza gives alternate roots button keyboard behavior, including Space activation.

::button-examples{example="links"}
::

::example-source{file="ButtonExamples.vue"}
::

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Button.vue` and `index.ts` into `app/components/ui/button/`.

::component-source{name="button"}
::

## API

### Props

| Prop                  | Values                                                          | Fallback |
| --------------------- | --------------------------------------------------------------- | -------- |
| color                 | primary, secondary, accent, info, success, warning, destructive | primary  |
| variant               | solid, soft, subtle, outline, ghost, link                       | solid    |
| size                  | xs, sm, md, lg, xl                                              | sm       |
| shape                 | default, icon                                                   | default  |
| as                    | HTML tag or Vue component                                       | button   |
| type                  | button, submit, reset                                           | button   |
| disabled              | boolean                                                         | false    |
| loading               | boolean                                                         | false    |
| loadingAuto           | boolean                                                         | false    |
| focusableWhenDisabled | boolean                                                         | false    |
| ui                    | Classes for root, content, spinner, loadingText                 | none     |

Use the default slot for content and `#loading` for custom loading content. Native attributes and event handlers pass through to Akaza's root. Akaza owns keyboard activation, loading state, and disabled behavior.
