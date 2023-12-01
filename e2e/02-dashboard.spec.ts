import { test, expect, type Page } from '@playwright/test'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
  })

  test.describe('List', () => {
    test('should display relevant information', async ({ page }) => {
      const jobCard = page.getByTestId('job-card').first()
      const jobCoverImage = jobCard.getByAltText(`Job's cover image`)
      const jobTitle = jobCard.getByTestId('job-card-title')
      const jobCreatedAt = jobCard.getByTestId('job-card-created-at')
      const jobExpiresAt = jobCard.getByTestId('job-card-expires-at')
      const editButton = jobCard.getByRole('button', { name: 'Edit' })
      const deleteButton = jobCard.getByRole('button', { name: 'Hapus' })

      await expect(jobCard).toBeVisible()
      await expect(jobCoverImage).toBeVisible()
      await expect(jobTitle).not.toBeEmpty()
      await expect(jobCreatedAt).not.toBeEmpty()
      await expect(jobExpiresAt).not.toBeEmpty()
      await expect(editButton).toBeEnabled()
      await expect(deleteButton).toBeEnabled()
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
      await expect(page).toHaveURL(/.*?\/dashboard\?page=2/)
      await expect(prevButton).toBeEnabled()
    })
  })

  test.describe('Create', () => {
    test.beforeEach(async ({ page }) => {
      const createButton = page.getByRole('link', { name: 'Buat lowongan' })
      await createButton.click()

      await page.waitForLoadState()
      await expect(page).toHaveURL(/.*?\/dashboard\/create/)
    })

    test('should be able to create a new job', async ({ page }) => {
      const {
        titleInput,
        positionInput,
        fullTimeRadio,
        candidateInput,
        expiryInput,
        locationInput,
        canRemoteCheckbox,
        descriptionInput,
        minSalaryInput,
        maxSalaryInput,
        showSalaryCheckbox,
        experience3Radio: experienceRadio,
        submitButton,
      } = await getFields(page)

      const titleText = 'Software Developer'
      await titleInput.fill(titleText)
      await expect(titleInput).toHaveValue(titleText)

      await positionInput.selectOption({ label: 'Software Engineer' })
      const positionText = await positionInput
        .locator('option:checked')
        .first()
        .innerText()
      expect(positionText).toContain('Software Engineer')

      await fullTimeRadio.check({ force: true })
      await expect(fullTimeRadio).toBeChecked()

      await candidateInput.fill('3')
      await expect(candidateInput).toHaveValue('3')

      await expiryInput.fill('2023-12-10')
      await expect(expiryInput).toHaveValue('2023-12-10')

      await locationInput.selectOption({ label: 'Bandung' })
      const locationText = await locationInput
        .locator('option:checked')
        .first()
        .innerText()
      expect(locationText).toContain('Bandung')

      await canRemoteCheckbox.check({ force: true })
      await expect(canRemoteCheckbox).toBeChecked()

      await descriptionInput.fill('Deskripsi lowongan')
      await expect(descriptionInput).toContainText('Deskripsi lowongan')

      await minSalaryInput.fill('10000000')
      await expect(minSalaryInput).toHaveValue('10000000')

      await maxSalaryInput.fill('11000000')
      await expect(maxSalaryInput).toHaveValue('11000000')

      await showSalaryCheckbox.check({ force: true })
      await expect(showSalaryCheckbox).toBeChecked()

      await experienceRadio.check({ force: true })
      await expect(experienceRadio).toBeChecked()

      await submitButton.click()
      await page.waitForLoadState()
      await expect(page).toHaveURL(/.*?\/dashboard/)

      const jobCard = page.getByTestId('job-card').first()
      const titleCard = jobCard.getByTestId('job-card-title').first()
      await expect(titleCard).toContainText(titleText)
    })

    test('should not be able to create a new job with invalid data', async ({
      page,
    }) => {
      const {
        titleInput,
        positionInput,
        jobTypeRadio,
        partTimeRadio,
        candidateInput,
        expiryInput,
        locationInput,
        descriptionInput,
        minSalaryInput,
        maxSalaryInput,
        experienceRadio,
        submitButton,
        cancelButton,
      } = await getFields(page)
      const regexUrl = /.*?\/dashboard\/create/

      expect(await titleInput.getAttribute('required')).toBeDefined()
      expect(await positionInput.getAttribute('required')).toBeDefined()
      expect(await jobTypeRadio.getAttribute('required')).toBeDefined()
      expect(await candidateInput.getAttribute('required')).toBeDefined()
      expect(await expiryInput.getAttribute('required')).toBeDefined()
      expect(await locationInput.getAttribute('required')).toBeDefined()
      expect(await descriptionInput.getAttribute('required')).toBeDefined()
      expect(await minSalaryInput.getAttribute('required')).toBeDefined()
      expect(await experienceRadio.getAttribute('required')).toBeDefined()

      await titleInput.fill('')
      await submitButton.click()
      await expect(page).toHaveURL(regexUrl)

      await titleInput.fill('Software Developer')
      await submitButton.click()
      await expect(page).toHaveURL(regexUrl)

      await positionInput.selectOption({ label: 'Software Engineer' })
      await submitButton.click()
      await expect(page).toHaveURL(regexUrl)

      await page.evaluate(() => {
        window.scrollTo(0, 0)
      })
      await partTimeRadio.check({ force: true })
      await submitButton.click()
      await expect(page).toHaveURL(regexUrl)

      await candidateInput.fill('3')
      await submitButton.click()
      await expect(page).toHaveURL(regexUrl)

      await expiryInput.fill('2023-12-10')
      await submitButton.click()
      await expect(page).toHaveURL(regexUrl)

      await locationInput.selectOption({ label: 'Surakarta' })
      await submitButton.click()
      await expect(page).toHaveURL(regexUrl)

      await descriptionInput.fill('Deskripsi lowongan')
      await submitButton.click()
      await expect(page).toHaveURL(regexUrl)

      await minSalaryInput.fill('10000000')
      await submitButton.click()
      await expect(page).toHaveURL(regexUrl)

      await maxSalaryInput.fill('9000000')
      await submitButton.click()
      expect(await maxSalaryInput.getAttribute('aria-invalid')).toBeDefined()
      await expect(page).toHaveURL(regexUrl)

      await cancelButton.click()
      await page.waitForLoadState()
      await expect(page).toHaveURL(/.*?\/dashboard/)
    })
  })

  test.describe('Edit', () => {
    test.beforeEach(async ({ page }) => {
      const jobCard = page.getByTestId('job-card').first()
      const editButton = jobCard.getByRole('button', { name: 'Edit' })
      await editButton.click()

      await page.waitForLoadState()
      await expect(page).toHaveURL(/.*?\/dashboard\/edit\/[a-zA-Z0-9-]+/)
    })

    test('should be able to edit an existing job', async ({ page }) => {
      const {
        titleInput,
        positionInput,
        fullTimeRadio,
        candidateInput,
        expiryInput,
        locationInput,
        canRemoteCheckbox,
        descriptionInput,
        minSalaryInput,
        maxSalaryInput,
        showSalaryCheckbox,
        experience3Radio: experienceRadio,
        editButton,
      } = await getFields(page)

      const titleText = 'Updated Software Developer'
      await titleInput.fill(titleText)
      await expect(titleInput).toHaveValue(titleText)

      await positionInput.selectOption({ label: 'Software Engineer' })
      const positionText = await positionInput
        .locator('option:checked')
        .first()
        .innerText()
      expect(positionText).toContain('Software Engineer')

      await fullTimeRadio.check({ force: true })
      await expect(fullTimeRadio).toBeChecked()

      await candidateInput.fill('3')
      await expect(candidateInput).toHaveValue('3')

      await expiryInput.fill('2023-12-10')
      await expect(expiryInput).toHaveValue('2023-12-10')

      await locationInput.selectOption({ label: 'Bandung' })
      const locationText = await locationInput
        .locator('option:checked')
        .first()
        .innerText()
      expect(locationText).toContain('Bandung')

      await canRemoteCheckbox.check({ force: true })
      await expect(canRemoteCheckbox).toBeChecked()

      await descriptionInput.fill('Deskripsi lowongan')
      await expect(descriptionInput).toContainText('Deskripsi lowongan')

      await minSalaryInput.fill('10000000')
      await expect(minSalaryInput).toHaveValue('10000000')

      await maxSalaryInput.fill('11000000')
      await expect(maxSalaryInput).toHaveValue('11000000')

      await showSalaryCheckbox.check({ force: true })
      await expect(showSalaryCheckbox).toBeChecked()

      await experienceRadio.check({ force: true })
      await expect(experienceRadio).toBeChecked()

      await editButton.click()
      await page.waitForLoadState()
      await expect(page).toHaveURL(/.*?\/dashboard/)

      const jobCard = page.getByTestId('job-card').first()
      const jobTitle = jobCard.getByTestId('job-card-title')
      await expect(jobTitle).toContainText(titleText)
    })

    test('should display not found message', async ({ page }) => {
      await page.goto('/jobs/edit/qwertyuiop')
      await expect(page.getByRole('main')).toContainText('tersesat')
    })
  })

  test.describe('Delete', () => {
    test('should be able to delete an existing job', async ({ page }) => {
      const jobCard = page.getByTestId('job-card').first()
      const jobTitle = await jobCard.getByTestId('job-card-title').textContent()
      const deleteButton = jobCard.getByRole('button', { name: 'Hapus' })
      await deleteButton.click()

      const alertDialog = page.getByRole('alertdialog', {
        name: 'Hapus Lowongan',
      })
      const cancelButton = alertDialog.getByRole('button', { name: 'Batal' })
      const confirmButton = page.getByRole('button', { name: 'Hapus' })

      await expect(alertDialog).toBeVisible()
      await expect(cancelButton).toBeVisible()

      await confirmButton.click()
      await page.waitForLoadState()
      await expect(page).toHaveURL(/.*?\/dashboard/)

      const newJobCard = page.getByTestId('job-card').first()
      const newJobTitle = newJobCard.getByTestId('job-card-title')
      await expect(newJobTitle).not.toContainText(jobTitle as string)
    })
  })

  const getFields = async (page: Page) => {
    const titleInput = page.getByRole('textbox', { name: 'Judul lowongan' })
    const positionInput = page.getByRole('combobox', { name: 'Posisi' })

    const jobTypeRadio = page.getByRole('radiogroup', {
      name: 'Job Type',
    })
    const fullTimeRadio = page.getByRole('radio', { name: 'Full-Time' })
    const partTimeRadio = page.getByRole('radio', { name: 'Part-Time' })
    const contractRadio = page.getByRole('radio', { name: 'Kontrak' })
    const internshipRadio = page.getByRole('radio', { name: 'Intern' })

    const candidateInput = page.getByRole('spinbutton', {
      name: 'Kandidat yang dibutuhkan',
    })
    const expiryInput = page.getByLabel('Aktif hingga')
    const locationInput = page.getByRole('combobox', { name: 'Lokasi' })

    const canRemoteCheckbox = page.getByRole('checkbox', {
      name: 'Bisa remote',
    })
    const descriptionInput = page.getByTestId('rich-text-editor')
    const minSalaryInput = page.getByRole('spinbutton', {
      name: 'Rentang gaji per bulan',
    })
    const maxSalaryInput = page.getByPlaceholder('Maksimum (opsional)')
    const showSalaryCheckbox = page.getByRole('checkbox', {
      name: 'Tampilkan gaji',
    })

    const experienceRadio = page.getByRole('radiogroup', {
      name: 'Experience',
    })
    const experience1Radio = page.getByRole('radio', {
      name: 'Kurang dari 1 tahun',
    })
    const experience2Radio = page.getByRole('radio', { name: '1 - 3 tahun' })
    const experience3Radio = page.getByRole('radio', { name: '4 - 5 tahun' })
    const experience4Radio = page.getByRole('radio', { name: '6 - 10 tahun' })
    const experience5Radio = page.getByRole('radio', {
      name: 'Lebih dari 10 tahun',
    })

    const submitButton = page.getByRole('button', { name: 'Buat lowongan' })
    const editButton = page.getByRole('button', { name: 'Edit lowongan' })
    const cancelButton = page.getByRole('button', { name: 'Batal' })

    return {
      titleInput,
      positionInput,
      jobTypeRadio,
      fullTimeRadio,
      partTimeRadio,
      contractRadio,
      internshipRadio,
      candidateInput,
      expiryInput,
      locationInput,
      canRemoteCheckbox,
      descriptionInput,
      minSalaryInput,
      maxSalaryInput,
      showSalaryCheckbox,
      experienceRadio,
      experience1Radio,
      experience2Radio,
      experience3Radio,
      experience4Radio,
      experience5Radio,
      submitButton,
      editButton,
      cancelButton,
    }
  }
})
