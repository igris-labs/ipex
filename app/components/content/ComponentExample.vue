<script setup lang="ts">
import { useOverlay, type MenuItem, type OverlayInstance } from 'akaza-ui'
import { computed, defineAsyncComponent, onBeforeUnmount, reactive, ref, watch } from 'vue'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Collapsible } from '../ui/collapsible'
import { Dialog } from '../ui/dialog'
import { Input } from '../ui/input'
import { NavigationMenu } from '../ui/navigation-menu'
import { NumberField } from '../ui/number-field'
import { Select } from '../ui/select'
import type { ToastProps } from '../ui/toast'
import type { TreeProps } from '../ui/tree'
import { exampleOptions, exampleAxes } from './example-options'
import ToastExamples from './ToastExamples.vue'
import TreeExamples from './TreeExamples.vue'

const props = defineProps<{
  name: string
  sizeOptions?: string
  variantOptions?: string
  widthOptions?: string
  defaultSize?: string
  defaultVariant?: string
  defaultWidth?: string
}>()
const activeSizeOptions = computed(
  () => props.sizeOptions ?? exampleAxes[props.name]?.size?.join(','),
)
const activeModeOptions = computed(() => exampleAxes[props.name]?.mode?.join(','))
const exampleMode = ref(exampleAxes[props.name]?.mode?.[0])
const activeDesignOptions = computed(() => exampleAxes[props.name]?.design?.join(','))
const exampleDesign = ref(exampleAxes[props.name]?.design?.[0])
const activeVariantOptions = computed(
  () => props.variantOptions ?? exampleAxes[props.name]?.variant?.join(','),
)
const activeWidthOptions = computed(
  () => props.widthOptions ?? exampleAxes[props.name]?.width?.join(','),
)
const isDisclosure = computed(() => ['accordion', 'collapsible'].includes(props.name))
const optionValues = ref<Record<string, string>>({})
const optionDefinitions = computed(() =>
  Object.entries({
    ...exampleOptions[props.name],
    ...Object.fromEntries(
      Object.entries(exampleAxes[props.name] ?? {}).filter(
        ([key]) => !['size', 'variant', 'width', 'design', 'mode'].includes(key),
      ),
    ),
  }).filter(
    ([key]) =>
      !(props.name === 'tree' && key === 'selectionHighlight') &&
      !(
        isDisclosure.value &&
        ['type', 'orientation', 'collapsible', 'disabled', 'unmountOnHide'].includes(key)
      ),
  ),
)
function optionLabel(key: string) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (value) => value.toUpperCase())
}
function optionChoices(definition: import('./example-options').ExampleOption) {
  return [
    { value: '__default__', label: 'Default' },
    ...(definition === 'boolean'
      ? [
          { value: 'true', label: 'On' },
          { value: 'false', label: 'Off' },
        ]
      : Array.isArray(definition)
        ? definition.map((value) => ({ value, label: value }))
        : []),
  ]
}
const optionProps = computed(() =>
  Object.fromEntries(
    optionDefinitions.value.flatMap(([key, definition]) => {
      const value = optionValues.value[key]
      if (
        value === undefined ||
        value === '__default__' ||
        (definition === 'number' && value === '')
      )
        return []
      return [
        [
          key,
          definition === 'boolean'
            ? value === 'true'
            : definition === 'number'
              ? Number(value)
              : value,
        ],
      ]
    }),
  ),
)
const exampleSize = ref(props.defaultSize)
const exampleVariant = ref(props.defaultVariant)
const exampleWidth = ref(props.defaultWidth)
const treeHighlight = ref<TreeProps['selectionHighlight']>('full')
const disclosure = reactive({
  type: 'single',
  orientation: 'vertical',
  collapsible: true,
  disabled: false,
  unmountOnHide: false,
})
const disclosureToggles = computed(() => [
  ...(props.name === 'accordion' ? [{ key: 'collapsible', label: 'Collapsible' } as const] : []),
  { key: 'disabled', label: 'Disabled' } as const,
  { key: 'unmountOnHide', label: 'Unmount on hide' } as const,
])
function optionsFor(values?: string) {
  return values?.split(',').map((value) => ({ value, label: value })) ?? []
}
const settings = computed(() => ({
  ...(props.name === 'tree' ? { selectionHighlight: treeHighlight.value } : {}),
  ...(activeModeOptions.value ? { mode: exampleMode.value } : {}),
  ...(activeDesignOptions.value ? { design: exampleDesign.value } : {}),
  ...(activeSizeOptions.value
    ? { [props.name === 'sidebar' ? 'itemSize' : 'size']: exampleSize.value }
    : {}),
  ...(activeVariantOptions.value ? { variant: exampleVariant.value } : {}),
  ...(activeWidthOptions.value ? { width: exampleWidth.value } : {}),
}))
watch(
  () => props.name,
  () => {
    optionValues.value = {}
    exampleMode.value = exampleAxes[props.name]?.mode?.[0]
    exampleDesign.value = exampleAxes[props.name]?.design?.[0]
    exampleSize.value = props.defaultSize
    exampleVariant.value = props.defaultVariant
    exampleWidth.value = props.defaultWidth
    treeHighlight.value = 'full'
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
const menu: MenuItem[] = reactive([
  { label: 'Edit project', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  {
    label: 'Move to',
    value: 'move',
    children: [
      { label: 'Personal projects', value: 'move-personal' },
      { label: 'Team projects', value: 'move-team' },
    ],
  },
  { type: 'separator' },
  {
    type: 'checkbox',
    label: 'Show archived',
    value: 'show-archived',
    checked: false,
    onUpdateChecked: (checked: boolean) => {
      menu.find((item) => item.value === 'show-archived')!.checked = checked
    },
  },
  { type: 'separator' },
  { label: 'Archive', value: 'archive' },
])
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
  avatar: { src: '/images/avatar.jpg', text: 'TM', alt: 'Team member' },
  calendar: { calendarLabel: 'Choose a date' },
  checkbox: {
    label: 'Include archived projects',
    description: 'Show completed work in this view.',
  },
  'checkbox-group': { options, legend: 'Frameworks', ariaLabel: 'Frameworks' },
  combobox: { options, placeholder: 'Choose a framework', ariaLabel: 'Framework' },
  'context-menu': { items: menu, teleport: 'body' },
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
  field: {
    label: 'Project name',
    description: 'Use a name your team can recognize.',
    class: 'w-full',
  },
  fieldset: {
    legend: 'Project details',
    description: 'Set the name used across your workspace.',
    class: 'w-full',
  },
  form: { class: 'w-full' },
  input: { ariaLabel: 'Project name', placeholder: 'Project name' },
  listbox: { options, ariaLabel: 'Frameworks', filterable: true },
  menu: { items: menu, teleport: 'body' },
  menubar: {
    teleport: 'body',
    items: [
      {
        value: 'file',
        label: 'File',
        children: [
          ...menu,
          { type: 'separator' },
          {
            label: 'Open recent',
            value: 'recent',
            children: [
              { label: 'IPEX docs', value: 'recent-docs' },
              { label: 'Workspace', value: 'recent-workspace' },
            ],
          },
        ],
      },
      {
        value: 'edit',
        label: 'Edit',
        children: [
          { label: 'Undo', value: 'undo' },
          { label: 'Redo', value: 'redo' },
          {
            label: 'Find',
            value: 'find',
            children: [
              { label: 'Find in project', value: 'find-project' },
              { label: 'Replace in project', value: 'replace-project' },
            ],
          },
        ],
      },
    ],
    ariaLabel: 'Editor menu',
  },
  meter: { value: 64, label: 'Storage used' },
  'navigation-menu': {
    items: [
      { label: 'Overview', value: 'overview' },
      {
        label: 'Projects',
        value: 'projects',
        children: [
          {
            label: 'All projects',
            value: 'all-projects',
            description: 'Browse your workspace projects.',
          },
          {
            label: 'Archived projects',
            value: 'archived-projects',
            description: 'Review completed work.',
          },
        ],
      },
      { label: 'Settings', value: 'settings' },
    ],
    ariaLabel: 'Project navigation',
  },
  'number-field': { min: 0, max: 100, ariaLabel: 'Project capacity' },
  pagination: { total: 100, itemsPerPage: 10, ariaLabel: 'Project pages' },
  'pin-input': { length: 6, ariaLabel: 'Verification code' },
  'radio-group': { options, legend: 'Framework', ariaLabel: 'Framework' },
  rating: { length: 5, ariaLabel: 'Rate this component' },
  select: { options, placeholder: 'Choose a framework', ariaLabel: 'Framework' },
  separator: { orientation: 'horizontal' },
  sidebar: {
    items: [
      { type: 'label', label: 'Workspace' },
      { label: 'Projects', value: 'projects', href: '#projects' },
      { label: 'Activity', value: 'activity', href: '#activity' },
      { type: 'label', label: 'Manage' },
      {
        label: 'Settings',
        value: 'settings',
        children: [
          { label: 'Profile', value: 'profile', href: '#profile' },
          { label: 'Team', value: 'team', href: '#team' },
        ],
      },
      { label: 'Billing', value: 'billing', href: '#billing', disabled: true },
    ],
    navigationLabel: 'Example workspace',
    breakpoint: '(max-width: 1px)',
    defaultSize: 200,
    ui: { root: 'h-120', panel: 'border border-border rounded-lg' },
  },
  slider: { min: 0, max: 100, ariaLabel: 'Project progress', class: 'w-full' },
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
      {
        type: 'group',
        label: 'Text style',
        children: [
          { label: 'Bold', value: 'bold' },
          { label: 'Italic', value: 'italic' },
        ],
      },
      { type: 'separator' },
      { label: 'Link', value: 'link' },
    ],
    ariaLabel: 'Text formatting',
  },
  tree: {
    class: 'w-full',
    itemKey: 'id',
    labelKey: 'label',
    childrenKey: 'children',
    defaultExpanded: ['components', 'forms'],
    ariaLabel: 'Project files',
  },
}
const values: Record<string, unknown> = {
  progress: 64,
  collapsible: false,
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
  sidebar: 'projects',
}
const model = ref<unknown>(values[props.name])
const hasModelState = computed(() =>
  ['checkbox', 'switch', 'toggle', 'progress'].includes(props.name),
)
const modelState = computed({
  get: () =>
    props.name === 'progress'
      ? model.value == null
        ? 'indeterminate'
        : 'determinate'
      : model.value === 'indeterminate'
        ? 'indeterminate'
        : model.value
          ? 'checked'
          : 'unchecked',
  set: (state: string) => {
    model.value =
      props.name === 'progress'
        ? state === 'indeterminate'
          ? null
          : 64
        : state === 'indeterminate'
          ? 'indeterminate'
          : state === 'checked'
  },
})
const modelStateOptions = computed(() =>
  optionsFor(
    props.name === 'progress'
      ? 'determinate,indeterminate'
      : props.name === 'checkbox'
        ? 'unchecked,checked,indeterminate'
        : 'unchecked,checked',
  ),
)
const previewRevision = ref(0)
const exampleKey = computed(() => `${props.name}:${previewRevision.value}`)

