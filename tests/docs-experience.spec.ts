import { expect, test } from '@playwright/test'

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
  await expect(page.getByRole('heading', { name: 'Specification map', exact: true })).toBeVisible()
})

test('landing example supports editing, review, execution, and reset on mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
  const name = page.getByRole('textbox', { name: 'Project name' })
  await name.fill('')
  await expect(page.getByRole('button', { name: 'Create project', exact: true })).toBeDisabled()
  await name.fill('Operations')
  await page.getByRole('button', { name: 'Review', exact: true }).click()
  await expect(page.locator('dd').first()).toHaveText('Operations')
  await page.getByRole('button', { name: 'Create project', exact: true }).click()
  await expect(
    page.getByRole('status').filter({ hasText: 'Created in this example.' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Reset example', exact: true }).click()
  await expect(name).toHaveValue('IPEX docs')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
})
