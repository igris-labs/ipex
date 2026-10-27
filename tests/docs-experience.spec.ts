import { expect, test, type Page } from '@playwright/test'

async function ready(page: Page) {
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
}

test('explains the system and exposes distinct, rounded content navigation', async ({ page }) => {
  await page.goto('/getting-started/introduction')
  const prose = page.getByTestId('docs-prose')
  await expect(prose).toContainText('Igris Platform EXperience')
  await expect(prose).toContainText('page widths, information density')
  await expect(prose).not.toContainText('only Button')
  const sidebar = page.locator('aside').first()
  await expect(sidebar).toContainText('Design system')
  const input = sidebar.getByRole('link', { name: 'Input', exact: true })
  const button = sidebar.getByRole('link', { name: 'Button', exact: true })
  await expect(input).toHaveCSS('border-left-width', '0px')
  await expect(input).toHaveCSS('border-radius', '8px')
  await expect(input).toHaveCSS('height', '30px')
  await expect(input).toHaveCSS('padding-top', '2px')
  await expect(input).toHaveCSS('padding-bottom', '2px')
  await expect(input.locator('..')).toHaveCSS('height', '34px')
  await expect(input).toHaveCSS('padding-left', '10px')
  await expect(input).toHaveCSS('font-size', '13px')
  await expect(sidebar.getByRole('link', { name: 'Introduction', exact: true })).toHaveCSS(
    'height',
    '30px',
  )
  await expect(button.locator('.iconify')).not.toHaveAttribute(
    'class',
    (await input.locator('.iconify').getAttribute('class')) ?? '',
  )
  await sidebar.getByRole('link', { name: 'Principles', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Guides', exact: true })).toBeVisible()
})

test('landing example supports editing, review, execution, and reset on mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await ready(page)
  const name = page.getByRole('textbox', { name: 'Project name' })
  await name.fill('')
  await expect(page.getByRole('button', { name: 'Create project', exact: true })).toBeDisabled()
  await name.fill('Operations')
  await page.getByRole('tab', { name: 'Review', exact: true }).click()
  await expect(
    page.getByRole('tabpanel', { name: 'Review', exact: true }).locator('dd').first(),
  ).toHaveText('Operations')
  await page.getByRole('button', { name: 'Create project', exact: true }).click()
  await expect(
    page.getByRole('status').filter({ hasText: 'Created in this example.' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Reset example', exact: true }).click()
  await expect(name).toHaveValue('IPEX docs')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
})

test('table of contents marker spans visible headings, follows scrolling, and resizes with labels', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/getting-started/installation')
  const sections = page.getByRole('navigation', { name: 'Page sections', exact: true })
  const indicator = page.getByTestId('toc-indicator')
  const active = sections.locator('[aria-current="location"]')
  const alignment = () =>
    indicator.evaluate((el) => {
      const rows = el.parentElement!.querySelectorAll('[data-visible]')
      const first = rows[0]!.getBoundingClientRect()
      const last = rows[rows.length - 1]!.getBoundingClientRect()
      const a = el.getBoundingClientRect()
      return Math.max(Math.abs(a.top - first.top), Math.abs(a.bottom - last.bottom))
    })
  await expect(indicator).toHaveCSS('opacity', '1')
  await expect.poll(alignment).toBeLessThan(1)
  await sections.getByRole('link', { name: 'UI configuration', exact: true }).click()
  await expect(active).toHaveAttribute('href', '#ui-configuration')
  await expect.poll(() => sections.locator('[data-visible]').count()).toBeGreaterThan(1)
  await expect
    .poll(() =>
      page.evaluate(() => {
        const rows = [...document.querySelectorAll('nav[aria-label="Page sections"] a')]
        return rows.every((row) => {
          const heading = document.getElementById(row.getAttribute('href')!.slice(1))!
          const rect = heading.getBoundingClientRect()
          return row.hasAttribute('data-visible') === (rect.bottom > 64 && rect.top < innerHeight)
        })
      }),
    )
    .toBe(true)
  expect(
    await indicator.evaluate((el) =>
      el.getAnimations().map((animation) => (animation as CSSTransition).transitionProperty),
    ),
  ).toContain('transform')
  await expect.poll(alignment).toBeLessThan(1)
  await sections.evaluate((el) => {
    el.style.width = '100px'
  })
  await expect(sections.getByRole('link', { name: 'UI configuration', exact: true })).toHaveCSS(
    'height',
    '48px',
  )
  await expect.poll(alignment).toBeLessThan(1)
  await page.evaluate(() => document.getElementById('packages')!.scrollIntoView())
  await expect(active).toHaveAttribute('href', '#packages')
  await expect.poll(alignment).toBeLessThan(1)
  const light = await indicator.evaluate((el) => getComputedStyle(el).backgroundColor)
  await page.getByRole('button', { name: 'Use dark theme' }).click()
  await expect
    .poll(() => indicator.evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toEqual(light)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(indicator).toHaveCSS('transition-property', 'none')
  await page
    .locator('aside')
    .first()
    .getByRole('link', { name: 'Introduction', exact: true })
    .click()
  await expect(page.getByRole('heading', { name: 'Introduction', exact: true })).toBeVisible()
  await expect(active).toHaveAttribute('href', '#the-experience')
  await expect.poll(alignment).toBeLessThan(1)
})

test('home views and button variant pickers use the shared sliding tabs', async ({ page }) => {
  await page.goto('/')
  await ready(page)
  const home = page.getByRole('tablist', { name: 'Example view', exact: true })
  await expect(home.locator('.akaza-tab-indicator')).toHaveCSS('transition-duration', '0.18s')
  await home.getByRole('tab', { name: 'Details', exact: true }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(home.getByRole('tab', { name: 'Review', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await expect(page.getByRole('tabpanel', { name: 'Review', exact: true })).toContainText(
    'Igris Labs',
  )
  await page.goto('/components/button')
  await ready(page)
  const picker = page.getByRole('tablist', { name: 'Color preview variant', exact: true })
  await expect(picker.locator('.akaza-tab-indicator')).toHaveCSS('transition-duration', '0.18s')
  await picker.getByRole('tab', { name: 'soft', exact: true }).click()
  await expect(picker.getByRole('tab', { name: 'soft', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await expect(page.getByTestId('color-primary').filter({ visible: true })).toHaveCount(1)
})
