const { test, expect, beforeEach, describe } = require('@playwright/test')

// definitely could use a helper :D
// last tests could be improved to be more dynamic
describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Tom Tester',
        username: 'test',
        password: 'test'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Tia Tester',
        username: 'testTia',
        password: 'test'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameField = await page.getByLabel('username')
    const passwordField = await page.getByLabel('password')
    const loginButton = await page.getByRole('button', { name: 'login' })
    await expect(usernameField).toBeVisible()
    await expect(passwordField).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('test')
      await page.getByLabel('password').fill('test')
      await page.getByRole('button').click()
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('test')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button').click()
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('test')
      await page.getByLabel('password').fill('test')
      await page.getByRole('button').click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title:').fill('Title of blog')
      await page.getByLabel('author:').fill('Tom Tester')
      await page.getByLabel('url:').fill('www.Tom.com')
      await page.getByRole('button', { name: 'create' }).click()
      
      await expect(page.getByText('Title of blog').last()).toBeVisible()
      await expect(page.getByText('Tom Tester').last()).toBeVisible()
    })
  })

  describe('When logged in with a blog created by user', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('test')
      await page.getByLabel('password').fill('test')
      await page.getByRole('button').click()

      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title:').fill('Title of blog')
      await page.getByLabel('author:').fill('Tom Tester')
      await page.getByLabel('url:').fill('www.Tom.com')
      await page.getByRole('button', { name: 'create' }).click()
    })

    test('the user can like the blog', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1')).toBeVisible()
    })

    test('the user can delete the blog', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      const blogLocator = page.locator('div').filter({ hasText: 'Title of blog' }).filter({ hasText: 'Tom Tester' })
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()

      await expect(blogLocator).toHaveCount(0)
    })
  })

  describe('with populated blog page with creations from other users', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('testTia')
      await page.getByLabel('password').fill('test')
      await page.getByRole('button').click()
      
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title:').fill('Title of blog1')
      await page.getByLabel('author:').fill('Tia Tester')
      await page.getByLabel('url:').fill('www.Tia.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title:').fill('Title of blog2')
      await page.getByLabel('author:').fill('Tia Tester')
      await page.getByLabel('url:').fill('www.Tia.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.pause()

      await page.getByRole('button', { name: 'view' }).last().click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'hide' }).click()
      
      await page.getByRole('button', { name: 'Logout' }).click()

      await page.getByLabel('username').fill('test')
      await page.getByLabel('password').fill('test')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('the user cant delete other users blogs', async ({page}) => {
      await page.getByRole('button', { name: 'view' }).first().click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    // first post should have 2 likes, second 0 likes
    test('the blog with the most likes is the first blog on the list', async ({page}) => {
      await page.getByRole('button', { name: 'view' }).first().click()
      await expect(page.getByText('2')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).first().click()
      await expect(page.getByText('0')).toBeVisible()
    })
  })
})




