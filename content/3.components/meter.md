---
title: Meter
description: Read-only gauge for displaying a bounded numeric value.
navigation:
  icon: tabler:gauge
---

::component-example{name="meter" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { Meter } from '~/components/ui/meter'
</script>

<template>
  <Meter :value="64" label="Storage used" />
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Props

| Prop               | Type                                             | Default        | Description                                                 |
| ------------------ | ------------------------------------------------ | -------------- | ----------------------------------------------------------- |
| `value`            | `number`                                         | required       | Current value.                                              |
| `min`              | `number`                                         | `0`            | Minimum value.                                              |
| `max`              | `number`                                         | `100`          | Maximum value.                                              |
| `low`              | `number`                                         | —              | Low threshold. Values below set `data-akaza-state="low"`.   |
| `high`             | `number`                                         | —              | High threshold. Values above set `data-akaza-state="high"`. |
| `optimum`          | `number`                                         | —              | Preferred range hint.                                       |
| `label`            | `string`                                         | —              | Visible label. Also labels the meter.                       |
| `ariaLabel`        | `string`                                         | —              | Accessible label when no visible label exists.              |
| `ariaLabelledby`   | `string`                                         | label id       | Accessible label id.                                        |
| `ariaValueText`    | `string`                                         | —              | Custom `aria-valuetext`.                                    |
| `locale`           | `Intl.LocalesArgument`                           | runtime locale | Locale for formatted value.                                 |
| `formatOptions`    | `Intl.NumberFormatOptions`                       | —              | Number formatting options.                                  |
| `getAriaValueText` | `(value, max, min) => string \| undefined`       | —              | Base-style function for `aria-valuetext`.                   |
| `getValueLabel`    | `(formattedValue, value) => string \| undefined` | —              | Function for `aria-valuetext`.                              |
| `ui`               | `MeterUi`                                        | —              | Classes for structural parts.                               |

## Slots

| Slot        | Props                                            | Description               |
| ----------- | ------------------------------------------------ | ------------------------- |
| `label`     | `value`, `formattedValue`, `state`               | Custom label.             |
| `value`     | `value`, `formattedValue`, `percentage`, `state` | Custom formatted value.   |
| `indicator` | `value`, `percentage`, `state`                   | Custom indicator content. |

## Source

Copy `Meter.vue` and `index.ts` into `components/ui/meter` after [installation](/getting-started/installation).

::component-source{name="meter"}
::
