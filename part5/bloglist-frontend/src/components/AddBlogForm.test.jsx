import { render, screen } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('when creating a blog, the event handler recieves the details correctly', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<AddBlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'This is the title of my blog')
  await user.type(authorInput, 'I am the author, John')
  await user.type(urlInput, 'www.john.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is the title of my blog')
  expect(createBlog.mock.calls[0][0].author).toBe('I am the author, John')
  expect(createBlog.mock.calls[0][0].url).toBe('www.john.com')


  console.log(createBlog.mock.calls[0][0].title)
})