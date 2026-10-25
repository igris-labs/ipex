import { expect, test } from '@playwright/test'

test('resolves props, component settings, compatible global defaults, and recipe fallbacks', async ({
  page,
}) => {
  const result = await page.evaluate(async () => {
    const componentPath = '/_nuxt/components/ui/button/index.ts'
    const utilitiesPath = '/_nuxt/utils/ui.ts'
    const { buttonVariants, resolveButtonVariants } = await import(componentPath)
    const { cn } = await import(utilitiesPath)
    const config = {
      defaults: { size: 'xl', color: 'success', variant: 'outline' },
      components: { button: { size: 'md', color: 'secondary' } },
    }
    return {
      explicit: resolveButtonVariants({ size: 'xs', color: 'accent', variant: 'ghost' }, config),
      component: resolveButtonVariants({}, config),
      global: resolveButtonVariants({}, { defaults: { size: 'xl' } }),
      unsupported: resolveButtonVariants({}, { defaults: { variant: 'default', size: null } }),
      fallback: buttonVariants(resolveButtonVariants({}, {})).root(),
      override: cn(buttonVariants({ size: 'xl' }).root(), 'h-12 rounded-full px-8'),
    }
  })
  expect(result.explicit).toMatchObject({ size: 'xs', color: 'accent', variant: 'ghost' })
  expect(result.component).toMatchObject({ size: 'md', color: 'secondary', variant: 'outline' })
  expect(result.global.size).toBe('xl')
  expect(result.unsupported).toMatchObject({ variant: undefined, size: undefined })
  expect(result.fallback).toContain('h-7')
  expect(result.override).not.toContain('h-10')
})

test.beforeEach(async ({ page }) => {
  await page.goto('/components/button')
  // The server-rendered controls become interactive after Vue hydration.
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
  await expect(page.getByTestId('preview-button')).toBeVisible()
})

test('uses content folders as category labels and content files as navigation links', async ({
  page,
}) => {
  const navigation = page.getByRole('navigation', { name: 'Documentation', exact: true })
  await expect(navigation.getByText('Getting started', { exact: true })).toBeVisible()
  await expect(navigation.getByRole('link').first()).toHaveCSS('border-radius', '8px')
  await expect(navigation.getByText('Components', { exact: true })).toBeVisible()
  await expect(navigation.getByRole('link', { name: 'Components', exact: true })).toHaveCount(0)
  await expect(navigation.getByRole('link', { name: 'Button', exact: true })).toHaveAttribute(
    'href',
    '/components/button',
  )
})

test('keeps all five size recipes coordinated, including square icon controls', async ({
  page,
}) => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
  for (let i = 0; i < sizes.length; i++) {
    const dimensions = await page.getByTestId(`size-${sizes[i]}`).evaluate((el) => {
      const style = getComputedStyle(el)
      const icon = el.querySelector('svg')!
      return [
        el.getBoundingClientRect().height,
        parseFloat(style.paddingLeft),
        parseFloat(style.paddingTop),
        parseFloat(style.fontSize),
        parseFloat(style.lineHeight),
        parseFloat(style.borderRadius),
        icon.getBoundingClientRect().width,
        parseFloat(getComputedStyle(el.firstElementChild!).gap),
      ]
    })
    expect(dimensions).toEqual(
      [
        [24, 8, 2, 12, 16, 5, 12, 4],
        [28, 10, 4, 13, 16, 6, 14, 4],
        [32, 12, 4, 14, 20, 8, 16, 6],
        [36, 14, 6, 14, 20, 10, 18, 8],
        [40, 16, 6, 16, 24, 12, 20, 10],
      ][i],
    )
    const box = await page.getByTestId(`icon-${sizes[i]}`).boundingBox()
    expect(box?.width).toBe(box?.height)
    expect(box?.height).toBe(24 + i * 4)
  }
})

test('renders tactile primary and accent fills, flat secondary, and distinct variants', async ({
  page,
}) => {
  for (const color of ['primary', 'accent']) {
    await expect(page.getByTestId(`color-${color}`)).toHaveCSS(
      'background-image',
      /linear-gradient/,
    )
  }
  await expect(page.getByTestId('color-secondary')).toHaveCSS('background-image', 'none')
  for (const variant of ['soft', 'subtle', 'outline', 'ghost', 'link']) {
    await expect(page.getByTestId(`variant-${variant}`)).toHaveCSS('background-image', 'none')
  }
  await expect(page.getByTestId('override-button')).toHaveCSS('padding-left', '24px')
  expect(
    await page
      .getByTestId('override-button')
      .evaluate((el) => parseFloat(getComputedStyle(el).borderRadius)),
  ).toBeGreaterThan(1000)
})

