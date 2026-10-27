import { expect, test, type Page } from '@playwright/test'

async function open(page: Page, path: string) {
  await page.goto(path)
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
}

test('soft Sidebar renders labels, nested links, disabled items and selection from its items API', async ({
  page,
}) => {
  await open(page, '/components/sidebar')
  const menu = page
    .getByTestId('demo-stage')
    .getByRole('navigation', { name: 'Example workspace', exact: true })
  await expect(menu.getByText('Workspace', { exact: true })).toBeVisible()
  await expect(menu.getByRole('link', { name: 'Workspace', exact: true })).toHaveCount(0)
  const projects = menu.getByRole('link', { name: 'Projects', exact: true })
  await expect(projects).toHaveAttribute('data-akaza-active', 'true')
  await expect(projects).toHaveCSS('height', '30px')
  await expect(projects.locator('..')).toHaveCSS('height', '34px')
  const settings = menu.getByRole('button', { name: 'Settings', exact: true })
  await settings.click()
  await expect(settings).toHaveAttribute('aria-expanded', 'true')
  await expect(settings).toHaveCSS('text-align', 'left')
  await expect(settings).toHaveCSS('justify-content', 'flex-start')
  const labelLeft = (control: typeof settings) =>
    control.locator('.akaza-navigation-menu-item-label').evaluate((el) => {
      const range = document.createRange()
      range.selectNodeContents(el)
      return range.getBoundingClientRect().left
    })
  expect(await labelLeft(settings)).toBeCloseTo(await labelLeft(projects), 0)
  await expect(settings.locator('.akaza-navigation-menu-item-leading')).toHaveCount(0)
  const children = menu.locator('ul[data-akaza-depth="1"]')
  await expect(children).toHaveCSS('border-left-width', '0px')
  const team = menu.getByRole('link', { name: 'Team', exact: true })
  await expect(team).toBeVisible()
  await expect(team).toHaveCSS('height', '30px')
  await team.click()
  await expect(team).toHaveAttribute('data-akaza-active', 'true')
  await expect(projects).not.toHaveAttribute('data-akaza-active', 'true')
  await expect(menu.getByText('Billing', { exact: true }).locator('..')).toHaveAttribute(
    'aria-disabled',
    'true',
  )
})

test('docs soft Sidebar keeps its sliding hover, active route, and mobile controller', async ({
  page,
}) => {
  await open(page, '/getting-started/introduction')
  const nav = page.getByRole('navigation', { name: 'Documentation', exact: true })
  const input = nav.getByRole('link', { name: 'Input', exact: true })
  const list = nav.locator('.akaza-navigation-menu-list').first()
  await input.hover()
  await expect.poll(() => list.evaluate((el) => getComputedStyle(el, '::before').opacity)).toBe('1')
  const before = await list.evaluate((el) => getComputedStyle(el, '::before').translate)
  await nav.getByRole('link', { name: 'Button', exact: true }).hover()
  await expect
    .poll(() => list.evaluate((el) => getComputedStyle(el, '::before').translate))
    .not.toBe(before)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeVisible()
  await dialog.getByRole('link', { name: 'Button', exact: true }).click()
  await expect(page).toHaveURL(/\/components\/button$/)
  await expect(dialog).toHaveCount(0)
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click()
  await expect(dialog.getByRole('link', { name: 'Button', exact: true })).toHaveAttribute(
    'data-akaza-active',
    'true',
  )
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toBeFocused()
})

