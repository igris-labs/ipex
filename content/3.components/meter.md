---
title: Meter
description: Display a numeric value within a known range.
navigation:
  icon: tabler:gauge
---

## Demos

::component-example{name="meter" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { Meter } from '~/components/ui/meter'
</script>

<template>
  <Meter :value="64" label="Storage used" />
</template>
```

Value changes animate the bar width over 200ms. Reduced motion applies the new value immediately. Use **Options and states** to change `value`, bounds, and thresholds.

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Meter.vue` and `index.ts` into `app/components/ui/meter/`.

::component-source{name="meter"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

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

### Slots

| Slot        | Props                                            | Description               |
| ----------- | ------------------------------------------------ | ------------------------- |
| `label`     | `value`, `formattedValue`, `state`               | Custom label.             |
| `value`     | `value`, `formattedValue`, `percentage`, `state` | Custom formatted value.   |
| `indicator` | `value`, `percentage`, `state`                   | Custom indicator content. |
