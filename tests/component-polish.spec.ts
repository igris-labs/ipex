import { expect, test, type Locator, type Page } from '@playwright/test'

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
async function options(page: Page) {
  const trigger = page
    .getByTestId('component-options')
    .getByRole('button', { name: 'Options and states', exact: true })
  if ((await trigger.getAttribute('aria-expanded')) !== 'true') await trigger.click()
}
async function choose(page: Page, key: string, value: string) {
  await page.getByRole('combobox', { name: `Example ${key}`, exact: true }).click()
  await page.getByRole('option', { name: value, exact: true }).click()
}
async function matchesToken(element: Locator, token: string) {
  return element.evaluate((el, value) => {
    const probe = document.createElement('span')
    probe.style.backgroundColor = value.startsWith('--')
      ? getComputedStyle(el).getPropertyValue(value)
      : value
    document.body.append(probe)
    const expected = getComputedStyle(probe).backgroundColor
    const actual = getComputedStyle(el).backgroundColor
    probe.remove()
    return actual === expected
  }, token)
}

test('submitting the form keeps its position and scroll stable', async ({ page }) => {
  const stage = await open(page, 'form')
  const form = stage.locator('form')
  await form.getByRole('textbox').fill('Project IPEX')
  const before = await form.boundingBox()
  const scroll = await page.evaluate(() => scrollY)
  await form.getByRole('button', { name: 'Save project', exact: true }).click()
  await expect(stage.getByRole('status')).toHaveText('Project saved')
  const after = await form.boundingBox()
  expect(after!.y).toBe(before!.y)
  expect(await page.evaluate(() => scrollY)).toBe(scroll)
})

for (const name of ['popover', 'hover-preview-card']) {
  test(`${name} fits its content by default`, async ({ page }) => {
    const stage = await open(page, name)
    await stage.getByRole('button').click()
    const content = page.locator(`.akaza-${name}-content`)
    await expect(content).toBeVisible()
    const box = await content.boundingBox()
    expect(box!.width).toBeLessThanOrEqual(320)
    expect(box!.width).toBeGreaterThan(160)
    await expect(content).toHaveCSS('font-size', '14px')
    await expect(content).toHaveCSS('padding', '12px')
    await page.keyboard.press('Escape')

    for (const [size, font, padding] of [
      ['xs', '12px', '12px'],
      ['sm', '13px', '12px'],
      ['md', '14px', '12px'],
      ['lg', '14px', '12px'],
      ['xl', '16px', '12px'],
    ]) {
      await choose(page, 'size', size!)
      await stage.getByRole('button').click()
      await expect(content).toBeVisible()
      await expect(content).toHaveCSS('font-size', font!)
      await expect(content).toHaveCSS('padding', padding!)
      await expect(content.locator('p')).toHaveCSS('font-size', font!)
      expect((await content.boundingBox())!.width).toBeLessThanOrEqual(320)
      // Short content must shrink below the old 10rem minimum.
      await content.locator('p').evaluate((el) => {
        el.textContent = 'IPEX'
      })
      expect((await content.boundingBox())!.width).toBeLessThan(160)
      await page.keyboard.press('Escape')
    }
  })
}

test('selectable rows have pointer cursors and menus demonstrate nested content', async ({
  page,
}) => {
  const list = await open(page, 'listbox')
  await expect(list.getByRole('option').first()).toHaveCSS('cursor', 'pointer')
  await expect(list.getByRole('option').first()).toHaveCSS('user-select', 'none')
  const menu = await open(page, 'menu')
  await menu.getByRole('button', { name: 'Open menu', exact: true }).click()
  await expect(page.getByRole('menuitem', { name: 'Edit project', exact: true })).toHaveCSS(
    'cursor',
    'pointer',
  )
  const menubar = await open(page, 'menubar')
  await menubar.getByText('Edit', { exact: true }).click()
  await page.getByRole('menuitem', { name: 'Find', exact: true }).hover()
  await expect(page.getByRole('menuitem', { name: 'Find in project', exact: true })).toBeVisible()
  const navigation = await open(page, 'navigation-menu')
  await navigation.locator('.akaza-navigation-menu-trigger').filter({ hasText: 'Projects' }).click()
  await expect(navigation.getByText('All projects', { exact: true })).toBeVisible()
})

