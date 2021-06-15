import React, { useState } from 'react'

const Blog = ({blog, handleLike}) => {
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

  const expandedBlog = () => (
    <div>
      {updatedBlog.title} <button onClick={toggleExpand}>hide</button><br></br>
      {updatedBlog.author}<br></br>
      {updatedBlog.url}<br></br>
      likes: {updatedBlog.likes} <button onClick={handleClick}>like</button>
    </div>
  )

  const handleClick = (event) => {
    event.preventDefault()
    handleLike(updatedBlog).then(response => setUpdatedBlog(response))
  }

  const smallBlog = () => (
    <div>
      {blog.title} <button onClick={toggleExpand}>view</button>
    </div>
  )

  return (
    <div style={blogStyle}>
      { expand ? expandedBlog() : smallBlog() }
    </div>  
)}

export default Blog