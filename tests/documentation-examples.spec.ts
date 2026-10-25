import { expect, test, type Page } from '@playwright/test'

async function open(page: Page, name: string) {
  await page.goto(`/components/${name}`)
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
  return page.getByTestId('component-preview')
}

async function setOption(page: Page, key: string, value: string) {
  await page.getByRole('combobox', { name: `Example ${key}`, exact: true }).click()
  await page.getByRole('option', { name: value, exact: true }).click()
}

test('preview options apply native states and visual variants', async ({ page }) => {
  const preview = await open(page, 'input')
  const options = preview.getByTestId('component-options')
  await options.getByRole('button', { name: 'Options and states', exact: true }).click()
  await setOption(page, 'disabled', 'On')
  await expect(preview.getByRole('textbox', { name: 'Project name', exact: true })).toBeDisabled()
  await setOption(page, 'disabled', 'Off')
  await expect(preview.getByRole('textbox', { name: 'Project name', exact: true })).toBeEnabled()
  await setOption(page, 'invalid', 'On')
  await expect(preview.getByRole('textbox', { name: 'Project name', exact: true })).toHaveAttribute(
    'aria-invalid',
    'true',
  )
})

test('combobox dropdown escapes the preview and all options remain clickable', async ({ page }) => {
  const preview = await open(page, 'combobox')
  await preview.getByRole('combobox', { name: 'Framework', exact: true }).click()
  const option = page.getByRole('option', { name: 'Akaza UI', exact: true })
  const clickable = await option.evaluate((el) => {
    const rect = el.getBoundingClientRect()
    return el.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2))
  })
  expect(clickable).toBe(true)
  await option.click()
  await expect(preview.getByRole('combobox', { name: 'Framework', exact: true })).toHaveValue(
    'Akaza UI',
  )
})

for (const name of ['date-field', 'date-range-field', 'date-range-picker']) {
  test(`${name} supports typing and calendar selection without a dark segment highlight`, async ({
    page,
  }) => {
    const preview = await open(page, name)
    const month = preview.locator('[data-akaza-segment="month"]').first()
    await month.click()
    await expect(page.locator('.akaza-calendar:visible')).toHaveCount(1)
    await expect(month).toBeFocused()
    const contrast = await month.evaluate((el) => ({
      background: getComputedStyle(el).backgroundColor,
      color: getComputedStyle(el).color,
    }))
    expect(contrast.background).not.toBe(contrast.color)
    await month.fill('10')
    await month.press('Tab')
    await preview.locator('[data-akaza-segment="day"]').first().fill('12')
    await preview.locator('[data-akaza-segment="year"]').first().fill('2026')
    if (name !== 'date-field') {
      await preview.locator('[data-akaza-segment="month"]').last().fill('10')
      await preview.locator('[data-akaza-segment="day"]').last().fill('13')
      await preview.locator('[data-akaza-segment="year"]').last().fill('2026')
    }
    const calendar = page.locator('.akaza-calendar:visible')
    const day = calendar
      .locator('.akaza-calendar-cell-trigger:not([disabled])')
      .filter({ hasText: /^15$/ })
      .first()
    await day.click()
    if (name !== 'date-field') {
      await calendar
        .locator('.akaza-calendar-cell-trigger:not([disabled])')
        .filter({ hasText: /^20$/ })
        .first()
        .click()
      await expect(preview.locator('[data-akaza-segment="day"]').last()).toHaveValue('20')
    }
    await expect(preview.locator('[data-akaza-segment="day"]').first()).toHaveValue('15')
    await expect(page.locator('.akaza-calendar:visible')).toHaveCount(0)
  })
}

test('table examples demonstrate selection, search, pagination, expanded rows, and states', async ({
  page,
}) => {
  await open(page, 'data-table')
  const tables = page.getByRole('table', { name: 'Example projects', exact: true })
  await expect(tables).toHaveCount(4)
  await tables.nth(0).getByRole('checkbox').nth(1).check()
  await expect(page.getByText('1 selected', { exact: true })).toBeVisible()
  await page.getByRole('textbox', { name: 'Search projects', exact: true }).fill('Lynx')
  await expect(tables.nth(1).getByRole('row')).toHaveCount(2)
  await expect(tables.nth(1)).toContainText('Lynx')
  await tables
    .nth(2)
    .getByRole('button', { name: /Expand/ })
    .first()
    .click()
  await expect(tables.nth(2)).toContainText('IPEX is owned by Igris Labs.')
  await page.getByRole('combobox', { name: 'Table state', exact: true }).click()
  await page.getByRole('option', { name: 'Error', exact: true }).click()
  await expect(tables.nth(3)).toContainText('Projects could not be loaded. Try again.')
})

