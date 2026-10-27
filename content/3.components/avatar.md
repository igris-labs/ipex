---
title: Avatar
description: Show a profile image with a fallback when it cannot load.
navigation:
  icon: tabler:user-circle
---

## Demos

::component-example{name="avatar" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { Avatar } from '~/components/ui/avatar'
</script>

<template>
  <Avatar text="IL" alt="Igris Labs" />
</template>
```

### Images and fallbacks

Supply `src` for a portrait and `text` for the fallback. The fallback also appears when the image cannot load. Set `alt` to identify the person, or use an empty string when adjacent text already provides their name.

::avatar-examples
::

::example-source{file="AvatarExamples.vue"}
::

```vue
<Avatar src="/images/team-member.jpg" alt="Team member" text="TM" />
<Avatar text="IL" alt="Igris Labs" />
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Avatar.vue` and `index.ts` into `app/components/ui/avatar/`.

::component-source{name="avatar"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

| Prop      | Type       | Default  | Description                                                            |
| --------- | ---------- | -------- | ---------------------------------------------------------------------- |
| `src`     | `string`   | —        | Image URL.                                                             |
| `alt`     | `string`   | `""`     | Alt text for the image.                                                |
| `text`    | `string`   | —        | Fallback text (e.g. initials) when no `#fallback` slot is provided.    |
| `delayMs` | `number`   | `0`      | Delay in ms before showing the fallback. Prevents flash on fast loads. |
| `as`      | `string`   | `"span"` | Root element tag.                                                      |
| `ui`      | `AvatarUi` | —        | CSS class overrides.                                                   |

### Slots

| Slot       | Scoped props           | Description                                 |
| ---------- | ---------------------- | ------------------------------------------- |
| `image`    | `{ src, alt, status }` | The image element.                          |
| `fallback` | `{ status }`           | Shown when image is unavailable or loading. |

`status` is one of: `"idle"` · `"loading"` · `"loaded"` · `"error"`

### Events

| Event           | Payload                       | Description                              |
| --------------- | ----------------------------- | ---------------------------------------- |
| `status-change` | `[status: AvatarImageStatus]` | Fired when image loading status changes. |
