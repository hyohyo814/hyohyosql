import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogDetails from './BlogDetails'

describe('<Togglable />', () => {
  const blog = {
    title: 'Hello World',
    author: 'John',
    url: 'http://example.com',
    likes: 7,
    user: {
      name: 'Adam',
    },
  }

  test('renders its children', async () => {
    render(<BlogDetails blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.get('.urldisplay')
    const likes = screen.get('.likesdisplay')
    expect(url).toHaveTextContent('http://example.com')
    expect(likes).toHaveTextContent('likes: 7')
  })
})