watch(
  () => [optionProps.value.multiple, optionProps.value.selectionMode, optionProps.value.type],
  () => {
    model.value =
      optionProps.value.multiple ||
      optionProps.value.selectionMode === 'multiple' ||
      optionProps.value.type === 'multiple'
        ? []
        : values[props.name]
  },
)
watch(
  () => disclosure.type,
  () => {
    model.value = disclosure.type === 'multiple' ? [] : undefined
  },
)
watch(
  () => props.name,
  (name) => {
    model.value = values[name]
  },
)
const overlays = useOverlay()
let overlay: OverlayInstance<typeof Dialog> | undefined
let disposeOverlayOnClose = true
function openOverlay() {
  const { destroyOnClose, ...options } = optionProps.value
  const dispose = destroyOnClose !== false
  if (overlay && dispose !== disposeOverlayOnClose) {
    overlay.unmount()
    overlay = undefined
  }
  disposeOverlayOnClose = dispose
  overlay ??= overlays.create(Dialog, { destroyOnClose: dispose })
  return overlay.open({
    ...settings.value,
    title: String(options.title ?? 'Programmatic dialog'),
    description: String(options.description ?? 'Opened through the IPEX OverlayProvider.'),
    fullscreen: typeof options.fullscreen === 'boolean' ? options.fullscreen : undefined,
    closeOnBackdropClick:
      typeof options.closeOnBackdropClick === 'boolean' ? options.closeOnBackdropClick : undefined,
    duration: typeof options.duration === 'number' ? options.duration : undefined,
  })
}