test('accent stays chromatic and soft buttons use a color tint in both themes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const variants = page.locator('[aria-label="Color preview variant"]')
  await variants.getByRole('button', { name: 'soft', exact: true }).click()
  const accent = page.getByTestId('color-accent')
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).click()
    const colors = await accent.evaluate((el) => {
      const style = getComputedStyle(el)
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 1
      const context = canvas.getContext('2d')!
      const pixel = (color: string) => {
        context.clearRect(0, 0, 1, 1)
        context.fillStyle = color
        context.fillRect(0, 0, 1, 1)
        return Array.from(context.getImageData(0, 0, 1, 1).data)
      }
      return {
        accent: pixel(style.getPropertyValue('--accent')),
        text: pixel(style.color),
        background: pixel(style.backgroundColor),
      }
    })
    expect(
      Math.max(...colors.accent.slice(0, 3)) - Math.min(...colors.accent.slice(0, 3)),
    ).toBeGreaterThan(60)
    expect(colors.text.indexOf(Math.max(...colors.text.slice(0, 3)))).toBe(
      colors.accent.indexOf(Math.max(...colors.accent.slice(0, 3))),
    )
    expect(colors.background[3]).toBeCloseTo(26, 0)
    await expect(accent).toHaveCSS('background-image', 'none')
    await accent.hover()
    await expect
      .poll(() => accent.evaluate((el) => getComputedStyle(el).backgroundColor))
      .toMatch(/\/ 0\.2\)/)
    await page.mouse.move(0, 0)
  }
})

for (const theme of ['light', 'dark']) {
  test(`non-solid variants retain their color family and contrast in ${theme} mode`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    if (theme === 'dark') await page.getByRole('button', { name: 'Use dark theme' }).click()
    const variants = page.locator('[aria-label="Color preview variant"]')
    for (const variant of ['soft', 'subtle', 'outline', 'ghost']) {
      await variants.getByRole('button', { name: variant, exact: true }).click()
      for (const color of [
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'destructive',
      ]) {
        const button = page.getByTestId(`color-${color}`)
        await page.mouse.move(0, 0)
        for (const hover of [false, true]) {
          if (hover) await button.hover()
          const paint = await button.evaluate((el) => {
            const s = getComputedStyle(el)
            const canvas = document.createElement('canvas')
            canvas.width = canvas.height = 1
            const ctx = canvas.getContext('2d')!
            const pixel = (color: string) => {
              ctx.clearRect(0, 0, 1, 1)
              ctx.fillStyle = color
              ctx.fillRect(0, 0, 1, 1)
              return Array.from(ctx.getImageData(0, 0, 1, 1).data)
            }
            const text = pixel(s.color)
            const background = pixel(s.backgroundColor)
            const border = pixel(s.borderTopColor)
            ctx.fillStyle = getComputedStyle(document.body).backgroundColor
            ctx.fillRect(0, 0, 1, 1)
            ctx.fillStyle = s.backgroundColor
            ctx.fillRect(0, 0, 1, 1)
            const composite = Array.from(ctx.getImageData(0, 0, 1, 1).data)
            const luminance = (rgb: number[]) => {
              const values = rgb.slice(0, 3).map((value) => {
                const c = value / 255
                return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
              })
              return values[0]! * 0.2126 + values[1]! * 0.7152 + values[2]! * 0.0722
            }
            const a = luminance(text)
            const b = luminance(composite)
            return {
              text,
              background,
              border,
              contrast: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
            }
          })
          const tinted = variant === 'soft' || variant === 'subtle'
          const opacity = hover ? (tinted ? 0.2 : 0.1) : tinted ? 0.1 : 0
          const label = `${theme}/${variant}/${color}/${hover ? 'hover' : 'rest'}`
          expect.soft(paint.background[3], label).toBeCloseTo(Math.round(opacity * 255), 0)
          if (opacity > 0) {
            for (let i = 0; i < 3; i++)
              expect
                .soft(Math.abs(paint.background[i]! - paint.text[i]!), label)
                .toBeLessThanOrEqual(12)
          }
          expect
            .soft(paint.border[3], label)
            .toBeCloseTo(
              Math.round((variant === 'subtle' ? 0.2 : variant === 'outline' ? 0.5 : 0) * 255),
              0,
            )
          expect.soft(paint.contrast, label).toBeGreaterThanOrEqual(4.5)
        }
      }
    }
  })
}

