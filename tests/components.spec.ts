import { readdirSync, readFileSync } from 'node:fs'

import { expect, test, type Page } from '@playwright/test'

async function goto(page: Page, path: string) {
  const response = await page.goto(path)
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
  return response
}

const components = readdirSync('app/components/ui', { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== 'button')
  .map((entry) => entry.name)

test('covers every public Akaza component export', () => {
  const root = 'node_modules/akaza-ui/dist/types'
  const exports = [
    ...readFileSync(`${root}/index.d.ts`, 'utf8').matchAll(
      /export \* from '\.\/components\/([^']+)'/g,
    ),
  ]
  const expected = exports
    .map(([, folder]) => {
      const declaration = readFileSync(`${root}/components/${folder}/index.d.ts`, 'utf8')
      const name = declaration.match(/default as (\w+)/)?.[1]
      return name === 'OverlayProvider' ? 'overlay-provider' : folder
    })
    .sort()
  expect([...components, 'button'].sort()).toEqual(expected)
})

for (const name of components) {
  test(`${name} renders its preview and copyable source`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    const response = await goto(page, `/components/${name}`)
    expect(response?.status()).toBe(200)
    await expect(page.getByTestId('component-preview')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).not.toHaveText('500')
    await page.getByRole('tab', { name: 'index.ts', exact: true }).click()
    const source = page.getByRole('tabpanel', { name: 'index.ts', exact: true })
    await expect(source).toContainText(`export { default as `)
    await expect(source.locator('code span[class^="shj-"]').first()).toBeAttached()
    expect(errors).toEqual([])
  })
}

test('control models and named slots stay interactive through wrappers', async ({ page }) => {
  await goto(page, '/components/checkbox')
  const checkbox = page.getByRole('checkbox', { name: 'Include archived projects', exact: true })
  await expect(checkbox).not.toBeChecked()
  await checkbox.check()
  await expect(checkbox).toBeChecked()
  await goto(page, '/components/switch')
  const toggle = page.getByRole('switch', { name: 'Email notifications', exact: true })
  await expect(toggle).not.toBeChecked()
  await toggle.click()
  await expect(toggle).toBeChecked()
  await goto(page, '/components/select')
  const select = page.getByRole('combobox', { name: 'Framework', exact: true })
  await select.click()
  await page.getByRole('option', { name: 'Tailwind CSS', exact: true }).click()
  await expect(select).toContainText('Tailwind CSS')
  await goto(page, '/components/input')
  await page.getByRole('textbox', { name: 'Project name', exact: true }).fill('IPEX')
  await expect(page.getByRole('textbox', { name: 'Project name', exact: true })).toHaveValue('IPEX')
})

test('dialog slots preserve focus trapping and dismissal', async ({ page }) => {
  await goto(page, '/components/dialog')
  const open = page.getByTestId('component-preview').getByRole('button', { name: 'Open dialog' })
  await open.click()
  const dialog = page.getByRole('dialog', { name: 'Project settings', exact: true })
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Close', exact: true }).focus()
  await page.keyboard.press('Tab')
  expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(open).toBeFocused()
})

test('highlighter escapes markup and covers Vue, Bash, and terminal output', async ({ page }) => {
  await goto(page, '/components/input')
  const result = await page.evaluate(async () => {
    const path = '/_nuxt/utils/highlight.ts'
    const { highlightCode } = await import(path)
    return {
      vue: await highlightCode(
        '<script setup lang="ts">\nconst count: number = 1\n</script>\n<template><Button @click="save">{{ count }}</Button></template>',
        'vue',
      ),
      bash: await highlightCode('pnpm add akaza-ui --save-dev\n# Install shared packages', 'sh'),
      escaped: await highlightCode('<img src=x onerror=alert(1)>', 'plain'),
    }
  })
  expect(result.vue).toContain('shj-syn-type')
  expect(result.vue).toContain('@click')
  expect(result.bash).toContain('shj-syn-func')
  expect(result.bash).toContain('shj-syn-cmnt')
  expect(result.escaped).not.toContain('<img')
  expect(result.escaped).toContain('&lt;img')
})

test('live controls apply coordinated size recipes', async ({ page }) => {
  await goto(page, '/components/input')
  const input = page.getByRole('textbox', { name: 'Project name', exact: true })
  const sizes = [
    ['xs', 24, 8, 12, 5],
    ['sm', 28, 10, 13, 6],
    ['md', 32, 12, 14, 8],
    ['lg', 36, 14, 14, 10],
    ['xl', 40, 16, 16, 12],
  ] as const
  for (const [size, height, padding, text, radius] of sizes) {
    await page.getByRole('combobox', { name: 'Example size', exact: true }).click()
    await page.getByRole('option', { name: size, exact: true }).click()
    await expect(input).toHaveCSS('height', `${height}px`)
    await expect(input).toHaveCSS('padding-left', `${padding}px`)
    await expect(input).toHaveCSS('font-size', `${text}px`)
    await expect(input).toHaveCSS('border-radius', `${radius}px`)
  }
})