onBeforeUnmount(() => overlay?.unmount())
const status = ref('')
const buttonClicks = ref(0)
function recordButtonClick() {
  buttonClicks.value++
  status.value = `Clicked ${buttonClicks.value} ${buttonClicks.value === 1 ? 'time' : 'times'}`
}
const demoProps = computed(() => ({
  ...entries[props.name],
  ...settings.value,
  ...optionProps.value,
  ...(isDisclosure.value
    ? { disabled: disclosure.disabled, unmountOnHide: disclosure.unmountOnHide }
    : {}),
  ...(props.name === 'accordion'
    ? {
        type: disclosure.type,
        orientation: disclosure.orientation,
        collapsible: disclosure.collapsible,
      }
    : {}),
  ...(props.name === 'progress' ? { ariaLabel: 'Upload progress' } : {}),
}))
</script>

<template>
  <div
    data-ui
    data-testid="component-preview"
    class="my-6 min-w-0 overflow-visible rounded-lg border border-border/60 bg-background"
  >
    <div
      v-if="
        activeModeOptions ||
        activeDesignOptions ||
        activeSizeOptions ||
        activeVariantOptions ||
        activeWidthOptions ||
        isDisclosure
      "
      class="flex min-h-11 flex-wrap items-center gap-x-6 gap-y-4 border-b border-border/60 px-4 py-3"
    >
      <div v-if="activeModeOptions" class="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Mode</span>
        <Select
          v-model="exampleMode"
          :options="optionsFor(activeModeOptions)"
          size="xs"
          class="min-w-28"
          aria-label="Example mode"
        />
      </div>
      <div v-if="activeDesignOptions" class="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Design</span>
        <Select
          v-model="exampleDesign"
          :options="optionsFor(activeDesignOptions)"
          size="xs"
          class="min-w-28"
          aria-label="Example design"
        />
      </div>
      <div v-if="activeSizeOptions" class="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Size</span
        ><Select
          v-model="exampleSize"
          :options="optionsFor(activeSizeOptions)"
          size="xs"
          class="min-w-16"
          placeholder="Default"
          aria-label="Example size"
        />
      </div>
      <div
        v-if="activeVariantOptions"
        class="flex items-center gap-2 text-xs text-muted-foreground"
      >
        <span>Variant</span
        ><Select
          v-model="exampleVariant"
          :options="optionsFor(activeVariantOptions)"
          size="xs"
          class="min-w-16"
          placeholder="Default"
          aria-label="Example variant"
        />
      </div>
      <div v-if="name === 'tree'" class="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Selection highlight</span>
        <Select
          v-model="treeHighlight"
          :options="[
            { value: 'full', label: 'Full row' },
            { value: 'indented', label: 'Indented row' },
            { value: 'label', label: 'Label only' },
          ]"
          size="xs"
          aria-label="Example selection highlight"
        />
      </div>
      <div v-if="activeWidthOptions" class="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Width</span
        ><Select
          v-model="exampleWidth"
          :options="optionsFor(activeWidthOptions)"
          size="xs"
          class="min-w-16"
          placeholder="Default"
          aria-label="Example width"
        />
      </div>
      <div v-if="hasModelState" class="flex items-center gap-2 text-xs text-muted-foreground">
        <span>State</span
        ><Select
          v-model="modelState"
          :options="modelStateOptions"
          size="xs"
          aria-label="Example state"
        />
      </div>
      <div v-if="name === 'progress'" class="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Value</span
        ><NumberField
          :model-value="typeof model === 'number' ? model : undefined"
          :min="Number(optionProps.min ?? 0)"
          :max="Number(optionProps.max ?? 100)"
          size="xs"
          aria-label="Example value"
          @update:model-value="model = $event"
        />
      </div>
      <template v-if="name === 'accordion'">
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Type</span>
          <Select
            v-model="disclosure.type"
            :options="optionsFor('single,multiple')"
            size="xs"
            class="min-w-24"
            aria-label="Example type"
          />
        </div>
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Orientation</span>
          <Select
            v-model="disclosure.orientation"
            :options="optionsFor('vertical,horizontal')"
            size="xs"
            class="min-w-28"
            aria-label="Example orientation"
          />
        </div>
      </template>
      <div v-if="isDisclosure" class="flex w-full flex-wrap items-center gap-x-6 gap-y-3 pt-1">
        <Checkbox
          v-for="control in disclosureToggles"
          :key="control.key"
          class="min-h-6 items-center"
          v-model="disclosure[control.key]"
          :label="control.label"
          size="xs"
        />
      </div>
    </div>
    <Collapsible
      v-if="optionDefinitions.length"
      data-testid="component-options"
      :unmount-on-hide="true"
      :ui="{
        root: 'overflow-visible rounded-none border-0 border-b border-border/60 bg-transparent shadow-none',
        trigger:
          activeSizeOptions || activeVariantOptions || activeWidthOptions || isDisclosure
            ? undefined
            : 'rounded-t-lg',
        contentWrapper: 'data-[akaza-state=open]:overflow-visible',
        contentInner: 'overflow-visible',
      }"
    >
      <template #trigger>Options and states</template>
      <template #content>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label
            v-for="[key, definition] in optionDefinitions"
            :key="key"
            class="flex min-w-0 flex-col gap-1.5 text-xs text-muted-foreground"
          >
            <span>{{ optionLabel(key) }}</span>
            <NumberField
              v-if="definition === 'number'"
              :step="
                ['step', 'value', 'min', 'max', 'low', 'high', 'optimum'].includes(key) ? 0.1 : 1
              "
              :model-value="
                optionValues[key] == null || optionValues[key] === ''
                  ? undefined
                  : Number(optionValues[key])
              "
              @update:model-value="optionValues[key] = $event == null ? '' : String($event)"
              :aria-label="`Example ${key}`"
              size="xs"
            />
            <Input
              v-else-if="definition === 'text'"
              v-model="optionValues[key]"
              type="text"
              :aria-label="`Example ${key}`"
              placeholder="Default"
              size="xs"
            />
            <Select
              v-else
              v-model="optionValues[key]"
              :options="optionChoices(definition)"
              :aria-label="`Example ${key}`"
              placeholder="Default"
              size="xs"
            />
          </label>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-3">
          <Button variant="soft" size="xs" @click="previewRevision++">Restart preview</Button>
          <span class="text-xs text-muted-foreground">Restart to reapply initial props.</span>
        </div>
      </template>
    </Collapsible>
    <div
      data-testid="demo-stage"
      class="flex min-h-56 min-w-0 items-center justify-center p-2 sm:p-6"
    >
      <div :key="exampleKey" class="grid w-full max-w-md min-w-0 justify-items-center gap-3">
        <TreeExamples v-if="name === 'tree'" v-bind="demoProps as Partial<TreeProps>" />
        <ToastExamples v-else-if="name === 'toast'" v-bind="demoProps as ToastProps" />
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
            ><p class="max-w-64">Project details stay close to the current task.</p></template
          >
        </component>
        <component
          v-else-if="name === 'collapsible'"
          :is="component"
          v-model="model"
          v-bind="demoProps"
        >
          <template #trigger>Project details</template>
          <template #content
            ><p>Change the project name and visibility from this section.</p></template
          >
        </component>
        <component v-else-if="name === 'context-menu'" :is="component" v-bind="demoProps"
          >Right-click here for project actions.</component
        >
        <component
          v-else-if="name === 'app-layout'"
          v-bind="demoProps"
          :scroll="optionProps.scroll ?? 'page'"
          :viewport="optionProps.viewport ?? false"
          :is="component"
          :ui="{ root: 'min-h-56 max-h-64 w-full overflow-hidden rounded-lg border border-border' }"
        >
          <template #header><span class="text-sm font-medium">IPEX workspace</span></template>
          <p class="p-4 text-sm text-muted-foreground">
            The main region contains the current task.
          </p>
          <template #footer>Workspace footer</template>
        </component>
        <component
          v-else-if="name === 'sidebar'"
          :is="component"
          v-model="model"
          v-bind="demoProps"
        >
          <template #header>Workspace</template>
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
        <div
          v-else-if="name === 'separator'"
          class="flex w-full items-center gap-4"
          :class="demoProps.orientation === 'vertical' ? 'h-16' : 'flex-col'"
        >
          <p class="shrink-0 text-sm">Project overview</p>
          <component :is="component" v-bind="demoProps" />
          <p class="text-sm text-muted-foreground">Recent activity</p>
        </div>
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
        <component
          v-else-if="name === 'button'"
          :is="component"
          v-bind="demoProps"
          data-testid="preview-button"
          :aria-label="optionProps.shape === 'icon' ? 'Create project' : undefined"
          @click="recordButtonClick"
          ><svg
            v-if="optionProps.shape === 'icon'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" /></svg
          ><template v-else>Create project</template></component
        >
        <component v-else :is="component" v-model="model" v-bind="demoProps"
          ><template v-if="name === 'toggle'" #default
            ><span class="font-semibold">B</span></template
          ></component
        >
        <p
          v-if="['form', 'button'].includes(name) || status"
          role="status"
          class="min-h-5 text-xs text-muted-foreground"
        >
          {{ status }}
        </p>
      </div>
    </div>
  </div>
</template>
