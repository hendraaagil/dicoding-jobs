import { test, expect } from '@playwright/test'

test.describe('Jobs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('List', () => {
    test('should display relevant information', async ({ page }) => {
      const jobCard = page.getByTestId('job-card').first()
      const jobCoverImage = jobCard.getByAltText(`Job's cover image`)
      const jobTitle = jobCard.getByTestId('job-card-title')
      const jobCompany = jobCard.getByTestId('job-card-company')
      const jobLocation = jobCard.getByTestId('job-card-location')
      const jobExperience = jobCard.getByTestId('job-card-experience')
      const jobType = jobCard.getByTestId('job-card-type')
      const jobCreatedAt = jobCard.getByTestId('job-card-created-at')
      const jobExpiresAt = jobCard.getByTestId('job-card-expires-at')

      await expect(jobCard).toBeVisible()
      await expect(jobCard).toHaveAttribute('href', /.*?\/jobs\/[a-zA-Z0-9-]+/)
      await expect(jobCoverImage).toBeVisible()
      await expect(jobTitle).not.toBeEmpty()
      await expect(jobCompany).not.toBeEmpty()
      await expect(jobLocation).not.toBeEmpty()
      await expect(jobExperience).not.toBeEmpty()
      await expect(jobType).not.toBeEmpty()
      await expect(jobCreatedAt).not.toBeEmpty()
      await expect(jobExpiresAt).not.toBeEmpty()
    })
  })

  test.describe('Search', () => {
    test('should display not found message', async ({ page }) => {
      const searchInput = page.getByRole('searchbox')
      const inputText = 'not an engineer'

      await searchInput.click()
      await searchInput.fill(inputText)

      const jobCard = page.getByTestId('job-card')
      await expect(page.getByRole('main')).toContainText(
        `Lowongan "${inputText}" gak ketemu nih!`,
      )
      await expect(jobCard).toHaveCount(0)
    })

    test('should display job list', async ({ page }) => {
      const searchInput = page.getByRole('searchbox')
      const inputText = 'engineer'

      await searchInput.click()
      await searchInput.fill(inputText)

      const jobCard = page.getByTestId('job-card')
      await expect(searchInput).toHaveValue(inputText)
      await expect(jobCard).toHaveCount(10)

      const jobCards = await jobCard.all()
      for (const jobCard of jobCards) {
        const jobTitle = await jobCard
          .getByTestId('job-card-title')
          .textContent()
        expect(jobTitle).toMatch(new RegExp(inputText, 'i'))
      }
    })
  })

  test.describe('Pagination', () => {
    test('should be able to navigate between page', async ({ page }) => {
      const prevButton = page.getByLabel('Previous page')
      const nextButton = page.getByLabel('Next page')

      await expect(prevButton).toBeDisabled()
      await expect(nextButton).toBeEnabled()

      await nextButton.click()
      await page.waitForLoadState()
      await expect(page).toHaveURL(/.*?\/jobs\?page=2/)
      await expect(prevButton).toBeEnabled()
    })
  })

  test.describe('Detail', () => {
    test('should display job detail and back to the list', async ({
      page,
      isMobile,
    }) => {
      const jobLink = page.getByTestId('job-card').first()
      const jobTitle = await jobLink.getByTestId('job-card-title').textContent()
      await jobLink.click()

      const strRegExPattern = '\\b' + jobTitle + '\\b'
      await page.waitForLoadState()
      await expect(page).toHaveURL(/.*?\/jobs\/[a-zA-Z0-9-]+/)

      await expect(page).toHaveTitle(new RegExp(strRegExPattern, 'i'))
      await expect(page.getByTestId('job-title')).toHaveText(jobTitle as string)

      const jobCoverImage = page.getByAltText(`Job's cover image`)
      await expect(jobCoverImage).toBeVisible()

      const jobCompany = page.getByRole('link', { name: /Dicoding/i })
      await expect(jobCompany).not.toBeEmpty()
      await expect(jobCompany).toHaveAttribute('href')

      const jobLocation = page.getByTestId('job-location')
      await expect(jobLocation).not.toBeEmpty()

      const jobType = page.getByTestId('job-type')
      await expect(jobType).not.toBeEmpty()

      const jobDescription = page.getByTestId('job-description')
      await expect(jobDescription).not.toBeEmpty()

      const jobExperience = page.getByTestId('job-experience')
      await expect(jobExperience).not.toBeEmpty()

      const jobCandidate = page.getByTestId('job-candidate')
      await expect(jobCandidate).not.toBeEmpty()

      if (isMobile) {
        const menuButton = page.getByRole('button', { name: 'Show menu' })
        await menuButton.click()
      }

      const listButton = page.getByRole('link', { name: /Lowongan Kerja/i })
      await expect(listButton).toBeVisible()
      await listButton.click()

      await page.waitForLoadState()
      await expect(page).toHaveURL(/.*?\/jobs/)
    })

    test('should display not found message', async ({ page }) => {
      await page.goto('/jobs/qwertyuiop')
      await expect(page.getByRole('main')).toContainText('tersesat')
    })
  })
})
