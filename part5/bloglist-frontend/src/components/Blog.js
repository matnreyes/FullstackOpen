import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [expand, setExpand] = useState(false)

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
      {blog.title} <button onClick={toggleExpand}>hide</button><br></br>
      {blog.author}<br></br>
      {blog.url}<br></br>
      likes: {blog.likes} <button>like</button>
    </div>
  )

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