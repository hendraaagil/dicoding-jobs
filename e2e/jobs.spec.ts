import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Search', () => {
  test('should display not found message', async ({ page }) => {
    const searchInput = page.getByRole('searchbox')
    const inputText = 'not an engineer'

    await searchInput.click()
    await searchInput.fill(inputText)

    await expect(page.getByRole('main')).toContainText(
      `Lowongan "${inputText}" gak ketemu nih!`,
    )
  })

  test('should display job list', async ({ page }) => {
    const searchInput = page.getByRole('searchbox')
    const inputText = 'engineer'

    await searchInput.click()
    await searchInput.fill(inputText)

    await expect(searchInput).toHaveValue(inputText)
    await expect(page.locator('section > a')).toHaveCount(10)
  })
})

test.describe('Pagination', () => {
  test('should be able to navigate between page', async ({ page }) => {
    const prevButton = page.getByLabel('Previous page')
    const nextButton = page.getByLabel('Next page')

    await expect(prevButton).toBeDisabled()
    await expect(nextButton).toBeEnabled()

    await nextButton.click()
    await expect(page).toHaveURL(/.*?\/jobs\?page=2/)
    await expect(prevButton).toBeEnabled()
  })
})
