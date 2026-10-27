import { expect, test } from '@playwright/test'

import { packageCommands } from '../app/utils/package-commands'

test('package commands preserve flags and avoid converting mixed shell scripts', () => {
  expect(packageCommands('pnpm add a\npnpm add -D b\n')?.npm).toBe(
    'npm install a\nnpm install -D b',
  )
  expect(packageCommands('pnpm install\npnpm run build')?.yarn).toBe('yarn install\nyarn run build')
  expect(packageCommands('pnpm add a\ncp .env.example .env')).toBeNull()
  expect(packageCommands('')).toBeNull()
})

test('installation commands have branded sliding tabs, shared selection, highlighting, and correct copying', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/getting-started/installation')
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
  const groups = page.getByRole('tablist', { name: 'Package manager', exact: true })
  await expect(groups).toHaveCount(3)
  const tabs = groups.first()
  for (const manager of ['pnpm', 'yarn', 'npm', 'bun']) {
    const tab = tabs.getByRole('tab', { name: manager, exact: true })
    await expect(tab.locator('svg, .iconify')).toHaveCount(1)
    await tab.click()
    await expect(tab).toHaveAttribute('aria-selected', 'true')
    await expect(groups.nth(1).getByRole('tab', { name: manager, exact: true })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    const panel = page.getByRole('tabpanel', { name: manager, exact: true }).first()
    const command = manager === 'npm' ? 'npm install' : `${manager} add`
    await expect(panel.locator('code')).toHaveText(
      `${command} akaza-ui tailwind-variants cn\n${command} -D tailwindcss @tailwindcss/vite`,
    )
    await expect(panel.locator('code [class^="shj-syn-"]').first()).toBeVisible()
    await panel.getByRole('button', { name: 'Copy code', exact: true }).click()
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toBe(`${command} akaza-ui tailwind-variants cn\n${command} -D tailwindcss @tailwindcss/vite`)
  }
  await expect(tabs.locator('.akaza-tab-indicator')).toHaveCSS('transition-duration', '0.18s')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(tabs.locator('.akaza-tab-indicator')).toHaveCSS('transition-property', 'none')
  await page.setViewportSize({ width: 390, height: 844 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
  await expect(page.getByRole('button', { name: 'Copy code' }).first()).toBeVisible()
  await expect(page.getByText('nuxt.config.ts', { exact: true }).first()).toBeVisible()
})
