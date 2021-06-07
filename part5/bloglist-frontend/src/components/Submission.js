import React from 'react'

const Submission = ({title, setTitle, author, setAuthor, url, setUrl, submit}) => (
  <div>
    <h2>Create new</h2>
    <form onSubmit={submit}>
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
)

export default Submission