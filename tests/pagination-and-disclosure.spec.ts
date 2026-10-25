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

test('options hover spans the connected preview and horizontal accordion changes layout and keyboard navigation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await open(page, 'input')
  const options = page.getByTestId('component-options')
  const trigger = options.getByRole('button', { name: 'Options and states', exact: true })
  await trigger.hover()
  const paint = await trigger.evaluate((el) => {
    const row = el.getBoundingClientRect()
    const preview = el.closest('[data-testid="component-preview"]')!.getBoundingClientRect()
    return {
      inset: row.left - preview.left,
      right: preview.right - row.right,
      background: getComputedStyle(el).backgroundColor,
    }
  })
  expect(paint.inset).toBe(1)
  expect(paint.right).toBe(1)
  expect(paint.background).not.toBe('rgba(0, 0, 0, 0)')
  const demo = await open(page, 'accordion')
  await page.getByRole('combobox', { name: 'Example orientation', exact: true }).click()
  await page.getByRole('option', { name: 'horizontal', exact: true }).click()
  await expect(demo.locator('.akaza-accordion')).toHaveAttribute(
    'data-akaza-orientation',
    'horizontal',
  )
  const items = await demo.locator('.akaza-accordion-item').evaluateAll((nodes) =>
    nodes.map((el) => ({
      left: el.getBoundingClientRect().left,
      top: el.getBoundingClientRect().top,
    })),
  )
  expect(items[1]!.left).toBeGreaterThan(items[0]!.left)
  expect(items[0]!.top).toBe(items[1]!.top)
  const headers = demo.locator('.akaza-accordion-trigger')
  await headers.first().focus()
  await headers.first().press('ArrowRight')
  await expect(headers.nth(1)).toBeFocused()
  await headers.nth(1).press('Space')
  await expect(headers.nth(1)).toHaveAttribute('aria-expanded', 'true')
})

test('pagination slides numbers while keeping the centered selection marker stable', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const demo = await open(page, 'pagination')
  const nav = demo.getByRole('navigation')
  await nav.getByRole('button', { name: 'Go to page 3', exact: true }).click()
  await page.waitForTimeout(200)
  const indicator = nav.locator('[data-pagination-indicator]')
  const previous = await indicator.boundingBox()
  await nav.getByRole('button', { name: 'Go to page 4', exact: true }).click()
  const samples = await nav.evaluate(async (el) => {
    const samples: { marker: number; number: number }[] = []
    const animations = el
      .getAnimations({ subtree: true })
      .filter(
        (animation) =>
          animation.effect instanceof KeyframeEffect &&
          animation.effect.getKeyframes().some((frame) => 'transform' in frame),
      ).length
    for (let i = 0; i < 12; i++) {
      await new Promise(requestAnimationFrame)
      samples.push({
        marker: el.querySelector('[data-pagination-indicator]')!.getBoundingClientRect().left,
        number: el.querySelector('[aria-current="page"]')!.getBoundingClientRect().left,
      })
    }
    return { samples, animations }
  })
  expect(samples.animations).toBeGreaterThan(0)
  for (const sample of samples.samples)
    expect(Math.abs(sample.marker - previous!.x)).toBeLessThan(0.5)
  expect(samples.samples[0]!.number).toBeGreaterThan(samples.samples.at(-1)!.number + 2)
  await expect(nav.locator('[aria-current="page"]')).toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0)',
  )
  for (let i = 0; i < 3; i++)
    await nav.getByRole('button', { name: 'Next page', exact: true }).click()
  await expect(nav).toHaveAttribute('data-akaza-page', '7')
  await page.waitForTimeout(200)
  const aligned = await nav.evaluate((el) =>
    Math.abs(
      el.querySelector('[data-pagination-indicator]')!.getBoundingClientRect().left -
        el.querySelector('[aria-current="page"]')!.getBoundingClientRect().left,
    ),
  )
  expect(aligned).toBeLessThan(0.5)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await nav.getByRole('button', { name: 'Next page', exact: true }).click()
  expect(await nav.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0)
})