test('meter and progress animate value changes and progress has real vertical geometry', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await open(page, 'meter')
  await options(page)
  const value = page.getByRole('spinbutton', { name: 'Example value', exact: true })
  await value.fill('90')
  await value.press('Enter')
  await expect
    .poll(() => page.locator('.akaza-meter-indicator').evaluate((el) => el.getAnimations().length))
    .toBeGreaterThan(0)
  await open(page, 'progress')
  await options(page)
  await choose(page, 'orientation', 'vertical')
  const progress = page.getByTestId('demo-stage').getByRole('progressbar')
  await expect(progress).toHaveCSS('height', '160px')
  await expect(progress).toHaveCSS('width', '6px')
  const control = page.getByRole('spinbutton', { name: 'Example value', exact: true })
  await control.fill('80')
  await control.press('Enter')
  await expect(progress).toHaveAttribute('aria-valuenow', '80')
  await expect(progress.locator('.akaza-progress-indicator')).toHaveCSS('height', '128px')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await control.fill('20')
  await control.press('Enter')
  expect(
    await progress.locator('.akaza-progress-indicator').evaluate((el) => el.getAnimations().length),
  ).toBe(0)
})

for (const name of [
  'calendar',
  'date-range-field',
  'date-range-picker',
  'month-range-picker',
  'year-range-picker',
]) {
  for (const color of ['secondary', 'accent']) {
    test(`${name} previews and retains ${color} ranges with primary endpoints`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      const stage = await open(page, name)
      await options(page)
      if (name === 'calendar') await choose(page, 'selectionMode', 'range')
      await choose(page, 'rangeColor', color)
      await page
        .getByTestId('component-options')
        .getByRole('button', { name: 'Options and states', exact: true })
        .click()
      const floating = name.startsWith('date-')
      if (floating) await stage.getByRole('spinbutton').first().click()
      const prefix = floating || name === 'calendar' ? 'calendar' : name
      let cells = floating
        ? page.locator(`.akaza-calendar:visible .akaza-${prefix}-cell-trigger`)
        : stage.locator(`.akaza-${prefix}-cell-trigger`)
      const first =
        floating || name === 'calendar' ? cells.filter({ hasText: /^10$/ }).first() : cells.nth(1)
      const middle =
        floating || name === 'calendar' ? cells.filter({ hasText: /^15$/ }).first() : cells.nth(3)
      const last =
        floating || name === 'calendar' ? cells.filter({ hasText: /^20$/ }).first() : cells.nth(6)
      await first.click()
      await last.hover()
      await expect(middle).toHaveAttribute('data-akaza-highlighted')
      expect(await matchesToken(middle, '--range-fill')).toBe(true)
      expect(await matchesToken(first, '--primary')).toBe(true)
      for (const button of [first, middle]) {
        await expect(button.locator('..')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
        expect(
          await button.evaluate((el) => parseFloat(getComputedStyle(el).borderTopLeftRadius)),
        ).toBeGreaterThan(0)
      }
      await last.click()
      if (floating) {
        await expect(page.locator('.akaza-calendar:visible')).toHaveCount(0)
        await stage.getByRole('spinbutton').first().click()
        cells = page.locator('.akaza-calendar:visible .akaza-calendar-cell-trigger')
      }
      const committedMiddle =
        floating || name === 'calendar' ? cells.filter({ hasText: /^15$/ }).first() : cells.nth(3)
      const start =
        floating || name === 'calendar' ? cells.filter({ hasText: /^10$/ }).first() : cells.nth(1)
      const end =
        floating || name === 'calendar' ? cells.filter({ hasText: /^20$/ }).first() : cells.nth(6)
      await expect(committedMiddle).toHaveAttribute('data-akaza-in-range')
      expect(await matchesToken(committedMiddle, '--range-fill')).toBe(true)
      expect(await matchesToken(start, '--primary')).toBe(true)
      expect(await matchesToken(end, '--primary')).toBe(true)
      for (const button of [start, committedMiddle, end]) {
        await expect(button.locator('..')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
        expect(
          await button.evaluate((el) => parseFloat(getComputedStyle(el).borderTopLeftRadius)),
        ).toBeGreaterThan(0)
      }
    })
  }
}

test('number field hides native spinners and overlay options control dialog behavior', async ({
  page,
}) => {
  const stage = await open(page, 'number-field')
  await stage.getByRole('spinbutton').focus()
  await expect(stage.getByRole('spinbutton')).toHaveCSS('appearance', 'textfield')
  await open(page, 'overlay-provider')
  await options(page)
  await page.getByRole('textbox', { name: 'Example title', exact: true }).fill('Review changes')
  await choose(page, 'closeOnBackdropClick', 'Off')
  await page
    .getByTestId('demo-stage')
    .getByRole('button', { name: 'Open dialog', exact: true })
    .click()
  const dialog = page.getByRole('dialog', { name: 'Review changes', exact: true })
  await expect(dialog).toBeVisible()
  await page.locator('.akaza-dialog-overlay').click({ position: { x: 5, y: 5 } })
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await choose(page, 'fullscreen', 'On')
  await page
    .getByTestId('demo-stage')
    .getByRole('button', { name: 'Open dialog', exact: true })
    .click()
  await expect(dialog).toHaveCSS('width', '1280px')
  await page.keyboard.press('Escape')
})

test('pagination exposes active variants and rating uses full-height click targets with complete SVG stars', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const pagination = await open(page, 'pagination')
  await choose(page, 'variant', 'solid')
  expect(await matchesToken(pagination.locator('[data-pagination-indicator]'), '--primary')).toBe(
    true,
  )
  await choose(page, 'variant', 'outline')
  await expect(pagination.locator('[data-pagination-indicator]')).toHaveCSS(
    'border-top-width',
    '1px',
  )
  const rating = await open(page, 'rating')
  const radios = rating.getByRole('radio')
  await radios.last().click()
  await expect(radios.last()).toHaveAttribute('aria-checked', 'true')
  await expect(radios.last()).toHaveCSS('height', '14px')
  await expect(radios.last()).toHaveCSS('cursor', 'pointer')
  await expect(rating.locator('.akaza-rating-fill-icon svg').first()).toHaveCSS('height', '14px')
  await expect(rating.locator('.akaza-rating-fill-icon').first()).toHaveCSS('width', '14px')
})

