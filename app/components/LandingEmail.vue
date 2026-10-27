<script setup lang="ts">
import { useSidebar } from 'akaza-ui'
import { computed, ref, useTemplateRef } from 'vue'

import { cn } from '../utils/ui'
import { Avatar } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import { Field } from './ui/field'
import { Form } from './ui/form'
import { Input, inputVariants } from './ui/input'
import { NavigationMenu } from './ui/navigation-menu'
import { Sidebar } from './ui/sidebar'

const folder = ref('inbox')
const sidebar = useSidebar(useTemplateRef('emailSidebar'))
const query = ref('')
const selectedId = ref<number | null>(1)
const mobileDetail = ref(false)
const reply = ref('')
const notice = ref('')
const composeOpen = ref(false)
const recipient = ref('')
const subject = ref('')
const message = ref('')
const messages = ref([
  {
    id: 1,
    sender: 'Maya Patel',
    email: 'maya@example.com',
    initials: 'MP',
    subject: 'Workspace settings are ready for review',
    preview: 'The new settings screens are ready. I have included the keyboard flows.',
    body: 'Hi Rahul,\n\nThe workspace settings are ready for review. The screens use the shared IPEX fields, tabs, and navigation.\n\nI have checked the keyboard flows and both color modes. Could you take a look at the notification preferences before we ship?\n\nThanks,\nMaya',
    time: '10:24',
    unread: true,
    starred: true,
    folder: 'inbox',
  },
  {
    id: 2,
    sender: 'Arjun Mehta',
    email: 'arjun@example.com',
    initials: 'AM',
    subject: 'A quieter inbox',
    preview: 'A few thoughts on message density and the reading pane.',
    body: 'Hi team,\n\nI tried the inbox with a longer message list. Keeping the sender and subject together makes scanning easier, especially on smaller screens.\n\nThe reading pane feels good at the current width. Let’s keep the actions close to the message.\n\nArjun',
    time: '09:48',
    unread: true,
    starred: false,
    folder: 'inbox',
  },
  {
    id: 3,
    sender: 'Neha Sharma',
    email: 'neha@example.com',
    initials: 'NS',
    subject: 'Notes from the accessibility review',
    preview: 'Focus order looks good. Two small follow-ups for the next pass.',
    body: 'Hello,\n\nThe accessibility review is complete. Focus order and labels look good across the project screens.\n\nTwo follow-ups: check the empty search state with a screen reader, and keep focus on the trigger when a dialog closes.\n\nNeha',
    time: 'Yesterday',
    unread: false,
    starred: false,
    folder: 'inbox',
  },
  {
    id: 4,
    sender: 'Rahul Vashishtha',
    email: 'rahul@example.com',
    initials: 'RV',
    subject: 'Theme foundations',
    preview: 'The neutral palette and accent tokens are ready to use.',
    body: 'Hi everyone,\n\nThe theme foundations are ready. Use the semantic tokens for surfaces, text, borders, and feedback.\n\nThe component guides include the source and shared installation steps.\n\nRahul',
    time: 'Yesterday',
    unread: false,
    starred: true,
    folder: 'inbox',
  },
])
const mailById = computed(() =>
  Object.fromEntries(messages.value.map((mail) => [String(mail.id), mail])),
)
function mailFor(value: unknown) {
  return mailById.value[String(value)]!
}
const visible = computed(() =>
  messages.value.filter(
    (m) =>
      (folder.value === 'starred'
        ? m.starred && m.folder !== 'archive'
        : m.folder === folder.value) &&
      `${m.sender} ${m.subject} ${m.body}`.toLowerCase().includes(query.value.toLowerCase()),
  ),
)
const mailItems = computed(() =>
  visible.value.map((mail) => ({
    value: String(mail.id),
    label: mail.subject,
    mail,
    onSelect: () => read(mail.id),
  })),
)
const selected = computed(() => visible.value.find((m) => m.id === selectedId.value))
const folders = computed(() => [
  {
    value: 'inbox',
    label: 'Inbox',
    iconName: 'tabler:inbox',
    count: messages.value.filter((m) => m.folder === 'inbox').length,
  },
  {
    value: 'starred',
    label: 'Starred',
    iconName: 'tabler:star',
    count: messages.value.filter((m) => m.starred && m.folder !== 'archive').length,
  },
  {
    value: 'sent',
    label: 'Sent',
    iconName: 'tabler:send',
    count: messages.value.filter((m) => m.folder === 'sent').length,
  },
  {
    value: 'archive',
    label: 'Archive',
    iconName: 'tabler:archive',
    count: messages.value.filter((m) => m.folder === 'archive').length,
  },
])
function chooseFolder(value: string) {
  sidebar.closeMobile()
  folder.value = value
  query.value = ''
  selectedId.value = null
  mobileDetail.value = false
  notice.value = ''
}
function read(id: number) {
  selectedId.value = id
  mobileDetail.value = true
  reply.value = ''
  notice.value = ''
  const mail = messages.value.find((m) => m.id === id)
  if (mail) mail.unread = false
}
function archive() {
  if (!selected.value) return
  selected.value.folder = 'archive'
  selectedId.value = null
  mobileDetail.value = false
  notice.value = 'Message archived.'
}
function sendReply() {
  if (!selected.value || !reply.value.trim()) return
  addSent(selected.value.email, `Re: ${selected.value.subject}`, reply.value)
  reply.value = ''
  notice.value = 'Reply sent in this example.'
}
function addSent(to: string, title: string, body: string) {
  messages.value.push({
    id: Math.max(...messages.value.map((m) => m.id)) + 1,
    sender: 'You',
    email: to,
    initials: 'RV',
    subject: title,
    preview: body,
    body,
    time: 'Just now',
    unread: false,
    starred: false,
    folder: 'sent',
  })
}
function send() {
  if (!recipient.value.trim() || !subject.value.trim() || !message.value.trim()) return
  addSent(recipient.value, subject.value, message.value)
  composeOpen.value = false
  recipient.value = ''
  subject.value = ''
  message.value = ''
  notice.value = 'Message sent in this example.'
}
const textAreaClass = cn(inputVariants({ size: 'md' }).root(), 'h-auto min-h-28 resize-y py-2')
</script>

