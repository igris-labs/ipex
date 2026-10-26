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

for (const name of ['accordion', 'collapsible']) {
  test(`${name} opens and closes with coordinated sizing`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const preview = await open(page, name)
    const trigger = preview.getByTestId('demo-stage').locator(`.akaza-${name}-trigger`).first()
    const region = preview.getByTestId('demo-stage').locator(`.akaza-${name}-content`).first()
    const sizes = [
      ['xs', 40, 12, 12],
      ['sm', 44, 13, 14],
      ['md', 48, 14, 16],
      ['lg', 52, 14, 18],
      ['xl', 56, 16, 20],
    ] as const
    for (const [size, height, text, icon] of sizes) {
      await page.getByRole('combobox', { name: 'Example size', exact: true }).click()
      await page.getByRole('option', { name: size, exact: true }).click()
      await expect(trigger).toHaveCSS('height', `${height}px`)
      await expect(trigger).toHaveCSS('font-size', `${text}px`)
      await expect(trigger.locator('svg')).toHaveCSS('width', `${icon}px`)
      await trigger.click()
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await expect
        .poll(() => region.evaluate((el) => el.getBoundingClientRect().height))
        .toBeGreaterThan(20)
      await expect(region).not.toHaveAttribute('inert')
      await expect(trigger.locator('svg')).toHaveCSS('rotate', '180deg')
      await expect(trigger.locator('svg')).toHaveCSS('transform', 'none')
      await trigger.press('Space')
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(region).toHaveCSS('height', '0px')
      await expect(region).toHaveAttribute('inert', '')
      await expect(trigger).toHaveCSS('outline-style', 'solid')
      await expect(trigger).toHaveCSS('outline-width', '1px')
    }
  })
}

for (const name of ['select', 'combobox', 'listbox']) {
  test(`${name} leaves a highlight gap and places checks at the inline end`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await open(page, name)
    if (name !== 'listbox')
      await page.getByRole('combobox', { name: 'Framework', exact: true }).click()
    const option = page.getByRole('option', { name: 'Vue', exact: true })
    await option.hover()
    const geometry = await option.evaluate((el) => {
      const indicator = el.querySelector('[class$="-indicator"]')!
      const text = el.querySelector('[class$="-option-text"]')!
      const highlight = getComputedStyle(el, '::before')
      return {
        checkLeft: indicator.getBoundingClientRect().left,
        textRight: text.getBoundingClientRect().right,
        top: highlight.top,
        bottom: highlight.bottom,
        color: highlight.backgroundColor,
      }
    })
    expect(geometry.top).toBe('1px')
    expect(geometry.bottom).toBe('1px')
    expect(geometry.color).not.toBe('rgba(0, 0, 0, 0)')
    expect(geometry.checkLeft).toBeGreaterThanOrEqual(geometry.textRight)
    await option.click()
  })
}

for (const name of ['menu', 'context-menu', 'menubar']) {
  test(`${name} checkbox marks appear on the right and stay interactive`, async ({ page }) => {
    const preview = await open(page, name)
    if (name === 'menu')
      await preview.getByRole('button', { name: 'Open menu', exact: true }).click()
    else if (name === 'menubar') await preview.getByText('File', { exact: true }).click()
    else await preview.locator('.akaza-context-menu-root').click({ button: 'right' })
    const item = page.getByRole('menuitemcheckbox', { name: 'Show archived', exact: true })
    await expect(item).toHaveAttribute('aria-checked', 'false')
    await item.click()
    await expect(item).toHaveAttribute('aria-checked', 'true')
    await expect(item.locator('svg')).toHaveCSS('opacity', '1')
    const aligned = await item.evaluate(
      (el) =>
        el.querySelector('svg')!.getBoundingClientRect().left >=
        el.querySelector('span')!.getBoundingClientRect().right,
    )
    expect(aligned).toBe(true)
    await item.click()
    await expect(item).toHaveAttribute('aria-checked', 'false')
    await page.getByRole('menuitem', { name: 'Archive', exact: true }).click()
  })
}