test('rating supports touch targets, keyboard selection, and fractional clipping', async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  })
  try {
    const page = await context.newPage()
    const stage = await open(page, 'rating')
    await stage.getByRole('radio').last().tap()
    await expect(stage.getByRole('radio').last()).toHaveAttribute('aria-checked', 'true')
    await expect(stage.getByRole('radio').last()).toHaveCSS('height', '44px')
    await expect(stage.locator('.akaza-rating-fill-icon svg').last()).toHaveCSS('height', '14px')
    await options(page)
    const step = page.getByRole('spinbutton', { name: 'Example step', exact: true })
    await step.fill('0.5')
    await step.press('Enter')
    const half = stage.locator('.akaza-rating-radio[data-akaza-value="2.5"]')
    await half.focus()
    await half.press('Space')
    await expect(half).toHaveAttribute('aria-checked', 'true')
    await expect(stage.locator('.akaza-rating-fill').nth(2)).toHaveCSS('width', '22px')
    await expect(stage.locator('.akaza-rating-fill-icon').nth(2)).toHaveCSS('width', '44px')
  } finally {
    await context.close()
  }
})

test('dark range previews keep accent middles and primary endpoints', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await page.addInitScript(() => localStorage.setItem('nuxt-color-mode', 'dark'))
  for (const name of ['calendar', 'month-range-picker', 'year-range-picker']) {
    const stage = await open(page, name)
    await options(page)
    if (name === 'calendar') await choose(page, 'selectionMode', 'range')
    await choose(page, 'rangeColor', 'accent')
    await page
      .getByTestId('component-options')
      .getByRole('button', { name: 'Options and states', exact: true })
      .click()
    const cells = stage.locator(`.akaza-${name}-cell-trigger`)
    const first = name === 'calendar' ? cells.filter({ hasText: /^10$/ }).first() : cells.nth(1)
    const middle = name === 'calendar' ? cells.filter({ hasText: /^15$/ }).first() : cells.nth(3)
    const last = name === 'calendar' ? cells.filter({ hasText: /^20$/ }).first() : cells.nth(6)
    await first.click()
    await last.hover()
    expect(await matchesToken(middle, '--range-fill'), name).toBe(true)
    await last.click()
    expect(await matchesToken(first, '--primary'), name).toBe(true)
    expect(await matchesToken(last, '--primary'), name).toBe(true)
    expect(await matchesToken(middle, '--range-fill'), name).toBe(true)
  }
})