test('pagination coordinates all five sizes and table footers use the same controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const demo = await open(page, 'pagination')
  const sizes = [
    ['xs', 24, 12, 5],
    ['sm', 28, 14, 6],
    ['md', 32, 16, 8],
    ['lg', 36, 18, 10],
    ['xl', 40, 20, 12],
  ] as const
  for (const [size, height, icon, radius] of sizes) {
    await page.getByRole('combobox', { name: 'Example size', exact: true }).click()
    await page.getByRole('option', { name: size, exact: true }).click()
    const current = demo.locator('[aria-current="page"]')
    await expect(current).toHaveCSS('height', `${height}px`)
    await expect(current).toHaveCSS('width', `${height}px`)
    await expect(current).toHaveCSS('border-radius', `${radius}px`)
    await expect(
      demo.getByRole('button', { name: 'Next page', exact: true }).locator('svg'),
    ).toHaveCSS('width', `${icon}px`)
  }
  await open(page, 'data-table')
  const footer = page.locator('.akaza-data-table-pagination')
  await expect(footer.locator('[data-pagination-indicator]')).toBeVisible()
  await expect(footer.locator('[aria-current="page"]')).toHaveCSS('height', '32px')
  await expect(
    footer.getByRole('button', { name: 'Next page', exact: true }).locator('svg'),
  ).toHaveCSS('width', '16px')
  await footer.getByRole('button', { name: 'Next page', exact: true }).click()
  await expect(footer.locator('nav')).toHaveAttribute('data-akaza-page', '2')
  await expect(
    page.getByRole('table', { name: 'Example projects', exact: true }).nth(1),
  ).toContainText('Lynx')
})

test('touch pagination fits and preserves usable targets', async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  })
  try {
    const page = await context.newPage()
    const demo = await open(page, 'pagination')
    await expect(demo.locator('[aria-current="page"]')).toHaveCSS('height', '44px')
    const bounds = await demo
      .getByRole('navigation')
      .evaluate((el) => ({ client: el.clientWidth, scroll: el.scrollWidth }))
    expect(bounds.scroll).toBeLessThanOrEqual(bounds.client)
    await demo.getByRole('button', { name: 'Next page', exact: true }).tap()
    await expect(demo.getByRole('navigation')).toHaveAttribute('data-akaza-page', '2')
  } finally {
    await context.close()
  }
})

test('uncontrolled pagination preserves cancellation, custom slots, links, and keyboard activation', async ({
  page,
}) => {
  await open(page, 'pagination')
  await page.evaluate(async () => {
    const vueUrl = performance
      .getEntriesByType('resource')
      .find((entry) => entry.name.includes('vue.runtime.esm-bundler.js'))!.name
    const { createApp, h } = await import(vueUrl)
    const source = '/_nuxt/components/ui/pagination/index.ts'
    const { Pagination } = await import(source)
    const host = document.createElement('div')
    host.dataset.testid = 'pagination-fixture'
    document.body.append(host)
    const app = createApp({
      render: () =>
        h(
          Pagination,
          {
            total: 50,
            showEdges: true,
            showFirstLast: true,
            ariaLabel: 'Fixture pages',
            'onValue-change': (next: number, details: { cancel: () => void }) => {
              if (next === 4) details.cancel()
            },
          },
          {
            previous: () => h('span', 'Back'),
            state: ({ page, pageCount }: { page: number; pageCount: number }) =>
              h('p', { 'data-testid': 'fixture-state' }, `${page}/${pageCount}`),
          },
        ),
    })
    app.mount(host)
    const linkHost = document.createElement('div')
    linkHost.dataset.testid = 'pagination-link-fixture'
    document.body.append(linkHost)
    createApp({
      render: () =>
        h(Pagination, {
          total: 50,
          disabled: true,
          getPageHref: (next: number) => `/projects?page=${next}`,
          ariaLabel: 'Linked pages',
        }),
    }).mount(linkHost)
  })
  const fixture = page.getByTestId('pagination-fixture')
  await expect(fixture.getByRole('button', { name: 'Previous page', exact: true })).toHaveText(
    'Back',
  )
  await fixture.getByRole('button', { name: 'Go to page 3', exact: true }).click()
  await expect(fixture.locator('nav')).toHaveAttribute('data-akaza-page', '3')
  await expect(fixture.getByTestId('fixture-state')).toHaveText('3/5')
  await fixture.getByRole('button', { name: 'Go to page 4', exact: true }).click()
  await expect(fixture.locator('nav')).toHaveAttribute('data-akaza-page', '3')
  await fixture.getByRole('button', { name: 'Last page', exact: true }).press('Space')
  await expect(fixture.locator('nav')).toHaveAttribute('data-akaza-page', '5')
  await expect(fixture.getByRole('button', { name: 'Next page', exact: true })).toBeDisabled()
  const links = page.getByTestId('pagination-link-fixture')
  await expect(links.getByRole('link', { name: 'Go to page 2', exact: true })).toHaveAttribute(
    'href',
    '/projects?page=2',
  )
  await expect(links.getByRole('link', { name: 'Go to page 2', exact: true })).toHaveAttribute(
    'aria-disabled',
    'true',
  )
})