test('forwards clicks once and preserves async Promises, width, and disabled behavior', async ({
  page,
}) => {
  await page.getByTestId('preview-button').click()
  await expect(page.getByText('Clicked 1 time', { exact: true })).toBeVisible()
  await expect(page.getByTestId('disabled-button')).toBeDisabled()
  const button = page.getByTestId('async-button')
  const before = await button.boundingBox()
  await button.click()
  await expect(button).toHaveAttribute('aria-busy', 'true')
  await expect(button).toBeDisabled()
  const during = await button.boundingBox()
  expect(during?.width).toBe(before?.width)
  await expect(button).toHaveCSS('opacity', '1')
  await expect(page.getByText('Demo complete', { exact: true })).toBeVisible()
  await expect(button).toBeEnabled()
})

test('supports keyboard activation, theme switching, copyable source, and reduced motion', async ({
  page,
  context,
}) => {
  const button = page.getByTestId('preview-button')
  await page.keyboard.press('Tab')
  await button.focus()
  await expect(button).toHaveCSS('outline-width', '2px')
  await page.keyboard.press('Space')
  await expect(page.getByText('Clicked 1 time', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Use dark theme' }).click()
  await expect(page.locator('html')).toHaveClass('dark')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(button).toHaveCSS('transition-property', 'none')
  await button.hover()
  await page.mouse.down()
  await expect(button).toHaveCSS('translate', 'none')
  await page.mouse.up()
  await expect(page.getByRole('tab', { name: 'Button.vue' })).toBeVisible()
  await page.getByRole('tab', { name: 'index.ts', exact: true }).click()
  await expect(page.getByRole('tabpanel').filter({ visible: true })).toContainText(
    'export const buttonVariants',
  )
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page
    .getByRole('tabpanel')
    .filter({ visible: true })
    .getByRole('button', { name: 'Copy code' })
    .click()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    'export const buttonVariants',
  )
})

test('opens mobile navigation and keeps the page within the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('dialog').getByRole('link', { name: 'Installation', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Installation', exact: true })).toBeVisible()
  await expect(page.getByRole('dialog')).toBeHidden()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
})

test('serves the landing page at the base URL', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'One system for Igris Labs.' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Get started', exact: true })).toHaveAttribute(
    'href',
    '/getting-started/installation',
  )
})

test('matches reference sizing and separates shared installation from component source', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  const prose = page.getByTestId('docs-prose')
  const box = await prose.boundingBox()
  expect(box?.width).toBe(672)
  expect(box?.x).toBe(384)
  await expect(prose).toHaveCSS('font-size', '15px')
  await expect(prose.locator('h2').first()).toHaveCSS('font-size', '20px')
  await expect(page.getByRole('tab')).toHaveCount(2)
  await page.goto('/getting-started/installation')
  for (const file of ['ui.config.ts', 'ui.types.ts', 'app/assets/main.css', 'app/utils/ui.ts']) {
    await expect(page.getByTestId('docs-prose')).toContainText(file)
  }
  await expect(page.getByTestId('docs-prose')).toContainText(
    'pnpm add akaza-ui tailwind-variants cn',
  )
})

test('persists Color Mode choice across reloads', async ({ page }) => {
  await page.getByRole('button', { name: 'Use dark theme' }).click()
  await expect(page.locator('html')).toHaveClass('dark')
  await page.reload()
  await expect(page.locator('html')).toHaveClass('dark')
  await expect(page.getByRole('button', { name: 'Use light theme' })).toBeVisible()
})

test('highlights Markdown and component source in both themes without changing copied code', async ({
  page,
  context,
}) => {
  const tokenColors = async () =>
    page
      .locator('pre')
      .first()
      .evaluate((el) => [
        ...new Set(
          [...el.querySelectorAll('span[class]')].map((token) => getComputedStyle(token).color),
        ),
      ])
  const light = await tokenColors()
  expect(light.length).toBeGreaterThan(2)
  await page.getByRole('button', { name: 'Use dark theme' }).click()
  await expect.poll(tokenColors).not.toEqual(light)
  await page.getByRole('tab', { name: 'index.ts', exact: true }).click()
  const panel = page.getByRole('tabpanel').filter({ visible: true })
  await expect(panel.locator('pre')).toContainText('export const buttonVariants')
  await expect(panel.locator('pre span[class]').first()).toBeAttached()
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await panel.getByRole('button', { name: 'Copy code' }).click()
  const copied = await page.evaluate(() => navigator.clipboard.readText())
  expect(copied).toContain('export const buttonVariants')
  expect(copied).not.toContain('shj-syn-')
  await page.goto('/getting-started/installation')
  const markdown = page.getByTestId('docs-prose').locator('pre').first()
  await expect(markdown).toContainText('pnpm add akaza-ui')
  expect(await markdown.locator('span').count()).toBeGreaterThan(2)
})