test('Sidebar coordinates all five item sizes and soft/subtle states without changing panel width', async ({
  page,
}) => {
  await open(page, '/components/sidebar')
  const menu = page
    .getByTestId('demo-stage')
    .getByRole('navigation', { name: 'Example workspace', exact: true })
  const projects = menu.getByRole('link', { name: 'Projects', exact: true })
  const settings = menu.getByRole('button', { name: 'Settings', exact: true })
  await settings.click()
  const team = menu.getByRole('link', { name: 'Team', exact: true })
  const panel = menu.locator('xpath=ancestor::*[contains(@class,"akaza-sidebar-panel")][1]')
  const width = (await panel.boundingBox())!.width
  for (const [size, height, text, padding, radius, icon, groupGap] of [
    ['xs', 26, 12, 8, 5, 12, 8],
    ['sm', 30, 13, 10, 8, 14, 12],
    ['md', 34, 14, 12, 10, 16, 16],
    ['lg', 38, 14, 14, 12, 18, 20],
    ['xl', 42, 16, 16, 14, 20, 24],
  ] as const) {
    await page.getByRole('combobox', { name: 'Example size', exact: true }).click()
    await page.getByRole('option', { name: size, exact: true }).click()
    for (const row of [projects, settings, team]) {
      await expect(row).toHaveCSS('height', `${height}px`)
      await expect(row).toHaveCSS('font-size', `${text}px`)
      await expect(row).toHaveCSS('padding-left', `${padding}px`)
      await expect(row).toHaveCSS('border-radius', `${radius}px`)
    }
    await expect(projects.locator('..')).toHaveCSS('height', `${height + 4}px`)
    await expect(settings.locator('.akaza-navigation-menu-child-indicator')).toHaveCSS(
      'width',
      `${icon}px`,
    )
    expect((await panel.boundingBox())!.width).toBe(width)
    await expect(menu.getByText('Manage', { exact: true }).locator('..')).toHaveCSS(
      'margin-top',
      `${groupGap}px`,
    )
  }
  const soft = await projects.evaluate((el) => getComputedStyle(el).boxShadow)
  await page.getByRole('combobox', { name: 'Example variant', exact: true }).click()
  await page.getByRole('option', { name: 'subtle', exact: true }).click()
  await expect.poll(() => projects.evaluate((el) => getComputedStyle(el).boxShadow)).not.toBe(soft)
  await expect(projects).toHaveCSS('height', '42px')
  await expect(projects).toHaveCSS('border-width', '0px')
})

test('line Sidebar keeps one sliding selection marker, no row fills, and shared nesting and sizing', async ({
  page,
}) => {
  await open(page, '/components/sidebar')
  const menu = page
    .getByTestId('demo-stage')
    .getByRole('navigation', { name: 'Example workspace', exact: true })
  const list = menu.locator('.akaza-navigation-menu-list').first()
  const choose = async (key: string, value: string) => {
    await page.getByRole('combobox', { name: `Example ${key}`, exact: true }).click()
    await page.getByRole('option', { name: value, exact: true }).click()
  }
  await choose('design', 'line')
  const projects = menu.getByRole('link', { name: 'Projects', exact: true })
  const activity = menu.getByRole('link', { name: 'Activity', exact: true })
  const marker = () =>
    list.evaluate((el) => {
      const style = getComputedStyle(el, '::before')
      return {
        width: style.width,
        height: style.height,
        opacity: style.opacity,
        translate: style.translate,
        duration: style.transitionDuration,
        property: style.transitionProperty,
      }
    })
  await expect.poll(async () => (await marker()).width).toBe('1.5px')
  await expect.poll(async () => (await marker()).height).toBe('18px')
  await expect.poll(async () => (await marker()).opacity).toBe('1')
  await expect(projects).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  const position = (await marker()).translate
  await activity.hover()
  await expect(activity).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  expect((await marker()).translate).toBe(position)
  await activity.click()
  await expect(activity).toHaveAttribute('data-akaza-active', 'true')
  await expect.poll(async () => (await marker()).translate).not.toBe(position)
  await choose('variant', 'subtle')
  await expect(activity).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  expect(
    await activity.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--tw-inset-ring-shadow'),
    ),
  ).toContain('0px')
  const settings = menu.getByRole('button', { name: 'Settings', exact: true })
  await settings.click()
  const team = menu.getByRole('link', { name: 'Team', exact: true })
  await team.click()
  await expect(team).toHaveAttribute('data-akaza-active', 'true')
  await expect
    .poll(() => list.evaluate((el) => parseFloat(el.style.getPropertyValue('--nav-x'))))
    .toBeGreaterThan(0)
  await settings.click()
  await expect(settings).toHaveAttribute('aria-expanded', 'false')
  await expect
    .poll(() => list.evaluate((el) => parseFloat(el.style.getPropertyValue('--nav-x'))))
    .toBe(0)
  await choose('size', 'xl')
  await expect.poll(async () => (await marker()).height).toBe('30px')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect.poll(async () => (await marker()).property).toBe('none')
  await choose('design', 'standard')
  await expect(settings).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
})

