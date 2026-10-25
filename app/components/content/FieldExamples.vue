<script setup lang="ts">
import { ref } from 'vue'

import { Checkbox } from '../ui/checkbox'
import { Field } from '../ui/field'
import { Fieldset } from '../ui/fieldset'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import ExampleFrame from './ExampleFrame.vue'

defineProps<{ example: 'states' | 'controls' | 'fieldset' }>()
const email = ref('not-an-email')
const disabled = ref(false)
const visibility = ref('team')
const state = ref('invalid')
</script>

<template>
  <ExampleFrame>
    <div class="w-full max-w-md space-y-5">
      <template v-if="example === 'states'">
        <Select
          v-model="state"
          :options="
            ['default', 'required', 'invalid', 'disabled'].map((value) => ({ value, label: value }))
          "
          aria-label="Field state"
        />
        <Field
          label="Email address"
          description="We use this address for project updates."
          error="Enter a valid email address."
          :required="state === 'required'"
          :invalid="state === 'invalid'"
          :disabled="state === 'disabled'"
        >
          <Input v-model="email" placeholder="you@example.com" />
        </Field>
      </template>
      <template v-else-if="example === 'controls'">
        <Field label="Visibility" description="Choose who can open this project.">
          <Select
            v-model="visibility"
            :options="[
              { value: 'team', label: 'Team' },
              { value: 'private', label: 'Only me' },
            ]"
          />
        </Field>
        <Field label="Notifications" description="You can change this later."
          ><Checkbox label="Email me about project updates"
        /></Field>
      </template>
      <template v-else>
        <Checkbox v-model="disabled" label="Disable the fieldset" />
        <Fieldset
          legend="Project settings"
          description="These fields share a disabled state."
          :disabled="disabled"
        >
          <Field label="Project name" required><Input placeholder="Project name" /></Field>
          <Field label="Visibility"
            ><Select
              :options="[
                { value: 'team', label: 'Team' },
                { value: 'private', label: 'Only me' },
              ]"
              placeholder="Choose visibility"
          /></Field>
        </Fieldset>
      </template>
    </div>
  </ExampleFrame>
</template>
