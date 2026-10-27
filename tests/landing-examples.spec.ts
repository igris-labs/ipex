import { expect, test, type Page } from '@playwright/test'

async function ready(page: Page) {
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
}

test('application examples filter projects, open details, and preserve component state', async ({
  page,
}) => {
  await page.goto('/')
  await ready(page)
  const tabs = page.getByRole('tablist', { name: 'Application examples' })
  await expect(tabs.getByRole('tab', { name: 'Components', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await page.getByRole('searchbox', { name: 'Search example components' }).fill('Button')
  await tabs.getByRole('tab', { name: 'Dashboard', exact: true }).click()
  const dashboard = page.getByLabel('Dashboard example', { exact: true })
  await expect(dashboard.getByRole('heading', { name: 'Overview' })).toBeVisible()
  await dashboard.getByRole('textbox', { name: 'Search dashboard projects' }).fill('Workspace')
  await expect(dashboard.getByRole('button', { name: /Workspace settings Platform/ })).toBeVisible()
  await expect(
    dashboard.getByRole('button', { name: /IPEX documentation Design system/ }),
  ).toHaveCount(0)
  await dashboard.getByRole('button', { name: /Workspace settings Platform/ }).click()
  await expect(page.getByRole('dialog', { name: 'Workspace settings' })).toBeVisible()
  await page.getByRole('button', { name: 'Close details' }).click()
  await dashboard
    .getByRole('textbox', { name: 'Search dashboard projects' })
    .fill('no such project')
  await expect(dashboard.getByRole('status')).toHaveText('No projects match your search.')
  await tabs.getByRole('tab', { name: 'Components', exact: true }).click()
  await expect(page.getByRole('searchbox', { name: 'Search example components' })).toHaveValue(
    'Button',
  )
})

test('email example supports search, replies, folders, archive and compose without sending email', async ({
  page,
}) => {
  await page.goto('/')
  await ready(page)
  await page.getByRole('tab', { name: 'Email app', exact: true }).click()
  const email = page.getByLabel('Email application example', { exact: true })
  await email.getByRole('button', { name: /Maya Patel 10:24/ }).click()
  await email.getByRole('textbox', { name: 'Reply to Maya Patel' }).fill('Ready for review.')
  await email.getByRole('button', { name: 'Send reply' }).click()
  await expect(email.getByRole('status')).toHaveText('Reply sent in this example.')
  await email.getByRole('button', { name: /^Sent/ }).click()
  await expect(email.getByRole('button', { name: /Re: Workspace settings/ })).toBeVisible()
  await email.getByRole('button', { name: /^Inbox/ }).click()
  await email.getByRole('searchbox', { name: 'Search example mail' }).fill('Arjun')
  await expect(email.getByRole('button', { name: /A quieter inbox/ })).toBeVisible()
  await email.getByRole('button', { name: /A quieter inbox/ }).click()
  await email.getByRole('button', { name: 'Archive', exact: true }).click()
  await expect(email.getByRole('status')).toHaveText('Message archived.')
  await email.getByRole('button', { name: /^Archive 1/ }).click()
  await expect(email.getByRole('button', { name: /A quieter inbox/ })).toBeVisible()
  await email.getByRole('button', { name: 'Compose', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'New message' })
  await expect(dialog).toBeVisible()
  await dialog.getByRole('textbox', { name: 'To', exact: true }).fill('maya@example.com')
  await dialog.getByRole('textbox', { name: 'Subject', exact: true }).fill('Design review')
  await dialog
    .getByRole('textbox', { name: 'Message', exact: true })
    .fill('The review is complete.')
  await dialog.getByRole('button', { name: 'Send message' }).click()
  await expect(email.getByRole('status')).toHaveText('Message sent in this example.')
})

for (const width of [1440, 768, 390]) {
  test(`examples fit at ${width}px in both color modes`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')
    await ready(page)
    for (const theme of ['light', 'dark']) {
      await page.evaluate(
        (theme) => document.documentElement.classList.toggle('dark', theme === 'dark'),
        theme,
      )
      for (const name of ['Components', 'Dashboard', 'Email app']) {
        await page
          .getByRole('tablist', { name: 'Application examples' })
          .getByRole('tab', { name, exact: true })
          .click()
        await page.waitForTimeout(250)
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
          width,
        )
      }
    }
    const email = page.getByLabel('Email application example', { exact: true })
    const frame = await email.boundingBox()
    const compose = await email.getByRole('button', { name: 'Compose', exact: true }).boundingBox()
    expect(compose!.x + compose!.width).toBeLessThanOrEqual(frame!.x + frame!.width)
    if (width === 390) {
      await email.getByRole('button', { name: /Maya Patel/ }).click()
      await expect(
        email.getByRole('heading', { name: 'Workspace settings are ready for review' }),
      ).toBeVisible()
      await email.getByRole('button', { name: 'Back', exact: true }).click()
      await expect(email.getByRole('searchbox', { name: 'Search example mail' })).toBeVisible()
    }
    expect(errors).toEqual([])
  })
}

test('examples use shared sliding navigation and responsive dashboard and email sidebars', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await ready(page)
  await page.getByRole('tab', { name: 'Dashboard', exact: true }).click()
  const dashboard = page.getByLabel('Dashboard example', { exact: true })
  const nav = dashboard.getByRole('navigation', { name: 'Dashboard workspace' })
  await expect(nav).toBeVisible()
  const list = nav.locator('.akaza-navigation-menu-list').first()
  await nav.getByRole('button', { name: 'Overview', exact: true }).hover()
  const firstY = await list.evaluate((el) => el.style.getPropertyValue('--nav-y'))
  await nav.getByRole('button', { name: 'Projects', exact: true }).hover()
  await expect
    .poll(() => list.evaluate((el) => el.style.getPropertyValue('--nav-y')))
    .not.toBe(firstY)
  await nav.getByRole('button', { name: 'Activity', exact: true }).click()
  await expect(dashboard.getByRole('region', { name: 'Workspace activity' })).toBeVisible()
  await nav.getByRole('button', { name: 'Overview', exact: true }).click()
  const projectNav = dashboard.getByRole('navigation', { name: 'Dashboard projects' })
  await projectNav.getByRole('button', { name: /IPEX documentation/ }).hover()
  const projectList = projectNav.locator('.akaza-navigation-menu-list').first()
  const projectY = await projectList.evaluate((el) => el.style.getPropertyValue('--nav-y'))
  await projectNav.getByRole('button', { name: /Workspace settings/ }).hover()
  await expect
    .poll(() => projectList.evaluate((el) => el.style.getPropertyValue('--nav-y')))
    .not.toBe(projectY)

  await page.getByRole('tab', { name: 'Email app', exact: true }).click()
  const messages = page.getByRole('navigation', { name: 'Messages', exact: true })
  const messageList = messages.locator('.akaza-navigation-menu-list').first()
  await messages.getByRole('button', { name: /Maya Patel/ }).hover()
  await expect(messages.getByRole('button', { name: /Maya Patel/ })).toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0)',
  )
  const mailY = await messageList.evaluate((el) => el.style.getPropertyValue('--nav-hover-y'))
  await messages.getByRole('button', { name: /Arjun Mehta/ }).hover()
  await expect
    .poll(() => messageList.evaluate((el) => el.style.getPropertyValue('--nav-hover-y')))
    .not.toBe(mailY)

  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('tab', { name: 'Dashboard', exact: true }).click()
  const trigger = dashboard.getByRole('button', { name: 'Open dashboard navigation' })
  await trigger.click()
  const drawer = page.getByRole('dialog', { name: 'Dashboard navigation' })
  await expect(drawer).toBeVisible()
  await drawer.getByRole('button', { name: 'Projects', exact: true }).click()
  await expect(drawer).toBeHidden()
  await expect(
    dashboard.getByRole('heading', { level: 3, name: 'Projects', exact: true }),
  ).toBeVisible()
  await trigger.click()
  await page.keyboard.press('Escape')
  await expect(drawer).toBeHidden()
  await expect(trigger).toBeFocused()
  await page.getByRole('tab', { name: 'Email app', exact: true }).click()
  await page.getByRole('button', { name: 'Open email folders' }).click()
  const folders = page.getByRole('dialog', { name: 'Email navigation' })
  await expect(folders).toBeVisible()
  await folders.getByRole('button', { name: /Starred/ }).click()
  await expect(folders).toBeHidden()
  await expect(page.getByRole('heading', { name: 'starred', exact: true })).toBeVisible()
})

test('brand assets are applied to site headers and browser icons', async ({ page, request }) => {
  await page.goto('/')
  await ready(page)
  await expect(
    page.getByRole('banner').getByRole('link', { name: 'IPEX home' }).locator('svg'),
  ).toBeVisible()
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute(
    'href',
    '/favicon.svg',
  )
  for (const path of [
    '/favicon.svg',
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/brand/ipex-symbol.svg',
    '/brand/ipex-logo.svg',
  ]) {
    expect((await request.get(path)).ok()).toBe(true)
  }
})
