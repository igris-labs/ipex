<script setup lang="ts">
import { useOverlay, useToast, type OverlayInstance } from 'akaza-ui'
import { computed, defineAsyncComponent, onBeforeUnmount, ref, watch } from 'vue'

import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Input } from '../ui/input'
import { NavigationMenu } from '../ui/navigation-menu'
import { Select } from '../ui/select'

const props = defineProps<{
  name: string
  sizeOptions?: string
  variantOptions?: string
  widthOptions?: string
  defaultSize?: string
  defaultVariant?: string
  defaultWidth?: string
}>()
const exampleSize = ref(props.defaultSize)
const exampleVariant = ref(props.defaultVariant)
const exampleWidth = ref(props.defaultWidth)
function optionsFor(values?: string) {
  return values?.split(',').map((value) => ({ value, label: value })) ?? []
}
const settings = computed(() => ({
  ...(props.sizeOptions ? { size: exampleSize.value } : {}),
  ...(props.variantOptions ? { variant: exampleVariant.value } : {}),
  ...(props.widthOptions ? { width: exampleWidth.value } : {}),
}))
watch(
  () => props.name,
  () => {
    exampleSize.value = props.defaultSize
    exampleVariant.value = props.defaultVariant
    exampleWidth.value = props.defaultWidth
  },
)
const modules = import.meta.glob('../ui/*/*.vue', { import: 'default' })
const pascalName = computed(() =>
  props.name
    .split('-')
    .map((s) => s[0]!.toUpperCase() + s.slice(1))
    .join(''),
)
const component = computed(() =>
  defineAsyncComponent(
    modules[`../ui/${props.name}/${pascalName.value}.vue`] as () => Promise<
      import('vue').Component
    >,
  ),
)
const options = [
  { value: 'vue', label: 'Vue' },
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'akaza', label: 'Akaza UI' },
]
const menu = [
  { label: 'Edit project', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { type: 'separator' },
  { label: 'Archive', value: 'archive' },
]
const entries: Record<string, Record<string, unknown>> = {
  accordion: {
    items: [
      {
        value: 'source',
        label: 'Do I own the source?',
        content: 'Yes. Copy the files, then adapt them to your application.',
      },
      {
        value: 'theme',
        label: 'Can I change the theme?',
        content: 'Change the shared CSS tokens or override a component recipe.',
      },
    ],
  },
  avatar: { text: 'IL', alt: 'Igris Labs' },
  calendar: { calendarLabel: 'Choose a date' },
  checkbox: {
    label: 'Include archived projects',
    description: 'Show completed work in this view.',
  },
  'checkbox-group': { options, legend: 'Frameworks', ariaLabel: 'Frameworks' },
  combobox: { options, placeholder: 'Choose a framework', ariaLabel: 'Framework' },
  'context-menu': { items: menu },
  'data-table': {
    data: [
      { id: 'ipex', name: 'IPEX', status: 'In progress' },
      { id: 'igris', name: 'Igris Labs', status: 'Active' },
    ],
    columns: [
      { accessor: 'name', header: 'Project', sortable: true },
      { accessor: 'status', header: 'Status' },
    ],
    rowKey: 'id',
    ariaLabel: 'Projects',
  },
  'date-field': { ariaLabel: 'Project date', showCalendar: true },
  'date-range-field': { ariaLabel: 'Project dates' },
  'date-range-picker': { ariaLabel: 'Project dates' },
  dialog: { title: 'Project settings', description: 'Update how this project appears.' },
  'alert-dialog': {
    title: 'Archive this project?',
    description: 'The project remains available in your archive.',
  },
  drawer: { title: 'Project details', description: 'Keep the current page in view.' },
  editable: { ariaLabel: 'Project title' },
  field: { label: 'Project name', description: 'Use a name your team can recognize.' },
  fieldset: { legend: 'Project details', description: 'Set the name used across your workspace.' },
  input: { ariaLabel: 'Project name', placeholder: 'Project name' },
  listbox: { options, ariaLabel: 'Frameworks', filterable: true },
  menu: { items: menu },
  menubar: {
    items: [
      { value: 'file', label: 'File', children: menu },
      {
        value: 'edit',
        label: 'Edit',
        children: [
          { label: 'Undo', value: 'undo' },
          { label: 'Redo', value: 'redo' },
        ],
      },
    ],
    ariaLabel: 'Editor menu',
  },
  meter: { value: 64, label: 'Storage used' },
  'navigation-menu': {
    items: [
      { label: 'Overview', value: 'overview' },
      { label: 'Projects', value: 'projects' },
      { label: 'Settings', value: 'settings' },
    ],
    ariaLabel: 'Project navigation',
  },
  'number-field': { min: 0, max: 100, ariaLabel: 'Project capacity' },
  pagination: { total: 100, itemsPerPage: 10, ariaLabel: 'Project pages' },
  'pin-input': { length: 6, ariaLabel: 'Verification code' },
  'radio-group': { options, legend: 'Framework', ariaLabel: 'Framework' },
  rating: { max: 5, ariaLabel: 'Rate this component' },
  select: { options, placeholder: 'Choose a framework', ariaLabel: 'Framework' },
  separator: { orientation: 'horizontal' },
  sidebar: {
    breakpoint: '(max-width: 1px)',
    defaultSize: 200,
    ui: { root: 'h-64', panel: 'border border-border rounded-lg' },
  },
  slider: { min: 0, max: 100, ariaLabel: 'Project progress' },
  stepper: {
    items: [
      { value: 'details', title: 'Details', content: 'Name the project.' },
      {
        value: 'review',
        title: 'Review',
        content: 'Check the details before creating the project.',
      },
    ],
    showControls: true,
  },
  switch: {
    label: 'Email notifications',
    description: 'Receive updates when project details change.',
  },
  tabs: {
    items: [
      { value: 'overview', label: 'Overview', content: 'Project overview and recent updates.' },
      { value: 'activity', label: 'Activity', content: 'Changes made by your team.' },
    ],
  },
  'tags-input': { ariaLabel: 'Project labels', placeholder: 'Add a label' },
  'time-field': { ariaLabel: 'Start time' },
  'time-range-field': { ariaLabel: 'Working hours' },
  toggle: { ariaLabel: 'Bold text' },
  'toggle-group': {
    options: [
      { value: 'grid', label: 'Grid' },
      { value: 'list', label: 'List' },
    ],
    ariaLabel: 'View mode',
  },
  toolbar: {
    items: [
      { label: 'Bold', value: 'bold' },
      { label: 'Italic', value: 'italic' },
      { type: 'separator' },
      { label: 'Link', value: 'link' },
    ],
    ariaLabel: 'Text formatting',
  },
  tree: {
    items: [
      {
        id: 'components',
        label: 'Components',
        children: [
          { id: 'button', label: 'Button' },
          { id: 'input', label: 'Input' },
        ],
      },
      { id: 'guides', label: 'Guides' },
    ],
    itemKey: 'id',
    labelKey: 'label',
    childrenKey: 'children',
    defaultExpanded: ['components'],
    ariaLabel: 'Project files',
  },
}
const values: Record<string, unknown> = {
  progress: 64,
  slider: 40,
  rating: 3,
  editable: 'IPEX project',
  'number-field': 12,
  'tags-input': ['Vue', 'Tailwind'],
  'checkbox-group': [],
  tabs: 'overview',
  stepper: 'details',
  'toggle-group': 'grid',
  'navigation-menu': 'overview',
}
const model = ref<unknown>(values[props.name])
watch(
  () => props.name,
  (name) => {
    model.value = values[name]
  },
)
const toast = useToast()
const overlays = useOverlay()
let overlay: OverlayInstance<typeof Dialog> | undefined
function openOverlay() {
  overlay ??= overlays.create(Dialog, {
    props: {
      title: 'Programmatic dialog',
      description: 'Opened through the IPEX OverlayProvider.',
    },
    destroyOnClose: true,
  })
  return overlay.open()
}
onBeforeUnmount(() => overlay?.unmount())
const status = ref('')
const demoProps = computed(() => ({
  ...entries[props.name],
  ...settings.value,
  ...(props.name === 'progress' ? { ariaLabel: 'Upload progress' } : {}),
}))
</script>

<template>
  <div
    data-ui
    data-testid="component-preview"
    class="my-6 min-w-0 overflow-hidden rounded-lg border border-border/60 bg-background"
  >
    <div
      v-if="sizeOptions || variantOptions || widthOptions"
      class="flex min-h-11 flex-wrap items-center gap-3 border-b border-border/60 px-3 py-2"
    >
      <div v-if="sizeOptions" class="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Size</span
        ><Select
          v-model="exampleSize"
          :options="optionsFor(sizeOptions)"
          size="xs"
          aria-label="Example size"
        />
      </div>
      <div v-if="variantOptions" class="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Variant</span
        ><Select
          v-model="exampleVariant"
          :options="optionsFor(variantOptions)"
          size="xs"
          aria-label="Example variant"
        />
      </div>
      <div v-if="widthOptions" class="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Width</span
        ><Select
          v-model="exampleWidth"
          :options="optionsFor(widthOptions)"
          size="xs"
          aria-label="Example width"
        />
      </div>
    </div>
    <div class="flex min-h-56 min-w-0 items-center justify-center p-2 sm:p-6">
      <div class="w-full max-w-md min-w-0">
        <template v-if="name === 'toast'">
          <Button
            @click="
              toast.add({
                title: 'Project saved',
                description: 'Your changes are available to your team.',
              })
            "
            >Show notification</Button
          >
          <component :is="component" />
        </template>
        <template v-else-if="name === 'overlay-provider'">
          <Button @click="openOverlay()">Open dialog</Button>
          <component :is="component" />
        </template>
        <component
          v-else-if="['dialog', 'alert-dialog', 'drawer'].includes(name)"
          :is="component"
          v-bind="demoProps"
        >
          <template #trigger="scope"
            ><Button @click="scope.open($event)"
              >Open {{ name.replaceAll('-', ' ') }}</Button
            ></template
          >
          <template #default><p>Review the project details before continuing.</p></template>
          <template #footer="scope"
            ><Button variant="outline" @click="scope.close($event)">Close</Button></template
          >
        </component>
        <component
          v-else-if="['popover', 'menu', 'tooltip', 'hover-preview-card'].includes(name)"
          :is="component"
          v-bind="demoProps"
        >
          <template #trigger="scope"
            ><Button
              variant="outline"
              v-bind="scope.triggerProps"
              @click="scope.toggle?.($event)"
              >{{
                name === 'tooltip'
                  ? 'Hover for a hint'
                  : name === 'hover-preview-card'
                    ? 'Preview project'
                    : 'Open ' + name
              }}</Button
            ></template
          >
          <template #content
            ><p class="max-w-64 text-sm leading-6">
              Project details stay close to the current task.
            </p></template
          >
        </component>
        <component v-else-if="name === 'collapsible'" :is="component">
          <template #trigger>Project details</template>
          <p>Change the project name and visibility from this section.</p>
        </component>
        <component v-else-if="name === 'context-menu'" :is="component" v-bind="demoProps"
          >Right-click here for project actions.</component
        >
        <component
          v-else-if="name === 'app-layout'"
          scroll="page"
          :viewport="false"
          :is="component"
          :ui="{ root: 'min-h-56 overflow-hidden rounded-lg border border-border' }"
        >
          <template #header><span class="text-sm font-medium">IPEX workspace</span></template>
          <p class="p-4 text-sm text-muted-foreground">
            The main region contains the current task.
          </p>
          <template #footer>Workspace footer</template>
        </component>
        <component v-else-if="name === 'sidebar'" :is="component" v-bind="demoProps">
          <template #header>Workspace</template>
          <NavigationMenu
            orientation="vertical"
            :items="[
              { label: 'Projects', value: 'projects' },
              { label: 'Settings', value: 'settings' },
            ]"
          />
          <template #footer>Igris Labs</template>
        </component>
        <component
          v-else-if="['field', 'fieldset', 'form'].includes(name)"
          :is="component"
          v-bind="demoProps"
          @submit="status = 'Project saved'"
        >
          <Input aria-label="Project name" placeholder="Project name" />
          <Button v-if="name === 'form'" type="submit">Save project</Button>
        </component>
        <template v-else-if="name === 'separator'"
          ><p class="mb-4 text-sm">Project overview</p>
          <component :is="component" v-bind="demoProps" />
          <p class="mt-4 text-sm text-muted-foreground">Recent activity</p></template
        >
        <component v-else-if="name === 'tabs'" :is="component" v-model="model" v-bind="demoProps">
          <template #panel-overview
            ><p class="text-sm leading-6 text-muted-foreground">
              Project overview and recent updates.
            </p></template
          >
          <template #panel-activity
            ><p class="text-sm leading-6 text-muted-foreground">
              Changes made by your team.
            </p></template
          >
        </component>
        <component v-else :is="component" v-model="model" v-bind="demoProps"
          ><template v-if="name === 'toggle'" #default
            ><span class="font-semibold">B</span></template
          ></component
        >
        <p v-if="status" role="status" class="mt-3 text-xs text-muted-foreground">{{ status }}</p>
      </div>
    </div>
  </div>
</template>
