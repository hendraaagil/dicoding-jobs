import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Search', () => {
  test('should display not found message', async ({ page }) => {
    const searchInput = page.getByRole('search')
    const inputText = 'not an engineer'

    await searchInput.click()
    await searchInput.fill(inputText)

    await expect(page.getByRole('main')).toContainText(
      `Lowongan "${inputText}" gak ketemu nih!`,
    )
  })

  test('should display job list', async ({ page }) => {
    const searchInput = page.getByRole('search')
    const inputText = 'engineer'

    await searchInput.click()
    await searchInput.fill(inputText)

    await expect(searchInput).toHaveValue(inputText)
    await expect(page.locator('section > a')).toHaveCount(10)
  })
})

test.describe('Pagination', () => {
  test('should cannot go to previous page', async ({ page }) => {
    const prevButton = page.getByLabel('Previous page')
    await expect(prevButton).toBeDisabled()
  })

  test('should be able to go to next page', async ({ page }) => {
    const nextButton = page.getByLabel('Next page')
    await expect(nextButton).toBeEnabled()
  })

  test('should be direct to page 2', async ({ page }) => {
    const page2Button = page.getByRole('button', { name: '2' })
    await page2Button.click()

    await expect(page).toHaveURL(/.*?\/jobs\?page=2/)
  })
})