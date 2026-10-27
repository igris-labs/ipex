import { expect, test, type Locator, type Page } from '@playwright/test'

async function open(page: Page) {
  await page.goto('/components/tree')
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
  return page.locator('[data-tree-example="playground"]')
}
function item(tree: Locator, label: string) {
  return tree
    .locator('[role="treeitem"]')
    .filter({ has: tree.page().getByText(label, { exact: true }) })
}

test('disclosures preserve selection, keyboard navigation skips disabled items, and focus is keyboard-only', async ({
  page,
}) => {
  const tree = await open(page)
  const button = item(tree, 'Button.vue')
  await expect(button).toHaveAttribute('aria-selected', 'true')
  await tree.getByRole('button', { name: 'Collapse Components', exact: true }).click()
  await expect(tree.getByTestId('tree-selection')).toHaveText('Button.vue selected')
  await tree.getByRole('button', { name: 'Expand Components', exact: true }).click()
  await button.locator('.akaza-tree-row').click()
  expect(await button.evaluate((el) => el.matches(':focus-visible'))).toBe(false)
  expect(
    await button.locator('.akaza-tree-row').evaluate((el) => getComputedStyle(el).boxShadow),
  ).toBe('none')
  await button.press('ArrowDown')
  await expect(item(tree, 'Input.vue')).toBeFocused()
  expect(await item(tree, 'Input.vue').evaluate((el) => el.matches(':focus-visible'))).toBe(true)
  expect(
    await item(tree, 'Input.vue')
      .locator('.akaza-tree-row')
      .evaluate((el) => getComputedStyle(el).boxShadow),
  ).not.toBe('none')
  await page.keyboard.press('End')
  await expect(item(tree, 'tokens.css')).toBeFocused()
  await page.keyboard.press('Home')
  await expect(item(tree, 'Components')).toBeFocused()
  await page.keyboard.press('ArrowLeft')
  await expect(item(tree, 'Components')).toHaveAttribute('aria-expanded', 'false')
  await page.keyboard.press('ArrowRight')
  await expect(item(tree, 'Components')).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('ArrowRight')
  await expect(button).toBeFocused()
  await page.keyboard.press('Space')
  await expect(button).toHaveAttribute('aria-selected', 'true')
})

test('multiple selection shows partial and complete states at the trailing edge', async ({
  page,
}) => {
  await open(page)
  const tree = page.locator('[data-tree-example="multiple"]')
  const parent = item(tree, 'Components')
  await expect(parent.locator('[data-state="mixed"]')).toHaveCount(1)
  await expect(item(tree, 'Button.vue').locator('[data-state="checked"]')).toHaveCount(1)
  await tree.getByRole('button', { name: 'Collapse Components', exact: true }).click()
  await expect(tree.getByTestId('tree-selection')).toHaveText('1 selected')
  await parent.locator('.akaza-tree-label').click()
  await expect(tree.getByTestId('tree-selection')).toHaveText('6 selected')
  await expect(parent.locator('[data-state="checked"]')).toHaveCount(1)
  await expect(parent).toHaveAttribute('aria-expanded', 'false')
  await tree.getByRole('button', { name: 'Expand Components', exact: true }).click()
  await expect(item(tree, 'Field.vue')).toHaveAttribute('aria-selected', 'true')
  await item(tree, 'Field.vue').locator('.akaza-tree-label').click()
  await expect(parent.locator('[data-state="mixed"]')).toHaveCount(1)
  await tree.getByRole('button', { name: 'Clear selection' }).click()
  await expect(tree.getByTestId('tree-selection')).toHaveText('No item selected')
  await expect(tree.locator('[data-state="checked"], [data-state="mixed"]')).toHaveCount(0)
})

test('lazy branches show loading feedback and keep loaded children on reopening', async ({
  page,
}) => {
  await open(page)
  const tree = page.locator('[data-tree-example="lazy"]')
  const parent = item(tree, 'Remote components')
  await tree.getByRole('button', { name: 'Expand Remote components', exact: true }).click()
  await expect(parent).toHaveAttribute('aria-busy', 'true')
  await expect(parent.locator('button svg')).toHaveCSS('animation-name', 'spin')
  await expect(item(tree, 'Dialog.vue')).toBeVisible()
  await expect(parent).not.toHaveAttribute('aria-busy', 'true')
  await tree.getByRole('button', { name: 'Collapse Remote components', exact: true }).click()
  await expect(tree.getByRole('treeitem')).toHaveCount(1)
  await tree.getByRole('button', { name: 'Expand Remote components', exact: true }).click()
  await expect(item(tree, 'Popover.vue')).toBeVisible()
  await expect(parent).not.toHaveAttribute('aria-busy', 'true')
})

