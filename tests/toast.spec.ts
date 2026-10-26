import { expect, test, type Page } from '@playwright/test'

async function open(page: Page) {
  await page.goto('/components/toast')
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
  return page.getByTestId('demo-stage')
}
const current = (page: Page) => page.locator('.akaza-toast:not(.akaza-toast-leave-active)')
async function choose(page: Page, key: string, value: string) {
  await page.getByRole('combobox', { name: `Example ${key}`, exact: true }).click()
  await page.getByRole('option', { name: value, exact: true }).click()
}
async function options(page: Page) {
  const trigger = page
    .getByTestId('component-options')
    .getByRole('button', { name: 'Options and states', exact: true })
  if ((await trigger.getAttribute('aria-expanded')) !== 'true') await trigger.click()
}
async function persistent(page: Page) {
  const duration = page.getByRole('spinbutton', { name: 'Toast duration', exact: true })
  await duration.fill('0')
  await duration.press('Enter')
}
async function clear(page: Page) {
  await page
    .getByTestId('demo-stage')
    .getByRole('button', { name: 'Dismiss all', exact: true })
    .click()
  await expect(page.locator('.akaza-toast')).toHaveCount(0)
}

test('toast card has coherent sizes, readable content, and functional close controls', async ({
  page,
}) => {
  const stage = await open(page)
  await persistent(page)
  for (const [size, padding, font, icon] of [
    ['xs', 8, 12, 12],
    ['sm', 10, 13, 14],
    ['md', 12, 14, 16],
    ['lg', 14, 14, 18],
    ['xl', 16, 16, 20],
  ] as const) {
    await choose(page, 'size', size)
    await stage.getByRole('button', { name: 'Show notification', exact: true }).click()
    const toast = current(page)
    await expect(toast).toHaveCount(1)
    await expect(toast).toHaveAttribute('role', 'status')
    await expect(toast).toHaveAttribute('aria-live', 'polite')
    await expect(toast).toHaveCSS('padding', `${padding}px`)
    await expect(toast.locator('.akaza-toast-title')).toHaveCSS('font-size', `${font}px`)
    await expect(toast.locator('svg').first()).toHaveCSS('width', `${icon}px`)
    const title = await toast.locator('.akaza-toast-title').boundingBox()
    const close = await toast
      .getByRole('button', { name: 'Dismiss notification', exact: true })
      .boundingBox()
    expect(close!.x - title!.x - title!.width).toBeGreaterThanOrEqual(8)
    await toast.getByRole('button', { name: 'Dismiss notification', exact: true }).click()
    await expect(page.locator('.akaza-toast')).toHaveCount(0)
  }
})

test('all six toast positions respect viewport edges and selected props', async ({ page }) => {
  const stage = await open(page)
  await persistent(page)
  await options(page)
  for (const position of [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]) {
    await choose(page, 'position', position)
    await stage.getByRole('button', { name: 'Show notification', exact: true }).click()
    const viewport = page.locator('.akaza-toast-viewport')
    await expect(viewport).toHaveAttribute('data-akaza-side', position.split('-')[0]!)
    await expect
      .poll(async () => {
        const box = await current(page).boundingBox()
        const [side, align] = position.split('-')
        return Math.max(
          Math.abs(side === 'top' ? box!.y - 16 : 720 - box!.y - box!.height - 16),
          Math.abs(
            align === 'left'
              ? box!.x - 16
              : align === 'right'
                ? 1280 - box!.x - box!.width - 16
                : box!.x + box!.width / 2 - 640,
          ),
        )
      })
      .toBeLessThan(1)
    await clear(page)
  }
})

test('toast types retain semantic icons and independent live-region priorities', async ({
  page,
}) => {
  const stage = await open(page)
  await persistent(page)
  for (const [label, type, role] of [
    ['Success', 'success', 'status'],
    ['Info', 'info', 'status'],
    ['Warning', 'warning', 'status'],
    ['Error', 'error', 'alert'],
    ['Alert', 'alert', 'alert'],
  ]) {
    await stage.getByRole('button', { name: label!, exact: true }).click()
    await expect(current(page)).toHaveAttribute('data-akaza-type', type!)
    await expect(current(page)).toHaveAttribute('role', role!)
    await expect(current(page).locator('svg').first()).toHaveAttribute('data-type', type!)
    await clear(page)
  }
})

