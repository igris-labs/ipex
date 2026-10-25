---
title: Avatar
description: An image element with a fallback for when the image fails to load.
navigation:
  icon: tabler:user-circle
---

::component-example{name="avatar" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { Avatar } from '~/components/ui/avatar'
</script>

<template>
  <Avatar text="IL" alt="Igris Labs" />
</template>
```

## Images and fallbacks

Supply `src` for a portrait and `text` for the fallback. The fallback also appears when the image cannot load. Set `alt` to identify the person, or use an empty string when adjacent text already provides their name.

::avatar-examples
::

```vue
<Avatar src="/images/team-member.jpg" alt="Team member" text="TM" />
<Avatar text="IL" alt="Igris Labs" />
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Props

| Prop      | Type       | Default  | Description                                                            |
| --------- | ---------- | -------- | ---------------------------------------------------------------------- |
| `src`     | `string`   | —        | Image URL.                                                             |
| `alt`     | `string`   | `""`     | Alt text for the image.                                                |
| `text`    | `string`   | —        | Fallback text (e.g. initials) when no `#fallback` slot is provided.    |
| `delayMs` | `number`   | `0`      | Delay in ms before showing the fallback. Prevents flash on fast loads. |
| `as`      | `string`   | `"span"` | Root element tag.                                                      |
| `ui`      | `AvatarUi` | —        | CSS class overrides.                                                   |

## Slots

| Slot       | Scoped props           | Description                                 |
| ---------- | ---------------------- | ------------------------------------------- |
| `image`    | `{ src, alt, status }` | The image element.                          |
| `fallback` | `{ status }`           | Shown when image is unavailable or loading. |

`status` is one of: `"idle"` · `"loading"` · `"loaded"` · `"error"`

## Emits

| Event           | Payload                       | Description                              |
| --------------- | ----------------------------- | ---------------------------------------- |
| `status-change` | `[status: AvatarImageStatus]` | Fired when image loading status changes. |

## Source

Copy `Avatar.vue` and `index.ts` into `components/ui/avatar` after [installation](/getting-started/installation).

::component-source{name="avatar"}
::