test('grouped mode folds category labels without losing selection or nested expansion across mode changes', async ({
  page,
}) => {
  await open(page, '/components/sidebar')
  const menu = page
    .getByTestId('demo-stage')
    .getByRole('navigation', { name: 'Example workspace', exact: true })
  const choose = async (key: string, value: string) => {
    await page.getByRole('combobox', { name: `Example ${key}`, exact: true }).click()
    await page.getByRole('option', { name: value, exact: true }).click()
  }
  await choose('mode', 'grouped')
  const workspace = menu.getByRole('button', { name: 'Workspace', exact: true })
  const manage = menu.getByRole('button', { name: 'Manage', exact: true })
  await expect(workspace).toHaveAttribute('aria-expanded', 'true')
  await expect(manage).toHaveAttribute('aria-expanded', 'true')
  await expect(manage.locator('..')).toHaveCSS('margin-top', '12px')
  await expect(workspace.locator('..')).toHaveCSS('margin-top', '0px')
  await workspace.focus()
  await workspace.press('Space')
  await expect(workspace).toHaveAttribute('aria-expanded', 'false')
  await expect(menu.getByRole('link', { name: 'Projects', exact: true })).toHaveCount(0)
  await workspace.press('Space')
  await expect(menu.getByRole('link', { name: 'Projects', exact: true })).toBeVisible()
  await menu.getByRole('button', { name: 'Settings', exact: true }).click()
  await menu.getByRole('link', { name: 'Team', exact: true }).click()
  await choose('design', 'line')
  await manage.click()
  await expect(manage).toHaveAttribute('aria-expanded', 'false')
  await expect
    .poll(() =>
      menu
        .locator('.akaza-navigation-menu-list')
        .first()
        .evaluate((el) => getComputedStyle(el, '::before').opacity),
    )
    .toBe('0')
  await expect(menu.getByRole('link', { name: 'Team', exact: true })).toHaveCount(0)
  await choose('mode', 'ungrouped')
  await expect(menu.getByRole('button', { name: 'Manage', exact: true })).toHaveCount(0)
  await expect(menu.getByRole('link', { name: 'Team', exact: true })).toHaveAttribute(
    'data-akaza-active',
    'true',
  )
  await choose('mode', 'grouped')
  await expect(manage).toHaveAttribute('aria-expanded', 'false')
  await expect
    .poll(() =>
      menu
        .locator('.akaza-navigation-menu-list')
        .first()
        .evaluate((el) => getComputedStyle(el, '::before').opacity),
    )
    .toBe('0')
  await manage.click()
  await expect(menu.getByRole('link', { name: 'Team', exact: true })).toHaveAttribute(
    'data-akaza-active',
    'true',
  )
  await expect(menu.getByRole('button', { name: 'Settings', exact: true })).toHaveAttribute(
    'aria-expanded',
    'true',
  )
})