<template>
  <div
    aria-label="Email application example"
    class="overflow-hidden rounded-xl border border-border/70 bg-background"
  >
    <header
      class="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-4"
    >
      <div class="flex items-center gap-3">
        <Button
          size="md"
          shape="icon"
          variant="ghost"
          color="secondary"
          class="lg:hidden"
          aria-label="Open email folders"
          @click="sidebar.openMobile"
          ><Icon name="tabler:menu-2" class="size-4" /></Button
        ><Icon name="tabler:mail" class="size-4" /><span class="text-sm font-semibold"
          >Igris Mail</span
        ><span class="hidden text-xs text-muted-foreground sm:inline">rahul@example.com</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="hidden text-xs text-muted-foreground sm:inline"
          >Interactive example · No email is sent</span
        ><Button size="md" @click="composeOpen = true"
          ><Icon name="tabler:pencil" class="size-4" />Compose</Button
        >
      </div>
    </header>
    <div class="flex min-h-[42rem]">
      <Sidebar
        ref="emailSidebar"
        v-model="folder"
        :items="folders"
        variant="soft"
        item-size="sm"
        :default-size="160"
        :min-size="144"
        :resizable="false"
        breakpoint="(max-width: 1023px)"
        teleport="#teleports"
        aria-label="Email navigation"
        navigation-label="Email folders"
        :ui="{ root: 'self-stretch', body: 'px-3 py-5', footer: 'mx-3 px-2 py-4' }"
        @select="chooseFolder(String($event.value))"
      >
        <template #header="{ closeMobile }"
          ><span class="text-sm font-medium">Folders</span
          ><Button
            size="md"
            variant="ghost"
            shape="icon"
            aria-label="Close email folders"
            @click="closeMobile"
            ><Icon name="tabler:x" class="size-4" /></Button
        ></template>
        <template #item-leading="{ item }"
          ><Icon :name="String(item.iconName)" class="size-3.5"
        /></template>
        <template #item-trailing="{ item }"
          ><span class="text-xs text-muted-foreground">{{ item.count }}</span></template
        >
        <template #footer>A personal inbox built with IPEX.</template>
      </Sidebar>
      <div class="grid min-w-0 flex-1 grid-cols-1 lg:grid-cols-[19rem_1fr]">
        <section
          aria-label="Message list"
          class="min-w-0 border-border/60 lg:border-r"
          :class="mobileDetail ? 'hidden lg:block' : 'block'"
        >
          <div class="space-y-3 border-b border-border/60 p-4">
            <h3 class="text-lg font-semibold capitalize">{{ folder }}</h3>
            <Input
              v-model="query"
              size="md"
              type="search"
              placeholder="Search mail…"
              aria-label="Search example mail"
            />
          </div>
          <div class="p-2">
            <NavigationMenu
              :items="mailItems"
              :model-value="selectedId === null ? null : String(selectedId)"
              orientation="vertical"
              content-mode="inline"
              highlight-mode="selection-hover"
              size="md"
              aria-label="Messages"
              :ui="{
                list: 'flex-col gap-1',
                item: 'w-full',
                link: 'w-full justify-start rounded-md p-3 text-left text-foreground hover:bg-transparent',
                inlineLink:
                  'w-full justify-start rounded-md p-3 text-left text-foreground hover:bg-transparent',
                itemLabel: 'block w-full min-w-0 whitespace-normal',
                itemTrailing: 'hidden',
              }"
            >
              <template #item-label="{ item }">
                <span class="flex items-center justify-between gap-2"
                  ><span
                    class="text-sm"
                    :class="mailFor(item.value).unread ? 'font-semibold' : 'font-medium'"
                    >{{ mailFor(item.value).sender }}</span
                  ><span class="shrink-0 text-xs text-muted-foreground">{{
                    mailFor(item.value).time
                  }}</span></span
                >
                <span class="mt-1 block truncate text-[13px] font-medium">{{
                  mailFor(item.value).subject
                }}</span>
                <span class="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{{
                  mailFor(item.value).preview
                }}</span>
                <span class="mt-2 flex min-h-3 items-center gap-2"
                  ><span
                    v-if="mailFor(item.value).unread"
                    class="size-1.5 rounded-full bg-accent"
                    aria-label="Unread" /><Icon
                    v-if="mailFor(item.value).starred"
                    name="tabler:star-filled"
                    class="size-3 text-muted-foreground"
                    aria-label="Starred"
                /></span>
              </template>
            </NavigationMenu>
            <p v-if="!visible.length" class="px-3 py-8 text-sm text-muted-foreground">
              {{ query ? 'No messages match your search.' : 'No messages in this folder.' }}
            </p>
          </div>
        </section>
        <section
          aria-label="Reading pane"
          class="min-w-0"
          :class="mobileDetail ? 'block' : 'hidden lg:block'"
        >
          <template v-if="selected">
            <div class="flex items-center gap-2 border-b border-border/60 px-5 py-3">
              <Button
                variant="ghost"
                color="secondary"
                size="md"
                class="lg:hidden"
                @click="mobileDetail = false"
                ><Icon name="tabler:arrow-left" class="size-4" />Back</Button
              ><Button
                variant="ghost"
                color="secondary"
                size="md"
                :disabled="selected.folder === 'archive'"
                @click="archive"
                ><Icon name="tabler:archive" class="size-4" />Archive</Button
              ><Button
                variant="ghost"
                color="secondary"
                size="md"
                shape="icon"
                :aria-label="selected.starred ? 'Unstar message' : 'Star message'"
                @click="selected.starred = !selected.starred"
                ><Icon
                  :name="selected.starred ? 'tabler:star-filled' : 'tabler:star'"
                  class="size-4"
              /></Button>
            </div>
            <article class="p-5 sm:p-7">
              <div class="flex items-center gap-3">
                <Avatar :text="selected.initials" :alt="selected.sender" size="md" />
                <div class="min-w-0">
                  <p class="text-sm font-medium">{{ selected.sender }}</p>
                  <p class="truncate text-xs text-muted-foreground">{{ selected.email }}</p>
                </div>
                <span class="ml-auto text-xs text-muted-foreground">{{ selected.time }}</span>
              </div>
              <h4 class="mt-6 text-xl leading-7 font-semibold tracking-tight">
                {{ selected.subject }}
              </h4>
              <p class="mt-6 text-sm leading-7 whitespace-pre-line">{{ selected.body }}</p>
              <Form v-if="selected.folder !== 'sent'" class="mt-8 gap-3" @submit="sendReply">
                <Field :label="`Reply to ${selected.sender}`" name="reply">
                  <textarea
                    v-model="reply"
                    :class="textAreaClass"
                    :aria-label="`Reply to ${selected.sender}`"
                    placeholder="Write a reply…"
                    required
                  />
                </Field>
                <Button size="md" type="submit" class="w-fit" :disabled="!reply.trim()"
                  >Send reply<Icon name="tabler:arrow-up-right" class="size-4"
                /></Button>
              </Form>
            </article>
          </template>
          <div
            v-else
            class="flex min-h-96 flex-col items-center justify-center gap-3 p-6 text-center"
          >
            <Icon name="tabler:mail-opened" class="size-7 text-muted-foreground" />
            <p class="text-sm text-muted-foreground">Select a message to read it.</p>
          </div>
        </section>
      </div>
    </div>
    <p
      v-if="notice"
      role="status"
      class="border-t border-border/60 px-5 py-3 text-sm text-muted-foreground"
    >
      {{ notice }}
    </p>
    <Dialog
      v-model="composeOpen"
      title="New message"
      description="Try composing an email. Messages stay in this example."
      teleport="#teleports"
      ><template #body
        ><Form class="gap-4" @submit="send">
          <Field label="To" name="recipient" required
            ><Input
              v-model="recipient"
              type="email"
              required
              placeholder="name@example.com"
              size="md"
          /></Field>
          <Field label="Subject" name="subject" required
            ><Input v-model="subject" required size="md"
          /></Field>
          <Field label="Message" name="message" required>
            <textarea v-model="message" :class="textAreaClass" aria-label="Message" required />
          </Field>
          <Button type="submit" class="w-fit" size="md">Send message</Button>
        </Form></template
      ></Dialog
    >
  </div>
</template>