test('avatar loads a portrait and falls back when a source is unavailable', async ({ page }) => {
  await open(page, 'avatar')
  const image = page.getByRole('img', { name: 'Portrait of a team member', exact: true })
  await expect(image).toBeVisible()
  expect(await image.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  await expect(page.getByText('Image unavailable', { exact: true })).toBeVisible()
})

test('editable keeps preview and edit geometry coordinated and commits changes', async ({
  page,
}) => {
  const preview = await open(page, 'editable')
  const button = preview.getByRole('button', { name: 'Project title', exact: true })
  await expect(button).toHaveCSS('height', '28px')
  await button.click()
  const input = preview.getByRole('textbox', { name: 'Project title', exact: true })
  await expect(input).toHaveCSS('height', '28px')
  await input.fill('Updated project')
  await preview.getByRole('button', { name: 'Submit', exact: true }).click()
  await expect(button).toHaveText('Updated project')
})

test('checkbox groups keep compact spacing and fieldsets disable nested controls', async ({
  page,
}) => {
  const preview = await open(page, 'checkbox-group')
  const gap = await preview.locator('.akaza-checkbox-group-item').evaluateAll((items) => {
    const rows = items.map((el) => el.getBoundingClientRect())
    return rows[1]!.top - rows[0]!.bottom
  })
  expect(gap).toBeLessThanOrEqual(6)
  await open(page, 'fieldset')
  await page.getByRole('checkbox', { name: 'Disable the fieldset', exact: true }).check()
  const fieldset = page.getByRole('group', { name: 'Project settings', exact: true })
  await expect(fieldset.getByRole('textbox')).toBeDisabled()
  await expect(fieldset.getByRole('combobox')).toBeDisabled()
})

test('model states and initial editing mode are inspectable in previews', async ({ page }) => {
  const preview = await open(page, 'checkbox')
  await preview.getByRole('combobox', { name: 'Example state', exact: true }).click()
  await page.getByRole('option', { name: 'indeterminate', exact: true }).click()
  await expect(
    preview.getByRole('checkbox', { name: 'Include archived projects', exact: true }),
  ).toHaveAttribute('aria-checked', 'mixed')
  await open(page, 'editable')
  await page
    .getByTestId('component-options')
    .getByRole('button', { name: 'Options and states', exact: true })
    .click()
  await setOption(page, 'startWithEditMode', 'On')
  await page.getByRole('button', { name: 'Restart preview', exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Project title', exact: true })).toBeVisible()
})

test('layout examples expose both side regions and work on narrow screens', async ({ page }) => {
  await open(page, 'app-layout')
  const navigation = page.getByRole('navigation', { name: 'Example workspace', exact: true })
  await expect(navigation).toHaveCount(2)
  await navigation.first().getByRole('button', { name: 'Activity', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Activity', exact: true })).toBeVisible()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(390)
})

test('focused invalid inputs use the destructive ring through props and Field context', async ({
  page,
}) => {
  for (const theme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: theme })
    await page.addInitScript((mode) => localStorage.setItem('nuxt-color-mode', mode), theme)
    const preview = await open(page, 'input')
    const input = preview.getByRole('textbox', { name: 'Project name', exact: true })
    await page
      .getByTestId('component-options')
      .getByRole('button', { name: 'Options and states', exact: true })
      .click()
    await setOption(page, 'invalid', 'On')
    for (const keyboard of [false, true]) {
      await input.click()
      if (keyboard) await input.press('ArrowRight')
      const ring = await input.evaluate((el) => {
        const probe = document.createElement('span')
        document.body.append(probe)
        probe.style.backgroundColor = getComputedStyle(el).getPropertyValue('--tw-ring-color')
        const actual = getComputedStyle(probe).backgroundColor
        probe.style.backgroundColor = 'color-mix(in oklab, var(--destructive) 25%, transparent)'
        const expected = getComputedStyle(probe).backgroundColor
        probe.remove()
        return { actual, expected }
      })
      expect(ring.actual).toBe(ring.expected)
    }
    await setOption(page, 'invalid', 'Off')
    await input.focus()
    await expect(input).not.toHaveAttribute('aria-invalid', 'true')
    await open(page, 'field')
    const contextual = page.getByRole('textbox').filter({ visible: true }).nth(1)
    await contextual.click()
    await expect(contextual).toHaveAttribute('aria-invalid', 'true')
    const sameRing = await contextual.evaluate((el) => {
      const probe = document.createElement('span')
      document.body.append(probe)
      probe.style.backgroundColor = getComputedStyle(el).getPropertyValue('--tw-ring-color')
      const actual = getComputedStyle(probe).backgroundColor
      probe.style.backgroundColor = 'color-mix(in oklab, var(--destructive) 25%, transparent)'
      const expected = getComputedStyle(probe).backgroundColor
      probe.remove()
      return actual === expected
    })
    expect(sameRing).toBe(true)
  }
})

test('docs options connect to the preview and source panels stay close to tabs', async ({
  page,
}) => {
  const preview = await open(page, 'input')
  const options = preview.getByTestId('component-options')
  const trigger = options.getByRole('button', { name: 'Options and states', exact: true })
  await expect(options).toHaveCSS('border-top-width', '0px')
  await expect(options).toHaveCSS('border-bottom-width', '1px')
  await expect(options).toHaveCSS('border-radius', '0px')
  await expect(trigger).toHaveCSS('height', '44px')
  await expect(trigger).toHaveCSS('padding-inline-start', '16px')
  await trigger.click()
  await setOption(page, 'disabled', 'On')
  await expect(preview.getByRole('textbox', { name: 'Project name', exact: true })).toBeDisabled()
  for (const name of ['alert-dialog', 'button']) {
    await open(page, name)
    const source = page.locator('[aria-label="Component source files"]')
    const spacing = await source.evaluate((el) => {
      const tabs = el.getBoundingClientRect()
      const code = el
        .parentElement!.querySelector('[role="tabpanel"] .syntax-highlight')!
        .getBoundingClientRect()
      return code.top - tabs.bottom
    })
    expect(spacing).toBe(8)
  }
})

test('date and time highlights use the secondary pair in both themes', async ({ page }) => {
  for (const theme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' })
    await page.addInitScript((mode) => localStorage.setItem('nuxt-color-mode', mode), theme)
    for (const name of [
      'date-field',
      'date-range-field',
      'date-range-picker',
      'time-field',
      'time-range-field',
    ]) {
      const preview = await open(page, name)
      const segment = preview.getByTestId('demo-stage').getByRole('spinbutton').first()
      await segment.click()
      const colors = await segment.evaluate((el) => {
        const style = getComputedStyle(el)
        const probe = document.createElement('span')
        probe.style.backgroundColor = 'var(--secondary)'
        probe.style.color = 'var(--secondary-foreground)'
        document.body.append(probe)
        const expected = getComputedStyle(probe)
        const result = {
          fill: style.backgroundColor,
          text: style.color,
          selection: getComputedStyle(el, '::selection').backgroundColor,
          expectedFill: expected.backgroundColor,
          expectedText: expected.color,
        }
        probe.remove()
        return result
      })
      expect(colors.fill, `${theme}/${name}`).toBe(colors.expectedFill)
      expect(colors.text, `${theme}/${name}`).toBe(colors.expectedText)
      expect(colors.selection, `${theme}/${name}`).toBe(colors.expectedFill)
    }
    const preview = await open(page, 'calendar')
    const day = preview
      .getByTestId('demo-stage')
      .locator('.akaza-calendar-cell-trigger:not([disabled])')
      .filter({ hasText: /^15$/ })
      .first()
    await day.click()
    await expect(day).toHaveAttribute('data-akaza-selected')
    const selected = await day.evaluate((el) => {
      const probe = document.createElement('span')
      probe.style.backgroundColor = 'var(--secondary)'
      document.body.append(probe)
      const matches =
        getComputedStyle(el).backgroundColor === getComputedStyle(probe).backgroundColor
      probe.remove()
      return matches
    })
    expect(selected, theme).toBe(true)
  }
})