test('mixed-height stacks expand without overlap and remain open while moving between cards', async ({
  page,
}) => {
  const stage = await open(page)
  await persistent(page)
  await stage.getByRole('button', { name: 'Show stack', exact: true }).click()
  const viewport = page.locator('.akaza-toast-viewport')
  await expect(current(page)).toHaveCount(3)
  await expect(viewport).toHaveCSS('display', 'grid')
  await expect(viewport).toHaveAttribute('data-akaza-expanded', 'false')
  await viewport.hover()
  await expect(viewport).toHaveAttribute('data-akaza-expanded', 'true')
  await expect
    .poll(async () => {
      const boxes = await current(page).evaluateAll((els) =>
        els.map((el) => el.getBoundingClientRect()).sort((a, b) => a.top - b.top),
      )
      return Math.min(...boxes.slice(1).map((box, i) => box.top - boxes[i]!.bottom))
    })
    .toBeGreaterThanOrEqual(11)
  const boxes = await current(page).evaluateAll((els) =>
    els.map((el) => el.getBoundingClientRect().toJSON()).sort((a, b) => a.top - b.top),
  )
  await page.mouse.move(boxes[1]!.x + 30, boxes[1]!.bottom + 5)
  await expect(viewport).toHaveAttribute('data-akaza-expanded', 'true')
  await current(page).filter({ hasText: 'Comment received' }).hover()
  await expect(viewport).toHaveAttribute('data-akaza-expanded', 'true')
  await page.keyboard.press('F8')
  await expect(viewport).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(current(page)).toHaveCount(2)
  await clear(page)
})

test('undo and async retry actions show busy feedback and recover after errors', async ({
  page,
}) => {
  const stage = await open(page)
  await stage.getByRole('button', { name: 'Undo action', exact: true }).click()
  await current(page).getByRole('button', { name: 'Restore archived project', exact: true }).click()
  await expect(stage.locator('p[role="status"]')).toHaveText('Project restored.')
  await expect(current(page)).toHaveCount(0)
  await stage.getByRole('checkbox', { name: 'Simulate failure', exact: true }).check()
  await stage.getByRole('button', { name: 'Async retry', exact: true }).click()
  await current(page).getByRole('button', { name: 'Retry connection', exact: true }).click()
  await expect(
    current(page).getByRole('button', { name: 'Retry connection', exact: true }),
  ).toBeDisabled()
  await expect(
    current(page).getByRole('button', { name: 'Retry connection', exact: true }),
  ).toHaveAttribute('aria-busy', 'true')
  await expect(current(page)).toContainText('Still unable to connect')
  await expect(
    current(page).getByRole('button', { name: 'Retry connection', exact: true }),
  ).toBeEnabled()
  await stage.getByRole('checkbox', { name: 'Simulate failure', exact: true }).uncheck()
  await current(page).getByRole('button', { name: 'Retry connection', exact: true }).click()
  await expect(stage.locator('p[role="status"]')).toHaveText('Connection restored.')
  await expect(current(page)).toHaveCount(0)
})

test('promise toasts settle into success or error and disappear on route changes', async ({
  page,
}) => {
  const stage = await open(page)
  await persistent(page)
  await stage.getByRole('button', { name: 'Promise update', exact: true }).click()
  await expect(current(page)).toContainText('Saving project')
  await expect(current(page).locator('svg').first()).toHaveCSS('animation-name', 'spin')
  await expect(current(page)).toContainText('Project synced')
  await expect(current(page)).toHaveCount(1)
  await clear(page)
  await stage.getByRole('checkbox', { name: 'Simulate failure', exact: true }).check()
  await stage.getByRole('button', { name: 'Promise update', exact: true }).click()
  await expect(current(page)).toContainText('Sync failed')
  await expect(current(page)).toHaveAttribute('role', 'alert')
  await page
    .getByRole('navigation', { name: 'Documentation', exact: true })
    .getByRole('link', { name: 'Introduction', exact: true })
    .click()
  await expect(page.locator('.akaza-toast-viewport')).toHaveCount(0)
})

test('toast duration pauses on hover and entrance/exit motion respects reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const stage = await open(page)
  const duration = stage.getByRole('spinbutton', { name: 'Toast duration', exact: true })
  await duration.fill('1000')
  await duration.press('Enter')
  await stage.getByRole('button', { name: 'Show notification', exact: true }).click()
  await expect
    .poll(() =>
      current(page).evaluate((el) =>
        el.getAnimations().map((animation) => animation.effect?.getTiming().duration),
      ),
    )
    .toContain(500)
  await current(page).hover()
  await page.waitForTimeout(1200)
  await expect(current(page)).toHaveCount(1)
  await page.mouse.move(300, 50)
  await expect(page.locator('.akaza-toast')).toHaveCount(0)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await stage.getByRole('button', { name: 'Show notification', exact: true }).click()
  await expect(current(page)).toHaveCSS('transition-property', 'none')
  await clear(page)
})

