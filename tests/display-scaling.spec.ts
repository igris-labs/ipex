import { expect, test, type Page } from '@playwright/test'

// Playwright normally hides scrollbars, masking overflow on Windows desktops.
test.use({
  launchOptions: {
    ignoreDefaultArgs: ['--hide-scrollbars'],
    args: ['--disable-features=OverlayScrollbar'],
  },
})

async function ready(page: Page) {
  await page.waitForFunction(() => {
    const root = document.getElementById('__nuxt') as HTMLElement & {
      __vue_app__?: { config: { globalProperties: { $nuxt?: { isHydrating: boolean } } } }
    }
    return root?.__vue_app__?.config.globalProperties.$nuxt?.isHydrating === false
  })
}
async function fits(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(() => {
        const root = document.documentElement
        return root.scrollWidth - root.clientWidth
      }),
    )
    .toBeLessThanOrEqual(1)
}

for (const { screen, scale } of [
  { screen: 1920, scale: 1.1 },
  { screen: 1920, scale: 1.25 },
  { screen: 1920, scale: 1.5 },
  { screen: 1536, scale: 1.5 },
  { screen: 1366, scale: 1.1 },
  { screen: 768, scale: 1 },
  { screen: 390, scale: 1 },
  { screen: 320, scale: 1 },
]) {
  const width = Math.floor(screen / scale)
  test(`pages fit a ${screen}px display at ${Math.round(scale * 100)}% scaling with visible scrollbars`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 })
    for (const path of [
      '/',
      '/getting-started/installation',
      '/components/accordion',
      '/components/data-table',
    ]) {
      await page.goto(path)
      await ready(page)
      // Reserve the scrollbar space that overlay scrollbars omit on many Macs.
      await page.addStyleTag({
        content:
          'html { overflow-y: scroll; scrollbar-gutter: stable } ::-webkit-scrollbar { width: 16px; height: 16px }',
      })
      const metrics = await page.evaluate(() => ({
        inner: innerWidth,
        client: document.documentElement.clientWidth,
      }))
      expect(metrics.client).toBeLessThan(metrics.inner)
      await fits(page)
      if (path === '/') {
        for (const name of ['Dashboard', 'Email app']) {
          await page
            .getByRole('tablist', { name: 'Application examples' })
            .getByRole('tab', { name, exact: true })
            .click()
          await fits(page)
        }
      } else if (width >= 1280) {
        const article = await page.locator('article').boundingBox()
        expect(Math.abs(article!.x + article!.width / 2 - metrics.client / 2)).toBeLessThanOrEqual(
          1,
        )
      }
    }
  })
}
