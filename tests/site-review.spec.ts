import { readdirSync, readFileSync } from 'node:fs'

import { expect, test, type Page } from '@playwright/test'

async function ready(page: Page) {
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
}

test('every component guide has demos and source, installation, then API', () => {
  for (const file of readdirSync('content/3.components').filter((name) => name.endsWith('.md'))) {
    const source = readFileSync(`content/3.components/${file}`, 'utf8')
    expect(
      [...source.matchAll(/^## (.+)$/gm)].map((match) => match[1]),
      file,
    ).toEqual(['Demos', 'Installation', 'API'])
    expect(source.indexOf('```vue'), file).toBeLessThan(source.indexOf('## Installation'))
    expect(
      source.slice(source.indexOf('## Installation'), source.indexOf('## API')),
      file,
    ).toContain(`::component-source{name="${file.replace('.md', '')}"}`)
    expect(source, file).not.toMatch(/Akaza playground|earlier Nuxt UI|as discussed/)
  }
})

for (const width of [1440, 768, 390]) {
  test(`landing and header flyouts work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error' && message.text().includes('Hydration'))
        errors.push(message.text())
    })
    await page.goto('/')
    await ready(page)
    await expect(page.getByRole('banner')).toHaveCSS('height', '56px')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'The foundation for your design system.',
    )
    const nav = page
      .getByRole('navigation', { name: 'Main navigation', exact: true })
      .filter({ visible: true })
    await nav
      .getByRole('button', { name: width >= 768 ? 'Documentation' : 'Menu', exact: true })
      .click()
    const install = page
      .locator('.akaza-navigation-menu-content')
      .getByRole('link', { name: /^Installation/ })
    await expect(install).toBeVisible()
    const gap = () =>
      install.evaluate((el) => {
        const content = el.closest('.akaza-navigation-menu-content')!.getBoundingClientRect()
        const trigger = document
          .querySelector('.akaza-navigation-menu-trigger[aria-expanded="true"]')!
          .getBoundingClientRect()
        return content.top - trigger.bottom
      })
    await expect.poll(gap).toBeCloseTo(2, 0)
    await install.press('Escape')
    await expect(
      nav.getByRole('button', { name: width >= 768 ? 'Documentation' : 'Menu', exact: true }),
    ).toBeFocused()
    await nav
      .getByRole('button', { name: width >= 768 ? 'Documentation' : 'Menu', exact: true })
      .press('Enter')
    await install.click()
    await expect(page).toHaveURL(/getting-started\/installation$/)
    await expect(page.getByRole('banner')).toHaveCSS('height', '56px')
    await expect(
      page.getByRole('heading', { name: 'Folder structure', exact: true }),
    ).toBeAttached()
    await expect(page.getByTestId('docs-prose')).toContainText('app/')
    await page.goto('/')
    await ready(page)
    const footer = page.getByRole('contentinfo')
    await expect(footer.getByRole('navigation', { name: 'Footer navigation' })).toBeAttached()
    await expect(footer.getByRole('link', { name: 'Contribution guidelines' })).toBeAttached()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width,
    )
    await page.getByRole('textbox', { name: 'Project name' }).scrollIntoViewIfNeeded()
    await expect(page.getByRole('textbox', { name: 'Project name' })).toHaveCSS('height', '32px')
    expect(errors).toEqual([])
  })
}

test('core installation and focused demo source remain copyable', async ({ page }) => {
  await page.goto('/components/tree')
  await ready(page)
  const headings = page.getByTestId('docs-prose').getByRole('heading', { level: 2 })
  await expect(headings).toHaveText([/#?Demos/, /#?Installation/, /#?API/])
  const example = page.locator('[data-example-source]').first()
  await example.getByRole('button').click()
  await expect(example.locator('pre')).toContainText('selectionMode')
  await page.getByRole('tab', { name: 'index.ts', exact: true }).click()
  await expect(page.getByRole('tabpanel', { name: 'index.ts', exact: true })).toContainText(
    'treeVariants',
  )
  await expect(page.getByRole('heading', { name: 'Props', exact: true })).toHaveAttribute(
    'id',
    'props',
  )
})

test('landing gallery controls work together without shifting the page', async ({ page }) => {
  await page.goto('/')
  await ready(page)
  const showcase = page.getByTestId('landing-showcase')
  await showcase.getByRole('button', { name: 'Continue', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'Project preview', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Done', exact: true }).click()
  await expect(showcase.getByRole('button', { name: 'Continue', exact: true })).toBeFocused()
  const checklist = showcase
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Setup checklist', exact: true }) })
  await expect(checklist.getByRole('progressbar')).toHaveAttribute('aria-valuenow', /66/)
  await checklist.getByRole('checkbox', { name: 'Install a component', exact: true }).check()
  await expect(checklist.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  await showcase.getByRole('button', { name: 'Save preferences', exact: true }).click()
  await expect(
    showcase.getByRole('status').filter({ hasText: 'Preferences saved in this example.' }),
  ).toBeVisible()
  await showcase.getByRole('button', { name: 'Do I own the source?', exact: true }).click()
  await expect(
    showcase.getByText('Yes. Copy the component files into your project and edit them there.'),
  ).toBeVisible()
  const tags = showcase.getByRole('textbox', { name: 'Project labels', exact: true })
  await tags.fill('Components')
  await tags.press('Enter')
  await expect(showcase.locator('.akaza-tags-input-item')).toHaveCount(3)
  await page.getByRole('button', { name: 'Use dark theme', exact: true }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1280)
})

test('philosophy follows the hero, explains Akaza, and footer links point to the project and authors', async ({
  page,
}) => {
  await page.goto('/')
  await ready(page)
  const philosophy = page.getByRole('region', { name: 'Design philosophy', exact: true })
  await expect(philosophy.locator('dt')).toHaveText([
    'Calm at rest.',
    'Expressive in state.',
    'Tactile in control.',
    'Fluid in motion.',
    'Focused in space.',
  ])
  expect(
    await philosophy.evaluate((el) => el.previousElementSibling?.getAttribute('aria-labelledby')),
  ).toBe('hero-title')
  expect(
    await philosophy.evaluate((el) => el.nextElementSibling?.getAttribute('data-testid')),
  ).toBe('landing-examples')
  await expect(philosophy.getByRole('link', { name: 'Akaza UI', exact: true })).toHaveAttribute(
    'href',
    'https://akaza-ui.com',
  )
  await expect(philosophy).toContainText(
    'Keyboard navigation, focus management, accessible roles, and interaction state.',
  )
  const footer = page.getByRole('contentinfo')
  for (const [name, href] of [
    ['GitHub', 'https://github.com/igris-labs/ipex'],
    ['Akaza UI', 'https://akaza-ui.com'],
    ['Igris Labs', 'https://igrislabs.com'],
    ['Rahul Vashishtha', 'https://rahulv.dev'],
  ])
    await expect(footer.getByRole('link', { name, exact: true })).toHaveAttribute('href', href)
})

test('header uses compact text, structured flyouts, and direct component navigation in both layouts', async ({
  page,
}) => {
  for (const path of ['/', '/getting-started/introduction']) {
    await page.goto(path)
    await ready(page)
    const nav = page
      .getByRole('navigation', { name: 'Main navigation', exact: true })
      .filter({ visible: true })
    const components = nav.getByRole('link', { name: 'Components', exact: true })
    await expect(components).toHaveAttribute('href', '/components/accordion')
    await expect(components).not.toHaveAttribute('aria-haspopup')
    await expect(components).toHaveCSS('font-size', path === '/' ? '13px' : '12px')
    const trigger = nav.getByRole('button', { name: 'Documentation', exact: true })
    await expect(trigger).toHaveCSS('font-size', path === '/' ? '13px' : '12px')
    await trigger.click()
    const panel = page.locator('.akaza-navigation-menu-panel[data-akaza-state="open"]')
    await expect(panel.getByRole('link')).toHaveCount(8)
    await expect(panel).toHaveCSS('grid-auto-flow', 'column')
    await expect(panel.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute(
      'href',
      'https://github.com/igris-labs/ipex',
    )
    await components.hover()
    await expect(panel).not.toBeVisible()
    await components.click()
    await expect(page).toHaveURL(/\/components\/accordion$/)
  }
})

test('docs footer is compact and flyouts align to navigation triggers', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const path of ['/', '/getting-started/introduction']) {
    await page.goto(path)
    await ready(page)
    await expect(page.getByRole('button', { name: 'Install IPEX', exact: true })).toHaveCount(0)
    const nav = page
      .getByRole('navigation', { name: 'Main navigation', exact: true })
      .filter({ visible: true })
    await nav.getByRole('button', { name: 'Documentation', exact: true }).hover()
    const content = page.locator('.akaza-navigation-menu-content').filter({ visible: true })
    await expect(content).toBeVisible()
    for (const name of ['Documentation', 'Design system']) {
      const trigger = nav.getByRole('button', { name, exact: true })
      await trigger.hover()
      await expect(
        page.locator('.akaza-navigation-menu-panel[data-akaza-state="open"]'),
      ).toContainText(name === 'Documentation' ? 'Introduction' : 'Principles')
      await expect
        .poll(async () => {
          const panel = (await content.boundingBox())!
          const anchor = (await trigger.boundingBox())!
          const width = page.viewportSize()!.width
          const expected = Math.max(8, Math.min(anchor.x, width - 8 - panel.width))
          return Math.abs(panel.x - expected)
        })
        .toBeLessThan(1)
    }
    await content.getByRole('link', { name: /^Principles/ }).hover()
    await expect(content).toBeVisible()
    await page.keyboard.press('Escape')
  }
  const footer = page.locator('article footer')
  await expect(footer.getByRole('navigation', { name: 'Footer navigation' })).toHaveCount(0)
  await expect(footer).toContainText('IPEX by Igris Labs')
  expect((await footer.boundingBox())!.height).toBeLessThan(64)
})

test('header separates GitHub and theme actions and demo controls use shared roomy spacing', async ({
  page,
}) => {
  for (const path of ['/', '/components/accordion']) {
    await page.goto(path)
    await ready(page)
    const header = page.getByRole('banner')
    const github = header.getByRole('button', { name: 'GitHub repository', exact: true })
    await expect(github).toHaveAttribute('href', 'https://github.com/igris-labs/ipex')
    await expect(github.locator('.iconify')).toBeVisible()
    const separator = header.getByRole('separator')
    await expect(separator).toHaveAttribute('aria-orientation', 'vertical')
    await expect(separator).toHaveCSS('height', '20px')
    const actions = separator.locator('..')
    await expect(actions.getByRole('button', { name: /Use (dark|light) theme/ })).toBeVisible()
    expect((await separator.boundingBox())!.x).toBeLessThan((await github.boundingBox())!.x)
    if (path.endsWith('accordion')) {
      const preview = page.getByTestId('component-preview')
      const toolbar = preview.locator(':scope > div').first()
      await expect(toolbar).toHaveCSS('padding-top', '12px')
      await expect(toolbar).toHaveCSS('padding-left', '16px')
      await expect(toolbar).toHaveCSS('column-gap', '24px')
      await expect(toolbar).toHaveCSS('row-gap', '16px')
      const checks = toolbar.locator('.akaza-checkbox-wrapper')
      await expect(checks).toHaveCount(3)
      await expect(checks.first()).toHaveCSS('min-height', '24px')
    }
    await page.setViewportSize({ width: 768, height: 1000 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(768)
    await page.setViewportSize({ width: 390, height: 844 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
    await page.setViewportSize({ width: 320, height: 844 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320)
    await page.setViewportSize({ width: 1280, height: 720 })
  }
})