test('virtual trees keep row geometry and scroll position when density changes', async ({
  page,
}) => {
  await open(page)
  const tree = page.locator('[data-tree-example="virtual"]')
  const viewport = tree.getByRole('tree')
  await expect(viewport).toHaveCSS('height', '240px')
  expect(await tree.getByRole('treeitem').count()).toBeLessThan(40)
  await viewport.evaluate((el) => {
    el.scrollTop = 6000
    el.dispatchEvent(new Event('scroll'))
  })
  await expect(tree.getByText('component-0201.vue', { exact: true })).toBeAttached()
  await tree.getByRole('combobox', { name: 'Virtual tree size' }).click()
  await page.getByRole('option', { name: 'xl', exact: true }).click()
  await expect(tree.getByText('component-0201.vue', { exact: true })).toBeAttached()
  await expect.poll(() => viewport.evaluate((el) => el.scrollTop)).toBe(8400)
  await expect(tree.locator('.akaza-tree-row').first()).toHaveCSS('height', '40px')
  const first = tree.getByRole('treeitem').first()
  await first.focus()
  await first.press('End')
  await expect(item(tree, 'component-1000.vue')).toBeFocused()
  await page.keyboard.press('Home')
  await expect(item(tree, 'component-0001.vue')).toBeFocused()
  expect(await tree.getByRole('treeitem').count()).toBeLessThan(40)
})

test('Tree remains legible in dark mode and disables decorative motion when requested', async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.setItem('nuxt-color-mode', 'dark'))
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' })
  const tree = await open(page)
  await expect(page.locator('html')).toHaveClass(/dark/)
  const toggle = tree.getByRole('button', { name: 'Collapse Components', exact: true })
  await expect(toggle.locator('svg')).toHaveCSS('transition-property', 'none')
  const selected = item(tree, 'Button.vue').locator('.akaza-tree-row')
  await expect(selected).toHaveCSS('transition-property', 'none')
  const color = await selected.evaluate((el) => ({
    background: getComputedStyle(el).backgroundColor,
    text: getComputedStyle(el).color,
  }))
  expect(color.background).not.toBe('rgba(0, 0, 0, 0)')
  expect(color.text).not.toBe(color.background)
  await page.getByRole('combobox', { name: 'Example variant', exact: true }).click()
  await page.getByRole('option', { name: 'subtle', exact: true }).click()
  expect(await selected.evaluate((el) => getComputedStyle(el).boxShadow)).not.toBe('none')
  await page
    .locator('[data-tree-example="empty"]')
    .screenshot({ path: '/tmp/ipex-tree-empty-dark.png' })
  await tree.screenshot({ path: '/tmp/ipex-tree-dark.png' })
})

test('selection highlight scopes share a sliding hover with matching bounds', async ({ page }) => {
  const tree = await open(page)
  const viewport = tree.getByRole('tree')
  const scopes = [
    ['Full row', 'full'],
    ['Indented row', 'indented'],
    ['Label only', 'label'],
  ] as const
  const widths: number[] = []
  for (const [label, scope] of scopes) {
    await page.getByRole('combobox', { name: 'Example selection highlight', exact: true }).click()
    await page.getByRole('option', { name: label, exact: true }).click()
    const selected = item(tree, 'Button.vue').locator('.akaza-tree-selection')
    await expect(selected).toHaveAttribute('data-akaza-selection-highlight', scope)
    widths.push((await selected.boundingBox())!.width)
    const input = item(tree, 'Input.vue').locator('.akaza-tree-label')
    await input.hover()
    await expect
      .poll(() => viewport.evaluate((el) => el.style.getPropertyValue('--tree-hover-opacity')))
      .toBe('1')
    const bounds = await item(tree, 'Input.vue').locator('.akaza-tree-selection').boundingBox()
    await expect
      .poll(() => viewport.evaluate((el) => parseFloat(getComputedStyle(el, '::before').width)))
      .toBeCloseTo(bounds!.width, 0)
    const from = await viewport.evaluate((el) =>
      parseFloat(el.style.getPropertyValue('--tree-hover-y')),
    )
    await item(tree, 'Checkbox.vue').locator('.akaza-tree-label').hover()
    const to = await viewport.evaluate((el) =>
      parseFloat(el.style.getPropertyValue('--tree-hover-y')),
    )
    expect(to).toBeGreaterThan(from)
    const motion = await viewport.evaluate((el) => {
      const style = getComputedStyle(el, '::before')
      return { properties: style.transitionProperty, duration: style.transitionDuration }
    })
    expect(motion.properties).toContain('translate')
    expect(motion.duration).toBe('0.18s')
    await item(tree, 'Checkbox.vue').locator('.akaza-tree-label').click()
    await expect
      .poll(() => viewport.evaluate((el) => el.style.getPropertyValue('--tree-hover-opacity')))
      .toBe('0')
    await tree.getByRole('button', { name: 'Clear selection', exact: true }).click()
    await item(tree, 'Button.vue').locator('.akaza-tree-label').click()
  }
  expect(widths[0]).toBeGreaterThan(widths[1]!)
  expect(widths[1]).toBeGreaterThan(widths[2]!)
  await item(tree, 'Input.vue').locator('.akaza-tree-label').hover()
  await viewport.evaluate((el) => {
    el.scrollTop = 30
    el.dispatchEvent(new Event('scroll'))
  })
  await expect
    .poll(() => viewport.evaluate((el) => el.style.getPropertyValue('--tree-hover-opacity')))
    .toBe('0')
  await item(tree, 'Legacy.vue').hover()
  await expect
    .poll(() => viewport.evaluate((el) => el.style.getPropertyValue('--tree-hover-opacity')))
    .toBe('0')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect
    .poll(() => viewport.evaluate((el) => getComputedStyle(el, '::before').transitionProperty))
    .toBe('none')
})
