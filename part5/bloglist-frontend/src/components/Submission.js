import React, { useState } from 'react'

const Submission = ({addBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title, 
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input 
          type="text"
          value={title}
          onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
          type="text"
          value={author}
          onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input 
          type="text"
          value={url}
          onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
)}

export default Submission