test('tree rows align labels by depth and keep equal heights at every size', async ({ page }) => {
  const preview = await open(page, 'tree')
  for (const [size, height] of [
    ['xs', 24],
    ['sm', 28],
    ['md', 32],
    ['lg', 36],
    ['xl', 40],
  ] as const) {
    await page.getByRole('combobox', { name: 'Example size', exact: true }).click()
    await page.getByRole('option', { name: size, exact: true }).click()
    const rows = await preview.locator('.akaza-tree-row').evaluateAll((es) =>
      es.map((el) => ({
        h: el.getBoundingClientRect().height,
        x: el.querySelector('.akaza-tree-label')!.getBoundingClientRect().left,
      })),
    )
    expect(rows.map((row) => row.h)).toEqual([height, height, height, height])
    expect(rows[0]!.x).toBe(rows[3]!.x)
    expect(rows[1]!.x).toBe(rows[2]!.x)
    expect(rows[1]!.x - rows[0]!.x).toBe(16)
  }
  await preview.getByRole('button', { name: 'Collapse Components', exact: true }).click()
  await expect(preview.locator('.akaza-tree-row')).toHaveCount(2)
  await preview.getByRole('button', { name: 'Expand Components', exact: true }).click()
  await expect(preview.locator('.akaza-tree-row')).toHaveCount(4)
})

test('touch tree rows preserve nesting and separate disclosure targets from icon size', async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  })
  try {
    const page = await context.newPage()
    const preview = await open(page, 'tree')
    const rows = await preview
      .locator('.akaza-tree-row')
      .evaluateAll((es) => es.map((el) => el.getBoundingClientRect().height))
    expect(rows).toEqual([44, 44, 44, 44])
    const toggle = preview.getByRole('button', { name: 'Collapse Components', exact: true })
    await expect(toggle).toHaveCSS('width', '44px')
    await expect(toggle.locator('svg')).toHaveCSS('width', '14px')
    await toggle.tap()
    await expect(preview.locator('.akaza-tree-row')).toHaveCount(2)
  } finally {
    await context.close()
  }
})

test('intrinsic demos are centered and width-dependent controls retain a useful width', async ({
  page,
}) => {
  for (const name of ['number-field', 'select', 'calendar', 'avatar', 'toggle', 'tree']) {
    const preview = await open(page, name)
    const offset = await preview.evaluate((el) => {
      const frame = el.lastElementChild!.getBoundingClientRect()
      const control =
        el.lastElementChild!.firstElementChild!.firstElementChild!.getBoundingClientRect()
      return Math.abs((frame.left + frame.right) / 2 - (control.left + control.right) / 2)
    })
    expect(offset, name).toBeLessThan(1)
  }
  const preview = await open(page, 'slider')
  expect((await preview.locator('.akaza-slider').boundingBox())!.width).toBeGreaterThan(200)
})

test('accordion demo exposes behavior controls and uses full-width padded headers', async ({
  page,
}) => {
  const preview = await open(page, 'accordion')
  const size = preview.getByRole('combobox', { name: 'Example size', exact: true })
  const alignment = await size.evaluate((el) => {
    const text = el.querySelector('.akaza-select-value')!.getBoundingClientRect()
    const icon = el.querySelector('svg')!.getBoundingClientRect()
    return Math.abs(text.y + text.height / 2 - icon.y - icon.height / 2)
  })
  expect(alignment).toBeLessThanOrEqual(1)
  const triggers = preview.locator('.akaza-accordion-trigger')
  const gaps = await triggers.evaluateAll((elements) =>
    elements.map((el) => {
      const item = el.parentElement!.getBoundingClientRect()
      const trigger = el.getBoundingClientRect()
      const style = getComputedStyle(el)
      return {
        left: trigger.left - item.left,
        width: trigger.width - item.width,
        padding: style.paddingInlineStart,
        radius: style.borderRadius,
      }
    }),
  )
  expect(gaps[0]).toEqual({ left: 0, width: 0, padding: '16px', radius: '0px' })
  expect(gaps[1]).toEqual({ left: 0, width: 0, padding: '16px', radius: '0px' })
  await preview.getByRole('combobox', { name: 'Example type', exact: true }).click()
  await page.getByRole('option', { name: 'multiple', exact: true }).click()
  await triggers.nth(0).click()
  await triggers.nth(1).click()
  await expect(triggers.nth(0)).toHaveAttribute('aria-expanded', 'true')
  await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'true')
  await preview.getByRole('checkbox', { name: 'Disabled', exact: true }).check()
  await expect(triggers.nth(0)).toBeDisabled()
  await preview.getByRole('checkbox', { name: 'Disabled', exact: true }).uncheck()
  await preview.getByRole('checkbox', { name: 'Unmount on hide', exact: true }).check()
  await triggers.nth(0).click()
  await expect(
    preview.getByText('Yes. Copy the files, then adapt them to your application.', { exact: true }),
  ).toHaveCount(0)
})
