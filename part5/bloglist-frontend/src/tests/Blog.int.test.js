import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('Blog renders title and author only', () => {
  const blog = {
    title: 'This is the title of the blog',
    author: 'Blog author',
    url: 'blogurl.com',
    likes: 200
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('This is the title of the blog')
  expect(component.container).toHaveTextContent('Blog author')
  expect(component.container).not.toHaveTextContent('blogurl.com')
})