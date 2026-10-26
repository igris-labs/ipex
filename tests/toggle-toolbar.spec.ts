import { expect, test, type Page } from '@playwright/test'

async function open(page: Page, name: string) {
  await page.goto(`/components/${name}`)
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
  return page.getByTestId('demo-stage')
}
async function choose(page: Page, key: string, value: string) {
  await page.getByRole('combobox', { name: `Example ${key}`, exact: true }).click()
  await page.getByRole('option', { name: value, exact: true }).click()
}
async function options(page: Page) {
  await page
    .getByTestId('component-options')
    .getByRole('button', { name: 'Options and states', exact: true })
    .click()
}

test('soft Toggle has a resting tint, hover feedback, and a distinct pressed state in both themes', async ({
  page,
}) => {
  const stage = await open(page, 'toggle')
  const toggle = stage.getByRole('button', { name: 'Bold text', exact: true })
  for (const theme of ['light', 'dark']) {
    await page.evaluate(
      (value) => document.documentElement.classList.toggle('dark', value === 'dark'),
      theme,
    )
    await page.mouse.move(0, 0)
    await expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await expect
      .poll(() => toggle.evaluate((el) => getComputedStyle(el).backgroundColor))
      .not.toBe('rgba(0, 0, 0, 0)')
    const resting = await toggle.evaluate((el) => getComputedStyle(el).backgroundColor)
    await toggle.hover()
    await expect
      .poll(() => toggle.evaluate((el) => getComputedStyle(el).backgroundColor))
      .not.toBe(resting)
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')
    await expect(toggle).not.toHaveCSS('background-image', 'none')
    await toggle.click()
  }
  await choose(page, 'variant', 'outline')
  await expect(toggle).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
})

test('Toggle Group slides one indicator, resizes, supports vertical and multiple selection, and honors reduced motion', async ({
  page,
}) => {
  const stage = await open(page, 'toggle-group')
  const group = stage.locator('.akaza-toggle-group')
  const indicator = group.locator('[data-toggle-group-indicator]')
  const grid = group.getByRole('button', { name: 'Grid', exact: true })
  const list = group.getByRole('button', { name: 'List', exact: true })
  await expect(indicator).toHaveCount(1)
  const before = await indicator.boundingBox()
  await list.click()
  await expect(list).toHaveAttribute('aria-pressed', 'true')
  await expect.poll(() => indicator.evaluate((el) => el.getAnimations().length)).toBeGreaterThan(0)
  await expect.poll(async () => (await indicator.boundingBox())!.x).toBeGreaterThan(before!.x + 10)
  await expect(list).toHaveCSS('background-image', 'none')
  await expect(list).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await list.press('ArrowLeft')
  await expect(grid).toBeFocused()
  await grid.press('Space')
  await expect(grid).toHaveAttribute('aria-pressed', 'true')
  await choose(page, 'size', 'xl')
  await expect.poll(async () => (await indicator.boundingBox())!.height).toBe(40)
  await options(page)
  await choose(page, 'orientation', 'vertical')
  await list.click()
  await expect
    .poll(async () => (await indicator.boundingBox())!.y)
    .toBeGreaterThan((await grid.boundingBox())!.y + 10)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(indicator).toHaveCSS('transition-property', 'none')
  await list.click()
  await expect(indicator).toHaveCount(0)
  await choose(page, 'type', 'multiple')
  await grid.click()
  await list.click()
  await expect(grid).toHaveAttribute('aria-pressed', 'true')
  await expect(list).toHaveAttribute('aria-pressed', 'true')
  await expect(indicator).toHaveCount(0)
  await expect(grid).not.toHaveCSS('background-image', 'none')
})

test('vertical Toolbar stacks groups, stretches actions, rotates separators, and keeps native keyboard navigation', async ({
  page,
}) => {
  const stage = await open(page, 'toolbar')
  const toolbar = stage.getByRole('toolbar')
  const group = toolbar.getByRole('group', { name: 'Text style' })
  const separator = toolbar.getByRole('separator')
  await options(page)
  await choose(page, 'orientation', 'vertical')
  await expect(toolbar).toHaveCSS('flex-direction', 'column')
  await expect(group).toHaveCSS('flex-direction', 'column')
  await expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
  await expect(separator).toHaveCSS('height', '1px')
  const bold = toolbar.getByRole('button', { name: 'Bold', exact: true })
  const italic = toolbar.getByRole('button', { name: 'Italic', exact: true })
  const link = toolbar.getByRole('button', { name: 'Link', exact: true })
  const boxes = await Promise.all([bold.boundingBox(), italic.boundingBox(), link.boundingBox()])
  expect(boxes[1]!.y).toBeGreaterThan(boxes[0]!.y + boxes[0]!.height)
  expect(boxes[2]!.y).toBeGreaterThan(boxes[1]!.y + boxes[1]!.height)
  expect(boxes[0]!.width).toBeCloseTo(boxes[2]!.width, 0)
  await bold.focus()
  await bold.press('ArrowDown')
  await expect(italic).toBeFocused()
  await choose(page, 'orientation', 'horizontal')
  await expect(group).toHaveCSS('flex-direction', 'row')
  await expect(separator).toHaveCSS('width', '1px')
})
