<script setup lang="ts">
import type { DataTableColumn, DataTableSelection } from 'akaza-ui'
import { computed, ref } from 'vue'

import { DataTable } from '../ui/data-table'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import ExampleFrame from './ExampleFrame.vue'

const props = defineProps<{ example: 'selection' | 'filtering' | 'expansion' | 'states' }>()
interface Project {
  id: string
  name: string
  status: string
  owner: string
}
const data: Project[] = [
  { id: 'ipex', name: 'IPEX', status: 'In progress', owner: 'Igris Labs' },
  { id: 'atlas', name: 'Atlas', status: 'Planning', owner: 'Product' },
  { id: 'lynx', name: 'Lynx', status: 'Active', owner: 'Engineering' },
  { id: 'orbit', name: 'Orbit', status: 'Archived', owner: 'Igris Labs' },
  { id: 'pm', name: 'Project manager', status: 'Active', owner: 'Product' },
]
const columns = computed<DataTableColumn<Project>[]>(() => [
  ...(props.example === 'selection' ? [{ id: 'select', type: 'selection' as const }] : []),
  ...(props.example === 'expansion' ? [{ id: 'expand', type: 'expander' as const }] : []),
  { accessor: 'name', header: 'Project', sortable: true },
  { accessor: 'status', header: 'Status', sortable: true },
])
const selection = ref<DataTableSelection>([])
const search = ref('')
const pagination = ref({ page: 1, pageSize: 2 })
const state = ref('empty')
const selectedCount = computed(() =>
  Array.isArray(selection.value) ? selection.value.length : selection.value == null ? 0 : 1,
)
</script>

<template>
  <ExampleFrame>
    <div class="w-full min-w-0 space-y-3">
      <Input
        v-if="example === 'filtering'"
        v-model="search"
        aria-label="Search projects"
        placeholder="Search projects…"
      />
      <Select
        v-if="example === 'states'"
        v-model="state"
        :options="[
          { value: 'empty', label: 'Empty' },
          { value: 'loading', label: 'Loading' },
          { value: 'error', label: 'Error' },
        ]"
        aria-label="Table state"
      />
      <DataTable
        :data="example === 'states' ? [] : data"
        :columns="columns"
        row-key="id"
        aria-label="Example projects"
        :selection-mode="example === 'selection' ? 'multiple' : 'none'"
        v-model:selection="selection"
        v-model:global-filter="search"
        v-model:pagination="pagination"
        :paginate="example === 'filtering'"
        :is-row-expandable="example === 'expansion' ? () => true : undefined"
        :loading="example === 'states' && state === 'loading'"
        :error="
          example === 'states' && state === 'error'
            ? 'Projects could not be loaded. Try again.'
            : false
        "
      >
        <template #expanded="{ row }"
          ><p class="text-sm text-muted-foreground">
            {{ row.original.name }} is owned by {{ row.original.owner }}.
          </p></template
        >
      </DataTable>
      <p v-if="example === 'selection'" role="status" class="text-xs text-muted-foreground">
        {{ selectedCount }} selected
      </p>
    </div>
  </ExampleFrame>
</template>
