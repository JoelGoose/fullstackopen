import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

test('renders only title and author by default', () => {
  const blog = {
    title: 'This is my first test blog!',
    author: 'Tester',
    likes: 10,
    url: 'www.testing-is-cool.com'
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText('This is my first test blog!', { exact: false })
  const authorElement = screen.getByText('Tester', { exact: false })
  const likesElement = screen.queryByText('10')
  const urlElement = screen.queryByText('www.testing-is-cool.com')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(likesElement).toBeNull()
  expect(urlElement).toBeNull()
})

test('renders likes and url when "view" button has been clicked', async () => {
  const blog = {
    title: 'This is my first test blog!',
    author: 'Tester',
    likes: 10,
    url: 'www.testing-is-cool.com',
    user: { id: 'userID', username: 'Tom Tester', name: 'Tom' }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likesElement = screen.getByText('10')
  const urlElement = screen.getByText('www.testing-is-cool.com')

  expect(likesElement).toBeDefined()
  expect(urlElement).toBeDefined()
})

test('when pressing the like button twice, the event handler is also called exactly twice', async () => {
  const blog = {
    title: 'This is my first test blog!',
    author: 'Tester',
    likes: 10,
    url: 'www.testing-is-cool.com',
    user: { id: 'userID', username: 'Tom Tester', name: 'Tom' }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} onLike={mockHandler} />)

  const user = userEvent.setup()
  let button = screen.getByText('view')
  await user.click(button)
  button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})