test('tabs coordinate item, indicator, and container geometry at every size', async ({ page }) => {
  await goto(page, '/components/tabs')
  const preview = page.getByTestId('component-preview')
  for (const [size, height, radius] of [
    ['xs', 24, 5],
    ['sm', 28, 6],
    ['md', 32, 8],
    ['lg', 36, 10],
    ['xl', 40, 12],
  ] as const) {
    await page.getByRole('combobox', { name: 'Example size', exact: true }).click()
    await page.getByRole('option', { name: size, exact: true }).click()
    const tab = preview.getByRole('tab').first()
    await expect(tab).toHaveCSS('height', `${height}px`)
    await expect(tab).toHaveCSS('border-radius', `${radius}px`)
    await expect(preview.locator('.akaza-tab-indicator')).toHaveCSS('border-radius', `${radius}px`)
    await expect(preview.getByRole('tablist')).toHaveCSS('border-radius', `${radius + 4}px`)
    const shadows = await preview
      .getByRole('tablist')
      .evaluate((el) => getComputedStyle(el).boxShadow.match(/rgba?\([^)]+\)/g) ?? [])
    expect(shadows.filter((color) => !color.endsWith(', 0)'))).toEqual([])
  }
  await page.getByRole('combobox', { name: 'Example variant', exact: true }).click()
  await page.getByRole('option', { name: 'line', exact: true }).click()
  await expect(preview.locator('.akaza-tab-indicator')).toHaveCSS('height', '2px')
  await expect(preview.getByRole('tablist')).toHaveCSS('border-radius', '0px')
})

test('PIN inputs stay square and mobile previews fit the viewport', async ({ page }) => {
  await goto(page, '/components/pin-input')
  const input = page
    .getByTestId('component-preview')
    .locator('input:not([type="hidden"])')
    .filter({ visible: true })
    .first()
  const box = await input.boundingBox()
  expect(box?.width).toBe(box?.height)
  await page.setViewportSize({ width: 390, height: 844 })
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(390)
})

test('tabs forward named panel slots and switch their content', async ({ page }) => {
  await goto(page, '/components/tabs')
  const preview = page.getByTestId('component-preview')
  await expect(
    preview.getByText('Project overview and recent updates.', { exact: true }),
  ).toBeVisible()
  await preview.getByRole('tab', { name: 'Activity', exact: true }).click()
  await expect(preview.getByText('Changes made by your team.', { exact: true })).toBeVisible()
})

test('tab selection slides between pills and respects reduced motion', async ({ page }) => {
  await goto(page, '/components/tabs')
  const preview = page.getByTestId('component-preview')
  const indicator = preview.locator('.akaza-tab-indicator')
  const activity = preview.getByRole('tab', { name: 'Activity', exact: true })
  await expect(indicator).toHaveCSS('transition-duration', '0.18s')
  const transitions = await activity.evaluate(async (tab) => {
    ;(tab as HTMLButtonElement).click()
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    const indicator = tab.parentElement!.querySelector('.akaza-tab-indicator')!
    return indicator
      .getAnimations()
      .map((animation) => (animation as CSSTransition).transitionProperty)
  })
  expect(transitions).toContain('left')
  const alignment = () =>
    indicator.evaluate((el) => {
      const selected = el.parentElement!.querySelector('[aria-selected="true"]')!
      const a = el.getBoundingClientRect()
      const b = selected.getBoundingClientRect()
      return Math.max(
        Math.abs(a.x - b.x),
        Math.abs(a.y - b.y),
        Math.abs(a.width - b.width),
        Math.abs(a.height - b.height),
      )
    })
  await expect.poll(alignment).toBeLessThan(1)
  await page.setViewportSize({ width: 390, height: 844 })
  await expect.poll(alignment).toBeLessThan(1)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(indicator).toHaveCSS('transition-property', 'none')
  await activity.focus()
  await page.keyboard.press('ArrowLeft')
  await expect(preview.getByRole('tab', { name: 'Overview', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await expect.poll(alignment).toBeLessThan(1)
})

test('switch thumb stays inside the track in RTL', async ({ page }) => {
  await goto(page, '/components/switch')
  const preview = page.getByTestId('component-preview')
  await preview.evaluate((el) => el.setAttribute('dir', 'rtl'))
  const control = preview.getByRole('switch', { name: 'Email notifications', exact: true })
  await control.click()
  await expect(control).toBeChecked()
  const thumb = control.locator('.akaza-switch-thumb')
  await expect(thumb).toHaveCSS('translate', '-12px')
  const trackBox = await control.boundingBox()
  const thumbBox = await thumb.boundingBox()
  expect(thumbBox!.x).toBeGreaterThanOrEqual(trackBox!.x)
})

test('touch targets preserve checkbox and switch visuals', async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  })
  const page = await context.newPage()
  try {
    for (const [name, role, width, height] of [
      ['checkbox', 'checkbox', 14, 14],
      ['switch', 'switch', 28, 16],
    ] as const) {
      await goto(page, `/components/${name}`)
      const control = page.getByTestId('component-preview').getByRole(role)
      await control.scrollIntoViewIfNeeded()
      const box = (await control.boundingBox())!
      expect(box.width).toBe(width)
      expect(box.height).toBe(height)
      const target = await control.evaluate((el) => {
        const style = getComputedStyle(el, '::before')
        return [style.width, style.height]
      })
      expect(target).toEqual(['44px', '44px'])
      await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height + 4)
      await expect(control).toBeChecked()
    }
  } finally {
    await context.close()
  }
})
