<script setup lang="ts">
withDefaults(defineProps<{ wordmark?: boolean }>(), { wordmark: false })
</script>

<template>
  <span class="inline-flex shrink-0 items-center gap-2" :aria-hidden="wordmark ? undefined : true">
    <svg
      viewBox="0 0 200 208"
      fill="currentColor"
      :class="wordmark ? 'size-6 shrink-0' : 'size-full'"
      aria-hidden="true"
    >
      <path
        d="M10 31 82 61Q86 63 86 67V92Q86 100 79 100H47Q44 100 41 99L12 87Q9 86 9 82V33Q9 30 10 31Z"
      />
      <path
        d="M104 35 132 7H191V43Q191 45 189 46L108 97Q102 101 102 94V41Q102 38 104 35Z"
        fill="oklch(0.72 0 0)"
      />
      <path
        d="M6 137Q6 134 9 132L43 112Q46 110 50 110H80Q86 110 86 116V143Q86 148 82 151L10 195Q5 198 5 192V137Z"
      />
      <path
        d="M102 120Q102 110 112 110H137Q141 110 144 113L189 150Q191 152 191 156V205H185L106 154Q102 152 102 148V120Z"
      />
    </svg>
    <span v-if="wordmark" class="font-semibold tracking-tight">IPEX</span>
  </span>
</template>
