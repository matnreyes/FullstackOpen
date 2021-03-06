import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, deleteBlog }) => {
  const [expand, setExpand] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const toggleExpand = () => {
    setExpand(!expand)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (event) => {
    event.preventDefault()
    blogService
      .updateLikes(updatedBlog)
      .then(response => setUpdatedBlog(response))
  }

  const handleDelete = (event) => {
    event.preventDefault()
    if(window.confirm(`Are you sure you wish to delete blog titled ${blog.title}`)) {
      deleteBlog(blog.id)
    }
  }
  const expandedBlog = () => (
    <div>
      {updatedBlog.title} <button onClick={toggleExpand}>hide</button><br></br>
      {updatedBlog.author}<br></br>
      {updatedBlog.url}<br></br>
      likes: {updatedBlog.likes} <button onClick={handleLike}>like</button> <br></br>
      {blog.user.id === user.id
        ? <button onClick={handleDelete} id="delete-button">delete</button>
        : null}
    </div>
  )

  const smallBlog = () => (
    <div>
      <div>
        {blog.title} <button onClick={toggleExpand} className="expandButton">view</button>
      </div>
      <div>
        {blog.author}
      </div>
    </div>
  )

  return (
    <div style={blogStyle} className="blogContainer">
      { expand ? expandedBlog() : smallBlog() }
    </div>
  )
}

export default Blog