test('mobile dark toasts fit the viewport, preserve touch targets, and swipe away', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    colorScheme: 'dark',
  })
  const page = await context.newPage()
  try {
    await page.addInitScript(() => localStorage.setItem('nuxt-color-mode', 'dark'))
    const stage = await open(page)
    await persistent(page)
    await stage.getByRole('button', { name: 'Error', exact: true }).tap()
    const toast = current(page)
    await expect(toast).toBeVisible()
    const box = await toast.boundingBox()
    expect(box!.x).toBeGreaterThanOrEqual(16)
    expect(box!.x + box!.width).toBeLessThanOrEqual(374)
    const close = await toast
      .getByRole('button', { name: 'Dismiss notification', exact: true })
      .boundingBox()
    expect(close!.width).toBeGreaterThanOrEqual(44)
    expect(close!.height).toBeGreaterThanOrEqual(44)
    const text = await toast.locator('.akaza-toast-description').boundingBox()
    expect(text!.x + text!.width).toBeLessThanOrEqual(close!.x)
    await toast.getByRole('button', { name: 'Dismiss notification', exact: true }).tap()
    await expect(page.locator('.akaza-toast')).toHaveCount(0)
    await stage.getByRole('button', { name: 'Show notification', exact: true }).tap()
    await expect(current(page)).toBeVisible()
    await current(page).hover()
    const swipe = await current(page).boundingBox()
    await page.mouse.move(swipe!.x + 60, swipe!.y + 30)
    await page.mouse.down()
    await page.mouse.move(swipe!.x + 180, swipe!.y + 30, { steps: 8 })
    await page.mouse.up()
    await expect(page.locator('.akaza-toast')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
  } finally {
    await context.close()
  }
})

test('notification limit makes older cards inert and long descriptions remain contained', async ({
  page,
}) => {
  const stage = await open(page)
  await persistent(page)
  await options(page)
  const limit = page.getByRole('spinbutton', { name: 'Example limit', exact: true })
  await limit.fill('2')
  await limit.press('Enter')
  await stage.getByRole('button', { name: 'Show stack', exact: true }).click()
  await expect(current(page)).toHaveCount(3)
  const hidden = page.locator('.akaza-toast[data-akaza-limited]')
  await expect(hidden).toHaveCount(1)
  await expect(hidden).toHaveAttribute('inert', '')
  await expect(hidden).toHaveAttribute('aria-hidden', 'true')
  await clear(page)
  await stage.getByRole('button', { name: 'Show notification', exact: true }).click()
  await current(page)
    .locator('.akaza-toast-description')
    .evaluate((el) => {
      el.textContent = 'A long notification that remains readable. '.repeat(100)
    })
  await expect
    .poll(async () => {
      const box = await current(page).boundingBox()
      return box!.y >= 16 && box!.y + box!.height <= 704
    })
    .toBe(true)
  const scroll = await current(page)
    .locator(':scope > div')
    .evaluate((el) => ({
      height: el.clientHeight,
      content: el.scrollHeight,
      overflow: getComputedStyle(el).overflowY,
    }))
  expect(scroll.overflow).toBe('auto')
  expect(scroll.content).toBeGreaterThan(scroll.height)
})

test('toast motion matches the Akaza playground curves and settling timings', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const stage = await open(page)
  await persistent(page)
  await stage.getByRole('button', { name: 'Show stack', exact: true }).click()
  const viewport = page.locator('.akaza-toast-viewport')
  await expect(viewport).toHaveAttribute('data-akaza-expanded', 'false')
  const comment = current(page).filter({ hasText: 'Comment received' })
  await expect(comment).toHaveCSS('--akaza-toast-duration', '500ms')
  await expect(comment).toHaveCSS('--akaza-toast-height-duration', '150ms')
  await expect(comment).toHaveCSS('--akaza-toast-content-duration', '250ms')
  expect(await comment.evaluate((el) => getComputedStyle(el).transitionTimingFunction)).toContain(
    'cubic-bezier(0.22, 1, 0.36, 1)',
  )
  await expect
    .poll(() =>
      comment.evaluate((el) => parseFloat(el.style.getPropertyValue('--ipex-toast-height'))),
    )
    .toBeGreaterThan(0)
  await viewport.hover()
  await expect
    .poll(() =>
      comment.evaluate((el) =>
        el
          .getAnimations()
          .some(
            (animation) =>
              animation instanceof CSSTransition &&
              animation.transitionProperty === 'height' &&
              animation.effect?.getTiming().duration === 150,
          ),
      ),
    )
    .toBe(true)
  const intrinsic = await comment.evaluate((el) =>
    parseFloat(el.style.getPropertyValue('--ipex-toast-height')),
  )
  await expect
    .poll(() => comment.evaluate((el) => parseFloat(getComputedStyle(el).height)))
    .toBeCloseTo(intrinsic, 0)
  await clear(page)
  await stage.getByRole('button', { name: 'Show notification', exact: true }).click()
  const toast = current(page)
  await toast.hover()
  const box = await toast.boundingBox()
  await page.mouse.move(box!.x + 70, box!.y + 30)
  await page.mouse.down()
  await page.mouse.move(box!.x + 95, box!.y + 30, { steps: 4 })
  await page.mouse.up()
  await expect(toast).toHaveAttribute('data-akaza-swipe', 'cancel')
  await expect(toast).toHaveCSS('transition-timing-function', 'cubic-bezier(0.22, 1, 0.36, 1)')
  await expect(toast).toHaveCount(1)
  await clear(page)
})
