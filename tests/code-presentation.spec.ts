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

test('file extensions have icons in Markdown titles and source tabs, without remounting highlighted source panels', async ({
  page,
}) => {
  await open(page, '/getting-started/installation')
  for (const extension of ['ts', 'css']) {
    const icon = page.locator(`.group\\/code [data-file-extension="${extension}"]`).first()
    await expect(icon).toBeVisible()
    await expect(icon).toHaveAttribute('aria-hidden', 'true')
  }
  await open(page, '/components/button')
  const list = page.getByRole('tablist', { name: 'Component source files', exact: true })
  const vue = list.getByRole('tab', { name: 'Button.vue', exact: true })
  const ts = list.getByRole('tab', { name: 'index.ts', exact: true })
  await expect(vue.locator('[data-file-extension="vue"]')).toBeVisible()
  await expect(ts.locator('[data-file-extension="ts"]')).toBeVisible()
  const original = await page
    .getByRole('tabpanel', { name: 'Button.vue', exact: true })
    .elementHandle()
  await ts.click()
  const panel = page.getByRole('tabpanel', { name: 'index.ts', exact: true })
  await expect
    .poll(() =>
      panel
        .locator('pre')
        .evaluate((el) =>
          el
            .getAnimations()
            .flatMap((animation) => Object.keys(animation.effect!.getKeyframes()[0]!)),
        ),
    )
    .toEqual(expect.arrayContaining(['opacity', 'translate']))
  await expect(panel.locator('[data-file-extension="ts"]')).toBeVisible()
  await expect(panel).toHaveCSS('opacity', '1')
  await expect(panel).toHaveCSS('translate', 'none')
  const sourcePanels = list.locator('..').locator('.akaza-tab-panel')
  await expect(sourcePanels).toHaveCount(2)
  await expect(sourcePanels.first()).toBeHidden()
  await expect(sourcePanels.first()).toHaveAttribute('aria-hidden', 'true')
  expect(await original!.evaluate((el) => el.isConnected)).toBe(true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await vue.click()
  const reduced = page.getByRole('tabpanel', { name: 'Button.vue', exact: true })
  await expect(reduced).toHaveCSS('translate', 'none')
  expect(await reduced.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0)
  expect(await original!.evaluate((el) => el.isConnected)).toBe(true)
})

test('retained panels and package-manager commands slide-fade without moving their tab strip', async ({
  page,
}) => {
  await open(page, '/getting-started/installation')
  const list = page.getByRole('tablist', { name: 'Package manager', exact: true }).first()
  const position = await list.boundingBox()
  await list.getByRole('tab', { name: 'npm', exact: true }).click()
  const panel = page.getByRole('tabpanel', { name: 'npm', exact: true }).first()
  await expect
    .poll(() =>
      panel
        .locator('pre')
        .evaluate((el) =>
          el
            .getAnimations()
            .flatMap((animation) => Object.keys(animation.effect!.getKeyframes()[0]!)),
        ),
    )
    .toEqual(expect.arrayContaining(['opacity', 'translate']))
  await expect(panel).toHaveCSS('opacity', '1')
  expect((await list.boundingBox())!.y).toBe(position!.y)
  const hidden = list.locator('..').locator('.akaza-tab-panel[data-akaza-state="inactive"]')
  await expect(hidden).toHaveCount(3)
  expect(await hidden.evaluateAll((els) => els.every((el) => (el as HTMLElement).inert))).toBe(true)
})

test('tab keyframes never paint overlapping panels, including rapid switches', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await open(page, '/getting-started/installation')
  const list = page.getByRole('tablist', { name: 'Package manager', exact: true }).first()
  await list.scrollIntoViewIfNeeded()
  const samples = await list.evaluate(async (el) => {
    const tabs = el.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    const panels = el.parentElement!.querySelectorAll<HTMLElement>('.akaza-tab-panel')
    const visibleCounts: number[] = []
    const frameCounts: number[] = []
    const heights: number[] = []
    for (const index of [1, 2, 0]) {
      tabs[index]!.click()
      const start = performance.now()
      const duration = index === 0 ? 300 : 40
      while (performance.now() - start < duration) {
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
        visibleCounts.push(
          [...panels].filter((panel) => {
            const style = getComputedStyle(panel.querySelector('pre')!)
            return getComputedStyle(panel).visibility === 'visible' && Number(style.opacity) > 0.001
          }).length,
        )
        frameCounts.push(
          [...panels].filter((panel) => {
            const style = getComputedStyle(panel)
            return style.visibility === 'visible' && Number(style.opacity) === 1
          }).length,
        )
        heights.push(el.parentElement!.getBoundingClientRect().height)
      }
    }
    return {
      maximumVisible: Math.max(...visibleCounts),
      minimumFrames: Math.min(...frameCounts),
      maximumFrames: Math.max(...frameCounts),
      heightChange: Math.max(...heights) - Math.min(...heights),
    }
  })
  expect(samples.maximumVisible).toBe(1)
  expect(samples.minimumFrames).toBe(1)
  expect(samples.maximumFrames).toBe(1)
  await expect(list.getByRole('tab', { name: 'pnpm', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await expect(page.getByRole('tabpanel', { name: 'pnpm', exact: true }).first()).toHaveCSS(
    'opacity',
    '1',
  )
  expect(samples.heightChange).toBeLessThan(1)
  await list.getByRole('tab', { name: 'yarn', exact: true }).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const panels = list.locator('..').locator('.akaza-tab-panel')
  await expect
    .poll(() =>
      panels.evaluateAll((els) =>
        els.reduce((count, el) => count + el.getAnimations({ subtree: true }).length, 0),
      ),
    )
    .toBe(0)
  await expect(page.getByRole('tabpanel', { name: 'yarn', exact: true }).first()).toHaveCSS(
    'opacity',
    '1',
  )
  expect(
    await panels.evaluateAll((els) =>
      els.every((el) => (el as HTMLElement).style.visibility === ''),
    ),
  ).toBe(true)
  expect(errors).toEqual([])
})
