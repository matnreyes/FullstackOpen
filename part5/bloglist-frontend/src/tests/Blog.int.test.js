import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('Blog displays all blog info when show button has been pressed', () => {
  const blog = {
    title: 'This is the title of the blog',
    author: 'Blog author',
    url: 'blogurl.com',
    likes: 200,
    user: '12333'
  }

  const user = {
    id: '3245234'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const button = component.getByText('view')

  fireEvent.click(button)
  expect(component.container).toHaveTextContent('200')
  expect(component.container).toHaveTextContent('blogurl.com')
})

test('Like button is clicked twice',  () => {
  const blog = {
    title: 'title of blog',
    author: 'blog author',
    url: 'blogurl.com',
    likes: 200,
    user: '123123'
  }

  const user = {
    id: '123123'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const mockHandler = jest.fn()

  const expand = component.getByText('view')
  fireEvent.click(expand)
  const like = component.getByText('like')
  like.onclick = mockHandler

  for(let i = 0; i < 2; i++){
    fireEvent.click(like)
  }

  expect(mockHandler.mock.calls).toHaveLength(2)
})