test('rail has a continuous track with independent hover and active lines in both grouping modes', async ({
  page,
}) => {
  await open(page, '/components/sidebar')
  const menu = page
    .getByTestId('demo-stage')
    .getByRole('navigation', { name: 'Example workspace', exact: true })
  const choose = async (key: string, value: string) => {
    await page.getByRole('combobox', { name: `Example ${key}`, exact: true }).click()
    await page.getByRole('option', { name: value, exact: true }).click()
  }
  await choose('design', 'rail')
  const list = menu.locator('.akaza-navigation-menu-list').first()
  const marker = (pseudo: string) =>
    list.evaluate((el, part) => {
      const style = getComputedStyle(el, part)
      return {
        opacity: style.opacity,
        translate: style.translate,
        width: style.width,
        height: style.height,
        property: style.transitionProperty,
      }
    }, pseudo)
  await expect(list).toHaveCSS('border-left-width', '0px')
  await expect(list.locator('[data-nav-track]')).toHaveCount(2)
  const projects = menu.getByRole('link', { name: 'Projects', exact: true })
  const activity = menu.getByRole('link', { name: 'Activity', exact: true })
  await expect.poll(async () => (await marker('::before')).opacity).toBe('1')
  const selected = (await marker('::before')).translate
  await activity.hover()
  await expect.poll(async () => (await marker('::after')).opacity).toBe('1')
  expect((await marker('::before')).translate).toBe(selected)
  expect((await marker('::after')).width).toBe('1.5px')
  await expect(activity).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await activity.click()
  await expect.poll(async () => (await marker('::before')).translate).not.toBe(selected)
  await expect.poll(async () => (await marker('::after')).opacity).toBe('0')
  await projects.focus()
  await expect.poll(async () => (await marker('::after')).opacity).toBe('1')
  await page.getByRole('combobox', { name: 'Example mode', exact: true }).focus()
  await expect.poll(async () => (await marker('::after')).opacity).toBe('0')
  await choose('mode', 'grouped')
  await expect(menu.getByRole('button', { name: 'Workspace', exact: true })).toHaveAttribute(
    'aria-expanded',
    'true',
  )
  await expect(
    menu.getByRole('button', { name: 'Workspace', exact: true }).locator('..'),
  ).toHaveCSS('margin-top', '0px')
  await expect(activity).toHaveAttribute('data-akaza-active', 'true')
  await expect(list).toHaveCSS('border-left-width', '0px')
  await expect(list.locator('[data-nav-track]')).toHaveCount(2)
  await menu.evaluate(async (el) => {
    el.style.height = '400px'
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    )
  })
  await menu.getByRole('button', { name: 'Workspace', exact: true }).hover()
  await expect.poll(async () => (await marker('::after')).opacity).toBe('0')
  await expect(menu.getByRole('button', { name: 'Workspace', exact: true })).not.toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0)',
  )
  await menu.getByRole('button', { name: 'Workspace', exact: true }).click()
  await expect.poll(async () => (await marker('::before')).opacity).toBe('0')
  await expect(list.locator('[data-nav-track]')).toHaveCount(1)
  await page.getByRole('button', { name: 'Use dark theme', exact: true }).click()
  await menu.getByRole('button', { name: 'Settings', exact: true }).hover()
  await expect.poll(async () => (await marker('::after')).opacity).toBe('1')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect.poll(async () => (await marker('::before')).property).toBe('none')
  await expect.poll(async () => (await marker('::after')).property).toBe('none')
})

test('group headers hover consistently and section rails never cross labels', async ({ page }) => {
  await open(page, '/components/sidebar')
  const menu = page
    .getByTestId('demo-stage')
    .getByRole('navigation', { name: 'Example workspace', exact: true })
  const choose = async (key: string, value: string) => {
    await page.getByRole('combobox', { name: `Example ${key}`, exact: true }).click()
    await page.getByRole('option', { name: value, exact: true }).click()
  }
  await choose('mode', 'grouped')
  const workspace = menu.getByRole('button', { name: 'Workspace', exact: true })
  for (const design of ['standard', 'line', 'rail']) {
    await choose('design', design)
    await workspace.hover()
    await expect.poll(() => workspace.evaluate((el) => el.getAnimations().length)).toBe(0)
    await expect(workspace).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  }
  const alignment = () =>
    menu.evaluate((el) => {
      const list = el.querySelector('.akaza-navigation-menu-list')!
      const labels = [
        ...list.querySelectorAll<HTMLElement>(
          '.akaza-navigation-menu-group-label, button:has([data-sidebar-group])',
        ),
      ].map((label) => label.getBoundingClientRect())
      return [...list.querySelectorAll<HTMLElement>('[data-nav-track]')].every((track) => {
        const rect = track.getBoundingClientRect()
        return labels.every(
          (label) => rect.bottom <= label.top + 0.5 || rect.top >= label.bottom - 0.5,
        )
      })
    })
  await expect.poll(alignment).toBe(true)
  await workspace.click()
  await workspace.click()
  for (let frame = 0; frame < 12; frame++) {
    await page.evaluate(
      () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
    )
    expect(await alignment()).toBe(true)
  }
  await choose('mode', 'ungrouped')
  await expect(menu.locator('[data-nav-track]')).toHaveCount(2)
  await expect.poll(alignment).toBe(true)
})