test('menu opens without a default highlight and retains keyboard navigation', async ({ page }) => {
  const stage = await open(page, 'menu')
  const trigger = stage.getByRole('button', { name: 'Open menu', exact: true })
  await trigger.click()
  const menu = page.getByRole('menu')
  await expect(menu).toBeFocused()
  await expect(menu.locator('[data-akaza-highlighted]')).toHaveCount(0)
  await page.keyboard.press('ArrowDown')
  await expect(menu.getByRole('menuitem', { name: 'Edit project', exact: true })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(menu.getByRole('menuitem', { name: 'Duplicate', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await trigger.focus()
  await page.keyboard.press('Enter')
  await expect(menu.getByRole('menuitem', { name: 'Edit project', exact: true })).toBeFocused()
})

test('menubar shows nested menus and separates its popup from the bar', async ({ page }) => {
  const stage = await open(page, 'menubar')
  const bar = stage.getByRole('menubar')
  await bar.getByRole('menuitem', { name: 'File', exact: true }).click()
  const popup = page.locator('.akaza-menubar-content')
  await expect(popup).toBeVisible()
  await expect
    .poll(async () => {
      const panel = await popup.boundingBox()
      const root = await bar.boundingBox()
      return Math.round(panel!.y - root!.y - root!.height)
    })
    .toBe(2)
  const recent = popup.getByRole('menuitem', { name: 'Open recent', exact: true })
  await expect(recent.locator('svg')).toBeVisible()
  await recent.hover()
  await expect(page.getByRole('menuitem', { name: 'IPEX docs', exact: true })).toBeVisible()
  await page.getByRole('menuitem', { name: 'IPEX docs', exact: true }).click()
  await expect(popup).toHaveCount(0)

  await bar.getByRole('menuitem', { name: 'Edit', exact: true }).click()
  const find = popup.getByRole('menuitem', { name: 'Find', exact: true })
  await find.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('menuitem', { name: 'Find in project', exact: true })).toBeFocused()
})

for (const name of ['menu', 'menubar', 'context-menu']) {
  for (const dir of ['ltr', 'rtl']) {
    test(`${name} ${dir} submenu has a 2px panel gap and stays clickable`, async ({ page }) => {
      const stage = await open(page, name)
      if (dir === 'rtl') {
        await options(page)
        await choose(page, 'dir', 'rtl')
      }
      if (name === 'menu')
        await stage.getByRole('button', { name: 'Open menu', exact: true }).click()
      else if (name === 'menubar')
        await stage
          .getByRole('menubar')
          .getByRole('menuitem', { name: 'File', exact: true })
          .click()
      else await stage.locator('.akaza-context-menu-root').click({ button: 'right' })

      const parent = page
        .locator(
          name === 'menubar'
            ? '.akaza-menubar-content'
            : name === 'context-menu'
              ? '.akaza-context-menu-content'
              : '.akaza-menu-content:not(.akaza-menu-submenu-content)',
        )
        .first()
      const move = parent.getByRole('menuitem', { name: 'Move to', exact: true })
      await move.hover()
      const child = page.locator('.akaza-menu-submenu-content')
      await expect(child).toBeVisible()
      await expect
        .poll(async () => {
          const a = await parent.boundingBox()
          const b = await child.boundingBox()
          return Math.round(
            (await child.getAttribute('data-akaza-side')) === 'left'
              ? a!.x - b!.x - b!.width
              : b!.x - a!.x - a!.width,
          )
        })
        .toBe(2)
      await page.getByRole('menuitem', { name: 'Team projects', exact: true }).click()
      await expect(parent).toHaveCount(0)
    })
  }
}

test('other floating panels keep a gap from their anchors', async ({ page }) => {
  for (const name of [
    'popover',
    'hover-preview-card',
    'tooltip',
    'select',
    'combobox',
    'navigation-menu',
    'date-field',
    'date-range-field',
    'date-range-picker',
  ]) {
    const stage = await open(page, name)
    let anchor: Locator
    let popup: Locator
    if (name.startsWith('date-')) {
      anchor = stage
        .locator(
          name === 'date-field'
            ? '.akaza-date-field'
            : name === 'date-range-field'
              ? '.akaza-popover-root'
              : '.akaza-date-range-picker',
        )
        .first()
      await stage.locator('[data-akaza-segment="month"]').first().click()
      popup = page.locator('.akaza-calendar:visible').locator('..')
    } else if (name === 'select' || name === 'combobox') {
      anchor = stage.getByRole('combobox')
      await anchor.click()
      popup = page.locator(`.akaza-${name}-content`)
    } else if (name === 'navigation-menu') {
      anchor = stage.locator('.akaza-navigation-menu-trigger').filter({ hasText: 'Projects' })
      await anchor.click()
      popup = page.locator('.akaza-navigation-menu-content')
    } else {
      anchor = stage.getByRole('button')
      if (name === 'tooltip') await anchor.hover()
      else await anchor.click()
      popup = page.locator(`.akaza-${name}-content`)
    }
    await expect(popup).toBeVisible()
    await expect
      .poll(
        async () => {
          const a = await anchor.boundingBox()
          const b = await popup.boundingBox()
          return Math.max(
            b!.x - a!.x - a!.width,
            a!.x - b!.x - b!.width,
            b!.y - a!.y - a!.height,
            a!.y - b!.y - b!.height,
          )
        },
        { message: `${name} popup must stay separated from its anchor` },
      )
      .toBeGreaterThanOrEqual(1.9)
  }
})

test('submenu keeps its gap when viewport collision flips it left', async ({ page }) => {
  const stage = await open(page, 'menu')
  await stage.locator('.akaza-menu-root').evaluate((el) => {
    Object.assign((el as HTMLElement).style, {
      position: 'fixed',
      right: '8px',
      top: '200px',
      zIndex: '100',
    })
  })
  await stage.getByRole('button', { name: 'Open menu', exact: true }).click()
  const parent = page.locator('.akaza-menu-content:not(.akaza-menu-submenu-content)')
  await parent.getByRole('menuitem', { name: 'Move to', exact: true }).hover()
  const child = page.locator('.akaza-menu-submenu-content')
  await expect(child).toHaveAttribute('data-akaza-side', 'left')
  await expect
    .poll(async () => {
      const a = await parent.boundingBox()
      const b = await child.boundingBox()
      return Math.round(a!.x - b!.x - b!.width)
    })
    .toBe(2)
  await page.getByRole('menuitem', { name: 'Team projects', exact: true }).click()
  await expect(parent).toHaveCount(0)
})

test('navigation flyouts stack content and slide hover between controls', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const stage = await open(page, 'navigation-menu')
  const projects = stage.locator('.akaza-navigation-menu-trigger').filter({ hasText: 'Projects' })
  const settings = stage.locator('.akaza-navigation-menu-link').filter({ hasText: 'Settings' })
  const list = stage.locator('.akaza-navigation-menu-list')
  await projects.hover()
  const chevron = projects.locator('.akaza-navigation-menu-child-indicator')
  await expect.poll(() => chevron.evaluate((el) => el.getAnimations().length)).toBeGreaterThan(0)
  const popup = page.locator('.akaza-navigation-menu-content')
  await expect(popup).toBeVisible()
  const first = popup.locator('.akaza-navigation-menu-content-link').first()
  await first.hover()
  await expect(popup).toBeVisible()
  await expect(first).toHaveCSS('padding-top', '8px')
  await expect(first).toHaveCSS('padding-bottom', '8px')
  const parentPosition = await projects.evaluate((el) => {
    const list = el.closest('.akaza-navigation-menu-list')!
    return el.getBoundingClientRect().left - list.getBoundingClientRect().left
  })
  await expect
    .poll(() =>
      list.evaluate((el) => parseFloat((el as HTMLElement).style.getPropertyValue('--nav-x'))),
    )
    .toBeCloseTo(parentPosition, 0)
  await expect(chevron).toHaveCSS('rotate', '180deg')
  const label = await first.locator('.akaza-navigation-menu-label').boundingBox()
  const description = await first.locator('.akaza-navigation-menu-description').boundingBox()
  expect(description!.y).toBeGreaterThanOrEqual(label!.y + label!.height)
  expect(description!.x).toBe(label!.x)
  await expect(first).toHaveCSS('flex-direction', 'column')
  const previous = await list.evaluate((el) =>
    parseFloat(getComputedStyle(el, '::before').translate),
  )
  await settings.hover()
  await expect
    .poll(() => list.evaluate((el) => el.getAnimations({ subtree: true }).length))
    .toBeGreaterThan(0)
  await expect(popup).toHaveCount(0)
  const next = await list.evaluate((el) => ({
    target: parseFloat((el as HTMLElement).style.getPropertyValue('--nav-x')),
    actual: parseFloat(getComputedStyle(el, '::before').translate),
    opacity: getComputedStyle(el, '::before').opacity,
  }))
  expect(next.target).toBeGreaterThan(previous)
  await expect
    .poll(() => list.evaluate((el) => parseFloat(getComputedStyle(el, '::before').translate)))
    .toBeCloseTo(next.target, 0)
  expect(next.opacity).toBe('1')

  await projects.focus()
  await page.keyboard.press('ArrowDown')
  await expect(popup).toBeVisible()
  await settings.focus()
  await expect(popup).toHaveCount(0)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await projects.hover()
  await expect(popup).toBeVisible()
  await expect
    .poll(() => list.evaluate((el) => getComputedStyle(el, '::before').transitionProperty))
    .toBe('none')
})

test('navigation cancels a pending flyout when the pointer reaches a leaf item', async ({
  page,
}) => {
  const stage = await open(page, 'navigation-menu')
  await options(page)
  const delay = page.getByRole('spinbutton', { name: 'Example openDelay', exact: true })
  await delay.fill('400')
  await delay.press('Enter')
  await stage.locator('.akaza-navigation-menu-trigger').filter({ hasText: 'Projects' }).hover()
  await stage.locator('.akaza-navigation-menu-link').filter({ hasText: 'Settings' }).hover()
  // Wait past the configured opening delay to catch a stale native timer.
  await page.waitForTimeout(450)
  await expect(page.locator('.akaza-navigation-menu-content')).toHaveCount(0)
})

test('programmatic dialog animates its initial opening with the configured duration', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const stage = await open(page, 'overlay-provider')
  await options(page)
  const duration = page.getByRole('spinbutton', { name: 'Example duration', exact: true })
  await duration.fill('1000')
  await duration.press('Enter')
  await stage.getByRole('button', { name: 'Open dialog', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect
    .poll(() =>
      dialog.evaluate((el) =>
        el.getAnimations().map((animation) => animation.effect?.getTiming().duration),
      ),
    )
    .toContain(1000)
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await duration.fill('350')
  await duration.press('Enter')
  await stage.getByRole('button', { name: 'Open dialog', exact: true }).click()
  await expect
    .poll(() =>
      dialog.evaluate((el) =>
        el.getAnimations().map((animation) => animation.effect?.getTiming().duration),
      ),
    )
    .toContain(350)
})

test('separator demo changes geometry with orientation and popover has a 4px gap', async ({
  page,
}) => {
  const stage = await open(page, 'separator')
  const separator = stage.getByRole('separator')
  await expect(separator).toHaveCSS('height', '1px')
  await options(page)
  await choose(page, 'orientation', 'vertical')
  await expect(separator).toHaveAttribute('aria-orientation', 'vertical')
  await expect(separator).toHaveCSS('width', '1px')
  await expect(separator).toHaveCSS('height', '64px')
  await choose(page, 'orientation', 'horizontal')
  await expect(separator).toHaveCSS('height', '1px')
  const popoverStage = await open(page, 'popover')
  const trigger = popoverStage.getByRole('button')
  await trigger.click()
  const popup = page.locator('.akaza-popover-content')
  await expect(popup).toBeVisible()
  await expect
    .poll(async () => {
      const a = await trigger.boundingBox()
      const b = await popup.boundingBox()
      return Math.round(b!.y - a!.y - a!.height)
    })
    .toBe(4)
})

test('docs sidebar uses a subtle sliding hover without changing row geometry', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await open(page, 'button')
  const navigation = page.getByRole('navigation', { name: 'Documentation', exact: true })
  const list = navigation.locator('.akaza-navigation-menu-list')
  const introduction = navigation.getByRole('link', { name: 'Introduction', exact: true })
  const installation = navigation.getByRole('link', { name: 'Installation', exact: true })
  const active = navigation.getByRole('link', { name: 'Button', exact: true })
  await introduction.hover()
  await expect(introduction).toHaveCSS('height', '30px')
  await expect(introduction).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  const before = await list.evaluate((el) =>
    parseFloat((el as HTMLElement).style.getPropertyValue('--nav-y')),
  )
  await expect
    .poll(() =>
      list.evaluate((el) => parseFloat(getComputedStyle(el, '::before').translate.split(' ')[1]!)),
    )
    .toBeCloseTo(before, 0)
  await installation.hover()
  await expect
    .poll(() => list.evaluate((el) => el.getAnimations({ subtree: true }).length))
    .toBeGreaterThan(0)
  const next = await list.evaluate((el) =>
    parseFloat((el as HTMLElement).style.getPropertyValue('--nav-y')),
  )
  expect(next).toBeGreaterThan(before)
  const rows = await Promise.all([introduction.boundingBox(), installation.boundingBox()])
  expect(rows[1]!.y - rows[0]!.y).toBe(34)
  await active.hover()
  await expect(list).toHaveAttribute('data-ipex-highlight-active', 'true')
  await expect.poll(() => list.evaluate((el) => getComputedStyle(el, '::before').opacity)).toBe('0')
})
