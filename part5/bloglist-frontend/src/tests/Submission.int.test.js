import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Submission from '../components/Submission'

test('Correct event handler is called', () => {
  const mockHandler = jest.fn()
  const component = render (
    <Submission addBlog={mockHandler}/>
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Title' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Author' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'Url.com' }
  })

  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Title')
  expect(mockHandler.mock.calls[0][0].author).toBe('Author')
})