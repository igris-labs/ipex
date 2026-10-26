import { expect, test, type Page } from '@playwright/test'

async function ready(page: Page, path = '/components/button') {
  await page.goto(path)
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
}

test('docs search opens from the header, groups pages, and restores focus', async ({ page }) => {
  await ready(page)
  const trigger = page.getByRole('button', { name: 'Search documentation', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Search documentation', exact: true })
  await expect(dialog).toBeVisible()
  const input = dialog.getByRole('combobox', { name: 'Search documentation', exact: true })
  await expect(input).toBeFocused()
  await expect(dialog.getByText('Getting started', { exact: true })).toBeVisible()
  await expect(dialog.getByText('Components', { exact: true })).toBeVisible()
  const before = await input.getAttribute('aria-activedescendant')
  await input.press('ArrowDown')
  await expect(input).toBeFocused()
  expect(await input.getAttribute('aria-activedescendant')).not.toBe(before)
  const active = await input.getAttribute('aria-activedescendant')
  await expect(page.locator(`[id="${active}"]`)).toHaveAttribute('aria-selected', 'true')
  await input.fill('Button')
  await expect(dialog.getByRole('option').first()).toContainText('Button')
  await input.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

test('keyboard search finds page text and opens a section anchor', async ({ page }) => {
  await ready(page)
  await page.keyboard.press('Control+k')
  const dialog = page.getByRole('dialog', { name: 'Search documentation', exact: true })
  const input = dialog.getByRole('combobox', { name: 'Search documentation', exact: true })
  await input.fill('Node.js 22.19')
  await expect(dialog.getByRole('option').filter({ hasText: 'Requirements' })).toBeVisible()
  await input.press('Enter')
  await expect(page).toHaveURL(/\/getting-started\/installation#requirements$/)
  await expect(dialog).toHaveCount(0)
})

test('search handles no results, repeated shortcuts, and pointer navigation from home', async ({
  page,
}) => {
  await ready(page, '/')
  await page.keyboard.press('Meta+k')
  const dialog = page.getByRole('dialog', { name: 'Search documentation', exact: true })
  const input = dialog.getByRole('combobox', { name: 'Search documentation', exact: true })
  await input.fill('zzzz-no-matching-ipex-page')
  await expect(dialog.getByRole('status')).toHaveText('No matching pages or sections')
  await input.press('ArrowDown')
  await input.press('Enter')
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Meta+k')
  await expect(dialog).toHaveCount(0)
  await page.getByRole('button', { name: 'Search documentation', exact: true }).click()
  await expect(input).toHaveValue('')
  await input.fill('Accordion')
  await dialog
    .getByRole('option')
    .filter({ hasText: /^Accordion/ })
    .first()
    .click()
  await expect(page).toHaveURL(/\/components\/accordion$/)
})

test('search fits narrow screens in dark mode and traps keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await page.addInitScript(() => localStorage.setItem('nuxt-color-mode', 'dark'))
  await ready(page)
  await page.getByRole('button', { name: 'Search documentation', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Search documentation', exact: true })
  await expect(dialog).toBeVisible()
  const box = await dialog.boundingBox()
  expect(box!.x).toBeGreaterThanOrEqual(16)
  expect(box!.x + box!.width).toBeLessThanOrEqual(374)
  expect(box!.y + box!.height).toBeLessThanOrEqual(844)
  expect(Math.abs(box!.y + box!.height / 2 - 422)).toBeLessThan(1)
  await page.keyboard.press('Shift+Tab')
  expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
})

test('search resizes from the bottom and shows page icons for page and section results', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await ready(page)
  await page.getByRole('button', { name: 'Search documentation', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Search documentation', exact: true })
  const input = dialog.getByRole('combobox', { name: 'Search documentation', exact: true })
  await expect(dialog).toHaveCSS('transform', 'none')
  const full = await dialog.boundingBox()
  await input.fill('Node.js 22.19')
  const requirements = dialog.getByRole('option').filter({ hasText: 'Requirements' })
  await expect(requirements).toBeVisible()
  const sectionIcon = requirements.locator('svg')
  await expect(sectionIcon).toBeVisible()
  const sectionShape = await sectionIcon.innerHTML()
  await expect(sectionIcon).toHaveCSS('width', '16px')
  await expect(sectionIcon).toHaveCSS('height', '16px')
  const compact = await dialog.boundingBox()
  expect(Math.abs(compact!.y - full!.y)).toBeLessThan(1)
  expect(compact!.height).toBeLessThan(full!.height)
  await input.fill('Button')
  const pageIcon = dialog.getByRole('option').first().locator('svg')
  await expect(pageIcon).toBeVisible()
  expect(await pageIcon.innerHTML()).not.toBe(sectionShape)
  expect(Math.abs((await dialog.boundingBox())!.y - full!.y)).toBeLessThan(1)
  await input.fill('')
  await expect.poll(async () => (await dialog.boundingBox())!.height).toBeCloseTo(full!.height, 0)
  expect(Math.abs((await dialog.boundingBox())!.y - full!.y)).toBeLessThan(1)
  await page.setViewportSize({ width: 640, height: 360 })
  await expect
    .poll(async () => {
      const box = await dialog.boundingBox()
      return box!.y >= 16 && box!.y + box!.height <= 344
    })
    .toBe(true)
})
