import { test, expect } from '@playwright/test'

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

test.describe('Job Detail', () => {
  test('should display job detail and back to the list', async ({ page }) => {
    const jobLink = page.locator('section > a').first()
    const jobTitle = await jobLink.getByTestId('job-card-title').textContent()
    await jobLink.click()

    const strRegExPattern = '\\b' + jobTitle + '\\b'
    await expect(page).toHaveURL(/.*?\/jobs\/[a-zA-Z0-9-]+/)

    await expect(page).toHaveTitle(new RegExp(strRegExPattern, 'i'))
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      jobTitle as string,
    )

    const jobCoverImage = page.getByAltText(`Job's cover image`)
    await expect(jobCoverImage).toBeVisible()

    const jobCompany = page.getByRole('link', { name: /Dicoding/i })
    await expect(jobCompany).toBeVisible()

    const jobLocation = page.getByTestId('job-location')
    await expect(jobLocation).toBeVisible()

    const jobType = page.getByTestId('job-type')
    await expect(jobType).toBeVisible()

    const jobDescription = page.getByTestId('job-description')
    await expect(jobDescription).toBeVisible()

    const jobExperience = page.getByTestId('job-experience')
    await expect(jobExperience).toBeVisible()

    const jobCandidate = page.getByTestId('job-candidate')
    await expect(jobCandidate).toBeVisible()

    const listButton = page.getByRole('link', { name: /Lowongan Kerja/i })
    await expect(listButton).toBeVisible()
    await listButton.click()

    await expect(page).toHaveURL(/.*?\/jobs/)
  })
})
